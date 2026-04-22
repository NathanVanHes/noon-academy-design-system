// Passage — the brief before MCQ. No bottom nav. Pinned CTA.
function PassageScreen() {
  return (
    <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', background:'#0a0f1a', color:'#e8e4dc',
      backgroundImage:'linear-gradient(to right, rgba(201,162,39,.03) 1px, transparent 1px),linear-gradient(to bottom, rgba(201,162,39,.03) 1px, transparent 1px)',
      backgroundSize:'64px 64px' }}>
      <div style={{ padding:'56px 22px 10px', display:'flex', justifyContent:'space-between', alignItems:'center', flex:'none' }}>
        <div style={{ fontFamily:FONTS.mono, fontSize:12, color:'rgba(232,228,220,.55)' }}>← Atlas</div>
        <div style={{ fontFamily:FONTS.mono, fontSize:11, color:'#e0b83a' }}>QDR-08</div>
      </div>

      <div style={{ flex:1, overflow:'auto' }}>
        <div style={{ padding:'14px 22px 20px', borderBottom:'1px solid rgba(232,228,220,.1)' }}>
          <div style={{ fontFamily:FONTS.sans, fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:700, color:'#e0b83a' }}>Reading · Inference</div>
          <div style={{ fontFamily:FONTS.serif, fontSize:26, fontWeight:500, marginTop:10, letterSpacing:'-.02em', lineHeight:1.15 }}>The difficult passage</div>
          <div style={{ fontFamily:FONTS.mono, fontSize:11, color:'rgba(232,228,220,.5)', marginTop:6 }}>hard · 10 questions · est 7 min · +6.2 pts on arrival</div>
        </div>

        <div style={{ padding:'22px 22px 18px' }}>
          <div style={{ fontFamily:FONTS.sans, fontSize:10, letterSpacing:'.14em', textTransform:'uppercase', fontWeight:700, color:'rgba(232,228,220,.45)' }}>The passage</div>
          <div style={{ fontFamily:FONTS.serif, fontSize:17, lineHeight:1.65, color:'rgba(232,228,220,.92)', marginTop:12 }}>
            The merchant had travelled the same route for thirty years. He knew the places where the camels refused to drink, the dunes that shifted overnight, and the <span style={{ background:'rgba(224,184,58,.22)', padding:'0 3px', color:'#e8e4dc' }}>small boy who would point north</span> even in a storm.
          </div>
        </div>

        <div style={{ margin:'4px 18px 24px', padding:'14px 16px', background:'#10172a', borderRadius:4, boxShadow:'inset 0 0 0 1px rgba(232,228,220,.08)' }}>
          <div style={{ fontFamily:FONTS.sans, fontSize:9, letterSpacing:'.16em', textTransform:'uppercase', fontWeight:700, color:'rgba(232,228,220,.45)' }}>Crew context</div>
          <div style={{ fontFamily:FONTS.serif, fontSize:15, color:'#e8e4dc', marginTop:6, lineHeight:1.35 }}>Sarah cleared this last Thursday. Three teammates are working it now.</div>
        </div>
      </div>

      <div style={{ flex:'none', padding:'14px 18px 30px', background:'#0a0f1a', borderTop:'1px solid rgba(232,228,220,.08)', display:'flex', gap:10 }}>
        <button style={{ flex:1, background:'transparent', color:'rgba(232,228,220,.65)', border:0, padding:'16px', fontFamily:FONTS.sans, fontSize:13, fontWeight:600, borderRadius:4, boxShadow:'inset 0 0 0 1px rgba(232,228,220,.18)', cursor:'pointer' }}>Save for later</button>
        <button style={{ flex:2, background:'#64D8AE', color:'#0a3326', border:0, padding:'16px', fontFamily:FONTS.sans, fontSize:13, fontWeight:600, borderRadius:4, cursor:'pointer' }}>Begin · 10 questions</button>
      </div>
    </div>
  );
}
Object.assign(window, { PassageScreen });
