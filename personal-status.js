(function(){
function init(){
const db=window.supabase,hub=document.getElementById('hub'),head=hub?.querySelector('.hub-heading');if(!db||!head||document.getElementById('personal-statuses'))return;
const area=document.createElement('section');area.id='personal-statuses';area.className='conect-statuses';
area.innerHTML='<div class="status-heading"><h3>Atualizações · 24 horas</h3><button id="status-refresh" type="button" class="secondary" aria-label="Atualizar status">↻</button></div><div class="status-stories" id="status-stories"><span>Carregando atualizações…</span></div>';
head.after(area);
const style=document.createElement('style');style.textContent=`
#personal-statuses{padding:14px 10px;margin:8px 0 16px;border:0;border-bottom:1px solid #34505a;border-radius:0}
.status-heading{display:flex;align-items:center;justify-content:space-between;gap:12px}.status-heading h3{font-size:16px;margin:0 0 12px;color:#e9c77e}
.status-heading button{width:34px;min-height:34px;padding:4px;margin:0}
.status-stories{display:flex;overflow-x:auto;gap:16px;padding:6px 4px 14px;scroll-snap-type:x proximity}
.status-story{border:0;background:transparent;color:#f1e7d3;display:flex;flex-direction:column;align-items:center;gap:6px;min-width:76px;max-width:88px;padding:0;cursor:pointer;scroll-snap-align:start}
.status-ring{height:66px;width:66px;display:grid;place-items:center;border-radius:50%;border:3px solid #d6ad63;padding:3px}
.status-ring-inner{height:100%;width:100%;display:grid;place-items:center;border-radius:50%;background:#24516a;color:#fff;font-size:23px;font-weight:600}
.status-story small{font-size:12px;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:85px}
.status-story.mine .status-ring{border-color:#87a5ac}
.status-viewer{position:fixed;inset:0;z-index:10020;background:#061a25;color:white;display:flex;flex-direction:column;padding:20px;gap:20px}
.status-viewer[hidden]{display:none}.status-viewer-header{display:flex;align-items:center;justify-content:space-between;gap:12px}
.status-viewer-content{flex:1;display:flex;align-items:center;justify-content:center;text-align:center;background:linear-gradient(145deg,#17455b,#0b2633);border-radius:22px;padding:26px;font-size:clamp(22px,5vw,34px);white-space:pre-wrap;overflow-wrap:anywhere}
.status-viewer button{width:auto}.status-viewer-actions{display:flex;gap:10px;justify-content:space-between}
`;document.head.append(style);
const stories=area.querySelector('#status-stories');
const viewer=document.createElement('section');viewer.className='status-viewer';viewer.hidden=true;
viewer.innerHTML='<div class="status-viewer-header"><strong id="status-viewer-name"></strong><button id="status-viewer-close" type="button">Fechar ×</button></div><small id="status-viewer-time"></small><div class="status-viewer-content" id="status-viewer-content"></div><div class="status-viewer-actions"><button id="status-viewer-prev" type="button">‹ Anterior</button><button id="status-viewer-delete" type="button" hidden>Excluir</button><button id="status-viewer-next" type="button">Próximo ›</button></div>';document.body.append(viewer);
let groups=[],selected=[],index=0,myId=null;
function display(){const item=selected[index];if(!item){viewer.hidden=true;return;}viewer.hidden=false;viewer.querySelector('#status-viewer-name').textContent=item.author_id===myId?'Meu status':item.author_name;viewer.querySelector('#status-viewer-time').textContent=new Date(item.created_at).toLocaleString('pt-BR');viewer.querySelector('#status-viewer-content').textContent=item.content;viewer.querySelector('#status-viewer-delete').hidden=item.author_id!==myId;viewer.querySelector('#status-viewer-prev').disabled=index===0;viewer.querySelector('#status-viewer-next').disabled=index===selected.length-1;}
function open(items){selected=items;index=0;display();}
viewer.querySelector('#status-viewer-close').onclick=()=>viewer.hidden=true;
viewer.querySelector('#status-viewer-prev').onclick=()=>{index=Math.max(0,index-1);display();};
viewer.querySelector('#status-viewer-next').onclick=()=>{index=Math.min(selected.length-1,index+1);display();};
viewer.querySelector('#status-viewer-delete').onclick=async()=>{const item=selected[index];if(!item||item.author_id!==myId||!confirm('Excluir esta atualização?'))return;const {error}=await db.from('connect_personal_statuses').delete().eq('id',item.id);if(error)alert('Não foi possível excluir.');else{viewer.hidden=true;load();}};
async function post(){const content=prompt('Compartilhe uma atualização com seus contatos por 24 horas:');if(!content?.trim())return;const {data:{user}}=await db.auth.getUser();if(!user)return;const {error}=await db.from('connect_personal_statuses').insert({author_id:user.id,content:content.trim().slice(0,1000)});if(error)alert('Não foi possível publicar: '+error.message);else load();}
async function load(){const {data:{user}}=await db.auth.getUser();if(!user)return;myId=user.id;const {data,error}=await db.rpc('connect_visible_personal_statuses');stories.replaceChildren();if(error){stories.textContent='Não foi possível carregar os status.';return;}const own=(data||[]).filter(x=>x.author_id===myId);const add=document.createElement('button');add.className='status-story mine';add.type='button';add.innerHTML='<span class="status-ring"><span class="status-ring-inner">+</span></span><small>Meu status</small>';add.onclick=()=>own.length?open(own):post();stories.append(add);const seen=new Map();for(const item of data||[]){if(item.author_id===myId)continue;if(!seen.has(item.author_id))seen.set(item.author_id,[]);seen.get(item.author_id).push(item);}for(const items of seen.values()){const name=items[0].author_name||'Contato';const b=document.createElement('button');b.type='button';b.className='status-story';const ring=document.createElement('span');ring.className='status-ring';const inner=document.createElement('span');inner.className='status-ring-inner';inner.textContent=name.slice(0,1).toUpperCase();ring.append(inner);const label=document.createElement('small');label.textContent=name;b.append(ring,label);b.onclick=()=>open(items);stories.append(b);}if(!seen.size&&!own.length){const hint=document.createElement('span');hint.style.cssText='font-size:12px;color:#a9bac0;align-self:center';hint.textContent='Toque em + para publicar';stories.append(hint);}}
area.querySelector('#status-refresh').onclick=load;
addEventListener('keydown',e=>{if(e.key==='Escape'&&!viewer.hidden)viewer.hidden=true;});
db.auth.onAuthStateChange(event=>{if(event==='SIGNED_IN')setTimeout(load,250);});
load();setInterval(()=>{if(!document.hidden)load();},60000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();