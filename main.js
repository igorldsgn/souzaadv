// SCROLL PROGRESS + NAV
window.addEventListener('scroll',()=>{
  const s=document.documentElement;
  document.getElementById('prog').style.width=(s.scrollTop/(s.scrollHeight-s.clientHeight)*100)+'%';
  document.getElementById('nav').classList.toggle('scrolled',s.scrollTop>60);
},{passive:true});

// BURGER
const burger=document.getElementById('burger');
const drawer=document.getElementById('drawer');
burger.addEventListener('click',()=>{
  const open=burger.classList.toggle('open');
  drawer.classList.toggle('open',open);
  burger.setAttribute('aria-expanded',open);
  drawer.setAttribute('aria-hidden',!open);
  document.body.style.overflow=open?'hidden':'';
});
document.querySelectorAll('.dl').forEach(a=>{
  a.addEventListener('click',()=>{
    burger.classList.remove('open');
    drawer.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
    drawer.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  });
});

// TYPEWRITER
const lines=['Defesa técnica\ndos seus direitos.','Seu advogado\nde confiança.','Resultados reais\npara cada caso.'];
let li=0,ci=0,del=false;
const tw=document.getElementById('tw');
function type(){
  const cur=lines[li];
  if(!del){
    tw.innerHTML=cur.slice(0,ci+1).replace('\n','<br>');ci++;
    if(ci===cur.length){setTimeout(()=>{del=true;type()},2400);return}
    setTimeout(type,55);
  }else{
    tw.innerHTML=cur.slice(0,ci-1).replace('\n','<br>');ci--;
    if(ci===0){del=false;li=(li+1)%lines.length;setTimeout(type,350);return}
    setTimeout(type,28);
  }
}
type();

// PARTICLES — only on desktop to save mobile CPU
if(window.innerWidth>=768){
  const c=document.getElementById('particles');
  if(c){
    const ctx=c.getContext('2d');
    const resize=()=>{c.width=c.offsetWidth;c.height=c.offsetHeight};
    resize();
    window.addEventListener('resize',resize,{passive:true});
    const pts=Array.from({length:28},()=>({
      x:Math.random()*c.width,y:Math.random()*c.height,
      vx:(Math.random()-.5)*.22,vy:-Math.random()*.32-.07,
      r:Math.random()*1.3+.4,o:Math.random()*.3+.07
    }));
    (function draw(){
      ctx.clearRect(0,0,c.width,c.height);
      pts.forEach(p=>{
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(201,168,76,${p.o})`;ctx.fill();
        p.x+=p.vx;p.y+=p.vy;
        if(p.y<-4)p.y=c.height+4;
        if(p.x<-4)p.x=c.width+4;
        if(p.x>c.width+4)p.x=-4;
      });
      requestAnimationFrame(draw);
    })();
  }
}

// INTERSECTION OBSERVER — reveal + counters
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    e.target.classList.add('on');
    const n=e.target.querySelector('[data-target]');
    if(n&&!n._done){
      n._done=true;
      const tgt=+n.dataset.target;
      const isP=n.closest('.stat-item').querySelector('.stat-l').textContent.includes('%');
      let v=0;
      const step=Math.max(1,Math.ceil(tgt/55));
      const t=setInterval(()=>{
        v+=step;
        if(v>=tgt){v=tgt;clearInterval(t)}
        n.textContent=v+(isP?'%':'+');
      },22);
    }
  });
},{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>obs.observe(el));
