(function(){
'use strict';
function initializeCalls(){
const db=()=>window.supabase, room=()=>window.activeRoom, user=()=>window.chatUser;
const callButton=document.querySelector('.connect-call-btn');
if(!callButton)return;
const overlay=document.createElement('section');
overlay.className='connect-call-layer';overlay.hidden=true;
overlay.innerHTML='<h2>Chamada · Connect</h2><p id="call-phase">Preparando chamada…</p><video id="call-remote" autoplay playsinline></video><video id="call-local" autoplay playsinline muted style="width:120px;max-height:160px;align-self:flex-end"></video><div style="display:flex;gap:10px"><button type="button" id="call-answer" hidden>Atender</button><button type="button" id="call-decline" hidden>Recusar</button><button type="button" id="call-end">Encerrar</button></div>';
document.body.append(overlay);
const phase=overlay.querySelector('#call-phase'),remote=overlay.querySelector('#call-remote'),local=overlay.querySelector('#call-local'),answer=overlay.querySelector('#call-answer'),decline=overlay.querySelector('#call-decline');
let active=null,pc=null,stream=null,other=null,seen=0,starting=false,pendingCandidates=[];
function info(message){phase.textContent=message;}
async function members(r){const info=window.activeInfo;if(info&&Array.isArray(info.members)&&info.members.length){return [...new Set(info.members.map(m=>m.id).filter(Boolean))];}const {data,error}=await db().rpc('rai_chat_info',{p_room:r});if(error)throw error;return [...new Set((data?.members||[]).map(m=>m.id).filter(Boolean))];}
async function send(payload){if(!active||!other)return;const {error}=await db().from('connect_call_signals').insert({call_id:active.id,sender_id:user(),recipient_id:other,payload});if(error)throw error;}
async function media(){stream=await navigator.mediaDevices.getUserMedia({audio:true,video:{facingMode:'user'}});local.srcObject=stream;}
async function peer(){pc=new RTCPeerConnection({iceServers:[{urls:'stun:stun.l.google.com:19302'}]});pc.onicecandidate=e=>{if(e.candidate)send({type:'candidate',candidate:e.candidate.toJSON()}).catch(()=>info('Falha na conexão de rede.'));};pc.ontrack=e=>{remote.srcObject=e.streams[0];info('Chamada conectada');};pc.onconnectionstatechange=()=>{if(pc?.connectionState==='failed')info('Não foi possível conectar. Pode ser necessário um servidor TURN.');};stream.getTracks().forEach(t=>pc.addTrack(t,stream));}
async function end(update=true){const id=active?.id;active=null;other=null;seen=0;pendingCandidates=[];if(pc){pc.close();pc=null;}if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;}remote.srcObject=null;local.srcObject=null;overlay.hidden=true;answer.hidden=true;decline.hidden=true;if(update&&id)await db().from('connect_calls').update({state:'ended',ended_at:new Date().toISOString()}).eq('id',id);}
async function dial(){if(starting||active)return;starting=true;try{const r=room();if(!r)throw Error('Abra uma conversa individual.');const participants=await members(r);if(participants.length!==2)throw Error('Nesta etapa, as chamadas funcionam apenas entre duas pessoas.');other=participants.find(x=>x!==user());if(!other)throw Error('Outro participante não encontrado.');overlay.hidden=false;info('Solicitando câmera e microfone…');await media();await peer();const {data,error}=await db().from('connect_calls').insert({room_id:r,initiated_by:user(),mode:'video',state:'ringing'}).select().single();if(error)throw error;active=data;const offer=await pc.createOffer();await pc.setLocalDescription(offer);await send({type:'offer',sdp:pc.localDescription});info('Chamando… Aguardando atendimento.');}catch(e){await end();alert('Não foi possível iniciar: '+e.message);}finally{starting=false;}}
async function receive(call){if(active||starting)return;const r=room();if(r!==call.room_id)return;const participants=await members(r);if(participants.length!==2)return;other=call.initiated_by;active=call;overlay.hidden=false;answer.hidden=false;decline.hidden=false;info('Videochamada recebida.');}
async function accept(){if(!active)return;try{answer.hidden=true;decline.hidden=true;await media();await peer();await pollSignals();if(!pc.remoteDescription)info('Aguardando proposta da chamada…');}catch(e){info('Erro ao atender: '+e.message);}}
async function handle(signal){const p=signal.payload;if(!p||!active||!pc)return;if(p.type==='offer'&&!pc.remoteDescription){await pc.setRemoteDescription(p.sdp);const a=await pc.createAnswer();await pc.setLocalDescription(a);await send({type:'answer',sdp:pc.localDescription});await db().from('connect_calls').update({state:'active'}).eq('id',active.id);info('Conectando…');}
else if(p.type==='answer'&&pc.signalingState==='have-local-offer'){await pc.setRemoteDescription(p.sdp);info('Conectando…');}
else if(p.type==='candidate'){if(pc.remoteDescription)await pc.addIceCandidate(p.candidate);else pendingCandidates.push(p.candidate);}
if(pc.remoteDescription&&pendingCandidates.length){for(const c of pendingCandidates.splice(0))await pc.addIceCandidate(c);}}
async function pollSignals(){if(!active)return;const {data,error}=await db().from('connect_call_signals').select('id,payload').eq('call_id',active.id).eq('recipient_id',user()).gt('id',seen).order('id',{ascending:true}).limit(50);if(error)return;for(const signal of data||[]){seen=Math.max(seen,signal.id);try{await handle(signal);}catch(e){info('Erro na negociação: '+e.message);}}}
let checking=false;
async function tick(){if(checking||!db()||!user())return;checking=true;try{if(active){const {data}=await db().from('connect_calls').select('state').eq('id',active.id).maybeSingle();if(!data||data.state==='ended'){await end(false);return;}await pollSignals();return;}const r=room();if(!r)return;const {data}=await db().from('connect_calls').select('*').eq('room_id',r).eq('state','ringing').neq('initiated_by',user()).order('created_at',{ascending:false}).limit(1);if(data?.length)await receive(data[0]);}catch(e){}finally{checking=false;}}
callButton.onclick=dial;answer.onclick=accept;decline.onclick=()=>end(true);overlay.querySelector('#call-end').onclick=()=>end(true);
setInterval(tick,1600);
window.addEventListener('pagehide',()=>{if(stream)stream.getTracks().forEach(t=>t.stop());});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(initializeCalls,0));else setTimeout(initializeCalls,0);
})();