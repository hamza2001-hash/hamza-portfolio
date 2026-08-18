let lang='en';
const langBtn=document.getElementById('lang');
const menuBtn=document.getElementById('menuBtn');
const nav=document.getElementById('nav');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const translations={
  en:{roles:['Aspiring AI Software Engineer','IT Systems Problem Solver','Python Developer in Progress'],skills:{systems:['IT & Systems','Windows · Windows Server · Linux · Active Directory · Microsoft 365 · Zabbix · Remote Support','SYS'],networking:['Networking','LAN/WAN · TCP/IP · DHCP · VPN · DNS basics · Troubleshooting','NET'],development:['Development','Python (learning) · SQL · PowerShell · Scripting · Web Development · Internal Applications','DEV'],infra:['Infrastructure','VMware · VirtualBox · Hyper-V · Deployment · Azure exposure · Intune workflows','INF']}},
  fr:{roles:['Futur ingénieur logiciel en IA','Résolveur de problèmes TI & systèmes','Développeur Python en progression'],skills:{systems:['TI & Systèmes','Windows · Windows Server · Linux · Active Directory · Microsoft 365 · Zabbix · Support à distance','SYS'],networking:['Réseaux','LAN/WAN · TCP/IP · DHCP · VPN · notions DNS · Dépannage','NET'],development:['Développement','Python (en apprentissage) · SQL · PowerShell · Scripts · Développement Web · Applications internes','DEV'],infra:['Infrastructure','VMware · VirtualBox · Hyper-V · Déploiement · exposition Azure · flux Intune','INF']}}
};

function applyLanguage(){
  document.documentElement.lang=lang;
  langBtn.textContent=lang==='en'?'FR':'EN';
  document.querySelectorAll('[data-en]').forEach(el=>{el.textContent=el.dataset[lang]});
  updateSkill(document.querySelector('.skill-tab.active')?.dataset.skill||'systems');
  restartTypewriter();
}
langBtn.addEventListener('click',()=>{lang=lang==='en'?'fr':'en';applyLanguage()});

document.getElementById('year').textContent=new Date().getFullYear();

menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open);menuBtn.textContent=open?'✕':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.textContent='☰'}));

const reveals=document.querySelectorAll('.reveal');
if(reduceMotion){reveals.forEach(el=>el.classList.add('visible'))}else{
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
  reveals.forEach(el=>revealObserver.observe(el));
}

const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...nav.querySelectorAll('a')];
const progress=document.getElementById('scrollProgress');
window.addEventListener('scroll',()=>{
  const h=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(h?scrollY/h*100:0)+'%';
  let current='home';
  sections.forEach(s=>{if(scrollY>=s.offsetTop-160)current=s.id});
  navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
},{passive:true});

const glow=document.getElementById('cursorGlow');
if(!reduceMotion)window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true});

let typingTimer;let roleIndex=0;let charIndex=0;let deleting=false;
function typeLoop(){
  const el=document.getElementById('typewriter');
  const roles=translations[lang].roles;
  const word=roles[roleIndex];
  if(reduceMotion){el.textContent=roles[0];return}
  if(!deleting){charIndex++;el.textContent=word.slice(0,charIndex);if(charIndex===word.length){deleting=true;typingTimer=setTimeout(typeLoop,1500);return}}
  else{charIndex--;el.textContent=word.slice(0,charIndex);if(charIndex===0){deleting=false;roleIndex=(roleIndex+1)%roles.length}}
  typingTimer=setTimeout(typeLoop,deleting?38:70);
}
function restartTypewriter(){clearTimeout(typingTimer);roleIndex=0;charIndex=0;deleting=false;document.getElementById('typewriter').textContent='';typeLoop()}
restartTypewriter();

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const f=btn.dataset.filter;
  document.querySelectorAll('#projectGrid .card').forEach(card=>card.classList.toggle('hidden',f!=='all'&&!card.dataset.category.split(' ').includes(f)));
}));

function updateSkill(key){const [title,text,icon]=translations[lang].skills[key];document.getElementById('skillTitle').textContent=title;document.getElementById('skillText').textContent=text;document.querySelector('.skill-icon').textContent=icon}
document.querySelectorAll('.skill-tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.skill-tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');updateSkill(btn.dataset.skill)}));

document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();const n=document.getElementById('name').value,em=document.getElementById('email').value,m=document.getElementById('message').value;const subject=encodeURIComponent(`Portfolio contact from ${n}`);const body=encodeURIComponent(`Name: ${n}\nEmail: ${em}\n\n${m}`);location.href=`mailto:hamzachaabi32@gmail.com?subject=${subject}&body=${body}`});

// Lightweight neural-network background
const canvas=document.getElementById('networkCanvas');const ctx=canvas.getContext('2d');let points=[];let anim;
function resizeCanvas(){const r=canvas.getBoundingClientRect();canvas.width=Math.max(1,r.width*devicePixelRatio);canvas.height=Math.max(1,r.height*devicePixelRatio);ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);points=Array.from({length:28},()=>({x:Math.random()*r.width,y:Math.random()*r.height,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18}))}
function drawNetwork(){if(reduceMotion)return;const r=canvas.getBoundingClientRect();ctx.clearRect(0,0,r.width,r.height);for(const p of points){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>r.width)p.vx*=-1;if(p.y<0||p.y>r.height)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,1.4,0,Math.PI*2);ctx.fillStyle='rgba(89,225,255,.35)';ctx.fill()}for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<125){ctx.strokeStyle=`rgba(89,225,255,${.09*(1-d/125)})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}anim=requestAnimationFrame(drawNetwork)}
resizeCanvas();if(!reduceMotion)drawNetwork();window.addEventListener('resize',()=>{cancelAnimationFrame(anim);resizeCanvas();if(!reduceMotion)drawNetwork()});

// V3 recruiter view, command palette, live GitHub and PWA
const recruiterDialog=document.getElementById('recruiterDialog');
const recruiterBtn=document.getElementById('recruiterBtn');
if(recruiterBtn&&recruiterDialog){recruiterBtn.addEventListener('click',()=>recruiterDialog.showModal());}
document.querySelectorAll('[data-close-dialog]').forEach(el=>el.addEventListener('click',()=>{recruiterDialog?.close();commandDialog?.close()}));

const commandDialog=document.getElementById('commandDialog');
const commandBtn=document.getElementById('commandBtn');
const commandInput=document.getElementById('commandInput');
const commandButtons=[...document.querySelectorAll('[data-command]')];
function openCommand(){commandDialog.showModal();commandInput.value='';commandButtons.forEach(b=>b.hidden=false);setTimeout(()=>commandInput.focus(),40)}
commandBtn?.addEventListener('click',openCommand);
window.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openCommand()}if(e.key==='Escape'){commandDialog?.close();recruiterDialog?.close()}});
commandInput?.addEventListener('input',()=>{const q=commandInput.value.toLowerCase();commandButtons.forEach(b=>b.hidden=!b.textContent.toLowerCase().includes(q))});
commandButtons.forEach(btn=>btn.addEventListener('click',()=>{const target=btn.dataset.command;commandDialog.close();if(target.startsWith('#'))document.querySelector(target)?.scrollIntoView({behavior:'smooth'});else if(target.startsWith('http'))window.open(target,'_blank','noopener');else location.href=target}));

const toast=document.getElementById('toast');let toastTimer;
function showToast(message){if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),1800)}
document.getElementById('copyEmail')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('hamzachaabi32@gmail.com');showToast(lang==='en'?'Email copied':'E-mail copié')}catch{showToast('hamzachaabi32@gmail.com')}});

async function loadGitHub(){try{const [userRes,reposRes]=await Promise.all([fetch('https://api.github.com/users/hamza2001-hash'),fetch('https://api.github.com/users/hamza2001-hash/repos?sort=updated&per_page=5')]);if(!userRes.ok||!reposRes.ok)throw new Error('GitHub API unavailable');const user=await userRes.json(),repos=await reposRes.json();document.getElementById('ghRepos').textContent=user.public_repos??'—';document.getElementById('ghFollowers').textContent=user.followers??'—';document.getElementById('ghLatest').textContent=repos[0]?.name||'—'}catch(e){document.getElementById('ghLatest').textContent=lang==='en'?'GitHub available online':'GitHub disponible en ligne'}}
loadGitHub();

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));}
