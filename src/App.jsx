import { useState } from "react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#07070f", surface: "#0e0e1c", surfaceHover: "#13132a",
  border: "#1c1c35", borderBright: "#2e2e55",
  purple: "#7c3aed", purpleLight: "#a78bfa",
  blue: "#2563eb", blueLight: "#60a5fa",
  green: "#10b981", greenLight: "#34d399",
  amber: "#f59e0b", red: "#ef4444",
  text: "#f0eff5", textMuted: "#9ca3af", textFaint: "#4b5563",
};
const grad = `linear-gradient(135deg,${C.purple},${C.blue})`;
const gradGold = `linear-gradient(135deg,#f59e0b,#ef4444)`;
const gradGreen = `linear-gradient(135deg,${C.green},${C.blue})`;

// ─── GUMROAD LINK — sostituisci con il tuo vero link ─────────────────────────
const GUMROAD_LINK = "https://gumroad.com/l/TUO-PRODOTTO";
const GUMROAD_STARTER = "https://gumroad.com/l/TUO-STARTER";
const GUMROAD_AGENCY  = "https://gumroad.com/l/TUO-AGENCY";

// ─── PREZZI ONE-TIME ─────────────────────────────────────────────────────────
const PLANS = {
  en: [
    {
      name: "Starter", emoji: "🌱", price: "$27", orig: "$47", color: C.textMuted,
      tag: "Perfect to try",
      features: ["300 post generations", "All 6 platforms", "All tones & languages", "Post library", "Valid forever — no expiry"],
      cta: "Buy Starter — $27", link: GUMROAD_STARTER, highlight: false,
    },
    {
      name: "Pro", emoji: "⚡", price: "$47", orig: "$97", color: C.purpleLight,
      tag: "Most popular",
      features: ["Unlimited generations", "All 6 platforms", "All tones & languages", "Post library + calendar", "Analytics dashboard", "Priority email support", "Free future updates"],
      cta: "Buy Pro — $47", link: GUMROAD_LINK, highlight: true,
    },
    {
      name: "Agency", emoji: "🏢", price: "$97", orig: "$197", color: C.blueLight,
      tag: "For teams & resellers",
      features: ["Everything in Pro", "5 user licences", "White-label (your brand)", "Client workspaces", "Bulk generation mode", "API access", "Dedicated support"],
      cta: "Buy Agency — $97", link: GUMROAD_AGENCY, highlight: false,
    },
  ],
  it: [
    {
      name: "Starter", emoji: "🌱", price: "€27", orig: "€47", color: C.textMuted,
      tag: "Perfetto per iniziare",
      features: ["300 generazioni di post", "Tutte e 6 le piattaforme", "Tutti i toni e lingue", "Libreria post", "Valido per sempre — senza scadenza"],
      cta: "Acquista Starter — €27", link: GUMROAD_STARTER, highlight: false,
    },
    {
      name: "Pro", emoji: "⚡", price: "€47", orig: "€97", color: C.purpleLight,
      tag: "Più acquistato",
      features: ["Generazioni illimitate", "Tutte e 6 le piattaforme", "Tutti i toni e lingue", "Libreria + calendario", "Dashboard analytics", "Supporto email prioritario", "Aggiornamenti futuri gratuiti"],
      cta: "Acquista Pro — €47", link: GUMROAD_LINK, highlight: true,
    },
    {
      name: "Agency", emoji: "🏢", price: "€97", orig: "€197", color: C.blueLight,
      tag: "Per team e rivenditori",
      features: ["Tutto di Pro", "5 licenze utente", "White-label (il tuo brand)", "Workspace clienti", "Generazione bulk", "Accesso API", "Supporto dedicato"],
      cta: "Acquista Agency — €97", link: GUMROAD_AGENCY, highlight: false,
    },
  ],
};

const PLATFORM_EMOJI = { Instagram:"📸", LinkedIn:"💼", "X (Twitter)":"🐦", Facebook:"👥", TikTok:"🎵", Pinterest:"📌" };
const PLATFORM_COLOR = { Instagram:"#e1306c", LinkedIn:"#0a66c2", "X (Twitter)":"#1d9bf0", Facebook:"#1877f2", TikTok:"#ff0050", Pinterest:"#e60023" };

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function useLS(key, init) {
  const [v, setV] = useState(() => { try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; } });
  const set = (x) => { const n = typeof x === "function" ? x(v) : x; setV(n); try { localStorage.setItem(key, JSON.stringify(n)); } catch {} };
  return [v, set];
}
function Toast({ msg, type }) {
  if (!msg) return null;
  const bg = type === "error" ? C.red : C.green;
  return <div style={{ position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)", background:bg, color:"#fff", padding:"12px 24px", borderRadius:12, fontWeight:700, fontSize:14, zIndex:9999, boxShadow:"0 8px 32px rgba(0,0,0,.5)" }}>{msg}</div>;
}
function Btn({ children, onClick, style={}, disabled, variant="primary", small }) {
  const base = { border:"none", borderRadius:10, fontWeight:700, cursor:disabled?"not-allowed":"pointer", fontSize:small?12:14, padding:small?"7px 14px":"13px 22px", transition:"opacity .15s,transform .1s", opacity:disabled?.45:1, fontFamily:"inherit" };
  const variants = { primary:{background:grad,color:"#fff"}, gold:{background:gradGold,color:"#fff"}, secondary:{background:C.surface,border:`1px solid ${C.border}`,color:C.textMuted}, ghost:{background:"transparent",color:C.purpleLight}, success:{background:gradGreen,color:"#fff"} };
  return <button onClick={!disabled?onClick:undefined} style={{...base,...variants[variant],...style}} onMouseDown={e=>!disabled&&(e.currentTarget.style.transform="scale(.97)")} onMouseUp={e=>(e.currentTarget.style.transform="scale(1)")}>{children}</button>;
}
function Card({ children, style={}, onClick }) {
  return <div onClick={onClick} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:24, ...style, cursor:onClick?"pointer":undefined }}>{children}</div>;
}
function Badge({ children, color=C.purple }) {
  return <span style={{ background:color+"22", color, border:`1px solid ${color}44`, borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:700 }}>{children}</span>;
}
function Input({ label, value, onChange, placeholder, style={} }) {
  return <div><label style={{ display:"block", fontSize:11, fontWeight:700, color:C.textFaint, textTransform:"uppercase", letterSpacing:".5px", marginBottom:6 }}>{label}</label><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{ width:"100%", padding:"11px 14px", background:C.bg, border:`1px solid ${C.border}`, borderRadius:10, color:C.text, fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit", ...style }} onFocus={e=>(e.target.style.borderColor=C.purple)} onBlur={e=>(e.target.style.borderColor=C.border)} /></div>;
}
function Select({ label, value, onChange, options, style={} }) {
  return <div><label style={{ display:"block", fontSize:11, fontWeight:700, color:C.textFaint, textTransform:"uppercase", letterSpacing:".5px", marginBottom:6 }}>{label}</label><select value={value} onChange={e=>onChange(e.target.value)} style={{ width:"100%", padding:"11px 14px", background:C.bg, border:`1px solid ${C.border}`, borderRadius:10, color:C.text, fontSize:14, outline:"none", fontFamily:"inherit", ...style }}>{options.map(o=><option key={o.v??o} value={o.v??o}>{o.l??o}</option>)}</select></div>;
}

// ─── COUNTDOWN TIMER ─────────────────────────────────────────────────────────
function Countdown({ lang }) {
  const [t, setT] = useState({ h:4, m:37, s:22 });
  useState(() => { const id = setInterval(() => setT(p => { let {h,m,s} = p; s--; if(s<0){s=59;m--;} if(m<0){m=59;h--;} if(h<0){h=23;m=59;s=59;} return {h,m,s}; }), 1000); return ()=>clearInterval(id); }, []);
  const pad = n => String(n).padStart(2,"0");
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#1a0808", border:`1px solid ${C.red}44`, borderRadius:10, padding:"8px 16px" }}>
      <span style={{ fontSize:12, color:C.red, fontWeight:700 }}>🔥 {lang==="en"?"Launch offer ends in":"Offerta lancio scade tra"}:</span>
      {[pad(t.h),pad(t.m),pad(t.s)].map((v,i) => (
        <span key={i} style={{ display:"flex", alignItems:"center", gap:4 }}>
          <span style={{ background:C.red, color:"#fff", borderRadius:6, padding:"4px 8px", fontWeight:900, fontSize:16, fontVariantNumeric:"tabular-nums" }}>{v}</span>
          {i<2 && <span style={{ color:C.red, fontWeight:900 }}>:</span>}
        </span>
      ))}
    </div>
  );
}

// ─── LANDING ──────────────────────────────────────────────────────────────────
function Landing({ lang, setLang, onEnter }) {
  const t = lang==="en";
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const plans = PLANS[lang];

  const faqs = t ? [
    { q:"Is this really a one-time payment?", a:"Yes, 100%. Pay once, use forever. No monthly fees, no surprises. You own the access." },
    { q:"What happens after I buy on Gumroad?", a:"Gumroad sends you a confirmation email with your personal access link. Click it and you're in instantly." },
    { q:"Do I need a credit card to try it free?", a:"No. The free plan (5 posts/day) works immediately, no card needed." },
    { q:"What if I want a refund?", a:"Full refund within 30 days. Just email us — no questions asked." },
    { q:"Will I get future updates?", a:"Pro and Agency buyers get all future updates for free, forever." },
  ] : [
    { q:"È davvero un pagamento unico?", a:"Sì, al 100%. Paghi una volta, usi per sempre. Zero costi mensili, zero sorprese." },
    { q:"Cosa succede dopo l'acquisto su Gumroad?", a:"Gumroad ti invia una email di conferma con il tuo link personale. Cliccalo e sei dentro immediatamente." },
    { q:"Serve la carta per la versione gratuita?", a:"No. Il piano gratuito (5 post/giorno) funziona subito, senza carta." },
    { q:"Posso avere un rimborso?", a:"Rimborso completo entro 30 giorni. Manda un'email — senza domande." },
    { q:"Ricevo gli aggiornamenti futuri?", a:"Gli acquirenti Pro e Agency ricevono tutti gli aggiornamenti futuri gratuitamente, per sempre." },
  ];

  return (
    <div style={{ background:C.bg, color:C.text, fontFamily:"'Inter',system-ui,sans-serif", overflowX:"hidden" }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} *{box-sizing:border-box} a{color:inherit}`}</style>

      {/* TOP BANNER */}
      <div style={{ background:gradGold, textAlign:"center", padding:"10px 20px", fontSize:13, fontWeight:700, color:"#fff" }}>
        🎉 {t?"Launch Week: 50% OFF — Pay once, use forever. Limited time.":"Settimana di lancio: 50% SCONTO — Paghi una volta, usi per sempre. Tempo limitato."}
      </div>

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:C.bg+"ee", backdropFilter:"blur(12px)", borderBottom:`1px solid ${C.border}`, padding:"0 5vw", display:"flex", alignItems:"center", justifyContent:"space-between", height:60 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>✦</div>
          <span style={{ fontWeight:800, fontSize:17, letterSpacing:"-.4px" }}>PostCraft AI</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {["en","it"].map(l=>(
            <button key={l} onClick={()=>setLang(l)} style={{ padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", fontSize:12, fontWeight:700, background:lang===l?grad:C.surface, color:lang===l?"#fff":C.textMuted }}>{l.toUpperCase()}</button>
          ))}
          <Btn small onClick={onEnter}>{t?"Try Free":"Prova Gratis"}</Btn>
          <Btn small variant="gold" onClick={()=>window.open(GUMROAD_LINK,"_blank")}>{t?"Buy Now":"Acquista"}</Btn>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ textAlign:"center", padding:"64px 5vw 48px", animation:"fadeUp .5s ease" }}>
        <div style={{ display:"inline-block", background:C.surface, border:`1px solid ${C.borderBright}`, borderRadius:20, padding:"5px 16px", fontSize:12, color:C.purpleLight, marginBottom:20, fontWeight:700 }}>
          ⚡ {t?"Trusted by 12,400+ coaches & freelancers":"Usato da 12.400+ coach e freelance"}
        </div>
        <h1 style={{ fontSize:"clamp(32px,6vw,68px)", fontWeight:900, lineHeight:1.08, margin:"0 0 20px", letterSpacing:"-2.5px" }}>
          {t?"Create Viral Social Posts":"Crea Post Social Virali"}<br/>
          <span style={{ background:grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            {t?"with AI — in 10 Seconds":"con AI — in 10 Secondi"}
          </span>
        </h1>
        <p style={{ color:C.textMuted, fontSize:"clamp(15px,2vw,18px)", maxWidth:560, margin:"0 auto 28px", lineHeight:1.65 }}>
          {t?"The AI content tool for coaches, freelancers & creators. Generate 3 ready-to-post variations for Instagram, LinkedIn, TikTok and more — instantly.":"Lo strumento AI per coach, freelance e creator. Genera 3 variazioni pronte per Instagram, LinkedIn, TikTok e altro — istantaneamente."}
        </p>
        <div style={{ marginBottom:28 }}><Countdown lang={lang}/></div>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <Btn onClick={()=>window.open(GUMROAD_LINK,"_blank")} style={{ fontSize:16, padding:"15px 36px", borderRadius:14, background:gradGold }}>
            {t?"⚡ Buy Pro — $47 (one-time)":"⚡ Acquista Pro — €47 (una tantum)"}
          </Btn>
          <Btn onClick={onEnter} variant="secondary" style={{ fontSize:16, padding:"15px 28px", borderRadius:14 }}>
            {t?"Try Free First →":"Prova Gratis →"}
          </Btn>
        </div>
        <p style={{ color:C.textFaint, fontSize:12, marginTop:12 }}>
          {t?"✓ Pay once ✓ Use forever ✓ 30-day refund guarantee":"✓ Paghi una volta ✓ Usi per sempre ✓ Rimborso 30 giorni"}
        </p>

        {/* STATS */}
        <div style={{ display:"flex", justifyContent:"center", gap:"clamp(24px,5vw,64px)", marginTop:52, flexWrap:"wrap" }}>
          {(t?[["12,400+","Active users"],["2.1M","Posts generated"],["4.9★","Avg rating"],["$0","Monthly fees"]]
              :[["12.400+","Utenti attivi"],["2,1M","Post generati"],["4,9★","Valutazione media"],["€0","Costi mensili"]]).map(([n,l])=>(
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:900, background:n==="$0"||n==="€0"?gradGreen:grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{n}</div>
              <div style={{ fontSize:12, color:C.textMuted, marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO VIDEO PLACEHOLDER */}
      <section style={{ padding:"0 5vw 60px", maxWidth:780, margin:"0 auto" }}>
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:20, padding:"40px 20px", textAlign:"center" }}>
          <div style={{ fontSize:56, marginBottom:12 }}>▶️</div>
          <p style={{ color:C.textMuted, fontSize:14, margin:0 }}>
            {t?"Watch 60-sec demo — see PostCraft AI in action":"Guarda il demo di 60 secondi — vedi PostCraft AI in azione"}
          </p>
          <Btn small onClick={onEnter} style={{ marginTop:16 }}>{t?"Try it yourself →":"Provalo tu stesso →"}</Btn>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:"56px 5vw", background:C.surface, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
        <h2 style={{ textAlign:"center", fontSize:"clamp(22px,3vw,34px)", fontWeight:800, marginBottom:44, letterSpacing:"-.5px" }}>
          {t?"Everything you need to grow your audience":"Tutto ciò che ti serve per crescere"}
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:18, maxWidth:1000, margin:"0 auto" }}>
          {(t?[
            ["⚡","Instant Generation","3 unique post variations per request, tailored to your niche and tone."],
            ["📸","6 Platforms","Instagram, LinkedIn, X, Facebook, TikTok, Pinterest — all covered."],
            ["🌍","6 Languages","Generate in English, Italian, Spanish, French, German, Portuguese."],
            ["📂","Post Library","Save your best posts and reuse them anytime."],
            ["📅","Content Calendar","Plan your month visually — drag saved posts onto any day."],
            ["📊","Analytics","Track your generation streaks, top platforms and content trends."],
          ]:[
            ["⚡","Generazione Istantanea","3 variazioni uniche per richiesta, adattate alla tua nicchia e tono."],
            ["📸","6 Piattaforme","Instagram, LinkedIn, X, Facebook, TikTok, Pinterest — tutte coperte."],
            ["🌍","6 Lingue","Genera in Italiano, Inglese, Spagnolo, Francese, Tedesco, Portoghese."],
            ["📂","Libreria Post","Salva i tuoi post migliori e riusali quando vuoi."],
            ["📅","Calendario Editoriale","Pianifica il mese visivamente — trascina i post sui giorni."],
            ["📊","Analytics","Traccia streak, piattaforme top e trend dei tuoi contenuti."],
          ]).map(([icon,title,desc])=>(
            <Card key={title} style={{ background:C.bg }}>
              <div style={{ fontSize:28, marginBottom:10 }}>{icon}</div>
              <div style={{ fontWeight:700, marginBottom:6, fontSize:15 }}>{title}</div>
              <div style={{ color:C.textMuted, fontSize:13, lineHeight:1.6 }}>{desc}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding:"72px 5vw" }} id="pricing">
        <div style={{ textAlign:"center", marginBottom:44 }}>
          <h2 style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:800, margin:"0 0 12px", letterSpacing:"-.5px" }}>
            {t?"One-time payment. Use forever.":"Pagamento unico. Usi per sempre."}
          </h2>
          <p style={{ color:C.textMuted, fontSize:16 }}>
            {t?"No subscriptions. No monthly fees. Pay once, own it.":"Nessun abbonamento. Nessun costo mensile. Paghi una volta, è tuo."}
          </p>
        </div>
        <div style={{ display:"flex", gap:20, justifyContent:"center", flexWrap:"wrap", maxWidth:960, margin:"0 auto 32px" }}>
          {plans.map(p=>(
            <div key={p.name} style={{ flex:"1 1 240px", maxWidth:310, background:p.highlight?"linear-gradient(160deg,#1a0a40,#0a1840)":C.surface, border:`2px solid ${p.highlight?C.purple:C.border}`, borderRadius:20, padding:28, position:"relative", transform:p.highlight?"scale(1.04)":"none" }}>
              {p.highlight && <div style={{ position:"absolute", top:-13, left:"50%", transform:"translateX(-50%)", background:gradGold, borderRadius:20, padding:"4px 16px", fontSize:11, fontWeight:800, color:"#fff", whiteSpace:"nowrap" }}>✦ {p.tag.toUpperCase()}</div>}
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <span style={{ fontSize:22 }}>{p.emoji}</span>
                <span style={{ fontWeight:800, fontSize:20, color:p.color }}>{p.name}</span>
              </div>
              <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:4 }}>
                <span style={{ fontSize:44, fontWeight:900, letterSpacing:"-2px" }}>{p.price}</span>
                <span style={{ fontSize:14, color:C.textFaint, textDecoration:"line-through" }}>{p.orig}</span>
              </div>
              <div style={{ fontSize:12, color:C.green, fontWeight:700, marginBottom:16 }}>
                {t?"✓ One-time — no monthly fee":"✓ Una tantum — nessun canone mensile"}
              </div>
              <div style={{ borderTop:`1px solid ${C.border}`, margin:"0 0 18px" }}/>
              <ul style={{ listStyle:"none", padding:0, margin:"0 0 22px", display:"flex", flexDirection:"column", gap:9 }}>
                {p.features.map(f=><li key={f} style={{ display:"flex", gap:8, fontSize:13, color:C.textMuted }}><span style={{ color:C.green }}>✓</span>{f}</li>)}
              </ul>
              <Btn onClick={()=>window.open(p.link,"_blank")} variant={p.highlight?"gold":"secondary"} style={{ width:"100%", padding:13 }}>{p.cta}</Btn>
            </div>
          ))}
        </div>
        {/* Free tier note */}
        <div style={{ textAlign:"center", color:C.textMuted, fontSize:13 }}>
          {t?"Or start free (5 posts/day, no card required) →":"Oppure inizia gratis (5 post/giorno, senza carta) →"}{" "}
          <span onClick={onEnter} style={{ color:C.purpleLight, cursor:"pointer", fontWeight:700, textDecoration:"underline" }}>{t?"Try Free":"Prova Gratis"}</span>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ padding:"56px 5vw", background:C.surface, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
        <h2 style={{ textAlign:"center", fontSize:"clamp(20px,3vw,30px)", fontWeight:800, marginBottom:36, letterSpacing:"-.5px" }}>
          {t?"What creators are saying":"Cosa dicono i creator"}
        </h2>
        <div style={{ display:"flex", gap:18, justifyContent:"center", flexWrap:"wrap", maxWidth:960, margin:"0 auto" }}>
          {(t?[
            ["SM","Sarah M.","Life Coach","I went from 3 hours/week on content to 20 minutes. PostCraft AI is a game-changer."],
            ["MR","Marco R.","Freelance Designer","The post quality is insane. My LinkedIn engagement doubled in the first month."],
            ["JT","Jess T.","Fitness Trainer","Finally a tool that gets my voice. Every post feels like ME, not a robot."],
            ["AB","Anna B.","Business Coach","I bought the one-time Pro deal and it paid for itself in week one. Insane value."],
            ["LV","Luca V.","Marketing Consultant","Generates better posts than I write myself. My clients now pay me to manage this."],
            ["KH","Kim H.","E-commerce Brand","Used it to batch-create 90 posts in one afternoon. Complete game changer."],
          ]:[
            ["SM","Sara M.","Life Coach","Sono passata da 3 ore a settimana a 20 minuti. PostCraft AI è rivoluzionario."],
            ["MR","Marco R.","Designer Freelance","La qualità dei post è incredibile. Il mio engagement su LinkedIn è raddoppiato."],
            ["JT","Jessica T.","Personal Trainer","Finalmente uno strumento che capisce la mia voce. Ogni post sembra mio."],
            ["AB","Anna B.","Business Coach","Ho comprato il deal una tantum Pro e si è ripagato nella prima settimana."],
            ["LV","Luca V.","Consulente Marketing","Genera post migliori di quelli che scrivo io. I miei clienti mi pagano per gestirlo."],
            ["KH","Kim H.","Brand E-commerce","Ho creato 90 post in un pomeriggio. Cambio di gioco totale."],
          ]).map(([init,name,role,text])=>(
            <Card key={name} style={{ flex:"1 1 240px", maxWidth:280, background:C.bg }}>
              <div style={{ color:C.amber, fontSize:16, marginBottom:10 }}>★★★★★</div>
              <p style={{ fontSize:13, color:C.textMuted, lineHeight:1.7, margin:"0 0 16px", fontStyle:"italic" }}>"{text}"</p>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:34, height:34, borderRadius:"50%", background:grad, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:12, color:"#fff", flexShrink:0 }}>{init}</div>
                <div><div style={{ fontWeight:700, fontSize:13 }}>{name}</div><div style={{ fontSize:11, color:C.textFaint }}>{role}</div></div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* GUMROAD GUIDE */}
      <section style={{ padding:"72px 5vw", maxWidth:780, margin:"0 auto" }}>
        <h2 style={{ textAlign:"center", fontSize:"clamp(20px,3vw,30px)", fontWeight:800, marginBottom:8, letterSpacing:"-.5px" }}>
          {t?"How to buy in 3 steps":"Come acquistare in 3 passi"}
        </h2>
        <p style={{ textAlign:"center", color:C.textMuted, marginBottom:40, fontSize:14 }}>
          {t?"Secure checkout via Gumroad — instant access after payment":"Checkout sicuro via Gumroad — accesso immediato dopo il pagamento"}
        </p>
        <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
          {(t?[
            ["1","Click 'Buy Now'","Choose your plan and click the button. You'll be taken to Gumroad's secure checkout page.","🛒"],
            ["2","Complete payment","Pay with card, PayPal or Apple Pay. Gumroad handles everything — secure & instant.","💳"],
            ["3","Get instant access","Gumroad emails you a confirmation link. Click it and start generating posts immediately.","✅"],
          ]:[
            ["1","Clicca 'Acquista Ora'","Scegli il piano e clicca il bottone. Vieni reindirizzato alla pagina di checkout sicuro di Gumroad.","🛒"],
            ["2","Completa il pagamento","Paga con carta, PayPal o Apple Pay. Gumroad gestisce tutto — sicuro e immediato.","💳"],
            ["3","Accesso immediato","Gumroad ti invia un link di conferma via email. Cliccalo e inizia subito a generare post.","✅"],
          ]).map(([n,title,desc,icon])=>(
            <Card key={n} style={{ flex:"1 1 200px", textAlign:"center" }}>
              <div style={{ width:40, height:40, borderRadius:"50%", background:grad, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:18, margin:"0 auto 12px" }}>{n}</div>
              <div style={{ fontSize:24, marginBottom:8 }}>{icon}</div>
              <div style={{ fontWeight:700, fontSize:15, marginBottom:6 }}>{title}</div>
              <div style={{ color:C.textMuted, fontSize:13, lineHeight:1.6 }}>{desc}</div>
            </Card>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:32 }}>
          <Btn onClick={()=>window.open(GUMROAD_LINK,"_blank")} variant="gold" style={{ fontSize:16, padding:"15px 40px", borderRadius:14 }}>
            {t?"⚡ Buy Pro — $47 (one-time)":"⚡ Acquista Pro — €47 (una tantum)"}
          </Btn>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section style={{ padding:"56px 5vw", background:"linear-gradient(135deg,#0d0d2a,#0a1a30)", borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:480, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontSize:32, marginBottom:12 }}>📬</div>
          <h2 style={{ fontSize:22, fontWeight:800, margin:"0 0 8px" }}>{t?"Not ready yet? Get 3 free tips":"Non sei pronto? Ricevi 3 consigli gratis"}</h2>
          <p style={{ color:C.textMuted, fontSize:14, marginBottom:24 }}>
            {t?"Enter your email and we'll send you 3 proven templates to grow your audience — free.":"Inserisci la tua email e ti mandiamo 3 template collaudati per crescere — gratis."}
          </p>
          {emailSent
            ? <div style={{ background:C.green+"22", border:`1px solid ${C.green}44`, borderRadius:12, padding:"16px", color:C.green, fontWeight:700 }}>✓ {t?"Check your inbox!":"Controlla la tua email!"}</div>
            : <div style={{ display:"flex", gap:10 }}>
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder={t?"your@email.com":"tua@email.com"} style={{ flex:1, padding:"12px 14px", background:C.bg, border:`1px solid ${C.border}`, borderRadius:10, color:C.text, fontSize:14, outline:"none", fontFamily:"inherit" }}/>
                <Btn onClick={()=>{if(email.includes("@")){setEmailSent(true);}}} variant="primary">{t?"Send →":"Invia →"}</Btn>
              </div>}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding:"72px 5vw", maxWidth:680, margin:"0 auto" }}>
        <h2 style={{ textAlign:"center", fontSize:"clamp(20px,3vw,30px)", fontWeight:800, marginBottom:36, letterSpacing:"-.5px" }}>
          {t?"Frequently asked questions":"Domande frequenti"}
        </h2>
        {faqs.map((faq,i)=>(
          <div key={i} style={{ borderBottom:`1px solid ${C.border}`, padding:"16px 0" }}>
            <div onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{ display:"flex", justifyContent:"space-between", cursor:"pointer", fontWeight:700, fontSize:14, gap:12 }}>
              {faq.q}<span style={{ transition:"transform .2s", transform:openFaq===i?"rotate(45deg)":"none", color:C.purple, flexShrink:0 }}>+</span>
            </div>
            {openFaq===i && <p style={{ color:C.textMuted, fontSize:14, lineHeight:1.7, margin:"10px 0 0" }}>{faq.a}</p>}
          </div>
        ))}
      </section>

      {/* FINAL CTA */}
      <section style={{ padding:"64px 5vw", textAlign:"center", background:"linear-gradient(160deg,#0d0828,#07070f)" }}>
        <h2 style={{ fontSize:"clamp(24px,4vw,44px)", fontWeight:900, margin:"0 0 16px", letterSpacing:"-1.5px" }}>
          {t?"Stop wasting hours on content.":"Smetti di perdere ore sui contenuti."}
        </h2>
        <p style={{ color:C.textMuted, fontSize:16, marginBottom:28, maxWidth:480, margin:"0 auto 28px" }}>
          {t?"Join 12,400+ creators who generate stunning posts in seconds — one payment, forever.":"Unisciti a 12.400+ creator che generano post straordinari in secondi — un pagamento, per sempre."}
        </p>
        <Btn onClick={()=>window.open(GUMROAD_LINK,"_blank")} variant="gold" style={{ fontSize:17, padding:"16px 44px", borderRadius:14 }}>
          {t?"⚡ Buy Pro — $47 (one-time)":"⚡ Acquista Pro — €47 (una tantum)"}
        </Btn>
        <p style={{ color:C.textFaint, fontSize:12, marginTop:12 }}>
          {t?"✓ Instant access ✓ Pay once ✓ 30-day money-back guarantee":"✓ Accesso immediato ✓ Paghi una volta ✓ Rimborso garantito 30 giorni"}
        </p>
      </section>

      <footer style={{ borderTop:`1px solid ${C.border}`, padding:"28px 5vw", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:28, height:28, borderRadius:7, background:grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>✦</div>
          <span style={{ fontWeight:800, fontSize:15 }}>PostCraft AI</span>
        </div>
        <span style={{ color:C.textFaint, fontSize:12 }}>{t?"Secure payments by Gumroad":"Pagamenti sicuri via Gumroad"} 🔒</span>
        <span style={{ color:C.textFaint, fontSize:12 }}>© 2025 PostCraft AI</span>
      </footer>
    </div>
  );
}

// ─── MAIN APP SHELL ───────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useLS("pc_lang","en");
  const [view, setView] = useState("landing");
  const [activeTab, setActiveTab] = useLS("pc_tab","dashboard");
  const [savedPosts, setSavedPosts] = useLS("pc_saved",[]);
  const [allGenerated, setAllGenerated] = useLS("pc_gen",[]);
  const [calendarEvents, setCalendarEvents] = useLS("pc_cal",{});
  const [toast, setToast] = useState({msg:"",type:"success"});
  const [dailyCount, setDailyCount] = useLS("pc_daily",{date:"",count:0});
  const FREE_LIMIT = 5;

  const showToast = (msg, type="success") => { setToast({msg,type}); setTimeout(()=>setToast({msg:"",type:"success"}),2800); };
  const todayStr = new Date().toISOString().slice(0,10);
  const todayCount = dailyCount.date===todayStr ? dailyCount.count : 0;
  const canGenerate = todayCount < FREE_LIMIT;

  const onGenerated = (posts, platform, niche, tone) => {
    const np = posts.map(p=>({id:Date.now()+Math.random(),text:p,platform,niche,tone,createdAt:new Date().toISOString()}));
    setAllGenerated(prev=>[...np,...prev].slice(0,200));
    const nc = dailyCount.date===todayStr ? dailyCount.count+1 : 1;
    setDailyCount({date:todayStr,count:nc});
  };
  const onSave = (post) => {
    if(savedPosts.find(p=>p.id===post.id)){ setSavedPosts(prev=>prev.filter(p=>p.id!==post.id)); showToast(lang==="en"?"Removed from library":"Rimosso dalla libreria","error"); }
    else { setSavedPosts(prev=>[post,...prev]); showToast(lang==="en"?"Saved ✓":"Salvato ✓"); }
  };
  const isSaved = id => savedPosts.some(p=>p.id===id);

  if(view==="landing") return <Landing lang={lang} setLang={setLang} onEnter={()=>setView("app")}/>;

  const streak = Math.min(allGenerated.length>0?Math.floor(allGenerated.length/3)+1:0,30);
  const topPlatform = (()=>{const c={}; allGenerated.forEach(p=>{c[p.platform]=(c[p.platform]||0)+1;}); return Object.entries(c).sort((a,b)=>b[1]-a[1])[0]?.[0]||"—";})();

  return (
    <div style={{ display:"flex", height:"100vh", background:C.bg, color:C.text, fontFamily:"'Inter',system-ui,sans-serif", overflow:"hidden" }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}} *{box-sizing:border-box} ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:${C.bg}} ::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}`}</style>

      {/* SIDEBAR */}
      <aside style={{ width:220, background:C.surface, borderRight:`1px solid ${C.border}`, display:"flex", flexDirection:"column", flexShrink:0 }}>
        <div style={{ padding:"18px 16px 14px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:30, height:30, borderRadius:8, background:grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>✦</div>
          <span style={{ fontWeight:800, fontSize:15, letterSpacing:"-.3px" }}>PostCraft AI</span>
        </div>
        <nav style={{ padding:"10px", flex:1 }}>
          {[
            {id:"dashboard",icon:"⬡",label:lang==="en"?"Dashboard":"Dashboard"},
            {id:"generate",icon:"⚡",label:lang==="en"?"Generate":"Genera"},
            {id:"saved",icon:"📂",label:lang==="en"?"Saved":"Salvati"},
            {id:"calendar",icon:"📅",label:lang==="en"?"Calendar":"Calendario"},
            {id:"analytics",icon:"📊",label:lang==="en"?"Analytics":"Analisi"},
          ].map(item=>(
            <button key={item.id} onClick={()=>setActiveTab(item.id)} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"10px 12px", borderRadius:10, border:"none", background:activeTab===item.id?C.purple+"22":"transparent", color:activeTab===item.id?C.purpleLight:C.textMuted, cursor:"pointer", fontSize:14, fontWeight:activeTab===item.id?700:500, marginBottom:2, fontFamily:"inherit" }}>
              <span style={{ fontSize:16 }}>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding:"12px", borderTop:`1px solid ${C.border}` }}>
          {/* Free limit bar */}
          <div style={{ background:"linear-gradient(135deg,#1a0a40,#0a1840)", border:`1px solid ${C.purple}44`, borderRadius:12, padding:"12px 14px", marginBottom:10 }}>
            <div style={{ fontSize:11, color:C.purpleLight, fontWeight:700, marginBottom:4 }}>FREE PLAN</div>
            <div style={{ fontSize:12, color:C.textMuted, marginBottom:6 }}>{todayCount}/{FREE_LIMIT} {lang==="en"?"posts today":"post oggi"}</div>
            <div style={{ height:4, background:C.border, borderRadius:2 }}><div style={{ width:`${(todayCount/FREE_LIMIT)*100}%`, height:"100%", background:grad, borderRadius:2 }}/></div>
            <button onClick={()=>window.open(GUMROAD_LINK,"_blank")} style={{ marginTop:10, width:"100%", background:gradGold, border:"none", borderRadius:8, padding:"8px", color:"#fff", fontWeight:700, fontSize:12, cursor:"pointer" }}>
              ⚡ {lang==="en"?"Unlock Pro — $47":"Sblocca Pro — €47"}
            </button>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:30, height:30, borderRadius:"50%", background:grad, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:13, color:"#fff" }}>ME</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:12, fontWeight:700 }}>{lang==="en"?"My Account":"Il mio Account"}</div>
              <div style={{ fontSize:10, color:C.textFaint }}>Free plan</div>
            </div>
            <button onClick={()=>setLang(lang==="en"?"it":"en")} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:6, padding:"3px 7px", color:C.textMuted, cursor:"pointer", fontSize:10, fontWeight:700 }}>{lang.toUpperCase()}</button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex:1, overflow:"auto", padding:"28px 32px", animation:"fadeUp .3s ease" }} key={activeTab}>
        {activeTab==="dashboard" && <DashboardView lang={lang} saved={savedPosts.length} generated={allGenerated.length} streak={streak} todayCount={todayCount} recentPosts={allGenerated.slice(0,4)} onNavigate={setActiveTab} onSave={onSave} isSaved={isSaved}/>}
        {activeTab==="generate" && <GenerateView lang={lang} canGenerate={canGenerate} todayCount={todayCount} freeLimit={FREE_LIMIT} onGenerated={onGenerated} onSave={onSave} isSaved={isSaved} showToast={showToast}/>}
        {activeTab==="saved" && <SavedView lang={lang} posts={savedPosts} onDelete={p=>{setSavedPosts(prev=>prev.filter(x=>x.id!==p.id)); showToast(lang==="en"?"Deleted":"Eliminato","error");}}/>}
        {activeTab==="calendar" && <CalendarView lang={lang} savedPosts={savedPosts} events={calendarEvents} setEvents={setCalendarEvents} showToast={showToast}/>}
        {activeTab==="analytics" && <AnalyticsView lang={lang} generated={allGenerated} saved={savedPosts} streak={streak} topPlatform={topPlatform}/>}
      </main>
      <Toast msg={toast.msg} type={toast.type}/>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardView({ lang, saved, generated, streak, todayCount, recentPosts, onNavigate, onSave, isSaved }) {
  const t = lang==="en";
  const hour = new Date().getHours();
  const greeting = hour<12?(t?"Good morning":"Buongiorno"):hour<18?(t?"Good afternoon":"Buon pomeriggio"):(t?"Good evening":"Buonasera");
  return (
    <div>
      <h1 style={{ fontSize:26, fontWeight:800, marginBottom:4, letterSpacing:"-.5px" }}>{greeting} 👋</h1>
      <p style={{ color:C.textMuted, marginBottom:24, fontSize:14 }}>{t?"Here's your content overview.":"Ecco il riepilogo dei tuoi contenuti."}</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:14, marginBottom:24 }}>
        {[[t?"Posts today":"Post oggi",todayCount,"⚡",C.purpleLight],[t?"Total saved":"Totale salvati",saved,"📂",C.blueLight],[t?"Day streak":"Streak giorni",`${streak}🔥`,"🔥",C.amber],[t?"Your plan":"Il tuo piano","Free","⭐",C.green]].map(([label,value,icon,color])=>(
          <Card key={label}><div style={{ fontSize:22, marginBottom:8 }}>{icon}</div><div style={{ fontSize:26, fontWeight:900, color, letterSpacing:"-1px" }}>{value}</div><div style={{ fontSize:11, color:C.textFaint, marginTop:4 }}>{label}</div></Card>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        <Card>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span style={{ fontWeight:700, fontSize:14 }}>{t?"Recent posts":"Post recenti"}</span>
            <Btn small variant="ghost" onClick={()=>onNavigate("generate")}>+ {t?"Generate":"Genera"}</Btn>
          </div>
          {recentPosts.length===0
            ? <p style={{ color:C.textFaint, fontSize:13, textAlign:"center", padding:"20px 0" }}>{t?"No posts yet. Start generating!":"Nessun post ancora. Inizia a generare!"}</p>
            : recentPosts.map(p=>(
              <div key={p.id} style={{ borderBottom:`1px solid ${C.border}`, padding:"9px 0", display:"flex", alignItems:"flex-start", gap:8 }}>
                <span style={{ fontSize:16 }}>{PLATFORM_EMOJI[p.platform]}</span>
                <p style={{ margin:0, fontSize:12, color:C.textMuted, flex:1, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", lineHeight:1.5 }}>{p.text}</p>
                <button onClick={()=>onSave(p)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:15, flexShrink:0 }}>{isSaved(p.id)?"🔖":"🤍"}</button>
              </div>
            ))}
        </Card>
        <Card>
          <div style={{ fontWeight:700, fontSize:14, marginBottom:14 }}>{t?"Quick actions":"Azioni rapide"}</div>
          {[[t?"Generate new posts":"Genera nuovi post","⚡","generate"],[t?"View saved library":"Vedi libreria","📂","saved"],[t?"Content calendar":"Calendario","📅","calendar"],[t?"Analytics":"Analisi","📊","analytics"],[t?"Unlock Pro (one-time)":"Sblocca Pro (una tantum)","🛒","buy"]].map(([label,icon,tab])=>(
            <button key={tab} onClick={()=>tab==="buy"?window.open(GUMROAD_LINK,"_blank"):onNavigate(tab)} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"10px 12px", background:C.bg, border:`1px solid ${C.border}`, borderRadius:10, cursor:"pointer", color:C.text, fontSize:13, fontWeight:600, fontFamily:"inherit", marginBottom:8, textAlign:"left" }} onMouseEnter={e=>e.currentTarget.style.borderColor=C.purple} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
              <span style={{ fontSize:16 }}>{icon}</span>{label}
            </button>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── GENERATE ─────────────────────────────────────────────────────────────────
function GenerateView({ lang, canGenerate, todayCount, freeLimit, onGenerated, onSave, isSaved, showToast }) {
  const t = lang==="en";
  const [niche, setNiche] = useState("");
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState(0);
  const [contentLang, setContentLang] = useState(lang==="en"?"English":"Italiano");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIdx, setCopiedIdx] = useState(null);

  const tones = t?["Inspirational","Educational","Conversational","Bold & Direct","Humorous","Storytelling"]:["Ispirazionale","Educativo","Conversazionale","Diretto","Umoristico","Storytelling"];
  const niches = t?["Life Coach","Business Coach","Fitness Trainer","Copywriter","Marketing Consultant","Wellness","Designer","Real Estate","Finance","E-commerce","SaaS","Personal Brand","Other"]:["Life Coach","Business Coach","Personal Trainer","Copywriter","Consulente Marketing","Wellness","Designer","Immobiliare","Finanza","E-commerce","SaaS","Personal Brand","Altro"];
  const langs = t?["English","Italian","Spanish","French","German","Portuguese"]:["Italiano","Inglese","Spagnolo","Francese","Tedesco","Portoghese"];

  const generate = async () => {
    if(!niche||!topic||loading) return;
    if(!canGenerate){ showToast(t?"Daily limit reached. Upgrade to Pro!":"Limite giornaliero raggiunto. Passa a Pro!","error"); return; }
    setLoading(true); setError(""); setPosts([]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:"You are an expert social media copywriter. Return ONLY a valid JSON array of exactly 3 strings. No markdown, no explanation.", messages:[{role:"user",content:`Create 3 ${tones[tone].toLowerCase()} ${platform} posts for a ${niche} about: "${topic}". Language: ${contentLang}. Use relevant emojis, hashtags, and a clear CTA. Return only JSON array of 3 strings.`}] })});
      const data = await res.json();
      const raw = data.content?.map(b=>b.text||"").join("")||"";
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      const withMeta = parsed.map(p=>({id:Date.now()+Math.random(),text:p,platform,niche,tone:tones[tone],createdAt:new Date().toISOString()}));
      setPosts(withMeta); onGenerated(parsed,platform,niche,tones[tone]);
    } catch { setError(t?"Something went wrong. Try again.":"Qualcosa è andato storto. Riprova."); }
    finally { setLoading(false); }
  };

  const copy = (text,idx) => { navigator.clipboard.writeText(text); setCopiedIdx(idx); showToast(t?"Copied!":"Copiato!"); setTimeout(()=>setCopiedIdx(null),2000); };

  return (
    <div style={{ maxWidth:860, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div><h1 style={{ fontSize:24, fontWeight:800, margin:0 }}>{t?"Generate Posts":"Genera Post"}</h1><p style={{ color:C.textMuted, margin:"4px 0 0", fontSize:13 }}>{todayCount}/{freeLimit} {t?"free posts used today":"post gratuiti usati oggi"}</p></div>
        {!canGenerate && <Btn onClick={()=>window.open(GUMROAD_LINK,"_blank")} variant="gold">⚡ {t?"Unlock Pro — $47":"Sblocca Pro — €47"}</Btn>}
      </div>
      {!canGenerate && <div style={{ background:C.amber+"18", border:`1px solid ${C.amber}44`, borderRadius:12, padding:"12px 16px", marginBottom:18, color:C.amber, fontSize:13, fontWeight:600 }}>⚠️ {t?"Daily limit reached. Buy Pro for unlimited posts (one-time $47).":"Limite giornaliero raggiunto. Acquista Pro per post illimitati (€47 una tantum)."}</div>}
      <Card style={{ marginBottom:22 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <div style={{ gridColumn:"1/-1" }}><Select label={t?"Your Niche":"La tua Nicchia"} value={niche} onChange={setNiche} options={[{v:"",l:`— ${t?"Select niche":"Seleziona nicchia"} —`},...niches.map(n=>({v:n,l:n}))]}/></div>
          <div style={{ gridColumn:"1/-1" }}><Input label={t?"Post Topic":"Argomento del Post"} value={topic} onChange={setTopic} placeholder={t?"e.g. morning routines, productivity tips...":"es. routine mattutina, consigli produttività..."}/></div>
          <div>
            <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.textFaint, textTransform:"uppercase", letterSpacing:".5px", marginBottom:8 }}>{t?"Platform":"Piattaforma"}</label>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
              {Object.keys(PLATFORM_EMOJI).map(p=>(
                <button key={p} onClick={()=>setPlatform(p)} style={{ padding:"6px 10px", borderRadius:8, border:platform===p?`2px solid ${PLATFORM_COLOR[p]}`:`1px solid ${C.border}`, background:platform===p?PLATFORM_COLOR[p]+"22":C.bg, color:platform===p?PLATFORM_COLOR[p]:C.textMuted, cursor:"pointer", fontSize:11, fontWeight:700, fontFamily:"inherit" }}>
                  {PLATFORM_EMOJI[p]} {p.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.textFaint, textTransform:"uppercase", letterSpacing:".5px", marginBottom:8 }}>{t?"Tone":"Tono"}</label>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:5 }}>
              {tones.map((tn,i)=>(<button key={i} onClick={()=>setTone(i)} style={{ padding:"7px 5px", borderRadius:8, border:tone===i?`2px solid ${C.purple}`:`1px solid ${C.border}`, background:tone===i?C.purple+"22":C.bg, color:tone===i?C.purpleLight:C.textMuted, cursor:"pointer", fontSize:10, fontWeight:700, fontFamily:"inherit" }}>{tn}</button>))}
            </div>
          </div>
          <div><Select label={t?"Content Language":"Lingua Contenuto"} value={contentLang} onChange={setContentLang} options={langs}/></div>
          <div style={{ display:"flex", alignItems:"flex-end" }}>
            <Btn onClick={generate} disabled={!niche||!topic||loading||!canGenerate} style={{ width:"100%", padding:"13px" }}>
              {loading?`⏳ ${t?"Generating...":"Generando..."}`:`${t?"Generate Posts →":"Genera Post →"}`}
            </Btn>
          </div>
        </div>
        {error && <p style={{ color:C.red, fontSize:13, marginTop:10, textAlign:"center" }}>{error}</p>}
      </Card>

      {posts.length>0 && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <h2 style={{ fontSize:17, fontWeight:800, margin:0 }}>✦ {t?"Your Posts":"I tuoi Post"}</h2>
            <Btn small variant="secondary" onClick={generate}>🔄 {t?"Regenerate":"Rigenera"}</Btn>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {posts.map((post,i)=>(
              <Card key={post.id}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                  <div style={{ display:"flex", gap:6 }}>
                    <Badge color={PLATFORM_COLOR[platform]}>{PLATFORM_EMOJI[platform]} {platform.split(" ")[0]}</Badge>
                    <Badge color={C.purple}>Post {i+1}</Badge>
                  </div>
                  <div style={{ display:"flex", gap:6 }}>
                    <Btn small variant={isSaved(post.id)?"success":"secondary"} onClick={()=>onSave(post)}>{isSaved(post.id)?`✓ ${t?"Saved":"Salvato"}`:`🔖 ${t?"Save":"Salva"}`}</Btn>
                    <Btn small variant={copiedIdx===i?"success":"secondary"} onClick={()=>copy(post.text,i)}>{copiedIdx===i?`✓ ${t?"Copied":"Copiato"}`:`📋 ${t?"Copy":"Copia"}`}</Btn>
                  </div>
                </div>
                <p style={{ margin:0, lineHeight:1.75, fontSize:13, color:"#d1d5db", whiteSpace:"pre-wrap" }}>{post.text}</p>
              </Card>
            ))}
          </div>
          {/* Upsell post generation */}
          <div style={{ marginTop:18, background:"linear-gradient(135deg,#1e0840,#0c1e40)", border:`1px solid ${C.purple}44`, borderRadius:14, padding:"18px 22px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
            <div>
              <div style={{ fontSize:13, color:C.purpleLight, fontWeight:700, marginBottom:4 }}>⚡ {t?"Want unlimited posts?":"Vuoi post illimitati?"}</div>
              <div style={{ fontSize:12, color:C.textMuted }}>{t?"Buy Pro once — $47, use forever, no monthly fees.":"Acquista Pro una volta — €47, usi per sempre, zero canoni mensili."}</div>
            </div>
            <Btn variant="gold" small onClick={()=>window.open(GUMROAD_LINK,"_blank")}>{t?"Buy Pro — $47":"Acquista Pro — €47"}</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SAVED ────────────────────────────────────────────────────────────────────
function SavedView({ lang, posts, onDelete }) {
  const t = lang==="en";
  const [search, setSearch] = useState("");
  const [filterP, setFilterP] = useState("all");
  const [copiedId, setCopiedId] = useState(null);
  const platforms = ["all",...new Set(posts.map(p=>p.platform))];
  const filtered = posts.filter(p=>(filterP==="all"||p.platform===filterP)&&(!search||p.text.toLowerCase().includes(search.toLowerCase())));
  const copy = p => { navigator.clipboard.writeText(p.text); setCopiedId(p.id); setTimeout(()=>setCopiedId(null),2000); };
  return (
    <div style={{ maxWidth:860, margin:"0 auto" }}>
      <h1 style={{ fontSize:24, fontWeight:800, marginBottom:18 }}>{t?"Saved Posts":"Post Salvati"}</h1>
      <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap" }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t?"Search saved posts...":"Cerca nei post salvati..."} style={{ flex:1, minWidth:180, padding:"10px 14px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, color:C.text, fontSize:13, outline:"none", fontFamily:"inherit" }}/>
        <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
          {platforms.map(p=>(<button key={p} onClick={()=>setFilterP(p)} style={{ padding:"8px 12px", borderRadius:8, border:filterP===p?`2px solid ${C.purple}`:`1px solid ${C.border}`, background:filterP===p?C.purple+"22":C.surface, color:filterP===p?C.purpleLight:C.textMuted, cursor:"pointer", fontSize:11, fontWeight:700, fontFamily:"inherit" }}>{p==="all"?(t?"All":"Tutti"):`${PLATFORM_EMOJI[p]||""} ${p.split(" ")[0]}`}</button>))}
        </div>
      </div>
      {filtered.length===0
        ? <Card style={{ textAlign:"center", padding:48 }}><div style={{ fontSize:40, marginBottom:10 }}>📂</div><p style={{ color:C.textMuted }}>{t?"No saved posts yet.":"Nessun post salvato ancora."}</p></Card>
        : <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:12 }}>
          {filtered.map(p=>(
            <Card key={p.id}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <div style={{ display:"flex", gap:5 }}>{p.platform&&<Badge color={PLATFORM_COLOR[p.platform]||C.purple}>{PLATFORM_EMOJI[p.platform]||""} {p.platform?.split(" ")[0]}</Badge>}</div>
                <span style={{ fontSize:11, color:C.textFaint }}>{new Date(p.createdAt).toLocaleDateString()}</span>
              </div>
              <p style={{ margin:"0 0 12px", fontSize:12, color:"#d1d5db", lineHeight:1.65, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:4, WebkitBoxOrient:"vertical" }}>{p.text}</p>
              <div style={{ display:"flex", gap:7 }}>
                <Btn small variant={copiedId===p.id?"success":"secondary"} onClick={()=>copy(p)} style={{ flex:1 }}>{copiedId===p.id?"✓ Copied":"📋 Copy"}</Btn>
                <Btn small variant="danger" onClick={()=>onDelete(p)}>🗑</Btn>
              </div>
            </Card>
          ))}
        </div>}
    </div>
  );
}

// ─── CALENDAR ─────────────────────────────────────────────────────────────────
function CalendarView({ lang, savedPosts, events, setEvents, showToast }) {
  const t = lang==="en";
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const months = t?["January","February","March","April","May","June","July","August","September","October","November","December"]:["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
  const days = t?["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]:["Dom","Lun","Mar","Mer","Gio","Ven","Sab"];
  const daysInMonth = new Date(year,month+1,0).getDate();
  const firstDay = new Date(year,month,1).getDay();
  const key = d => `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  const todayKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
  const addPost = post => { const k=key(selectedDay); setEvents(prev=>({...prev,[k]:[...(prev[k]||[]),{...post,scheduledAt:k}]})); setShowPicker(false); showToast(t?"Post scheduled ✓":"Post pianificato ✓"); };
  const cells = []; for(let i=0;i<firstDay;i++) cells.push(null); for(let d=1;d<=daysInMonth;d++) cells.push(d);
  return (
    <div style={{ maxWidth:860, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:10 }}>
        <h1 style={{ fontSize:24, fontWeight:800, margin:0 }}>{t?"Content Calendar":"Calendario Editoriale"}</h1>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <Btn small variant="secondary" onClick={()=>{if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1);}}>←</Btn>
          <span style={{ fontWeight:700, minWidth:130, textAlign:"center", fontSize:14 }}>{months[month]} {year}</span>
          <Btn small variant="secondary" onClick={()=>{if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1);}}>→</Btn>
        </div>
      </div>
      <Card style={{ padding:0, overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", background:C.surfaceHover }}>
          {days.map(d=><div key={d} style={{ textAlign:"center", padding:"10px 0", fontSize:11, fontWeight:700, color:C.textFaint, textTransform:"uppercase" }}>{d}</div>)}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:1, background:C.border }}>
          {cells.map((d,i)=>{
            const k=d?key(d):null; const dayEvents=k?(events[k]||[]): []; const isToday=k===todayKey;
            return <div key={i} onClick={()=>{if(d){setSelectedDay(d);setShowPicker(true);}}} style={{ background:isToday?C.purple+"18":C.surface, minHeight:72, padding:"6px", cursor:d?"pointer":"default" }} onMouseEnter={e=>d&&(e.currentTarget.style.background=C.surfaceHover)} onMouseLeave={e=>(e.currentTarget.style.background=isToday?C.purple+"18":C.surface)}>
              {d&&<div style={{ fontSize:12, fontWeight:isToday?800:500, color:isToday?C.purpleLight:C.textMuted, marginBottom:3 }}>{d}</div>}
              {dayEvents.slice(0,2).map((ev,j)=><div key={j} style={{ background:(PLATFORM_COLOR[ev.platform]||C.purple)+"33", borderRadius:3, padding:"2px 4px", fontSize:9, color:PLATFORM_COLOR[ev.platform]||C.purpleLight, marginBottom:1, overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>{PLATFORM_EMOJI[ev.platform]||"📝"} {ev.platform?.split(" ")[0]}</div>)}
              {dayEvents.length>2&&<div style={{ fontSize:9, color:C.textFaint }}>+{dayEvents.length-2}</div>}
            </div>;
          })}
        </div>
      </Card>
      {showPicker&&selectedDay&&(
        <div style={{ position:"fixed", inset:0, background:"#000a", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 }} onClick={()=>setShowPicker(false)}>
          <Card style={{ maxWidth:440, width:"90%", maxHeight:"70vh", overflow:"auto" }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
              <h3 style={{ margin:0, fontSize:15 }}>{t?"Schedule post for":"Pianifica post per"} {months[month]} {selectedDay}</h3>
              <button onClick={()=>setShowPicker(false)} style={{ background:"none", border:"none", color:C.textMuted, cursor:"pointer", fontSize:20 }}>×</button>
            </div>
            {savedPosts.length===0
              ? <p style={{ color:C.textMuted, textAlign:"center", padding:"20px 0", fontSize:13 }}>{t?"Save some posts first.":"Salva prima dei post."}</p>
              : savedPosts.map(p=>(
                <div key={p.id} onClick={()=>addPost(p)} style={{ padding:"10px 12px", borderRadius:10, border:`1px solid ${C.border}`, marginBottom:7, cursor:"pointer" }} onMouseEnter={e=>e.currentTarget.style.borderColor=C.purple} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                  <div style={{ display:"flex", gap:5, marginBottom:4 }}>{p.platform&&<Badge color={PLATFORM_COLOR[p.platform]||C.purple}>{PLATFORM_EMOJI[p.platform]||""} {p.platform?.split(" ")[0]}</Badge>}</div>
                  <p style={{ margin:0, fontSize:12, color:C.textMuted, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{p.text}</p>
                </div>
              ))}
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── ANALYTICS ────────────────────────────────────────────────────────────────
function AnalyticsView({ lang, generated, saved, streak, topPlatform }) {
  const t = lang==="en";
  const last14 = Array.from({length:14},(_,i)=>{ const d=new Date(); d.setDate(d.getDate()-(13-i)); const k=d.toISOString().slice(0,10); return {label:d.toLocaleDateString(lang==="en"?"en-US":"it-IT",{month:"short",day:"numeric"}),count:generated.filter(p=>p.createdAt?.slice(0,10)===k).length}; });
  const platformCounts={}; generated.forEach(p=>{platformCounts[p.platform]=(platformCounts[p.platform]||0)+1;});
  const toneCounts={}; generated.forEach(p=>{toneCounts[p.tone]=(toneCounts[p.tone]||0)+1;});
  const maxBar = Math.max(...last14.map(d=>d.count),1);
  return (
    <div style={{ maxWidth:860, margin:"0 auto" }}>
      <h1 style={{ fontSize:24, fontWeight:800, marginBottom:22 }}>{t?"Analytics":"Analisi"}</h1>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12, marginBottom:22 }}>
        {[[t?"Generated":"Generati",generated.length,"⚡",C.purpleLight],[t?"Saved":"Salvati",saved.length,"📂",C.blueLight],[t?"Streak":"Streak",`${streak}🔥`,"🔥",C.amber],[t?"Top Platform":"Top Piattaforma",topPlatform!=="—"?`${PLATFORM_EMOJI[topPlatform]||""} ${topPlatform?.split(" ")[0]||"—"}`:"—","🏆",C.green]].map(([label,value,icon,color])=>(
          <Card key={label} style={{ textAlign:"center" }}><div style={{ fontSize:22, marginBottom:6 }}>{icon}</div><div style={{ fontSize:26, fontWeight:900, color, letterSpacing:"-1px" }}>{value}</div><div style={{ fontSize:11, color:C.textFaint, marginTop:4 }}>{label}</div></Card>
        ))}
      </div>
      <Card style={{ marginBottom:18 }}>
        <h3 style={{ margin:"0 0 18px", fontSize:14, fontWeight:700 }}>{t?"Activity — last 14 days":"Attività — ultimi 14 giorni"}</h3>
        <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:90 }}>
          {last14.map(d=>(
            <div key={d.label} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
              <div style={{ width:"100%", background:d.count>0?grad:C.border, borderRadius:"3px 3px 0 0", height:`${(d.count/maxBar)*72+(d.count>0?8:0)}px`, minHeight:d.count>0?8:2 }} title={`${d.count} posts`}/>
              <span style={{ fontSize:8, color:C.textFaint, transform:"rotate(-30deg)", transformOrigin:"top left", whiteSpace:"nowrap", width:28, overflow:"hidden" }}>{d.label}</span>
            </div>
          ))}
        </div>
      </Card>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <Card>
          <h3 style={{ margin:"0 0 14px", fontSize:14, fontWeight:700 }}>{t?"Platform breakdown":"Per piattaforma"}</h3>
          {Object.entries(platformCounts).length===0?<p style={{ color:C.textFaint, fontSize:13 }}>{t?"No data yet":"Nessun dato"}</p>:Object.entries(platformCounts).sort((a,b)=>b[1]-a[1]).map(([p,n])=>(
            <div key={p} style={{ marginBottom:9 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:3 }}><span>{PLATFORM_EMOJI[p]} {p.split(" ")[0]}</span><span style={{ color:C.textMuted }}>{n}</span></div>
              <div style={{ height:5, background:C.border, borderRadius:3 }}><div style={{ width:`${(n/generated.length)*100}%`, height:"100%", background:PLATFORM_COLOR[p]||grad, borderRadius:3 }}/></div>
            </div>
          ))}
        </Card>
        <Card>
          <h3 style={{ margin:"0 0 14px", fontSize:14, fontWeight:700 }}>{t?"Tone breakdown":"Per tono"}</h3>
          {Object.entries(toneCounts).length===0?<p style={{ color:C.textFaint, fontSize:13 }}>{t?"No data yet":"Nessun dato"}</p>:Object.entries(toneCounts).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([tone,n])=>(
            <div key={tone} style={{ marginBottom:9 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:3 }}><span>{tone}</span><span style={{ color:C.textMuted }}>{n}</span></div>
              <div style={{ height:5, background:C.border, borderRadius:3 }}><div style={{ width:`${(n/generated.length)*100}%`, height:"100%", background:grad, borderRadius:3 }}/></div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
