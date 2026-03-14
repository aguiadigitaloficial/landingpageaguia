import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import CtaButton from '@/components/ui/cta-button';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   DADOS DOS 7 SERVIÇOS
───────────────────────────────────────────── */
const solutions = [
  {
    id: 'estrategia',
    tag: 'ESTRATÉGIA',
    title: 'ESTRATÉGIA E\nPOSICIONAMENTO',
    desc: 'Definimos sua rota de crescimento com base em diagnóstico, dados e diferenciação.',
    items: [
      'Planejamento estratégico baseado em dados',
      'Posicionamento com clareza e propósito',
      'Direcionamento de metas e indicadores',
    ],
  },
  {
    id: 'midia',
    tag: 'MÍDIA',
    title: 'MÍDIA DE\nPERFORMANCE',
    desc: 'Campanhas otimizadas para gerar leads qualificados e maximizar seu ROI.',
    items: [
      'Google Ads, Meta Ads e LinkedIn Ads',
      'Otimização contínua de campanhas',
      'Segmentação avançada de público',
    ],
  },
  {
    id: 'criativos',
    tag: 'CRIATIVOS',
    title: 'CRIATIVOS DE\nALTA CONVERSÃO',
    desc: 'Peças visuais e copies que capturam atenção e geram ação.',
    items: [
      'Design orientado à conversão',
      'Testes A/B contínuos',
      'Copies persuasivas e estratégicas',
    ],
  },
  {
    id: 'paginas',
    tag: 'PÁGINAS',
    title: 'LANDING PAGES\n& SITES',
    desc: 'Páginas otimizadas que transformam visitantes em leads e clientes.',
    items: [
      'Design responsivo e moderno',
      'Otimização para velocidade',
      'Formulários inteligentes',
    ],
  },
  {
    id: 'dados',
    tag: 'DADOS',
    title: 'ANALYTICS &\nBUSINESS INTELLIGENCE',
    desc: 'Dashboards e análises para tomada de decisão inteligente.',
    items: [
      'Dashboards personalizados',
      'Tracking avançado de conversões',
      'Relatórios semanais claros',
    ],
  },
  {
    id: 'relacionamento',
    tag: 'RELACIONAMENTO',
    title: 'CRM &\nAUTOMAÇÃO',
    desc: 'Fluxos automatizados que nutrem leads e aceleram o ciclo de vendas.',
    items: [
      'Automação de e-mail marketing',
      'Fluxos de nutrição inteligentes',
      'Integração com CRM',
    ],
  },
  {
    id: 'vendas',
    tag: 'VENDAS',
    title: 'ESTRUTURAÇÃO\nCOMERCIAL',
    desc: 'Processos de vendas otimizados para fechar mais negócios.',
    items: [
      'Scripts e cadências de vendas',
      'Treinamento da equipe comercial',
      'Pipeline estruturado e previsível',
    ],
  },
];

/* ─────────────────────────────────────────────
   VISUAL ANIMADO — ESTRATÉGIA
───────────────────────────────────────────── */
function VisualEstrategia() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280 }}>
      {[260,200,140,80].map((size, i) => (
        <div key={i} className="radar-ring" style={{ width:size, height:size, animationDelay:`${i*0.4}s` }} />
      ))}
      <div style={{ position:'absolute', width:130, height:130, animation:'radarSweep 3s linear infinite', transformOrigin:'center' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', width:124, height:2, background:'linear-gradient(to right,rgba(0,255,127,.7),transparent)', transformOrigin:'left center' }} />
      </div>
      <div style={{ width:12, height:12, borderRadius:'50%', backgroundColor:'#00FF7F', boxShadow:'0 0 18px #00FF7F', zIndex:2 }} />
      {[
        {top:'18%',left:'62%',delay:'0s'}, {top:'68%',left:'74%',delay:'.6s'},
        {top:'74%',left:'28%',delay:'1.2s'},{top:'26%',left:'18%',delay:'1.8s'},
      ].map((p,i)=>(
        <div key={i} style={{ position:'absolute', top:p.top, left:p.left, width:8, height:8, borderRadius:'50%', backgroundColor:'#00FF7F', animation:`dotBlink 2s ${p.delay} ease-in-out infinite`, boxShadow:'0 0 10px rgba(0,255,127,.6)' }} />
      ))}
      {['METAS','DADOS','ROI'].map((label,i)=>(
        <div key={i} style={{ position:'absolute', top:`${[12,78,46][i]}%`, left:`${[70,56,8][i]}%`, fontFamily:'"DM Sans",sans-serif', fontSize:12, fontWeight:600, color:'rgba(0,255,127,.6)', letterSpacing:'0.15em', whiteSpace:'nowrap' }}>
          {label}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   VISUAL ANIMADO — MÍDIA
───────────────────────────────────────────── */
function VisualMidia() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', minHeight:280, flexDirection:'column', gap:0 }}>
      {/* Logos das plataformas */}
      <div style={{ display:'flex', gap:'clamp(16px, 4vw, 28px)', marginBottom:12, zIndex:3 }}>
        {[
          { src:'/logos/LOGO-ADS-4.png', alt:'Google Ads' },
          { src:'/logos/META-LOGO-1.png', alt:'Meta' },
          { src:'/logos/LINKEDIN-LOGO-3.png', alt:'LinkedIn' },
        ].map((logo, i) => (
          <img key={i} src={logo.src} alt={logo.alt} loading="lazy" width={72} height={72} style={{ width:'clamp(48px, 12vw, 72px)', height:'clamp(48px, 12vw, 72px)', objectFit:'contain' }} />
        ))}
      </div>
      <svg width="300" height="240" viewBox="0 0 180 140" fill="none">
        <path d="M20 10 L160 10 L130 60 L50 60 Z" fill="rgba(0,255,127,.07)" stroke="rgba(0,255,127,.3)" strokeWidth="1.5"/>
        <path d="M50 60 L130 60 L115 100 L65 100 Z" fill="rgba(0,255,127,.1)" stroke="rgba(0,255,127,.35)" strokeWidth="1.5"/>
        <path d="M65 100 L115 100 L105 130 L75 130 Z" fill="rgba(0,255,127,.15)" stroke="rgba(0,255,127,.5)" strokeWidth="1.5"/>
        <text x="90" y="40" textAnchor="middle" fill="rgba(255,255,255,.5)" fontSize="9" fontFamily="DM Sans">ALCANCE</text>
        <text x="90" y="83" textAnchor="middle" fill="rgba(255,255,255,.6)" fontSize="9" fontFamily="DM Sans">LEADS</text>
        <text x="90" y="118" textAnchor="middle" fill="#00FF7F" fontSize="9" fontFamily="DM Sans" fontWeight="700">VENDAS</text>
      </svg>
      {[0,1,2,3,4].map(i=>(
        <div key={i} style={{ position:'absolute', top:'12%', left:`${28+i*10}%`, width:6, height:6, borderRadius:'50%', backgroundColor:'#00FF7F', animation:`fallParticle ${1.5+i*0.3}s ${i*0.4}s ease-in infinite`, boxShadow:'0 0 8px rgba(0,255,127,.8)' }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   VISUAL ANIMADO — CRIATIVOS
───────────────────────────────────────────── */
function VisualCriativos() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', minHeight:280 }}>
      <div style={{ position:'relative', width:320, height:260, backgroundColor:'rgba(0,0,0,.4)', border:'1px solid rgba(255,255,255,.1)', borderRadius:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, padding:'10px 16px', borderBottom:'1px solid rgba(255,255,255,.07)' }}>
          {['#EF4444','#F59E0B','#00FF7F'].map((c,i)=>(
            <div key={i} style={{ width:10, height:10, borderRadius:'50%', backgroundColor:c }} />
          ))}
          <div style={{ flex:1, height:8, borderRadius:4, backgroundColor:'rgba(255,255,255,.07)', marginLeft:8 }} />
        </div>
        <div style={{ padding:18, display:'flex', flexDirection:'column', gap:12 }}>
          <div style={{ height:14, width:'80%', backgroundColor:'rgba(255,255,255,.2)', borderRadius:3, animation:'fadeInUpSol .5s .2s both' }} />
          <div style={{ height:10, width:'60%', backgroundColor:'rgba(255,255,255,.1)', borderRadius:3, animation:'fadeInUpSol .5s .4s both' }} />
          <div style={{ height:80, backgroundColor:'rgba(0,255,127,.07)', border:'1px dashed rgba(0,255,127,.25)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', animation:'fadeInUpSol .5s .6s both' }}>
            <div style={{ width:32, height:32, border:'2px solid rgba(0,255,127,.4)', borderRadius:5 }} />
          </div>
          <div style={{ height:28, width:'50%', backgroundColor:'rgba(0,255,127,.25)', borderRadius:6, animation:'fadeInUpSol .5s .8s both', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ height:8, width:'60%', backgroundColor:'rgba(0,255,127,.5)', borderRadius:3 }} />
          </div>
        </div>
        <div style={{ position:'absolute', top:12, right:12, display:'flex', gap:6, animation:'abBounce 2s ease-in-out infinite' }}>
          <span style={{ fontFamily:'"Montserrat",sans-serif', fontWeight:800, fontSize:13, color:'#00FF7F', backgroundColor:'rgba(0,255,127,.1)', border:'1px solid rgba(0,255,127,.3)', padding:'3px 8px', borderRadius:5 }}>A</span>
          <span style={{ fontFamily:'"Montserrat",sans-serif', fontWeight:800, fontSize:13, color:'rgba(255,255,255,.4)', backgroundColor:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)', padding:'3px 8px', borderRadius:5 }}>B</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VISUAL ANIMADO — PÁGINAS
───────────────────────────────────────────── */
function VisualPaginas() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', minHeight:280 }}>
      <div style={{ width:320, height:250, backgroundColor:'rgba(10,10,10,.9)', border:'1px solid rgba(255,255,255,.1)', borderRadius:16, overflow:'hidden' }}>
        <div style={{ backgroundColor:'rgba(255,255,255,.04)', padding:'10px 14px', display:'flex', alignItems:'center', gap:6 }}>
          {['#EF4444','#F59E0B','#00FF7F'].map((c,i)=><div key={i} style={{ width:9, height:9, borderRadius:'50%', backgroundColor:c }} />)}
          <div style={{ flex:1, height:7, backgroundColor:'rgba(255,255,255,.08)', borderRadius:10, marginLeft:6, display:'flex', alignItems:'center', paddingLeft:8 }}>
            <div style={{ width:90, height:4, backgroundColor:'rgba(255,255,255,.15)', borderRadius:2 }} />
          </div>
        </div>
        <div style={{ padding:18 }}>
          <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
            <div style={{ width:56, height:56, borderRadius:'50%', border:'4px solid #00FF7F', display:'flex', alignItems:'center', justifyContent:'center', animation:'scoreCount .6s .3s both' }}>
              <span style={{ fontFamily:'"Montserrat",sans-serif', fontWeight:800, fontSize:18, color:'#00FF7F' }}>98</span>
            </div>
            <div>
              <div style={{ fontFamily:'"DM Sans",sans-serif', fontSize:12, color:'rgba(255,255,255,.6)', letterSpacing:'0.1em' }}>PERFORMANCE</div>
              <div style={{ display:'flex', gap:4, marginTop:4 }}>
                {['#00FF7F','#00FF7F','#00FF7F'].map((c,i)=><div key={i} style={{ width:14, height:5, backgroundColor:c, borderRadius:2 }} />)}
              </div>
            </div>
          </div>
          {[
            { label:'FCP', val:'0.8s', pct:'88%', color:'#00FF7F' },
            { label:'LCP', val:'1.2s', pct:'75%', color:'#00FF7F' },
            { label:'CLS', val:'0.01', pct:'95%', color:'#00FF7F' },
          ].map((m,i)=>(
            <div key={i} style={{ marginBottom:10 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                <span style={{ fontFamily:'"DM Sans",sans-serif', fontSize:12, color:'rgba(255,255,255,.5)' }}>{m.label}</span>
                <span style={{ fontFamily:'"Montserrat",sans-serif', fontSize:12, fontWeight:700, color:m.color }}>{m.val}</span>
              </div>
              <div style={{ height:5, backgroundColor:'rgba(255,255,255,.08)', borderRadius:3, overflow:'hidden' }}>
                <div style={{ '--w':m.pct, height:'100%', width:m.pct, backgroundColor:m.color, borderRadius:3, animation:`speedBar .8s ${i*0.2+0.4}s both ease-out` } as React.CSSProperties} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VISUAL ANIMADO — DADOS
───────────────────────────────────────────── */
function VisualDados() {
  const points = [30,55,42,70,58,85,72,95,80,100];
  const maxH = 80;
  const w = 180, padX = 16;
  const stepX = (w - padX*2) / (points.length-1);
  const pathD = points.map((p,i) => `${i===0?'M':'L'} ${padX+i*stepX} ${maxH+20-(p/100*maxH)}`).join(' ');

  return (
    <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', minHeight:280 }}>
      <div style={{ width:340, height:250, backgroundColor:'rgba(10,10,10,.9)', border:'1px solid rgba(255,255,255,.08)', borderRadius:16, padding:22 }}>
        <div style={{ display:'flex', gap:18, marginBottom:16 }}>
          {[
            { label:'LEADS', val:'+47%' },
            { label:'ROI', val:'3.2x' },
          ].map((m,i)=>(
            <div key={i} style={{ animation:`metricPop .4s ${i*0.2+0.2}s both` }}>
              <div style={{ fontFamily:'"DM Sans",sans-serif', fontSize:11, color:'rgba(255,255,255,.4)', letterSpacing:'0.15em' }}>{m.label}</div>
              <div style={{ fontFamily:'"Montserrat",sans-serif', fontSize:26, fontWeight:800, color:'#00FF7F', lineHeight:1 }}>{m.val}</div>
            </div>
          ))}
          <div style={{ marginLeft:'auto', width:52, height:26, backgroundColor:'rgba(0,255,127,.08)', border:'1px solid rgba(0,255,127,.2)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontFamily:'"DM Sans",sans-serif', fontSize:10, color:'rgba(0,255,127,.7)', letterSpacing:'0.1em' }}>LIVE</span>
          </div>
        </div>
        <svg width="100%" height={160} viewBox={`0 0 ${w} ${maxH+40}`} preserveAspectRatio="xMidYMid meet">
          {[0,1,2,3].map(i=>(
            <line key={i} x1={padX} y1={20+i*(maxH/3)} x2={w-padX} y2={20+i*(maxH/3)} stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
          ))}
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00FF7F" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#00FF7F" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d={`${pathD} L ${padX+(points.length-1)*stepX} ${maxH+20} L ${padX} ${maxH+20} Z`} fill="url(#areaGrad)"/>
          <path d={pathD} fill="none" stroke="#00FF7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="600" style={{ animation:'drawLine 1.2s .3s ease-out both' }}/>
          <circle cx={padX+(points.length-1)*stepX} cy={maxH+20-(points[points.length-1]/100*maxH)} r="4" fill="#00FF7F" style={{ animation:'metricPop .3s 1.4s both' }}>
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VISUAL ANIMADO — RELACIONAMENTO / CRM
───────────────────────────────────────────── */
function VisualRelacionamento() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', minHeight:280 }}>
      <svg width="340" height="260" viewBox="0 0 210 155" fill="none">
        {[
          { d:'M105 30 L65 70', delay:'0s' },
          { d:'M105 30 L145 70', delay:'.3s' },
          { d:'M65 70 L65 110', delay:'.6s' },
          { d:'M145 70 L145 110', delay:'.9s' },
          { d:'M65 110 L105 140', delay:'1.2s' },
          { d:'M145 110 L105 140', delay:'1.5s' },
        ].map((c,i)=>(
          <path key={i} d={c.d} stroke="rgba(0,255,127,.3)" strokeWidth="1.5" strokeDasharray="8 4"
            style={{ animation:`flowPulse 1.5s ${c.delay} linear infinite` }}/>
        ))}
        <g style={{ animation:'nodePop .4s .1s both' }}>
          <rect x="80" y="10" width="50" height="22" rx="6" fill="rgba(0,255,127,.1)" stroke="rgba(0,255,127,.4)" strokeWidth="1.5"/>
          <text x="105" y="24" textAnchor="middle" fill="#00FF7F" fontSize="9" fontFamily="DM Sans" fontWeight="600">LEAD</text>
        </g>
        {[
          { x:45, y:60, label:'E-MAIL', delay:'.4s' },
          { x:123, y:60, label:'WHATS', delay:'.6s' },
        ].map((n,i)=>(
          <g key={i} style={{ animation:`nodePop .4s ${n.delay} both` }}>
            <rect x={n.x} y={n.y} width="44" height="22" rx="5" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.12)" strokeWidth="1"/>
            <text x={n.x+22} y={n.y+14} textAnchor="middle" fill="rgba(255,255,255,.55)" fontSize="8" fontFamily="DM Sans">{n.label}</text>
          </g>
        ))}
        {[
          { x:45, y:100, label:'NUTRIR', delay:'.8s' },
          { x:123, y:100, label:'CRM', delay:'1s' },
        ].map((n,i)=>(
          <g key={i} style={{ animation:`nodePop .4s ${n.delay} both` }}>
            <rect x={n.x} y={n.y} width="44" height="22" rx="5" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
            <text x={n.x+22} y={n.y+14} textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="8" fontFamily="DM Sans">{n.label}</text>
          </g>
        ))}
        <g style={{ animation:'nodePop .4s 1.4s both' }}>
          <rect x="75" y="128" width="60" height="22" rx="6" fill="rgba(0,255,127,.2)" stroke="rgba(0,255,127,.6)" strokeWidth="1.5"/>
          <text x="105" y="142" textAnchor="middle" fill="#00FF7F" fontSize="9" fontFamily="DM Sans" fontWeight="700">VENDA ✓</text>
        </g>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VISUAL ANIMADO — VENDAS
───────────────────────────────────────────── */
function VisualVendas() {
  return (
    <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', minHeight:280 }}>
      <div style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
        {[
          { label:'PROSPECÇÃO', color:'rgba(255,255,255,.15)', deals:[3,2], textColor:'rgba(255,255,255,.4)' },
          { label:'PROPOSTA', color:'rgba(0,120,255,.15)', deals:[2], textColor:'rgba(100,160,255,.7)' },
          { label:'FECHAMENTO', color:'rgba(0,255,127,.15)', deals:[1], textColor:'#00FF7F' },
        ].map((col, ci) => (
          <div key={ci} style={{ width:100, animation:`slideRight .5s ${ci*0.2+0.2}s both` }}>
            <div style={{ backgroundColor:col.color, border:`1px solid ${col.textColor}30`, borderRadius:8, padding:'6px 10px', marginBottom:10, textAlign:'center' }}>
              <span style={{ fontFamily:'"DM Sans",sans-serif', fontSize:10, fontWeight:700, color:col.textColor, letterSpacing:'0.1em' }}>{col.label}</span>
            </div>
            {col.deals.map((_, di) => (
              <div key={di} style={{
                backgroundColor:'rgba(255,255,255,.04)',
                border:'1px solid rgba(255,255,255,.08)',
                borderRadius:8, padding:10, marginBottom:8,
                animation: ci===2 ? `dealMove 3s ${di}s ease-in-out infinite` : 'none',
              }}>
                <div style={{ width:'70%', height:7, backgroundColor: ci===2 ? 'rgba(0,255,127,.4)' : 'rgba(255,255,255,.15)', borderRadius:3, marginBottom:6 }} />
                <div style={{ width:'90%', height:5, backgroundColor:'rgba(255,255,255,.06)', borderRadius:3, marginBottom:6 }} />
                {ci===2 && <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <div style={{ width:10, height:10, borderRadius:'50%', backgroundColor:'rgba(0,255,127,.3)', border:'1px solid rgba(0,255,127,.6)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Check size={6} color="#00FF7F"/>
                  </div>
                  <span style={{ fontFamily:'"DM Sans",sans-serif', fontSize:9, color:'rgba(0,255,127,.8)' }}>FECHADO</span>
                </div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Mapa de visuais por id */
const visualMap: Record<string, () => JSX.Element> = {
  estrategia: VisualEstrategia,
  midia: VisualMidia,
  criativos: VisualCriativos,
  paginas: VisualPaginas,
  dados: VisualDados,
  relacionamento: VisualRelacionamento,
  vendas: VisualVendas,
};

/* ─────────────────────────────────────────────
   COMPONENTE PRINCIPAL
───────────────────────────────────────────── */
export function SolutionsSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const dragStart = useRef(0);

  const scrollTo = useCallback((index: number) => {
    if (!trackRef.current) return;
    const card = trackRef.current.children[index] as HTMLElement;
    if (!card) return;
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, []);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(solutions.length - 1, index));
    setActive(clamped);
    scrollTo(clamped);
  }, [scrollTo]);

  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const diff = dragStart.current - e.clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next(); else prev();
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 82%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(trackRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const sol = solutions[active];
  const VisualComponent = visualMap[sol.id];

  return (
    <section
      ref={sectionRef}
      id="solucoes"
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: '#080808',
        padding: 'clamp(80px, 10vh, 140px) 0',
        overflow: 'hidden',
      }}
    >
      {/* Glow de fundo */}
      <div style={{ position:'absolute', top:'40%', left:'30%', width:'40vw', height:'50%', background:'radial-gradient(ellipse,rgba(0,255,127,0.04) 0%,transparent 70%)', pointerEvents:'none' }}/>

      {/* HEADER */}
      <div ref={titleRef} style={{ textAlign:'center', marginBottom:'clamp(48px,6vh,72px)', padding:'0 clamp(20px,5vw,80px)', opacity:0 }}>
        <span className="section-label" style={{ color:'hsl(145, 100%, 45%)', display:'block', marginBottom:16 }}>
          SOLUÇÕES
        </span>
        <h2 style={{ fontSize:'clamp(28px,5vw,68px)', lineHeight:0.94, margin:'0 0 20px' }}>
          CONHEÇA AS SOLUÇÕES QUE<br />
          <span style={{ color:'hsl(145, 100%, 45%)' }}>FAZEM SUA EMPRESA DECOLAR</span>
        </h2>
        <p style={{ fontSize:'clamp(14px,1.5vw,17px)', color:'rgba(255,255,255,0.45)', maxWidth:560, margin:'0 auto', lineHeight:1.65 }}>
          Da estratégia à performance, cada etapa do nosso método é feita para gerar resultados reais e previsíveis.
        </p>
      </div>

      {/* TABS */}
      <div style={{ overflowX:'auto', scrollbarWidth:'none', WebkitOverflowScrolling:'touch' }}>
        <div style={{ display:'flex', justifyContent:'center', gap:'clamp(4px,1.5vw,8px)', padding:'0 clamp(20px,5vw,80px) 32px', minWidth:'max-content', margin:'0 auto' }}>
          {solutions.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              style={{
                fontFamily:'"DM Sans",sans-serif',
                fontWeight: i === active ? 600 : 400,
                fontSize:'clamp(12px,1.2vw,14px)',
                color: i === active ? '#00FF7F' : 'rgba(255,255,255,0.4)',
                background: 'none',
                border: 'none',
                padding:'8px clamp(10px,1.5vw,18px)',
                cursor:'pointer',
                position:'relative',
                transition:'color .25s',
                whiteSpace:'nowrap',
              }}
            >
              {s.tag}
              {i === active && (
                <div style={{ position:'absolute', bottom:0, left:'10%', right:'10%', height:2, backgroundColor:'#00FF7F', borderRadius:1, boxShadow:'0 0 8px rgba(0,255,127,.6)' }}/>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ÁREA DO CARD ATIVO */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        style={{ opacity:0, padding:'0 clamp(20px,5vw,80px)' }}
      >
        <div style={{
          maxWidth:1100,
          margin:'0 auto',
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,420px),1fr))',
          gap:'clamp(20px,3vw,40px)',
          alignItems:'center',
        }}>
          {/* COLUNA ESQUERDA — Texto */}
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', backgroundColor:'rgba(0,255,127,0.08)', border:'1px solid rgba(0,255,127,0.25)', borderRadius:100, padding:'5px 14px', marginBottom:24 }}>
              <span className="section-label" style={{ color:'#00FF7F', fontSize:10 }}>{sol.tag}</span>
            </div>
            <h3 style={{ fontSize:'clamp(22px,3vw,38px)', lineHeight:1.05, whiteSpace:'pre-line', marginBottom:16 }}>
              {sol.title}
            </h3>
            <p style={{ fontSize:'clamp(14px,1.3vw,16px)', color:'rgba(255,255,255,0.5)', lineHeight:1.7, marginBottom:28 }}>
              {sol.desc}
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:36 }}>
              {sol.items.map((item, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                  <div style={{ width:18, height:18, borderRadius:'50%', backgroundColor:'rgba(0,255,127,0.1)', border:'1px solid rgba(0,255,127,0.3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 0 8px rgba(0,255,127,0.15)' }}>
                    <Check size={9} color="#00FF7F" strokeWidth={2.5}/>
                  </div>
                  <span style={{ fontFamily:'"DM Sans",sans-serif', fontSize:'clamp(13px,1.2vw,15px)', color:'rgba(255,255,255,0.7)', lineHeight:1.55 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <CtaButton variant="dark" href="#diagnostico">
              Saiba mais sobre esse serviço
            </CtaButton>
          </div>

          {/* COLUNA DIREITA — Visual animado */}
          <div style={{
            backgroundColor:'rgba(255,255,255,0.02)',
            border:'1px solid rgba(255,255,255,0.07)',
            borderRadius:'clamp(16px,2vw,24px)',
            overflow:'hidden',
            aspectRatio:'4/3',
            position:'relative',
            minHeight:240,
          }}>
            <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%, rgba(0,255,127,0.04), transparent 70%)', pointerEvents:'none' }}/>
            <VisualComponent />
          </div>
        </div>
      </div>

      {/* NAVEGAÇÃO — setas + dots */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginTop:40, padding:'0 clamp(20px,5vw,80px)' }}>
        <button
          onClick={prev}
          disabled={active===0}
          style={{
            width:40, height:40, borderRadius:'50%',
            backgroundColor:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(255,255,255,0.1)',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor: active===0 ? 'not-allowed' : 'pointer',
            opacity: active===0 ? 0.3 : 1,
            transition:'all .2s', color:'#fff',
          }}
        >
          <ChevronLeft size={18}/>
        </button>

        <div style={{ display:'flex', gap:6 }}>
          {solutions.map((_,i)=>(
            <button key={i} onClick={()=>goTo(i)} style={{
              width: i===active ? 20 : 6, height:6, borderRadius:3,
              backgroundColor: i===active ? '#00FF7F' : 'rgba(255,255,255,0.2)',
              border:'none', cursor:'pointer',
              transition:'all .3s ease',
              boxShadow: i===active ? '0 0 8px rgba(0,255,127,.5)' : 'none',
            }}/>
          ))}
        </div>

        <button
          onClick={next}
          disabled={active===solutions.length-1}
          style={{
            width:40, height:40, borderRadius:'50%',
            backgroundColor:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(255,255,255,0.1)',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor: active===solutions.length-1 ? 'not-allowed' : 'pointer',
            opacity: active===solutions.length-1 ? 0.3 : 1,
            transition:'all .2s', color:'#fff',
          }}
        >
          <ChevronRight size={18}/>
        </button>
      </div>
    </section>
  );
}

export default SolutionsSection;
