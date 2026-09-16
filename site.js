'use strict';
// Update these prices and the contact destination when the client confirms them.
const ROSS_CONFIG = {contactUrl: '', prices:{infernal:'£—',quiver:'£—',grandmaster:'£—',zuk:'£—'}};
const services={
 infernal:{title:'INFERNAL CAPE',description:'Discuss an Inferno session around your account’s current setup. Gear, stats, preparation and the exact scope are confirmed before a quote is agreed.',requirements:['Combat stats and available gear','Current Inferno experience or progress','Preferred session dates']},
 quiver:{title:'DIZANA’S QUIVER',description:'Explore a Fortis Colosseum session and the requirements for Dizana’s quiver. Your account setup and the agreed scope determine the quote.',requirements:['Combat stats and available gear','Current Colosseum progress','Whether your goal is the initial quiver or an additional service']},
 grandmaster:{title:'GRANDMASTER COMBAT ACHIEVEMENTS',description:'A tailored enquiry for specific combat tasks or your remaining Grandmaster goals. Share your task list so the scope can be reviewed.',requirements:['Remaining combat achievements','Relevant boss experience and equipment','Specific tasks or a broader completion goal']},
 zuk:{title:'ZUK HELM',description:'The TzKal slayer helmet recolour is tied to Grandmaster combat achievement completion. Discuss the remaining tasks and other unlock requirements for your account.',requirements:['Current combat achievement completion','Remaining tasks and relevant account unlocks','Stats, gear and preferred availability']}
};
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus()}});
matchMedia('(min-width:801px)').addEventListener('change',closeMenu);
document.querySelector('[data-year]').textContent=new Date().getFullYear();
document.querySelectorAll('[data-price]').forEach(el=>el.textContent=ROSS_CONFIG.prices[el.dataset.price]);
const dialog=document.querySelector('#service-dialog');
let trigger;
document.querySelectorAll('[data-detail]').forEach(button=>button.addEventListener('click',()=>{
 trigger=button;const key=button.dataset.detail,data=services[key];
 document.querySelector('#dialog-title').textContent=data.title;
 document.querySelector('#dialog-description').textContent=data.description;
 document.querySelector('#dialog-price').textContent=ROSS_CONFIG.prices[key];
 const list=document.querySelector('#dialog-requirements');list.replaceChildren(...data.requirements.map(text=>{const li=document.createElement('li');li.textContent=text;return li}));
 document.querySelector('#enquiry-text').value=`Hi Ross Services, I’m interested in ${data.title.toLowerCase()}.\n\nMy stats and gear: [add details]\nMy current progress: [add details]\nPreferred availability: [add details]\n\nCould you confirm the requirements, price and session arrangements?`;
 document.querySelector('#copy-status').textContent='';
 dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>trigger?.focus());
document.querySelector('#copy-enquiry').addEventListener('click',async()=>{
 const field=document.querySelector('#enquiry-text'),status=document.querySelector('#copy-status');
 try{await navigator.clipboard.writeText(field.value);status.textContent='Enquiry copied. Add your details before sending.'}catch{field.focus();field.select();status.textContent='Select and copy the draft above using your device’s copy command.'}
});
if(/^https:\/\//.test(ROSS_CONFIG.contactUrl)){
 const note=document.querySelector('#contact-note');note.replaceChildren();const link=document.createElement('a');link.href=ROSS_CONFIG.contactUrl;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Contact Ross Services ↗';note.append(link);
}
