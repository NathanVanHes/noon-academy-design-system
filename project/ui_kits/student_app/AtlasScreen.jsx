// Atlas — void-first
function AtlasScreen() {
  return (
    <div style={{ background:'#0a0f1a', minHeight:'100%', paddingBottom:32, color:'#e8e4dc' }}>
      <div style={{ padding:'64px 22px 18px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <div style={{ fontFamily:FONTS.sans, fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:600, color:'rgba(232,228,220,.45)' }}>Qudrat · Day 14 / 28</div>
          <div style={{ marginTop:10, fontFamily:FONTS.serif, fontSize:26, color:'#e8e4dc', fontStyle:'italic', letterSpacing:'-.02em' }}>You're on pace for</div>
          <div style={{ fontFamily:FONTS.serif, fontSize:68, fontWeight:500, color:'#e0b83a', lineHeight:1, letterSpacing:'-.03em', marginTop:2 }}>92</div>
          <div style={{ marginTop:10, fontFamily:FONTS.mono, fontSize:11, color:'rgba(232,228,220,.55)' }}>target 90 · +6.2 this week</div>
        </div>
        <div style={{ width:44, height:44, borderRadius:'50%', background:'#1a2236', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:FONTS.serif, fontSize:15, fontWeight:500, boxShadow:'inset 0 0 0 1px rgba(232,228,220,.14)' }}>FA</div>
      </div>

      <div style={{ margin:'8px 18px', background:'#10172a', borderRadius:4, overflow:'hidden', position:'relative', boxShadow:'inset 0 0 0 1px rgba(232,228,220,.08)' }}>
        <svg viewBox="0 0 360 220" style={{ display:'block', width:'100%' }}>
          <defs>
            <pattern id="mapG" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#e8e4dc" strokeWidth="0.3" opacity="0.06"/>
            </pattern>
            {/* Single master ridge shape; every contour is just a vertical translate of it */}
            <path id="ridge" d="M -20 180 C 60 172, 120 160, 180 140 C 240 120, 300 92, 380 70"/>
            <radialGradient id="arrZ" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7a8e64" stopOpacity=".26"/>
              <stop offset="100%" stopColor="#7a8e64" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="attZ" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c55a4e" stopOpacity=".22"/>
              <stop offset="100%" stopColor="#c55a4e" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <rect width="360" height="220" fill="url(#mapG)"/>
          {/* zones — soft radial, not hard ellipses */}
          <circle cx="298" cy="72" r="52" fill="url(#arrZ)"/>
          <circle cx="78"  cy="152" r="42" fill="url(#attZ)"/>
          {/* Parallel contour bands — identical curve, stepped offset, faded by elevation */}
          <g fill="none" stroke="#e8e4dc" strokeLinecap="round">
            <use href="#ridge" transform="translate(0, 18)"  strokeWidth=".7" opacity=".14"/>
            <use href="#ridge" transform="translate(0, 6)"   strokeWidth=".7" opacity=".22"/>
            <use href="#ridge" transform="translate(0, -6)"  strokeWidth=".8" opacity=".3"/>
            <use href="#ridge" transform="translate(0, -18)" strokeWidth=".8" opacity=".38"/>
            <use href="#ridge" transform="translate(0, -30)" strokeWidth=".9" opacity=".48"/>
            <use href="#ridge" transform="translate(0, -42)" strokeWidth="1"  opacity=".6"/>
            <use href="#ridge" transform="translate(0, -54)" strokeWidth="1"  opacity=".42"/>
          </g>
          {/* Route — follows the mid-ridge, drawn cleanly */}
          <path d="M 30 194 C 100 180, 150 168, 200 142 C 240 120, 270 96, 295 72"
                stroke="#c9a227" strokeWidth="1.75" fill="none" strokeLinecap="round"/>
          {/* faint route shadow for depth */}
          <path d="M 30 194 C 100 180, 150 168, 200 142 C 240 120, 270 96, 295 72"
                stroke="#c9a227" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".12"/>
          {/* crew pins — underneath waypoints so they never fight for attention */}
          <g fill="#e8e4dc" opacity=".45">
            <circle cx="116" cy="176" r="1.8"/>
            <circle cx="158" cy="160" r="1.8"/>
            <circle cx="182" cy="150" r="1.8"/>
            <circle cx="224" cy="128" r="1.8"/>
          </g>

          {/* ---- Waypoints (drawn last = top z) with leader-line labels ---- */}

          {/* START — bottom-left, label below so it doesn't collide with route */}
          <g>
            <line x1="30" y1="194" x2="30" y2="210" stroke="#c9a227" strokeWidth=".75" opacity=".55"/>
            <rect x="6" y="210" width="48" height="14" fill="#10172a" stroke="rgba(201,162,39,.45)" strokeWidth=".75"/>
            <text x="30" y="220" textAnchor="middle" fontFamily="Work Sans" fontWeight="700" fontSize="8" letterSpacing=".18em" fill="#c9a227">START</text>
            <g transform="translate(30,194)">
              <circle r="5.5" fill="#10172a"/>
              <path d="M 0 -4 L 4 0 L 0 4 L -4 0 Z" fill="#c9a227"/>
            </g>
          </g>

          {/* YOU — middle, label above, leader line, clear chip background */}
          <g>
            <line x1="200" y1="131" x2="200" y2="116" stroke="#e0b83a" strokeWidth=".75"/>
            <rect x="180" y="102" width="40" height="14" fill="#10172a" stroke="#e0b83a" strokeWidth=".75"/>
            <text x="200" y="112" textAnchor="middle" fontFamily="Work Sans" fontWeight="700" fontSize="8" letterSpacing=".18em" fill="#e0b83a">YOU</text>
            <g transform="translate(200,142)">
              {/* knock-out halo so dot reads cleanly against contours */}
              <circle r="9" fill="#10172a"/>
              <circle r="9" fill="none" stroke="#e0b83a" strokeWidth="1.25"/>
              <circle r="3.2" fill="#e0b83a"/>
            </g>
          </g>

          {/* ARRIVAL — top-right, label to the LEFT (away from viewport edge) */}
          <g>
            <line x1="295" y1="72" x2="252" y2="55" stroke="#7a8e64" strokeWidth=".75" opacity=".7"/>
            <rect x="196" y="48" width="56" height="14" fill="#10172a" stroke="rgba(122,142,100,.55)" strokeWidth=".75"/>
            <text x="224" y="58" textAnchor="middle" fontFamily="Work Sans" fontWeight="700" fontSize="8" letterSpacing=".18em" fill="#7a8e64">ARRIVAL · 92</text>
            <g transform="translate(295,72)">
              <circle r="6" fill="#10172a"/>
              <path d="M -5 3.5 L 0 -5 L 5 3.5 Z" fill="none" stroke="#7a8e64" strokeWidth="1.25"/>
            </g>
          </g>
        </svg>
        <div style={{ position:'absolute', top:12, left:14, right:14, display:'flex', justifyContent:'space-between', fontFamily:FONTS.sans, fontSize:9, letterSpacing:'.16em', textTransform:'uppercase', fontWeight:700, color:'rgba(232,228,220,.65)' }}>
          <span>Mastery · Reading</span><span style={{ fontFamily:FONTS.mono, letterSpacing:0 }}>ELEV 412M</span>
        </div>
      </div>

      <div style={{ padding:'18px 22px 6px', display:'flex', gap:18 }}>
        {[['#7a8e64','Arrived'],['#c9a227','On pace'],['#c55a4e','Attn']].map(([c,l])=>(
          <div key={l} style={{ display:'flex',alignItems:'center',gap:6 }}>
            <div style={{ width:8,height:8,background:c,transform:'rotate(45deg)' }}/>
            <span style={{ fontFamily:FONTS.sans,fontSize:9,letterSpacing:'.14em',textTransform:'uppercase',fontWeight:700,color:'rgba(232,228,220,.55)' }}>{l}</span>
          </div>
        ))}
      </div>

      <div style={{ padding:'14px 22px 8px', fontFamily:FONTS.sans, fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:600, color:'rgba(232,228,220,.45)', borderBottom:'1px solid rgba(232,228,220,.08)', margin:'0 8px' }}>Today's passages</div>

      <div style={{ padding:'10px 16px', display:'flex', flexDirection:'column', gap:8 }}>
        {[
          {c:'QDR-08',t:'Reading · Inference',d:'Sarah can help',s:'gold'},
          {c:'QDR-09',t:'Main Idea',d:'Arrived last week',s:'green'},
          {c:'QDR-10',t:'Analogies',d:'Attention',s:'red'},
          {c:'QDR-11',t:'Sentence Completion',d:'Unlocks Thu',s:'flat'},
        ].map(p=>{
          const col = { gold:'#e0b83a', green:'#7a8e64', red:'#c55a4e', flat:'rgba(232,228,220,.35)'}[p.s];
          return (
            <div key={p.c} style={{ display:'flex',alignItems:'center',gap:14,padding:'14px 16px',background:'#10172a',borderRadius:4,boxShadow:'inset 0 0 0 1px rgba(232,228,220,.08)' }}>
              <div style={{ width:40 }}>
                <div style={{ fontFamily:FONTS.mono,fontSize:10,color:'rgba(232,228,220,.5)' }}>{p.c}</div>
                <div style={{ width:6,height:6,background:col,transform:'rotate(45deg)',marginTop:6 }}/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:FONTS.serif,fontSize:17,fontWeight:500,color:'#e8e4dc',letterSpacing:'-.01em' }}>{p.t}</div>
                <div style={{ fontFamily:FONTS.mono,fontSize:11,color:'rgba(232,228,220,.5)',marginTop:3 }}>{p.d}</div>
              </div>
              <div style={{ fontFamily:FONTS.mono,fontSize:14,color:col }}>→</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
Object.assign(window,{AtlasScreen});
