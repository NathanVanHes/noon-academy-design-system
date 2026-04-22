function WaterScreen() {
  const ledger = [
    {d:'Mon',self:3,help:1},
    {d:'Tue',self:2,help:2},
    {d:'Wed',self:3,help:0},
    {d:'Thu',self:2,help:2},
    {d:'Fri',self:1,help:2},
    {d:'Sat',self:0,help:0},
  ];
  return (
    <div style={{ background:'#0a0f1a',minHeight:'100%',paddingBottom:32,color:'#e8e4dc' }}>
      <div style={{ padding:'64px 22px 18px' }}>
        <div style={{ fontFamily:FONTS.sans,fontSize:10,letterSpacing:'.14em',textTransform:'uppercase',fontWeight:600,color:'rgba(232,228,220,.45)' }}>Water · Week 4</div>
        <div style={{ display:'flex',alignItems:'baseline',gap:12,marginTop:10 }}>
          <div style={{ fontFamily:FONTS.serif,fontSize:72,fontWeight:500,letterSpacing:'-.03em',lineHeight:1 }}>18</div>
          <div style={{ fontFamily:FONTS.serif,fontStyle:'italic',fontSize:20,color:'rgba(232,228,220,.6)' }}>jugs filled</div>
        </div>
        <div style={{ fontFamily:FONTS.mono,fontSize:11,color:'#7a8e64',marginTop:8 }}>minimum 12 · crossed Thursday</div>
      </div>

      <div style={{ margin:'4px 18px 22px',display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:8 }}>
        {ledger.map((l,idx)=>{
          const total = l.self+l.help;
          return (
            <div key={idx} style={{ background:'#10172a',padding:'10px 6px',borderRadius:4,textAlign:'center',boxShadow:'inset 0 0 0 1px rgba(232,228,220,.06)' }}>
              <div style={{ fontFamily:FONTS.sans,fontSize:9,letterSpacing:'.14em',textTransform:'uppercase',fontWeight:700,color:'rgba(232,228,220,.4)' }}>{l.d}</div>
              <div style={{ display:'flex',justifyContent:'center',gap:2,marginTop:8,height:28,alignItems:'flex-end' }}>
                {Array(l.self).fill(0).map((_,i)=>(<div key={'s'+i} style={{ width:5,height:14+i*2,background:'#c9a227' }}/>))}
                {Array(l.help).fill(0).map((_,i)=>(<div key={'h'+i} style={{ width:5,height:14+i*2,background:'#64D8AE' }}/>))}
                {!total && <div style={{ width:5,height:5,background:'rgba(232,228,220,.2)' }}/>}
              </div>
              <div style={{ fontFamily:FONTS.mono,fontSize:11,color:'rgba(232,228,220,.55)',marginTop:6 }}>{total||'·'}</div>
            </div>
          );
        })}
      </div>

      <div style={{ padding:'0 22px' }}>
        <div style={{ fontFamily:FONTS.sans,fontSize:10,letterSpacing:'.14em',textTransform:'uppercase',fontWeight:600,color:'rgba(232,228,220,.45)',paddingBottom:10,borderBottom:'1px solid rgba(232,228,220,.1)' }}>Last entries</div>
        {[
          {when:'Fri 14:22',what:'Helped Farida with QDR-08 inference',k:'help'},
          {when:'Fri 11:04',what:'QDR-09 main idea · arrived',k:'self'},
          {when:'Thu 17:30',what:'Helped Omar with analogies',k:'help'},
          {when:'Thu 09:15',what:'Morning drill · 22 min',k:'self'},
        ].map((e,i)=>(
          <div key={i} style={{ display:'flex',gap:14,padding:'12px 0',borderBottom:'1px solid rgba(232,228,220,.06)' }}>
            <div style={{ width:8,height:8,background:e.k==='help'?'#64D8AE':'#c9a227',transform:'rotate(45deg)',marginTop:8,flex:'none' }}/>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:FONTS.serif,fontSize:15,color:'#e8e4dc' }}>{e.what}</div>
              <div style={{ fontFamily:FONTS.mono,fontSize:11,color:'rgba(232,228,220,.45)',marginTop:2 }}>{e.when}</div>
            </div>
            <div style={{ fontFamily:FONTS.sans,fontSize:9,letterSpacing:'.16em',textTransform:'uppercase',fontWeight:700,color:e.k==='help'?'#64D8AE':'#c9a227',alignSelf:'center' }}>+1</div>
          </div>
        ))}
      </div>
    </div>
  );
}
Object.assign(window,{WaterScreen});
