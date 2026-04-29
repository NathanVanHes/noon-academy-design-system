// Result — pinned actions; no bottom nav.
function ResultScreen() {
  const qs = [
    {n:1, ok:true,  t:'Inference · easy',   time:'0:42'},
    {n:2, ok:true,  t:'Inference · med',    time:'1:18'},
    {n:3, ok:true,  t:'Inference · med',    time:'1:05'},
    {n:4, ok:false, t:'Main idea · hard',   time:'2:08'},
    {n:5, ok:true,  t:'Detail · med',       time:'0:58'},
    {n:6, ok:true,  t:'Detail · easy',      time:'0:33'},
    {n:7, ok:false, t:'Vocab-in-context',   time:'2:21'},
    {n:8, ok:true,  t:'Inference · hard',   time:'1:42'},
    {n:9, ok:true,  t:'Tone · med',         time:'1:04'},
    {n:10, ok:true, t:'Main idea · easy',   time:'0:51'},
  ];
  return (
    <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', background:'#0a0f1a', color:'#e8e4dc' }}>
      {/* Top strip */}
      <div style={{ padding:'56px 22px 10px', display:'flex', justifyContent:'space-between', alignItems:'center', flex:'none' }}>
        <div style={{ fontFamily:FONTS.mono, fontSize:12, color:'rgba(232,228,220,.55)' }}>× Close</div>
        <div style={{ fontFamily:FONTS.sans, fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:700, color:'#64D8AE' }}>● Arrived</div>
      </div>

      <div style={{ flex:1, overflow:'auto' }}>
        {/* Hero */}
        <div style={{ padding:'14px 22px 20px', borderBottom:'1px solid rgba(232,228,220,.08)' }}>
          <div style={{ fontFamily:FONTS.sans, fontSize:10, letterSpacing:'.16em', textTransform:'uppercase', fontWeight:700, color:'rgba(232,228,220,.45)' }}>QDR-08 · Reading inference</div>
          <div style={{ display:'flex', alignItems:'baseline', gap:12, marginTop:10 }}>
            <div style={{ fontFamily:"'Inter', system-ui", fontWeight:300, fontSize:88, lineHeight:.95, letterSpacing:'-.035em', color:'#e8e4dc', fontVariantNumeric:'tabular-nums' }}>8</div>
            <div style={{ fontFamily:"'Inter', system-ui", fontWeight:300, fontSize:36, color:'rgba(232,228,220,.3)' }}>/10</div>
          </div>
          <div style={{ display:'flex', gap:18, marginTop:14 }}>
            <div><div style={{ fontFamily:FONTS.mono, fontSize:10, color:'rgba(232,228,220,.45)', letterSpacing:'.08em' }}>PACE</div><div style={{ fontFamily:FONTS.mono, fontSize:13, color:'#64D8AE', marginTop:2 }}>+1.4 pts</div></div>
            <div><div style={{ fontFamily:FONTS.mono, fontSize:10, color:'rgba(232,228,220,.45)', letterSpacing:'.08em' }}>TIME</div><div style={{ fontFamily:FONTS.mono, fontSize:13, color:'rgba(232,228,220,.85)', marginTop:2 }}>12:42</div></div>
            <div><div style={{ fontFamily:FONTS.mono, fontSize:10, color:'rgba(232,228,220,.45)', letterSpacing:'.08em' }}>RANK</div><div style={{ fontFamily:FONTS.mono, fontSize:13, color:'rgba(232,228,220,.85)', marginTop:2 }}>2 of 6</div></div>
          </div>
        </div>

        <div style={{ padding:'18px 22px' }}>
          <div style={{ fontFamily:FONTS.serif, fontSize:18, fontStyle:'italic', color:'rgba(232,228,220,.82)', lineHeight:1.4 }}>
            You cleared inference. Main idea &amp; vocab are where the points are waiting.
          </div>
        </div>

        <div style={{ padding:'4px 22px 20px' }}>
          <div style={{ fontFamily:FONTS.sans, fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:600, color:'rgba(232,228,220,.45)', paddingBottom:10, borderBottom:'1px solid rgba(232,228,220,.08)' }}>Review · 10 questions</div>
          {qs.map(q => (
            <div key={q.n} style={{ display:'flex', gap:14, padding:'10px 0', alignItems:'center', borderBottom:'1px solid rgba(232,228,220,.05)' }}>
              <div style={{ fontFamily:FONTS.mono, fontSize:11, color:'rgba(232,228,220,.4)', width:22 }}>{String(q.n).padStart(2,'0')}</div>
              <div style={{ width:10, height:10, background: q.ok?'#64D8AE':'#c55a4e', transform:'rotate(45deg)', flex:'none' }}/>
              <div style={{ flex:1, fontFamily:FONTS.serif, fontSize:15, color:'#e8e4dc' }}>{q.t}</div>
              <div style={{ fontFamily:FONTS.mono, fontSize:11, color:'rgba(232,228,220,.45)' }}>{q.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pinned actions */}
      <div style={{ flex:'none', padding:'14px 18px 30px', background:'#0a0f1a', borderTop:'1px solid rgba(232,228,220,.08)', display:'flex', gap:10 }}>
        <button style={{ flex:1, background:'transparent', color:'rgba(232,228,220,.65)', border:0, padding:'16px', fontFamily:FONTS.sans, fontSize:13, fontWeight:600, borderRadius:4, boxShadow:'inset 0 0 0 1px rgba(232,228,220,.18)', cursor:'pointer' }}>Review wrong</button>
        <button style={{ flex:2, background:'#64D8AE', color:'#0a3326', border:0, padding:'16px', fontFamily:FONTS.sans, fontSize:13, fontWeight:600, borderRadius:4, cursor:'pointer' }}>Continue route</button>
      </div>
    </div>
  );
}
Object.assign(window, { ResultScreen });
