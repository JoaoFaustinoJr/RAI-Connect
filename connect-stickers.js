(function(){
'use strict';
const birds=[
['Beija-flor','bird'],['Na flor','flower'],['Voo livre','fly'],['Carinho','heart'],['Amizade','friends'],['Gratidão','sparkle'],['Bom dia','sun'],['Boa tarde','sunset'],['Boa noite','moon'],['Boa sorte','clover'],['Mensagem','letter'],['Parabéns','party'],['Música','music'],['Água','water'],['Paz','peace'],['Pousado','branch'],['Ideia','idea'],['Rápido','speed'],['Fé','faith'],['Te amo','love'],['Saudade','miss'],['Excelente','star'],['Beleza','blossom']
];
const symbols=['😀','😂','🥰','😍','😘','😊','😢','😮','👍','👏','🙏','❤️','💛','🌸','🌻','🎉','✨','☀️','🌙','💐','🤗','😎','😄','🤝','💙','🌹','🐦','🪻','💌','⭐'];
function art(id){
const motifs={
flower:'<path d="M104 77v30" stroke="#58aa71" stroke-width="3"/><g fill="#f67a9e"><ellipse cx="104" cy="57" rx="10" ry="17"/><ellipse cx="104" cy="57" rx="10" ry="17" transform="rotate(72 104 57)"/><ellipse cx="104" cy="57" rx="10" ry="17" transform="rotate(144 104 57)"/><ellipse cx="104" cy="57" rx="10" ry="17" transform="rotate(216 104 57)"/><ellipse cx="104" cy="57" rx="10" ry="17" transform="rotate(288 104 57)"/></g><circle cx="104" cy="57" r="7" fill="#f7c968"/>',
heart:'<path d="M102 50c-16-19-34 4 0 29 34-25 16-48 0-29Z" fill="#ed6376"/>',
friends:'<path d="M104 52c-12-15-27 3 0 23 27-20 12-38 0-23Z" fill="#f18c96"/>',
sparkle:'<path d="m106 39 5 15 15 5-15 5-5 15-5-15-15-5 15-5Z" fill="#f5d483"/>',
sun:'<circle cx="106" cy="58" r="19" fill="#f7c967"/><path d="M106 28v-7M106 95v-7M75 58h-7M137 58h-7M84 36l-6-6M129 85l-6-6M128 36l6-6" stroke="#f7c967" stroke-width="4"/>',
sunset:'<circle cx="106" cy="67" r="18" fill="#f7ae63"/><path d="M76 76h60M84 84h44" stroke="#f7ca84" stroke-width="4"/>',
moon:'<path d="M116 34a25 25 0 1 0 14 43 27 27 0 0 1-14-43Z" fill="#f8db8d"/>',
clover:'<text x="92" y="78" font-size="42">🍀</text>',letter:'<rect x="89" y="49" width="41" height="29" rx="4" fill="#f8e7bd"/><path d="m90 51 20 15 19-15" fill="none" stroke="#bb9964" stroke-width="2"/>',
party:'<text x="91" y="79" font-size="40">🎉</text>',music:'<text x="96" y="73" font-size="38" fill="#f6c66f">♫</text>',
water:'<path d="M109 42Q79 77 109 85Q139 77 109 42" fill="#6ed7ed"/>',
peace:'<text x="93" y="78" font-size="41">🕊️</text>',branch:'<path d="M72 98Q104 83 140 96" stroke="#997453" stroke-width="6" fill="none"/>',
idea:'<text x="92" y="77" font-size="41">💡</text>',speed:'<path d="M75 59H99M69 69H91M73 79H94" stroke="#f6ca76" stroke-width="4"/>',
faith:'<path d="M113 41v44M99 56h28" stroke="#f2d38d" stroke-width="5"/>',
love:'<text x="93" y="78" font-size="40">❤️</text>',miss:'<path d="M109 43c-12-16-29 5 0 27 29-22 12-43 0-27Z" fill="#f58ca6"/>',
star:'<path d="m109 37 10 21 23 3-17 17 4 23-20-11-21 11 4-23-17-17 23-3Z" fill="#f7d179"/>',
blossom:'<text x="91" y="77" font-size="42">🌼</text>',
fly:'<path d="M69 63 45 50M66 75 40 76" stroke="#73d4e2" stroke-width="4"/>',
bird:''};
const motif=motifs[id]||'';
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" role="img" aria-label="Beija-flor do Connect"><defs><linearGradient id="bird" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#34d4e3"/><stop offset="1" stop-color="#0d819a"/></linearGradient></defs>'+motif+'<path d="M61 68 20 16 74 47Z" fill="#23b6c7"/><path d="M61 70 21 39 71 55Z" fill="#efc979"/><path d="M62 77 39 108 66 88Z" fill="#efc979"/><path d="M49 77Q64 44 85 51Q93 55 99 60L118 58 98 65Q89 81 64 91Z" fill="url(#bird)"/><circle cx="89" cy="56" r="2.4" fill="#082936"/></svg>';
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