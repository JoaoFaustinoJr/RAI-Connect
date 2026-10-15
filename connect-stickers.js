(function(){
'use strict';
const birds=[
['Beija-flor','bird'],['Na flor','flower'],['Voo livre','fly'],['Carinho','heart'],['Amizade','friends'],['Gratidão','sparkle'],['Bom dia','sun'],['Boa tarde','sunset'],['Boa noite','moon'],['Boa sorte','clover'],['Mensagem','letter'],['Parabéns','party'],['Música','music'],['Água','water'],['Paz','peace'],['Pousado','branch'],['Ideia','idea'],['Rápido','speed'],['Fé','faith'],['Te amo','love'],['Saudade','miss'],['Excelente','star'],['Beleza','blossom'],['Estudando','study'],['Trabalhando','work'],['Viajando','travel'],['Na praia','beach'],['Família','family'],['Hora do café','coffee'],['Oração','prayer'],['Natureza','nature'],['Chuva','rain'],['Descansando','rest']
];
const symbols=['😀','😂','🥰','😍','😘','😊','😢','😮','👍','👏','🙏','❤️','💛','🌸','🌻','🎉','✨','☀️','🌙','💐','🤗','😎','😄','🤝','💙','🌹','🐦','🪻','💌','⭐'];
function art(id){
const scenes={
flower:'<path d="M113 84v27" stroke="#63aa6e" stroke-width="4"/><g fill="#ed7789"><ellipse cx="113" cy="57" rx="10" ry="18"/><ellipse cx="113" cy="57" rx="10" ry="18" transform="rotate(72 113 57)"/><ellipse cx="113" cy="57" rx="10" ry="18" transform="rotate(144 113 57)"/><ellipse cx="113" cy="57" rx="10" ry="18" transform="rotate(216 113 57)"/><ellipse cx="113" cy="57" rx="10" ry="18" transform="rotate(288 113 57)"/></g><circle cx="113" cy="57" r="8" fill="#ffd17b"/>',
heart:'<path d="M113 52C98 32 79 56 113 83c34-27 15-51 0-31Z" fill="#ed6779"/>',
friends:'<path d="M113 49c-12-14-26 4 0 24 26-20 12-38 0-24Z" fill="#ef8293"/>',
sparkle:'<path d="m113 38 6 16 16 6-16 6-6 16-6-16-16-6 16-6Z" fill="#f7d486"/>',
sun:'<circle cx="112" cy="62" r="22" fill="#f8c96b"/><g stroke="#f8c96b" stroke-width="4"><path d="M112 27v-10M112 105v-10M77 62H67M157 62h-10M87 37l-8-8M137 87l8 8M137 37l8-8"/></g>',
sunset:'<circle cx="112" cy="75" r="22" fill="#e7a36b"/><path d="M82 83h65M89 94h52" stroke="#f7d088" stroke-width="4"/>',
moon:'<path d="M125 34a29 29 0 1 0 15 49 31 31 0 0 1-15-49Z" fill="#f7dc9b"/>',
clover:'<path d="M113 83V55" stroke="#71a65d" stroke-width="4"/><g fill="#8fc75d"><circle cx="103" cy="51" r="11"/><circle cx="123" cy="51" r="11"/><circle cx="103" cy="69" r="11"/><circle cx="123" cy="69" r="11"/></g>',
letter:'<rect x="94" y="51" width="45" height="32" rx="5" fill="#f4dfad"/><path d="m96 54 20 16 21-16" stroke="#c9a36e" stroke-width="2" fill="none"/>',
party:'<g fill="#f6b16d"><circle cx="113" cy="41" r="5"/><circle cx="134" cy="69" r="4"/></g><path d="m102 80 15-33 18 25Z" fill="#f5cc79"/><path d="M96 39 90 29M139 40l7-9" stroke="#6bd3d6" stroke-width="3"/>',
music:'<text x="103" y="82" font-size="46" fill="#f6d187">♫</text>',
water:'<path d="M116 42Q83 77 116 88Q149 77 116 42Z" fill="#72cddd"/>',
peace:'<path d="M108 44q27 3 20 24q-12 18-30 8q-14-14 10-32Z" fill="#e9e5d6"/>',
branch:'<path d="M76 100Q113 86 155 100" stroke="#947253" stroke-width="6" fill="none"/><path d="M128 94q5-15 19-16" stroke="#76aa69" stroke-width="3" fill="none"/>',
idea:'<path d="M115 42a20 20 0 0 0-12 36v9h24v-9a20 20 0 0 0-12-36Z" fill="#f8d780"/><path d="M105 92h20" stroke="#f8d780" stroke-width="5"/>',
speed:'<g stroke="#f4d38d" stroke-width="4"><path d="M17 58h27M9 70h32M21 82h25"/></g>',
faith:'<path d="M116 36v54M101 55h30" stroke="#f3d88d" stroke-width="6"/>',
love:'<path d="M113 52C98 32 79 56 113 83c34-27 15-51 0-31Z" fill="#ed6779"/>',
miss:'<path d="M113 52C98 32 79 56 113 83c34-27 15-51 0-31Z" fill="#e891aa"/>',
star:'<path d="m115 36 10 20 23 3-17 17 4 23-20-11-20 11 4-23-17-17 23-3Z" fill="#f5d182"/>',
blossom:'<circle cx="116" cy="64" r="12" fill="#f8d57b"/><g fill="#f5a2b1"><ellipse cx="116" cy="42" rx="11" ry="15"/><ellipse cx="116" cy="42" rx="11" ry="15" transform="rotate(90 116 64)"/><ellipse cx="116" cy="42" rx="11" ry="15" transform="rotate(180 116 64)"/><ellipse cx="116" cy="42" rx="11" ry="15" transform="rotate(270 116 64)"/></g>',
fly:'<path d="M18 51H43M11 66H35" stroke="#f4d18b" stroke-width="3"/>',
study:'<path d="M83 91q19-9 35 1q16-10 34-1v19q-20-7-34 2q-15-9-35-2Z" fill="#f7e2b8" stroke="#bc9868" stroke-width="2"/><path d="M118 92v19M81 101h-18M85 79H65" stroke="#d6b77d" stroke-width="3"/><rect x="62" y="89" width="23" height="8" rx="2" fill="#67a7b6"/>',
work:'<rect x="89" y="77" width="62" height="34" rx="5" fill="#667f8a"/><rect x="93" y="81" width="54" height="25" rx="2" fill="#173b4b"/><path d="M82 112h76" stroke="#b3bec0" stroke-width="4"/>',
travel:'<rect x="114" y="78" width="29" height="35" rx="5" fill="#e5b66f"/><path d="M124 78v-8h10v8" stroke="#f2d9a2" stroke-width="3" fill="none"/><circle cx="120" cy="114" r="3" fill="#566779"/><circle cx="138" cy="114" r="3" fill="#566779"/><path d="M66 72q-11 10-5 29" stroke="#c18d5d" stroke-width="6" fill="none"/>',
beach:'<path d="M66 107h93" stroke="#edca91" stroke-width="9"/><path d="M126 56v51" stroke="#e9d6ae" stroke-width="3"/><path d="M88 60q38-40 76 0q-38-12-76 0Z" fill="#62b9d0"/><path d="M124 56q-13-13-36 4M124 56q17-12 40 4" fill="none" stroke="#d1f0ef" stroke-width="2"/><circle cx="146" cy="37" r="9" fill="#f5cf7b"/>',
family:'<path d="M90 95q22-20 55 0l-8 16H98Z" fill="#b78c58"/><circle cx="112" cy="92" r="9" fill="#2baebc"/><circle cx="128" cy="94" r="7" fill="#35bccc"/>',
coffee:'<path d="M92 75h40v27q-20 13-40 0Z" fill="#f4e3c1"/><path d="M132 80q21-4 14 11q-5 7-14 4" stroke="#f4e3c1" stroke-width="5" fill="none"/><path d="M103 70q-9-10 0-19M117 70q-9-10 0-19" stroke="#e5d1ae" stroke-width="3" fill="none"/>',
prayer:'<path d="M116 37v55M99 55h34" stroke="#f7d483" stroke-width="6"/><circle cx="116" cy="37" r="5" fill="#f9e4b2"/>',
nature:'<path d="M111 108V52M111 73q-30-6-30-30q26-2 30 30ZM113 82q31-7 31-30q-26 1-31 30Z" fill="#77a866" stroke="#55945e" stroke-width="3"/>',
rain:'<path d="M89 61q27-40 57 0Z" fill="#6dbbd1"/><path d="M117 61v40" stroke="#e7d4aa" stroke-width="3"/><path d="M99 78l-5 11M137 78l-5 11M154 75l-5 11" stroke="#6ac5e1" stroke-width="4"/>',
rest:'<path d="M82 102h72" stroke="#b78a61" stroke-width="7"/><path d="M105 47q-15 17 0 28" stroke="#f6d58b" stroke-width="3" fill="none"/>',
bird:''
};
const scene=scenes[id]||'';
const pose={study:'rotate(-12 80 65)',work:'rotate(-9 80 65)',travel:'rotate(14 80 65)',beach:'rotate(-15 80 65)',family:'rotate(8 80 65)',coffee:'rotate(-11 80 65)',prayer:'rotate(-20 80 65)',nature:'rotate(11 80 65)',rain:'rotate(-8 80 65)',rest:'rotate(-25 80 65)',flower:'rotate(8 80 65)'}[id]||'';
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 125" role="img" aria-label="Beija-flor original do Connect">'+scene+'<g transform="'+pose+'"><g transform="translate(-3 0)"><path d="M77 62 L18 13 Q54 22 94 48 L103 64 Z" fill="#04b4c3"/><path d="M79 66 Q47 50 24 35 Q46 62 88 79 Z" fill="#edc477"/><path d="M83 79 L44 120 L60 92 L89 73 Z" fill="#06b4c4"/><path d="M64 98 L49 117 L59 101 L79 79 Z" fill="#e8bb65"/><path d="M59 96 Q65 82 77 65 Q89 48 105 39 Q118 31 129 39 Q135 42 137 48 L164 42 L136 51 Q124 52 116 65 Q105 87 86 90 Q72 93 59 96 Z" fill="#00aab8"/><path d="M122 40 Q126 37 129 43 Q127 46 123 44 Z" fill="#073846"/></g></g></svg>';
}
function image(id){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(art(id));}
window.ConnectBirdStickers={birds,image,isSticker:t=>/^\[\[connect-bird:(?:[a-z]+)\]\]$/.test(t),render:(t,container)=>{const m=/^\[\[connect-bird:([a-z]+)\]\]$/.exec(t);if(!m||!birds.some(x=>x[1]===m[1]))return false;const img=document.createElement('img');img.src=image(m[1]);img.alt='Figurinha de beija-flor: '+(birds.find(x=>x[1]===m[1])||[])[0];img.className='connect-bird-message';container.replaceChildren(img);return true;}};
function setup(){
const form=document.getElementById('message-form'),field=document.getElementById('message-text');if(!form||!field||document.getElementById('connect-emoji-button'))return;
const button=document.createElement('button');button.type='button';button.id='connect-emoji-button';button.title='Emojis e figurinhas do beija-flor';button.setAttribute('aria-label','Abrir emojis e figurinhas');button.textContent='☺';field.before(button);
const panel=document.createElement('section');panel.id='connect-emoji-panel';panel.hidden=true;panel.innerHTML='<header><strong>Emojis e beija-flores</strong><button type="button" aria-label="Fechar emojis">×</button></header><nav><button type="button" data-tab="birds" class="selected">Beija-flores</button><button type="button" data-tab="emoji">Emojis</button></nav><div class="connect-emoji-grid"></div>';
form.before(panel);const grid=panel.querySelector('.connect-emoji-grid');const tabs=panel.querySelectorAll('[data-tab]');
function render(tab){grid.replaceChildren();tabs.forEach(t=>t.classList.toggle('selected',t.dataset.tab===tab));if(tab==='birds'){birds.forEach(([name,id])=>{const b=document.createElement('button');b.type='button';b.title=name;b.setAttribute('aria-label','Enviar '+name);const img=document.createElement('img');img.src=image(id);img.alt='';const label=document.createElement('span');label.textContent=name;b.append(img,label);b.onclick=()=>{field.value='[[connect-bird:'+id+']]';panel.hidden=true;form.requestSubmit();};grid.append(b);});}else{symbols.forEach(emoji=>{const b=document.createElement('button');b.type='button';b.textContent=emoji;b.className='unicode-emoji';b.onclick=()=>{field.value+=emoji;field.dispatchEvent(new Event('input',{bubbles:true}));field.focus();};grid.append(b);});}}
tabs.forEach(t=>t.onclick=()=>render(t.dataset.tab));panel.querySelector('header button').onclick=()=>panel.hidden=true;button.onclick=()=>{panel.hidden=!panel.hidden;if(!panel.hidden)render('birds');};render('birds');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();