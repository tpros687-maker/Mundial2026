import { useState, useEffect } from "react";

const SEC = {background:"#111827",border:"1px solid #1e2d40",borderRadius:10,padding:16,marginBottom:12};
const STIT = {fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#00d4aa",marginBottom:12,display:"flex",alignItems:"center",gap:8};

const MATCHES = [
  {
    id:1, group:"Grupo A", date:"11 Jun", home:"México", away:"Sudáfrica",
    hs:2, as:0, status:"final", venue:"Estadio Azteca, Ciudad de México",
    stats:{hp:58,ap:42,hsh:14,ash:6,hsot:6,asot:1,hc:7,ac:3,hf:11,af:14},
    goals:[{min:23,player:"Raúl Jiménez",team:"home",type:"goal"},{min:61,player:"Hirving Lozano",team:"home",type:"goal"}],
    yellows:[{min:34,player:"Edson Álvarez",team:"home"},{min:55,player:"Sithole",team:"away"},{min:78,player:"Mvala",team:"away"}],
    reds:[],
    h2h:[{year:2010,home:"México",hs:1,as:1,away:"Sudáfrica"},{year:1998,home:"México",hs:2,as:1,away:"Sudáfrica"}],
    pre:null
  },
  {
    id:2, group:"Grupo A", date:"12 Jun", home:"Corea del Sur", away:"Chequia",
    hs:2, as:1, status:"final", venue:"Estadio Guadalajara",
    stats:{hp:47,ap:53,hsh:12,ash:10,hsot:5,asot:3,hc:5,ac:6,hf:13,af:10},
    goals:[{min:18,player:"Son Heung-min",team:"home",type:"goal"},{min:44,player:"Patrik Schick",team:"away",type:"penalty"},{min:72,player:"Hwang Hee-chan",team:"home",type:"goal"}],
    yellows:[{min:29,player:"Soucek",team:"away"},{min:65,player:"Kim Min-jae",team:"home"}],
    reds:[],
    h2h:[{year:2006,home:"Chequia",hs:2,as:0,away:"Corea del Sur"}],
    pre:null
  },
  {
    id:3, group:"Grupo B", date:"12 Jun", home:"Canadá", away:"Bosnia y Herz.",
    hs:1, as:1, status:"final", venue:"Estadio Toronto",
    stats:{hp:52,ap:48,hsh:13,ash:9,hsot:4,asot:3,hc:6,ac:4,hf:12,af:15},
    goals:[{min:14,player:"Jovo Lukic",team:"away",type:"goal"},{min:78,player:"Cyle Larin",team:"home",type:"goal"}],
    yellows:[{min:41,player:"Laryea",team:"home"},{min:67,player:"Dzeko",team:"away"},{min:88,player:"J.David",team:"home"}],
    reds:[],
    h2h:[],
    pre:null
  },
  {
    id:4, group:"Grupo D", date:"13 Jun", home:"EE.UU.", away:"Paraguay",
    hs:4, as:1, status:"final", venue:"SoFi Stadium, Los Ángeles",
    stats:{hp:63,ap:37,hsh:17,ash:8,hsot:5,asot:1,hc:8,ac:2,hf:9,af:14},
    goals:[{min:7,player:"P.G. Sanchez",team:"away",type:"own_goal"},{min:31,player:"Balogun",team:"home",type:"goal"},{min:43,player:"Balogun",team:"home",type:"goal"},{min:74,player:"Mauricio",team:"away",type:"goal"},{min:87,player:"Gio Reyna",team:"home",type:"goal"}],
    yellows:[{min:52,player:"J.Alonso",team:"away"},{min:63,player:"M.Martinez",team:"away"}],
    reds:[],
    h2h:[{year:2014,home:"EE.UU.",hs:2,as:1,away:"Paraguay"},{year:1930,home:"EE.UU.",hs:3,as:0,away:"Paraguay"}],
    pre:null
  },
  {
    id:5, group:"Grupo B", date:"13 Jun", home:"Qatar", away:"Suiza",
    hs:null, as:null, status:"upcoming", venue:"Levi's Stadium, San Francisco",
    stats:null, goals:[], yellows:[], reds:[],
    h2h:[{year:2018,home:"Qatar",hs:1,as:0,away:"Suiza"}],
    pre:{
      home:{name:"Qatar",wins:38,draws:22,losses:40,goalsFor:1.4,goalsAgainst:1.8,cornersAvg:4.2,yellowAvg:2.1,redAvg:0.2,ranking:56,keyPlayers:"Akram Afif · Almoez Ali · Issa Laye",note:"Clasificó vía play-off en Asia. Concedió 28 goles en clasificación.",goalIntervals:[{l:"1-15",v:12},{l:"16-30",v:18},{l:"31-45",v:22},{l:"46-60",v:15},{l:"61-75",v:19},{l:"76-90",v:14}]},
      away:{name:"Suiza",wins:62,draws:18,losses:20,goalsFor:2.3,goalsAgainst:0.9,cornersAvg:6.8,yellowAvg:1.0,redAvg:0.0,ranking:19,keyPlayers:"Granit Xhaka · Breel Embolo · Dan Ndoye",note:"Invicta en clasificatoria. 14 goles en 6 partidos. Max 1 amarilla en últimos 5.",goalIntervals:[{l:"1-15",v:15},{l:"16-30",v:20},{l:"31-45",v:18},{l:"46-60",v:22},{l:"61-75",v:14},{l:"76-90",v:11}]},
      prediction:"Suiza gana (~72%). Partido cerrado, resultado esperado 0-2."
    }
  },
  {
    id:6, group:"Grupo C", date:"13 Jun", home:"Brasil", away:"Marruecos",
    hs:null, as:null, status:"upcoming", venue:"MetLife Stadium, Nueva Jersey",
    stats:null, goals:[], yellows:[], reds:[],
    h2h:[{year:1998,home:"Brasil",hs:3,as:0,away:"Marruecos"},{year:2023,home:"Marruecos",hs:2,as:1,away:"Brasil"}],
    pre:{
      home:{name:"Brasil",wins:71,draws:15,losses:14,goalsFor:2.8,goalsAgainst:0.9,cornersAvg:7.2,yellowAvg:1.8,redAvg:0.1,ranking:3,keyPlayers:"Vinicius Jr · Raphinha · Rodrygo",note:"Sin Neymar (lesión). Raphinha: 13 goles en La Liga. Ganó 7 de 8 vs África.",goalIntervals:[{l:"1-15",v:14},{l:"16-30",v:19},{l:"31-45",v:21},{l:"46-60",v:18},{l:"61-75",v:16},{l:"76-90",v:12}]},
      away:{name:"Marruecos",wins:55,draws:20,losses:25,goalsFor:1.6,goalsAgainst:0.8,cornersAvg:5.1,yellowAvg:2.3,redAvg:0.2,ranking:14,keyPlayers:"Achraf Hakimi · Brahim Diaz · Ismael Saibari",note:"Semifinalistas 2022. El 44% de sus goles después del min 61.",goalIntervals:[{l:"1-15",v:8},{l:"16-30",v:12},{l:"31-45",v:16},{l:"46-60",v:20},{l:"61-75",v:24},{l:"76-90",v:20}]},
      prediction:"Brasil favorito (~58%). Partido cerrado en 1a mitad, Brasil rompe en el 2o tiempo."
    }
  },
  {
    id:7, group:"Grupo E", date:"14 Jun", home:"Alemania", away:"Curazao",
    hs:null, as:null, status:"upcoming", venue:"NRG Stadium, Houston",
    stats:null, goals:[], yellows:[], reds:[],
    h2h:[],
    pre:{
      home:{name:"Alemania",wins:68,draws:15,losses:17,goalsFor:2.9,goalsAgainst:0.8,cornersAvg:8.1,yellowAvg:1.6,redAvg:0.0,ranking:4,keyPlayers:"Florian Wirtz · Jamal Musiala · Kai Havertz",note:"Campeona Eurocopa 2024. Favorita absoluta del grupo.",goalIntervals:[{l:"1-15",v:18},{l:"16-30",v:20},{l:"31-45",v:19},{l:"46-60",v:17},{l:"61-75",v:14},{l:"76-90",v:12}]},
      away:{name:"Curazao",wins:20,draws:18,losses:62,goalsFor:0.8,goalsAgainst:2.2,cornersAvg:3.1,yellowAvg:2.9,redAvg:0.3,ranking:78,keyPlayers:"Leandro Bacuna · Jurickson Profar · Cuco Martina",note:"Primera Copa del Mundo. Debutante historico de CONCACAF.",goalIntervals:[{l:"1-15",v:10},{l:"16-30",v:14},{l:"31-45",v:18},{l:"46-60",v:20},{l:"61-75",v:22},{l:"76-90",v:16}]},
      prediction:"Alemania gana con claridad (~91%). Se esperan 3+ goles y muchos corners."
    }
  },
  {
    id:8, group:"Grupo F", date:"14 Jun", home:"Paises Bajos", away:"Japon",
    hs:null, as:null, status:"upcoming", venue:"AT&T Stadium, Arlington",
    stats:null, goals:[], yellows:[], reds:[],
    h2h:[{year:2010,home:"Paises Bajos",hs:1,as:0,away:"Japon"},{year:2022,home:"Paises Bajos",hs:3,as:1,away:"Japon"}],
    pre:{
      home:{name:"Paises Bajos",wins:60,draws:18,losses:22,goalsFor:2.2,goalsAgainst:1.0,cornersAvg:7.0,yellowAvg:1.8,redAvg:0.1,ranking:8,keyPlayers:"Cody Gakpo · Van Dijk · Xavi Simons",note:"Semifinalistas 2022. Remontaron 0-2 a Japon en Qatar. Sin Depay.",goalIntervals:[{l:"1-15",v:15},{l:"16-30",v:18},{l:"31-45",v:20},{l:"46-60",v:19},{l:"61-75",v:16},{l:"76-90",v:12}]},
      away:{name:"Japon",wins:55,draws:20,losses:25,goalsFor:1.8,goalsAgainst:1.1,cornersAvg:5.3,yellowAvg:1.5,redAvg:0.1,ranking:17,keyPlayers:"Takefusa Kubo · Wataru Endo · Kaoru Mitoma",note:"Eliminaron a Alemania y España en 2022. Peligrosos en contraataque.",goalIntervals:[{l:"1-15",v:14},{l:"16-30",v:16},{l:"31-45",v:22},{l:"46-60",v:20},{l:"61-75",v:16},{l:"76-90",v:12}]},
      prediction:"Paises Bajos favorita (~55%). Japon puede sorprender como en 2022."
    }
  },
];

function StatBar({ label, home, away, color="#00d4aa" }) {
  const h = home ?? 0, a = away ?? 0;
  const total = h + a || 1;
  const hp = Math.round((h / total) * 100);
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:"#00d4aa",minWidth:30,textAlign:"center"}}>{home ?? 0}</span>
      <div style={{flex:1}}>
        <div style={{fontSize:9,color:"#8899aa",textTransform:"uppercase",letterSpacing:1,textAlign:"center",marginBottom:3}}>{label}</div>
        <div style={{display:"flex",height:6,borderRadius:3,overflow:"hidden",background:"#1e2d40"}}>
          <div style={{width:`${hp}%`,background:color,borderRadius:"3px 0 0 3px"}}/>
          <div style={{width:`${100-hp}%`,background:"#e84393",borderRadius:"0 3px 3px 0"}}/>
        </div>
      </div>
      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:"#e84393",minWidth:30,textAlign:"center"}}>{away ?? 0}</span>
    </div>
  );
}

function GoalTimeline({ goals }) {
  if (!goals || goals.length === 0) return <p style={{color:"#334455",textAlign:"center",padding:12,fontSize:12}}>Sin goles registrados</p>;
  const segs = [{l:"1-15",mn:1,mx:15},{l:"16-30",mn:16,mx:30},{l:"31-45",mn:31,mx:45},{l:"46-60",mn:46,mx:60},{l:"61-75",mn:61,mx:75},{l:"76-90",mn:76,mx:120}]
    .map(s => ({...s, c: goals.filter(g => g.min >= s.mn && g.min <= s.mx).length}));
  const maxC = Math.max(...segs.map(s => s.c), 1);
  return (
    <div>
      <div style={{display:"flex",gap:6,alignItems:"flex-end",height:80,marginBottom:10}}>
        {segs.map(s => (
          <div key={s.l} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <div style={{width:"100%",height:50,background:"#1e2d40",borderRadius:3,display:"flex",alignItems:"flex-end",overflow:"hidden"}}>
              <div style={{width:"100%",height:`${(s.c/maxC)*100}%`,background:"#00d4aa",borderRadius:3}}/>
            </div>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:700}}>{s.c}</span>
            <span style={{fontSize:8,color:"#556677"}}>{s.l}</span>
          </div>
        ))}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
        {goals.map((g,i) => (
          <div key={i} style={{display:"flex",alignItems:"center",gap:4,padding:"4px 10px",borderRadius:20,background:g.team==="home"?"#00d4aa20":"#e8439320",border:`1px solid ${g.team==="home"?"#00d4aa40":"#e8439340"}`,fontSize:11}}>
            <span style={{fontWeight:700,color:"#aabbcc"}}>{g.min}'</span>
            <span>⚽</span>
            <span>{g.player}</span>
            {g.type==="penalty" && <span style={{background:"#ffffff15",borderRadius:3,padding:"1px 4px",fontSize:9,color:"#ffd700"}}>PEN</span>}
            {g.type==="own_goal" && <span style={{background:"#ffffff15",borderRadius:3,padding:"1px 4px",fontSize:9,color:"#ff8888"}}>PP</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function Cards({ cards, team }) {
  const f = (cards||[]).filter(c => c.team === team);
  if (f.length === 0) return <span style={{color:"#334455",fontSize:11}}>—</span>;
  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
      {f.map((c,i) => <span key={i} style={{fontSize:10,padding:"2px 6px",borderRadius:3,background:"#1e2d40"}}>{c.min}' {c.player}</span>)}
    </div>
  );
}

function H2H({ h2h, homeTeam, awayTeam }) {
  if (!h2h || h2h.length === 0) return <p style={{color:"#334455",textAlign:"center",padding:10,fontSize:12}}>Sin antecedentes en Mundiales previos</p>;
  let hw=0, aw=0, d=0;
  h2h.forEach(m => {
    const hg = m.home===homeTeam ? m.hs : m.as;
    const ag = m.home===homeTeam ? m.as : m.hs;
    if (hg > ag) hw++; else if (ag > hg) aw++; else d++;
  });
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-around",marginBottom:14,textAlign:"center"}}>
        {[{n:hw,l:homeTeam,c:"#00d4aa"},{n:d,l:"Empates",c:"#ffd700"},{n:aw,l:awayTeam,c:"#e84393"}].map((s,i) => (
          <div key={i}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:32,fontWeight:800,color:s.c}}>{s.n}</div>
            <div style={{fontSize:9,color:"#8899aa",maxWidth:70,margin:"0 auto"}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{borderTop:"1px solid #1e2d40",paddingTop:8}}>
        {h2h.map((m,i) => (
          <div key={i} style={{display:"flex",gap:10,alignItems:"center",padding:"4px 0",borderBottom:"1px solid #0d1320",fontSize:12}}>
            <span style={{color:"#00d4aa",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,minWidth:38}}>{m.year}</span>
            <span style={{color:"#ccd"}}>{m.home} <strong style={{color:"#fff"}}>{m.hs}–{m.as}</strong> {m.away}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dominance({ m }) {
  const hs = m.stats.hsot*4 + m.stats.hsh*1.5 + m.stats.hp*0.3 + m.stats.hc*0.8;
  const as2 = m.stats.asot*4 + m.stats.ash*1.5 + m.stats.ap*0.3 + m.stats.ac*0.8;
  const t = hs + as2 || 1;
  const hp = Math.round((hs/t)*100);
  return (
    <div>
      <div style={{display:"flex",height:36,borderRadius:6,overflow:"hidden",marginBottom:6}}>
        <div style={{width:`${hp}%`,background:"linear-gradient(90deg,#00d4aa,#00b894)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:800,color:"#0a0e1a"}}>{hp}%</div>
        <div style={{width:`${100-hp}%`,background:"linear-gradient(90deg,#e84393,#c0366a)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:800,color:"#fff"}}>{100-hp}%</div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#8899aa"}}>
        <span>{m.home}</span><span>tiros · corners · posesion</span><span>{m.away}</span>
      </div>
    </div>
  );
}

function IntervalBar({ intervals, color }) {
  const maxV = Math.max(...intervals.map(s => s.v), 1);
  return (
    <div style={{display:"flex",gap:4,alignItems:"flex-end",height:60}}>
      {intervals.map(s => (
        <div key={s.l} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
          <div style={{width:"100%",height:40,background:"#1e2d40",borderRadius:3,display:"flex",alignItems:"flex-end",overflow:"hidden"}}>
            <div style={{width:"100%",height:`${(s.v/maxV)*100}%`,background:color,borderRadius:3}}/>
          </div>
          <span style={{fontSize:7,color:"#556677"}}>{s.l}</span>
        </div>
      ))}
    </div>
  );
}

function PreMatch({ m }) {
  const { pre: staticPre, h2h: staticH2h, home, away } = m;
  const [liveData, setLiveData] = useState(null);
  const [loading, setLoading] = useState(!staticPre);

  useEffect(() => {
    if (staticPre) return; // already have static data
    setLoading(true);
    fetch(`/api/analysis?home=${encodeURIComponent(home)}&away=${encodeURIComponent(away)}`)
      .then(r => r.json())
      .then(data => { setLiveData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [home, away]);

  const pre = staticPre || liveData;
  const h2h = staticH2h || liveData?.h2h || [];

  if (loading) return (
    <div style={{textAlign:"center",padding:40,color:"#8899aa"}}>
      <div style={{fontSize:32,marginBottom:12}}>🔍</div>
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,letterSpacing:2,textTransform:"uppercase"}}>Buscando estadísticas...</div>
      <div style={{fontSize:11,color:"#556677",marginTop:6}}>Consultando datos reales del partido</div>
    </div>
  );

  if (!pre) return (
    <div style={{textAlign:"center",padding:30,color:"#556677"}}>
      <div style={{fontSize:11}}>No se encontraron datos. Intenta de nuevo.</div>
    </div>
  );

  const { home: ph, away: pa, prediction } = pre;

  return (
    <>
      <div style={SEC}>
        <div style={STIT}>📊 Promedios por partido</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:8,alignItems:"center"}}>
          <div style={{fontSize:11,fontWeight:700,color:"#00d4aa",textAlign:"center",marginBottom:4}}>{ph.name}</div>
          <div/>
          <div style={{fontSize:11,fontWeight:700,color:"#e84393",textAlign:"center",marginBottom:4}}>{pa.name}</div>

          {[
            {icon:"⚽",label:"Goles/PJ",hv:ph.goalsFor,av:pa.goalsFor},
            {icon:"🔳",label:"Corners/PJ",hv:ph.cornersAvg,av:pa.cornersAvg},
            {icon:"🟨",label:"Amarillas/PJ",hv:ph.yellowAvg,av:pa.yellowAvg},
            {icon:"🟥",label:"Rojas/PJ",hv:ph.redAvg,av:pa.redAvg},
            {icon:"🛡️",label:"Goles en contra/PJ",hv:ph.goalsAgainst,av:pa.goalsAgainst},
          ].map((row,i) => (
            [
              <div key={`hv${i}`} style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:800,color:"#00d4aa",textAlign:"center"}}>{row.hv}</div>,
              <div key={`lbl${i}`} style={{textAlign:"center"}}>
                <div style={{fontSize:14}}>{row.icon}</div>
                <div style={{fontSize:9,color:"#8899aa",whiteSpace:"nowrap"}}>{row.label}</div>
              </div>,
              <div key={`av${i}`} style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:800,color:"#e84393",textAlign:"center"}}>{row.av}</div>
            ]
          ))}
        </div>
      </div>

      <div style={SEC}>
        <div style={STIT}>📈 % Victorias (ultimos 100 partidos)</div>
        <div style={{marginBottom:10}}>
          <div style={{fontSize:10,color:"#00d4aa",marginBottom:4}}>{ph.name}</div>
          <div style={{display:"flex",height:18,borderRadius:4,overflow:"hidden",gap:2}}>
            <div style={{width:`${ph.wins}%`,background:"#00d4aa",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#0a0e1a"}}>{ph.wins}%</div>
            <div style={{width:`${ph.draws}%`,background:"#ffd700",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#0a0e1a"}}>{ph.draws}%</div>
            <div style={{flex:1,background:"#2a1a2a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#8899aa"}}>{ph.losses}%</div>
          </div>
        </div>
        <div>
          <div style={{fontSize:10,color:"#e84393",marginBottom:4}}>{pa.name}</div>
          <div style={{display:"flex",height:18,borderRadius:4,overflow:"hidden",gap:2}}>
            <div style={{width:`${pa.wins}%`,background:"#e84393",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#fff"}}>{pa.wins}%</div>
            <div style={{width:`${pa.draws}%`,background:"#ffd700",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#0a0e1a"}}>{pa.draws}%</div>
            <div style={{flex:1,background:"#2a1a2a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#8899aa"}}>{pa.losses}%</div>
          </div>
        </div>
        <div style={{display:"flex",gap:12,marginTop:6,fontSize:9,color:"#8899aa"}}>
          <span style={{color:"#aaa"}}>■ Victoria</span>
          <span style={{color:"#ffd700"}}>■ Empate</span>
          <span>■ Derrota</span>
        </div>
      </div>

      <div style={SEC}>
        <div style={STIT}>⏱️ Intervalo de goles (%)</div>
        <div style={{marginBottom:8}}>
          <div style={{fontSize:10,color:"#00d4aa",marginBottom:4}}>{ph.name}</div>
          <IntervalBar intervals={ph.goalIntervals} color="#00d4aa"/>
        </div>
        <div>
          <div style={{fontSize:10,color:"#e84393",marginBottom:4}}>{pa.name}</div>
          <IntervalBar intervals={pa.goalIntervals} color="#e84393"/>
        </div>
      </div>

      <div style={SEC}>
        <div style={STIT}>👤 Jugadores clave</div>
        <div style={{marginBottom:8}}>
          <span style={{fontSize:10,color:"#00d4aa",fontWeight:700}}>{ph.name}: </span>
          <span style={{fontSize:11,color:"#ccd"}}>{ph.keyPlayers}</span>
        </div>
        <div style={{fontSize:10,color:"#8899aa",fontStyle:"italic",marginBottom:10}}>{ph.note}</div>
        <div style={{marginBottom:8}}>
          <span style={{fontSize:10,color:"#e84393",fontWeight:700}}>{pa.name}: </span>
          <span style={{fontSize:11,color:"#ccd"}}>{pa.keyPlayers}</span>
        </div>
        <div style={{fontSize:10,color:"#8899aa",fontStyle:"italic"}}>{pa.note}</div>
      </div>

      <div style={SEC}>
        <div style={STIT}>⚔️ Historial de enfrentamientos</div>
        <H2H h2h={h2h} homeTeam={home} awayTeam={away}/>
      </div>

      <div style={{...SEC,borderColor:"#00d4aa50"}}>
        <div style={STIT}>🔮 Prediccion</div>
        <div style={{background:"linear-gradient(135deg,#00d4aa15,#e8439315)",border:"1px solid #00d4aa30",borderRadius:8,padding:12,fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,fontWeight:600,lineHeight:1.5,color:"#e8eaf0"}}>
          {prediction}
        </div>
      </div>
    </>
  );
}

const SCORERS = [
  {pos:1, name:"Folarin Balogun", country:"EE.UU.", goals:2, assists:0, matches:1, flag:"🇺🇸"},
  {pos:2, name:"Raúl Jiménez", country:"México", goals:1, assists:0, matches:1, flag:"🇲🇽"},
  {pos:2, name:"Hirving Lozano", country:"México", goals:1, assists:1, matches:1, flag:"🇲🇽"},
  {pos:2, name:"Son Heung-min", country:"Corea del Sur", goals:1, assists:0, matches:1, flag:"🇰🇷"},
  {pos:2, name:"Hwang Hee-chan", country:"Corea del Sur", goals:1, assists:0, matches:1, flag:"🇰🇷"},
  {pos:2, name:"Patrik Schick", country:"Chequia", goals:1, assists:0, matches:1, flag:"🇨🇿"},
  {pos:2, name:"Cyle Larin", country:"Canadá", goals:1, assists:0, matches:1, flag:"🇨🇦"},
  {pos:2, name:"Jovo Lukic", country:"Bosnia y Herz.", goals:1, assists:0, matches:1, flag:"🇧🇦"},
  {pos:2, name:"Gio Reyna", country:"EE.UU.", goals:1, assists:0, matches:1, flag:"🇺🇸"},
  {pos:2, name:"Mauricio", country:"Paraguay", goals:1, assists:0, matches:1, flag:"🇵🇾"},
];

const TEAM_SQUADS = [
  {country:"EE.UU.", flag:"🇺🇸", group:"D", players:[
    {name:"Folarin Balogun", pos:"DEL", goals:2, assists:0},
    {name:"Gio Reyna", pos:"MED", goals:1, assists:0},
    {name:"Christian Pulisic", pos:"MED", goals:0, assists:2},
    {name:"Tim Weah", pos:"DEL", goals:0, assists:0},
    {name:"Tyler Adams", pos:"MED", goals:0, assists:0},
  ]},
  {country:"México", flag:"🇲🇽", group:"A", players:[
    {name:"Raúl Jiménez", pos:"DEL", goals:1, assists:0},
    {name:"Hirving Lozano", pos:"DEL", goals:1, assists:0},
    {name:"Julián Quiñones", pos:"DEL", goals:0, assists:1},
    {name:"Edson Álvarez", pos:"MED", goals:0, assists:0},
    {name:"Santiago Giménez", pos:"DEL", goals:0, assists:0},
  ]},
  {country:"Brasil", flag:"🇧🇷", group:"C", players:[
    {name:"Vinícius Jr", pos:"DEL", goals:0, assists:0},
    {name:"Raphinha", pos:"DEL", goals:0, assists:0},
    {name:"Rodrygo", pos:"DEL", goals:0, assists:0},
    {name:"Igor Thiago", pos:"DEL", goals:0, assists:0},
    {name:"Lucas Paquetá", pos:"MED", goals:0, assists:0},
  ]},
  {country:"Argentina", flag:"🇦🇷", group:"I", players:[
    {name:"Lionel Messi", pos:"DEL", goals:0, assists:0},
    {name:"Lautaro Martínez", pos:"DEL", goals:0, assists:0},
    {name:"Julián Álvarez", pos:"DEL", goals:0, assists:0},
    {name:"Rodrigo De Paul", pos:"MED", goals:0, assists:0},
    {name:"Enzo Fernández", pos:"MED", goals:0, assists:0},
  ]},
  {country:"Francia", flag:"🇫🇷", group:"J", players:[
    {name:"Kylian Mbappé", pos:"DEL", goals:0, assists:0},
    {name:"Antoine Griezmann", pos:"DEL", goals:0, assists:0},
    {name:"Ousmane Dembélé", pos:"DEL", goals:0, assists:0},
    {name:"Aurélien Tchouaméni", pos:"MED", goals:0, assists:0},
    {name:"Randal Kolo Muani", pos:"DEL", goals:0, assists:0},
  ]},
  {country:"España", flag:"🇪🇸", group:"K", players:[
    {name:"Lamine Yamal", pos:"DEL", goals:0, assists:0},
    {name:"Mikel Oyarzabal", pos:"DEL", goals:0, assists:0},
    {name:"Álvaro Morata", pos:"DEL", goals:0, assists:0},
    {name:"Pedri", pos:"MED", goals:0, assists:0},
    {name:"Rodri", pos:"MED", goals:0, assists:0},
  ]},
  {country:"Alemania", flag:"🇩🇪", group:"E", players:[
    {name:"Jamal Musiala", pos:"DEL", goals:0, assists:0},
    {name:"Florian Wirtz", pos:"MED", goals:0, assists:0},
    {name:"Kai Havertz", pos:"DEL", goals:0, assists:0},
    {name:"Leroy Sané", pos:"DEL", goals:0, assists:0},
    {name:"Thomas Müller", pos:"DEL", goals:0, assists:0},
  ]},
  {country:"Inglaterra", flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", group:"L", players:[
    {name:"Harry Kane", pos:"DEL", goals:0, assists:0},
    {name:"Jude Bellingham", pos:"MED", goals:0, assists:0},
    {name:"Phil Foden", pos:"MED", goals:0, assists:0},
    {name:"Bukayo Saka", pos:"DEL", goals:0, assists:0},
    {name:"Marcus Rashford", pos:"DEL", goals:0, assists:0},
  ]},
  {country:"Portugal", flag:"🇵🇹", group:"H", players:[
    {name:"Cristiano Ronaldo", pos:"DEL", goals:0, assists:0},
    {name:"Bruno Fernandes", pos:"MED", goals:0, assists:0},
    {name:"Rafael Leão", pos:"DEL", goals:0, assists:0},
    {name:"Bernardo Silva", pos:"MED", goals:0, assists:0},
    {name:"João Félix", pos:"DEL", goals:0, assists:0},
  ]},
  {country:"Países Bajos", flag:"🇳🇱", group:"F", players:[
    {name:"Cody Gakpo", pos:"DEL", goals:0, assists:0},
    {name:"Virgil van Dijk", pos:"DEF", goals:0, assists:0},
    {name:"Xavi Simons", pos:"MED", goals:0, assists:0},
    {name:"Wout Weghorst", pos:"DEL", goals:0, assists:0},
    {name:"Memphis Depay", pos:"DEL", goals:0, assists:0},
  ]},
];

export default function App() {
  const [view, setView] = useState("matches");
  const [filter, setFilter] = useState("all");
  const [sel, setSel] = useState(null);
  const [squadSel, setSquadSel] = useState(null);
  const [liveMatches, setLiveMatches] = useState([]);
  const [liveTeams, setLiveTeams] = useState({});
  const [loadingLive, setLoadingLive] = useState(true);
  const [matchDetail, setMatchDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Load live matches from our Vercel proxy
  useEffect(() => {
    async function loadLive() {
      try {
        const [mRes, tRes] = await Promise.all([
          fetch('/api/matches'),
          fetch('/api/teams'),
        ]);
        const mData = await mRes.json();
        const tData = await tRes.json();
        const teamsMap = {};
        (tData.data || []).forEach(t => { teamsMap[t.id] = t; });
        setLiveTeams(teamsMap);
        setLiveMatches(mData.data || []);
      } catch (e) {
        console.error('Live data failed, using static data', e);
      } finally {
        setLoadingLive(false);
      }
    }
    loadLive();
  }, []);

  // Use live data if available, fallback to MATCHES static data
  const allMatches = liveMatches.length > 0
    ? liveMatches.map(m => ({
        id: m.id,
        group: m.stage || 'Grupo',
        date: new Date(m.date).toLocaleDateString('es-ES', {day:'numeric',month:'short'}),
        home: liveTeams[m.home_team_id]?.name || '—',
        away: liveTeams[m.away_team_id]?.name || '—',
        hs: m.home_score,
        as: m.away_score,
        status: m.status === 'final' || m.status === 'finished' ? 'final'
              : m.status === 'in_progress' ? 'live' : 'upcoming',
        venue: m.venue || '',
        home_team_id: m.home_team_id,
        away_team_id: m.away_team_id,
        // Keep static pre-match data by matching team names
        pre: MATCHES.find(s =>
          s.home === liveTeams[m.home_team_id]?.name ||
          s.away === liveTeams[m.away_team_id]?.name
        )?.pre || null,
        h2h: MATCHES.find(s =>
          s.home === liveTeams[m.home_team_id]?.name
        )?.h2h || [],
        stats: null, goals: [], yellows: [], reds: [],
      }))
    : MATCHES;

  async function selectMatch(m) {
    setSel(m);
    setMatchDetail(null);
    if (m.status === 'upcoming' || !m.home_team_id) return;
    setLoadingDetail(true);
    try {
      const [sRes, eRes] = await Promise.all([
        fetch(`/api/match?match_id=${m.id}&type=stats`),
        fetch(`/api/match?match_id=${m.id}&type=events`),
      ]);
      const sData = await sRes.json();
      const eData = await eRes.json();
      const statsArr = sData.data || [];
      const homeStats = statsArr.find(s => s.team_id === m.home_team_id);
      const awayStats = statsArr.find(s => s.team_id === m.away_team_id);
      const events = eData.data || [];
      const goals = events.filter(e => ['goal','own_goal','penalty'].includes(e.type))
        .map(e => ({
          min: e.minute,
          player: e.player?.name || '—',
          team: e.team_id === m.home_team_id ? 'home' : 'away',
          type: e.type,
        }));
      const yellows = events.filter(e => e.type === 'yellow_card')
        .map(e => ({ min: e.minute, player: e.player?.name || '—', team: e.team_id === m.home_team_id ? 'home' : 'away' }));
      const reds = events.filter(e => e.type === 'red_card')
        .map(e => ({ min: e.minute, player: e.player?.name || '—', team: e.team_id === m.home_team_id ? 'home' : 'away' }));
      setMatchDetail({
        stats: homeStats ? {
          hp: homeStats.possession, ap: awayStats?.possession,
          hsh: homeStats.shots_total, ash: awayStats?.shots_total,
          hsot: homeStats.shots_on_target, asot: awayStats?.shots_on_target,
          hc: homeStats.corners, ac: awayStats?.corners,
          hf: homeStats.fouls, af: awayStats?.fouls,
        } : null,
        goals, yellows, reds,
      });
    } catch(e) {
      console.error(e);
    } finally {
      setLoadingDetail(false);
    }
  }

  const activeSel = sel ? {
    ...sel,
    stats: matchDetail?.stats || sel.stats,
    goals: matchDetail?.goals || sel.goals,
    yellows: matchDetail?.yellows || sel.yellows,
    reds: matchDetail?.reds || sel.reds,
  } : null;

  const filtered = allMatches.filter(m => {
    if (filter === "live") return m.status === "live";
    if (filter === "final") return m.status === "final";
    if (filter === "upcoming") return m.status === "upcoming";
    return true;
  });

  const sc = s => s==="live" ? "#e84393" : s==="final" ? "#00d4aa" : "#8899aa";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#0a0e1a;color:#e8eaf0;font-family:'Inter',sans-serif;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-thumb{background:#1e2d40;border-radius:4px;}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}
      `}</style>

      <div style={{display:"flex",flexDirection:"column",height:"100vh",overflow:"hidden"}}>

        <div style={{background:"linear-gradient(135deg,#0d1b2a,#1a0a2e)",borderBottom:"2px solid #00d4aa",padding:"10px 14px",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <span style={{fontSize:22}}>🏆</span>
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:800,letterSpacing:2,textTransform:"uppercase",lineHeight:1}}>MUNDIAL <span style={{color:"#00d4aa"}}>2026</span></div>
            <div style={{fontSize:9,color:"#8899aa",letterSpacing:1,textTransform:"uppercase"}}>Analisis de Partidos</div>
          </div>
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:4}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#e84393",boxShadow:"0 0 6px #e84393",animation:"pulse 1.5s infinite"}}/>
            <span style={{fontSize:9,color:"#e84393",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1,fontWeight:700}}>LIVE</span>
          </div>
        </div>

        {/* ── Nav tabs ── */}
        <div style={{display:"flex",borderBottom:"1px solid #1e2d40",flexShrink:0,background:"#0d1320"}}>
          {[["matches","⚽ Partidos"],["scorers","🥇 Goleadores"],["squads","👕 Selecciones"]].map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)} style={{
              flex:1,padding:"9px 4px",border:"none",borderBottom:`2px solid ${view===v?"#00d4aa":"transparent"}`,
              background:"transparent",color:view===v?"#00d4aa":"#8899aa",
              fontSize:11,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,
              letterSpacing:1,textTransform:"uppercase",cursor:"pointer"
            }}>{l}</button>
          ))}
        </div>
        {view === "matches" && <>
          <div style={{display:"flex",gap:3,padding:"6px 8px",background:"#0d1320",borderBottom:"1px solid #1e2d40",flexShrink:0}}>
          {[["all","Todos"],["final","Final"],["upcoming","Proximos"],["live","En vivo"]].map(([v,l]) => (
            <button key={v} onClick={() => setFilter(v)} style={{
              flex:1, padding:"5px 2px", border:`1px solid ${filter===v?"#00d4aa":"#1e2d40"}`,
              borderRadius:5, background:filter===v?"#00d4aa20":"transparent",
              color:filter===v?"#00d4aa":"#8899aa", fontSize:10,
              fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700,
              letterSpacing:0.5, textTransform:"uppercase", cursor:"pointer"
            }}>{l}</button>
          ))}
          </div>

          <div style={{display:"flex",gap:6,padding:"6px 8px",overflowX:"auto",flexShrink:0,background:"#0a0e1a",borderBottom:"1px solid #1e2d40"}}>
          {loadingLive && <div style={{color:"#8899aa",fontSize:11,padding:"10px 6px",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>Cargando partidos en vivo...</div>}
          {filtered.map(m => (
            <div key={m.id} onClick={() => selectMatch(m)} style={{
              minWidth:140, padding:"8px 10px",
              border:`2px solid ${sel?.id===m.id?"#00d4aa":"#1e2d40"}`,
              borderRadius:8, cursor:"pointer", flexShrink:0,
              background:sel?.id===m.id?"#00d4aa10":"#111827"
            }}>
              <div style={{fontSize:8,color:"#00d4aa",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>{m.group} · {m.date}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,fontWeight:700}}>{m.home}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:800,letterSpacing:2,color:"#fff",margin:"2px 0"}}>{m.status!=="upcoming"?`${m.hs}–${m.as}`:"vs"}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,fontWeight:700,marginBottom:5}}>{m.away}</div>
              <span style={{fontSize:9,padding:"2px 5px",borderRadius:3,background:`${sc(m.status)}20`,color:sc(m.status),fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:0.5,textTransform:"uppercase"}}>
                {m.status==="final"?"Final":m.status==="live"?"En vivo":"Proximo"}
              </span>
            </div>
          ))}
        </div>

        <div style={{flex:1,overflowY:"auto",padding:10,background:"#0a0e1a"}}>
          {loadingDetail && <div style={{color:'#8899aa',fontSize:11,padding:8,textAlign:'center',fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>Cargando estadisticas...</div>}
          {!activeSel ? (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#334455",textAlign:"center"}}>
              <div style={{fontSize:44,marginBottom:8,opacity:0.2}}>⚽</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,letterSpacing:2,textTransform:"uppercase"}}>Toca un partido arriba</div>
            </div>
          ) : (
            <>
              <div style={{background:"linear-gradient(135deg,#0d1b2a,#1a0a2e)",border:"1px solid #1e2d40",borderRadius:10,padding:14,marginBottom:10,textAlign:"center"}}>
                <div style={{fontSize:9,color:"#00d4aa",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6}}>{activeSel.group} · {activeSel.date} · {activeSel.venue}</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:800,flex:1,textAlign:"right"}}>{activeSel.home}</div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:40,fontWeight:800,letterSpacing:3,lineHeight:1}}>
                      {activeSel.status!=="upcoming"?`${activeSel.hs} — ${activeSel.as}`:"vs"}
                    </div>
                    <span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:3,background:`${sc(activeSel.status)}20`,color:sc(activeSel.status),fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1,textTransform:"uppercase"}}>
                      {activeSel.status==="final"?"Final":activeSel.status==="live"?"En vivo":"Proximo"}
                    </span>
                  </div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:800,flex:1,textAlign:"left"}}>{activeSel.away}</div>
                </div>
              </div>

              {activeSel.status === "upcoming" ? (
                <PreMatch m={activeSel}/>
              ) : (
                <>
                  <div style={SEC}>
                    <div style={STIT}>📊 Estadisticas</div>
                    <StatBar label="Posesion %" home={activeSel.stats.hp} away={activeSel.stats.ap}/>
                    <StatBar label="Tiros totales" home={activeSel.stats.hsh} away={activeSel.stats.ash} color="#aabbcc"/>
                    <StatBar label="Tiros a puerta" home={activeSel.stats.hsot} away={activeSel.stats.asot} color="#ffd700"/>
                    <StatBar label="Corners" home={activeSel.stats.hc} away={activeSel.stats.ac}/>
                    <StatBar label="Faltas" home={activeSel.stats.hf} away={activeSel.stats.af} color="#ff8c42"/>
                  </div>
                  <div style={SEC}>
                    <div style={STIT}>⚽ Goles por intervalo</div>
                    <GoalTimeline goals={activeSel.goals}/>
                  </div>
                  <div style={SEC}>
                    <div style={STIT}>🃏 Tarjetas</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                      {[["home",activeSel.home],["away",activeSel.away]].map(([team,name]) => (
                        <div key={team}>
                          <div style={{fontSize:10,color:"#8899aa",marginBottom:6,textTransform:"uppercase",letterSpacing:1,fontWeight:600}}>{name}</div>
                          <div style={{marginBottom:6}}>
                            <div style={{fontSize:10,color:"#ffd700",marginBottom:3}}>🟨 Amarillas</div>
                            <Cards cards={activeSel.yellows} team={team}/>
                          </div>
                          <div>
                            <div style={{fontSize:10,color:"#ff4444",marginBottom:3}}>🟥 Rojas</div>
                            <Cards cards={activeSel.reds} team={team}/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={SEC}>
                    <div style={STIT}>⚔️ Historial</div>
                    <H2H h2h={activeSel.h2h} homeTeam={activeSel.home} awayTeam={activeSel.away}/>
                  </div>
                  <div style={SEC}>
                    <div style={STIT}>🔮 Dominio del partido</div>
                    <Dominance m={activeSel}/>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        </>}

        {view === "scorers" && (
          <div style={{flex:1,overflowY:"auto",padding:12,background:"#0a0e1a"}}>
            <div style={SEC}>
              <div style={STIT}>🥇 Bota de Oro — Goleadores del torneo</div>
              {SCORERS.map((s,i) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid #0d1320"}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:800,color:i===0?"#ffd700":i<3?"#aabbcc":"#334455",minWidth:28,textAlign:"center"}}>{s.pos}</div>
                  <div style={{fontSize:20}}>{s.flag}</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,fontWeight:700}}>{s.name}</div>
                    <div style={{fontSize:10,color:"#8899aa"}}>{s.country}</div>
                  </div>
                  <div style={{display:"flex",gap:12,alignItems:"center"}}>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:24,fontWeight:800,color:"#00d4aa"}}>{s.goals}</div>
                      <div style={{fontSize:8,color:"#8899aa"}}>GOLES</div>
                    </div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:"#ffd700"}}>{s.assists}</div>
                      <div style={{fontSize:8,color:"#8899aa"}}>ASIST</div>
                    </div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:"#8899aa"}}>{s.matches}</div>
                      <div style={{fontSize:8,color:"#8899aa"}}>PJ</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{...SEC,textAlign:"center",color:"#556677",padding:14}}>
              <div style={{fontSize:11}}>Datos actualizados al 13 Jun · Se actualiza con cada partido</div>
            </div>
          </div>
        )}

        {view === "squads" && (
          <div style={{flex:1,overflowY:"auto",padding:12,background:"#0a0e1a"}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
              {TEAM_SQUADS.map((t,i) => (
                <button key={i} onClick={() => setSquadSel(squadSel?.country===t.country ? null : t)} style={{
                  padding:"6px 10px", border:`1px solid ${squadSel?.country===t.country?"#00d4aa":"#1e2d40"}`,
                  borderRadius:6, background:squadSel?.country===t.country?"#00d4aa20":"#111827",
                  color:squadSel?.country===t.country?"#00d4aa":"#ccd",
                  fontSize:12, cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif",
                  fontWeight:700, display:"flex", alignItems:"center", gap:6
                }}>
                  <span style={{fontSize:16}}>{t.flag}</span>{t.country}
                  <span style={{fontSize:9,color:"#556677"}}>Gr.{t.group}</span>
                </button>
              ))}
            </div>

            {squadSel ? (
              <div style={SEC}>
                <div style={STIT}>{squadSel.flag} {squadSel.country} — Jugadores destacados</div>
                <div style={{display:"grid",gridTemplateColumns:"auto 1fr auto auto auto",gap:"6px 10px",alignItems:"center"}}>
                  <div style={{fontSize:9,color:"#556677"}}>POS</div>
                  <div style={{fontSize:9,color:"#556677"}}>JUGADOR</div>
                  <div style={{fontSize:9,color:"#00d4aa",textAlign:"center"}}>G</div>
                  <div style={{fontSize:9,color:"#ffd700",textAlign:"center"}}>A</div>
                  <div style={{fontSize:9,color:"#8899aa",textAlign:"center"}}>PJ</div>
                  {squadSel.players.map((p,i) => [
                    <div key={`pos${i}`} style={{fontSize:9,color:"#556677",background:"#1e2d40",borderRadius:3,padding:"1px 4px",textAlign:"center"}}>{p.pos}</div>,
                    <div key={`nm${i}`} style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,fontWeight:700}}>{p.name}</div>,
                    <div key={`g${i}`} style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:800,color:"#00d4aa",textAlign:"center"}}>{p.goals}</div>,
                    <div key={`a${i}`} style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:"#ffd700",textAlign:"center"}}>{p.assists}</div>,
                    <div key={`pj${i}`} style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,color:"#8899aa",textAlign:"center"}}>1</div>,
                  ])}
                </div>
              </div>
            ) : (
              <div style={{textAlign:"center",color:"#334455",padding:30}}>
                <div style={{fontSize:36,marginBottom:8}}>👕</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,letterSpacing:2,textTransform:"uppercase"}}>Toca una seleccion</div>
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
}
