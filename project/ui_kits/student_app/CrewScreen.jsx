function CrewScreen() {
  const crew = [
    {n:'Sarah Al-Rashid',i:'SA',s:94,pos:'Arrived',t:'helping Farida'},
    {n:'Farida Al-Qahtani',i:'FA',s:86,pos:'On pace',t:'you',you:true},
    {n:'Mohammed Al-Harbi',i:'MH',s:82,pos:'On pace',t:'QDR-08'},
    {n:'Omar Al-Rashid',i:'OR',s:74,pos:'Attention',t:'stuck on QDR-10'},
    {n:'Nada Al-Shehri',i:'NS',s:88,pos:'On pace',t:'finishing QDR-07'},
    {n:'Yazeed Al-Zahrani',i:'YZ',s:91,pos:'On pace',t:'drill mode'},
  ];
  const col = (p)=>({ Arrived:'#7a8e64','On pace':'#c9a227', Attention:'#c55a4e' }[p]);
  return (
    <div style={{ background:'#0a0f1a',minHeight:'100%',paddingBottom:32,color:'#e8e4dc' }}>
      <div style={{ padding:'64px 22px 16px' }}>
        <div style={{ fontFamily:FONTS.sans,fontSize:10,letterSpacing:'.14em',textTransform:'uppercase',fontWeight:600,color:'rgba(232,228,220,.45)' }}>Crew · Dune Six</div>
        <div style={{ fontFamily:FONTS.serif,fontSize:34,fontWeight:500,letterSpacing:'-.02em',marginTop:6 }}>Six travel together</div>
        <div style={{ fontFamily:FONTS.serif,fontStyle:'italic',fontSize:15,color:'rgba(232,228,220,.6)',marginTop:6 }}>Facilitator Omar · basecamp Riyadh 3</div>
      </div>
      <div style={{ margin:'0 18px 14px',padding:'12px 14px',background:'#10172a',borderRadius:4,boxShadow:'inset 0 0 0 1px rgba(100,216,174,.3)' }}>
        <div style={{ fontFamily:FONTS.sans,fontSize:10,letterSpacing:'.14em',textTransform:'uppercase',fontWeight:700,color:'#64D8AE' }}>Prompt from Omar</div>
        <div style={{ fontFamily:FONTS.serif,fontSize:16,color:'#e8e4dc',marginTop:4,lineHeight:1.35 }}>Sarah, can you walk Omar through QDR-10 before 14:00?</div>
      </div>
      <div style={{ padding:'0 18px',display:'flex',flexDirection:'column' }}>
        {crew.map((c,idx)=>(
          <div key={c.i} style={{ display:'flex',gap:14,padding:'14px 2px',alignItems:'center',borderTop:idx?'1px solid rgba(232,228,220,.08)':'none' }}>
            <div style={{ width:40,height:40,borderRadius:'50%',background:c.you?'#64D8AE':'#1a2236',color:c.you?'#0a3326':'#e8e4dc',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:FONTS.serif,fontSize:14,fontWeight:500,boxShadow:c.you?'none':'inset 0 0 0 1px rgba(232,228,220,.14)' }}>{c.i}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:FONTS.serif,fontSize:16,fontWeight:500,letterSpacing:'-.01em' }}>{c.n}</div>
              <div style={{ fontFamily:FONTS.mono,fontSize:11,color:'rgba(232,228,220,.5)',marginTop:2 }}>{c.t}</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontFamily:FONTS.serif,fontSize:22,fontWeight:500,color:'#e8e4dc',lineHeight:1 }}>{c.s}</div>
              <div style={{ display:'flex',alignItems:'center',gap:5,justifyContent:'flex-end',marginTop:4 }}>
                <div style={{ width:6,height:6,background:col(c.pos),transform:'rotate(45deg)' }}/>
                <div style={{ fontFamily:FONTS.sans,fontSize:9,letterSpacing:'.14em',textTransform:'uppercase',fontWeight:700,color:col(c.pos) }}>{c.pos}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
Object.assign(window,{CrewScreen});
