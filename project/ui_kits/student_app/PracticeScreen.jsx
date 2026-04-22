// Practice — MCQ mid-session. No bottom nav. Pinned action bar at bottom.
function PracticeScreen() {
  const options = [
    {l:'A', t:'The merchant distrusted weather more than people.', s:null},
    {l:'B', t:'Experience includes knowing whose judgement to trust.', s:'pick'},
    {l:'C', t:'The boy was the merchant\'s apprentice.', s:null},
    {l:'D', t:'Camels choose routes by instinct alone.', s:null},
  ];
  return (
    <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', background:'#0a0f1a', color:'#e8e4dc',
      backgroundImage:'linear-gradient(to right, rgba(201,162,39,.025) 1px, transparent 1px),linear-gradient(to bottom, rgba(201,162,39,.025) 1px, transparent 1px)',
      backgroundSize:'48px 48px' }}>

      {/* Top bar — exit + progress + timer */}
      <div style={{ padding:'56px 18px 12px', display:'flex', alignItems:'center', gap:12, flex:'none' }}>
        <div style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(232,228,220,.55)', fontFamily:FONTS.mono, fontSize:20 }}>×</div>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', gap:4 }}>
            {[0,1,2,3,4,5,6,7,8,9].map(i => {
              const done = i < 2, cur = i === 2;
              return <div key={i} style={{ flex:1, height:3, background: done?'#c9a227': cur?'#e0b83a':'rgba(232,228,220,.12)' }}/>;
            })}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:8, fontFamily:FONTS.mono, fontSize:10, color:'rgba(232,228,220,.5)' }}>
            <span>QDR-08 · Inference</span><span>3 / 10</span>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 10px', background:'#10172a', boxShadow:'inset 0 0 0 1px rgba(224,184,58,.35)', borderRadius:3 }}>
          <div style={{ width:6, height:6, background:'#e0b83a', transform:'rotate(45deg)' }}/>
          <span style={{ fontFamily:FONTS.mono, fontSize:12, color:'#e0b83a', letterSpacing:'.04em' }}>04:12</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex:1, overflow:'auto', paddingBottom:16 }}>
        <div style={{ margin:'14px 18px 0', padding:'18px 20px', background:'#10172a', borderRadius:4, boxShadow:'inset 0 0 0 1px rgba(232,228,220,.08)' }}>
          <div style={{ fontFamily:FONTS.sans, fontSize:10, letterSpacing:'.16em', textTransform:'uppercase', fontWeight:700, color:'rgba(232,228,220,.4)' }}>Passage</div>
          <div style={{ fontFamily:FONTS.serif, fontSize:16, lineHeight:1.55, color:'rgba(232,228,220,.9)', marginTop:10 }}>
            The merchant had travelled the same route for thirty years. He knew the dunes that shifted overnight, and the <span style={{ background:'rgba(224,184,58,.22)', padding:'0 3px', color:'#e8e4dc' }}>small boy who would point north</span> even in a storm.
          </div>
        </div>

        <div style={{ padding:'22px 22px 10px' }}>
          <div style={{ fontFamily:FONTS.sans, fontSize:11, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:700, color:'rgba(232,228,220,.55)' }}>Q3 · What is being implied?</div>
        </div>

        <div style={{ padding:'0 18px', display:'flex', flexDirection:'column', gap:8 }}>
          {options.map(o => {
            const picked = o.s === 'pick';
            return (
              <div key={o.l} style={{ display:'flex', gap:14, padding:'14px 16px',
                background: picked?'rgba(100,216,174,.1)':'#10172a', borderRadius:4,
                boxShadow:`inset 0 0 0 ${picked?2:1}px ${picked?'#64D8AE':'rgba(232,228,220,.08)'}` }}>
                <div style={{ width:22, height:22, borderRadius:'50%',
                  background: picked?'#64D8AE':'transparent', color: picked?'#0a3326':'rgba(232,228,220,.55)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:FONTS.mono, fontSize:11, fontWeight:600,
                  boxShadow: picked?'none':'inset 0 0 0 1px rgba(232,228,220,.2)' }}>{o.l}</div>
                <div style={{ flex:1, fontFamily:FONTS.serif, fontSize:15, color:'#e8e4dc', lineHeight:1.4 }}>{o.t}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pinned action bar */}
      <div style={{ flex:'none', padding:'14px 18px 30px', background:'#0a0f1a', borderTop:'1px solid rgba(232,228,220,.08)', display:'flex', gap:10 }}>
        <button style={{ flex:1, background:'transparent', color:'rgba(232,228,220,.65)', border:0, padding:'16px', fontFamily:FONTS.sans, fontSize:13, fontWeight:600, borderRadius:4, boxShadow:'inset 0 0 0 1px rgba(232,228,220,.18)', cursor:'pointer' }}>Ask crew</button>
        <button style={{ flex:2, background:'#64D8AE', color:'#0a3326', border:0, padding:'16px', fontFamily:FONTS.sans, fontSize:13, fontWeight:600, borderRadius:4, cursor:'pointer' }}>Submit &amp; continue</button>
      </div>
    </div>
  );
}
Object.assign(window, { PracticeScreen });
