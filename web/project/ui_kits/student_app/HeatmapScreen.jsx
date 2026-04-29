// Heatmap — full-page mastery grid across all topic domains
function HeatmapScreen() {
  // 7 domains x 8 topics each. Value = mastery 0-4.
  // 0=untouched, 1=attention, 2=working, 3=on pace, 4=arrived
  const rows = [
    {d:'Reading',      v:[3,3,2,1,3,4,3,2]},
    {d:'Verbal',       v:[2,3,3,2,1,2,3,0]},
    {d:'Quantitative', v:[4,4,3,3,2,3,2,1]},
    {d:'Analogies',    v:[3,2,1,1,2,3,0,0]},
    {d:'Completion',   v:[3,3,4,3,2,3,3,0]},
    {d:'Chem (Ta.)',   v:[2,2,1,2,2,0,0,0]},
    {d:'Physics (Ta.)',v:[1,1,2,1,0,0,0,0]},
  ];
  const col = v => [
    'rgba(232,228,220,.06)',  // untouched
    '#c55a4e',                 // attention
    '#8a6e2b',                 // working (dim gold)
    '#c9a227',                 // on pace (gold)
    '#7a8e64',                 // arrived (green)
  ][v];

  const stats = [
    {k:'ARRIVED',  v:'9'},
    {k:'ON PACE',  v:'21'},
    {k:'WORKING',  v:'14'},
    {k:'ATTENTION',v:'6'},
  ];

  return (
    <div style={{ background:'#0a0f1a', minHeight:'100%', color:'#e8e4dc', paddingBottom:32 }}>
      {/* Header */}
      <div style={{ padding:'64px 22px 14px' }}>
        <div style={{ fontFamily:FONTS.sans, fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:600, color:'rgba(232,228,220,.45)' }}>Terrain · All domains</div>
        <div style={{ fontFamily:FONTS.serif, fontSize:32, fontWeight:500, letterSpacing:'-.02em', marginTop:6 }}>Where you stand</div>
        <div style={{ fontFamily:FONTS.mono, fontSize:11, color:'rgba(232,228,220,.5)', marginTop:4 }}>56 passages · 9 arrived</div>
      </div>

      {/* Stat strip */}
      <div style={{ margin:'0 18px 18px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'rgba(232,228,220,.08)', borderRadius:4, overflow:'hidden' }}>
        {stats.map(s => (
          <div key={s.k} style={{ background:'#10172a', padding:'12px 8px', textAlign:'center' }}>
            <div style={{ fontFamily:"'Inter', system-ui", fontWeight:300, fontSize:24, color:'#e8e4dc', letterSpacing:'-.02em', fontVariantNumeric:'tabular-nums' }}>{s.v}</div>
            <div style={{ fontFamily:FONTS.sans, fontSize:9, letterSpacing:'.14em', fontWeight:700, color:'rgba(232,228,220,.5)', marginTop:3 }}>{s.k}</div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ padding:'0 22px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontFamily:FONTS.mono, fontSize:10, color:'rgba(232,228,220,.4)', padding:'0 0 6px 88px' }}>
          <span>01</span><span>02</span><span>03</span><span>04</span><span>05</span><span>06</span><span>07</span><span>08</span>
        </div>
        {rows.map(r => (
          <div key={r.d} style={{ display:'grid', gridTemplateColumns:'84px repeat(8,1fr)', gap:3, marginBottom:3 }}>
            <div style={{ fontFamily:FONTS.serif, fontSize:13, fontWeight:500, color:'#e8e4dc', letterSpacing:'-.005em', paddingTop:6 }}>{r.d}</div>
            {r.v.map((v,i)=>(
              <div key={i} style={{ aspectRatio:'1/1', background:col(v), borderRadius:2, position:'relative',
                boxShadow: v===0?'inset 0 0 0 1px rgba(232,228,220,.06)':'none' }}>
                {v===4 && <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:FONTS.mono, fontSize:10, color:'#0a0f1a', fontWeight:600 }}>✓</div>}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ padding:'18px 22px 0', display:'flex', flexWrap:'wrap', gap:12, rowGap:10 }}>
        {[['#7a8e64','Arrived'],['#c9a227','On pace'],['#8a6e2b','Working'],['#c55a4e','Attention'],['rgba(232,228,220,.1)','Not yet']].map(([c,l])=>(
          <div key={l} style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:10, height:10, background:c, borderRadius:2, boxShadow: l==='Not yet'?'inset 0 0 0 1px rgba(232,228,220,.08)':'none' }}/>
            <span style={{ fontFamily:FONTS.sans, fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:700, color:'rgba(232,228,220,.55)' }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Contextual row */}
      <div style={{ margin:'22px 18px 0', padding:'14px 18px', background:'#10172a', borderRadius:4, boxShadow:'inset 0 0 0 1px rgba(197,90,78,.3)' }}>
        <div style={{ fontFamily:FONTS.sans, fontSize:9, letterSpacing:'.16em', textTransform:'uppercase', fontWeight:700, color:'#c55a4e' }}>● Attention · 6 passages</div>
        <div style={{ fontFamily:FONTS.serif, fontSize:15, color:'#e8e4dc', marginTop:6, lineHeight:1.35 }}>Physics has the thinnest coverage. Start with PHY-01 this weekend.</div>
      </div>
    </div>
  );
}
Object.assign(window, { HeatmapScreen });
