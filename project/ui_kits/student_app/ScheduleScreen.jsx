// Schedule — week view with live-now, upcoming stations, and crew-wide events
function ScheduleScreen() {
  const days = [
    {d:'Mon', n:14, today:false, load:2},
    {d:'Tue', n:15, today:true,  load:4},
    {d:'Wed', n:16, today:false, load:3},
    {d:'Thu', n:17, today:false, load:3},
    {d:'Fri', n:18, today:false, load:2},
    {d:'Sat', n:19, today:false, load:0},
    {d:'Sun', n:20, today:false, load:1},
  ];
  const blocks = [
    {t:'08:30', dur:45, k:'live',  title:'Star teacher · Reading', who:'Dr Noura Al-Saadi', loc:'broadcast'},
    {t:'09:30', dur:25, k:'next',  title:'Crew debrief',           who:'Dune Six',            loc:'basecamp'},
    {t:'10:15', dur:22, k:'solo',  title:'QDR-08 drill',           who:'Solo',                loc:'device'},
    {t:'14:00', dur:45, k:'crew',  title:'Evening review',         who:'Facilitator Omar',    loc:'basecamp'},
    {t:'16:30', dur:30, k:'water', title:'Help Omar · analogies',  who:'Omar Al-Rashid',      loc:'in-app chat'},
  ];
  const col = (k)=>({ live:'#e0b83a', next:'#64D8AE', solo:'rgba(232,228,220,.7)', crew:'#B08AF9', water:'#64D8AE' }[k]);
  const lbl = (k)=>({ live:'● LIVE NOW', next:'NEXT · 09:30', solo:'SOLO', crew:'CREW', water:'WATER · +1' }[k]);

  return (
    <div style={{ background:'#0a0f1a', minHeight:'100%', color:'#e8e4dc', paddingBottom:32 }}>
      <div style={{ padding:'64px 22px 14px' }}>
        <div style={{ fontFamily:FONTS.sans, fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:600, color:'rgba(232,228,220,.45)' }}>Schedule · Week 4</div>
        <div style={{ fontFamily:FONTS.serif, fontSize:32, fontWeight:500, letterSpacing:'-.02em', marginTop:6 }}>Four stations today</div>
      </div>

      {/* Week strip */}
      <div style={{ padding:'4px 14px 18px', display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:6 }}>
        {days.map(d => (
          <div key={d.n} style={{ textAlign:'center', padding:'10px 0 8px', borderRadius:3,
            background: d.today?'rgba(100,216,174,.08)':'transparent',
            boxShadow: d.today?'inset 0 0 0 1px rgba(100,216,174,.4)':'inset 0 0 0 1px rgba(232,228,220,.06)' }}>
            <div style={{ fontFamily:FONTS.sans, fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:700, color: d.today?'#64D8AE':'rgba(232,228,220,.4)' }}>{d.d}</div>
            <div style={{ fontFamily:"'Inter', system-ui", fontSize:18, fontWeight:400, marginTop:4, color: d.today?'#e8e4dc':'rgba(232,228,220,.75)', fontVariantNumeric:'tabular-nums' }}>{d.n}</div>
            <div style={{ display:'flex', justifyContent:'center', gap:2, marginTop:6, height:4 }}>
              {Array(d.load).fill(0).map((_,i)=>(<div key={i} style={{ width:3, height:3, background: d.today?'#64D8AE':'rgba(232,228,220,.3)' }}/>))}
              {!d.load && <div style={{ width:3, height:3, background:'rgba(232,228,220,.12)' }}/>}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ padding:'0 18px' }}>
        {blocks.map((b, i) => {
          const c = col(b.k);
          return (
            <div key={i} style={{ display:'flex', gap:12, paddingBottom:14 }}>
              <div style={{ width:46, flex:'none' }}>
                <div style={{ fontFamily:"'Inter', system-ui", fontSize:15, fontWeight:500, color:'#e8e4dc', fontVariantNumeric:'tabular-nums' }}>{b.t}</div>
                <div style={{ fontFamily:FONTS.mono, fontSize:10, color:'rgba(232,228,220,.4)', marginTop:2 }}>{b.dur}m</div>
              </div>
              <div style={{ width:14, display:'flex', flexDirection:'column', alignItems:'center' }}>
                <div style={{ width:8, height:8, background:c, transform:'rotate(45deg)', marginTop:6, boxShadow: b.k==='live'?'0 0 0 4px rgba(224,184,58,.15)':'none' }}/>
                {i < blocks.length-1 && <div style={{ width:1, flex:1, background:'rgba(232,228,220,.1)', marginTop:6 }}/>}
              </div>
              <div style={{ flex:1, padding:'4px 14px 14px 0' }}>
                <div style={{ fontFamily:FONTS.sans, fontSize:9, letterSpacing:'.16em', textTransform:'uppercase', fontWeight:700, color:c }}>{lbl(b.k)}</div>
                <div style={{ fontFamily:FONTS.serif, fontSize:17, fontWeight:500, letterSpacing:'-.01em', marginTop:4 }}>{b.title}</div>
                <div style={{ fontFamily:FONTS.mono, fontSize:11, color:'rgba(232,228,220,.5)', marginTop:4 }}>{b.who} · {b.loc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
Object.assign(window, { ScheduleScreen });
