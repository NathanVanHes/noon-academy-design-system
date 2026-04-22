function TodayScreen() {
  const items = [
    {t:'08:30',k:'live',title:'Star teacher · Reading',sub:'Dr Noura · 45 min',by:'broadcast'},
    {t:'09:30',k:'next',title:'Crew debrief · Inference',sub:'Dune Six · 25 min',by:'in person'},
    {t:'10:15',k:'queued',title:'Solo · QDR-08 drill',sub:'22 min',by:'on device'},
    {t:'14:00',k:'queued',title:'Evening review',sub:'Crew + Facilitator Omar',by:'basecamp'},
  ];
  return (
    <div style={{ background:'#0a0f1a',minHeight:'100%',paddingBottom:32,color:'#e8e4dc' }}>
      <div style={{ padding:'64px 22px 16px' }}>
        <div style={{ fontFamily:FONTS.sans,fontSize:10,letterSpacing:'.14em',textTransform:'uppercase',fontWeight:600,color:'rgba(232,228,220,.45)' }}>Tuesday · 14 Rabi II</div>
        <div style={{ fontFamily:FONTS.serif,fontSize:36,fontWeight:500,letterSpacing:'-.02em',marginTop:6 }}>Today's route</div>
        <div style={{ fontFamily:FONTS.serif,fontStyle:'italic',fontSize:16,color:'rgba(232,228,220,.6)',marginTop:4 }}>Four stations. Estimated 3 h 10 m.</div>
      </div>
      <div style={{ padding:'0 18px', display:'flex',flexDirection:'column' }}>
        {items.map((i,idx)=>{
          const live = i.k==='live';
          const next = i.k==='next';
          return (
            <div key={idx} style={{ display:'flex',gap:14,padding:'16px 4px',borderTop:idx?'1px solid rgba(232,228,220,.08)':'none' }}>
              <div style={{ width:50 }}>
                <div style={{ fontFamily:FONTS.mono,fontSize:13,color:live?'#e0b83a':'rgba(232,228,220,.65)' }}>{i.t}</div>
              </div>
              <div style={{ width:1,background:live?'#c9a227':'rgba(232,228,220,.14)',marginTop:2,marginBottom:2 }}/>
              <div style={{ flex:1,paddingLeft:4 }}>
                {live && <div style={{ fontFamily:FONTS.sans,fontSize:9,letterSpacing:'.16em',textTransform:'uppercase',fontWeight:700,color:'#e0b83a',marginBottom:4 }}>● Live now</div>}
                <div style={{ fontFamily:FONTS.serif,fontSize:18,fontWeight:500,letterSpacing:'-.01em' }}>{i.title}</div>
                <div style={{ fontFamily:FONTS.mono,fontSize:11,color:'rgba(232,228,220,.55)',marginTop:4 }}>{i.sub} · {i.by}</div>
                {next && <button style={{ marginTop:12,background:'#64D8AE',color:'#0a3326',border:0,padding:'10px 18px',fontFamily:FONTS.sans,fontSize:13,fontWeight:600,borderRadius:4,cursor:'pointer' }}>Begin</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
Object.assign(window,{TodayScreen});
