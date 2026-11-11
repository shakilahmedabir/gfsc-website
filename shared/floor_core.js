// GFSC floor plan data + SVG drawing. Shared by floor_plan.html (PDF) and gfsc_floor_explorer.html.
// ---------- colours by room type ----------
const KIND = {
  class:   {fill:'#E9EAF7', name:'Class Room'},
  office:  {fill:'#FFE7C7', name:'Office / Admin'},
  lab:     {fill:'#D9EEFB', name:'Lab'},
  special: {fill:'#FFF4C2', name:'Hall / Club / Activity'},
  prayer:  {fill:'#DDF1E1', name:'Prayer Room'},
  wc:      {fill:'#ECECEF', name:'Wash Room'},
  service: {fill:'#F2EEE8', name:'Store / Utility'},
  lift:    {fill:'#C9CBEA', name:'Lift & Stairs'}
};
const CORRIDOR = '#FBFBFE';

// ---------- floor data (units: building = 230 x 188) ----------
// opt: sub (class / section), ac (number of AC units), pts (polygon outline), dash (movable partition)
function R(x,y,w,h,label,num,kind,opt){ return {x,y,w,h,label,num:num||'',kind,opt:opt||{}}; }
const C=(slot,num,sub,opt)=>R(...S[slot],'Class Room',num,'class',Object.assign({sub},opt||{}));

// common layout used on floors 2-5, 7, 8 (after the November 2026 corrections)
const S = {TL:[0,0,66,38], TS:[66,0,34,30], W1:[100,0,17.5,30], W2:[117.5,0,17.5,30], TR:[135,0,95,55],
           L2:[0,38,75,48], L3:[0,86,75,48], BL:[0,134,100,54],
           R2:[155,55,75,64],          // upper right room: shares one wall with the top-right room
           B1:[135,140,47,48],         // bottom middle room
           B2:[182,119,48,69],         // bottom right room, extended up to the new wall
           B2s:[182,140,48,48]};       // bottom right room, original size (2nd floor)
const at=(slot,label,num,kind,opt)=>R(...S[slot],label,num,kind,opt);
// stair core: lift on top, landing in the middle (doors left + right), stairs below. No gap to the rooms.
// x1/x2 = core walls, y1 = top of lift, ly = bottom of lift, sy = top of stairs, dy = landing doors
const CORE_STD={x1:100,x2:135,y1:88,ly:116,sy:128,dy:122};
const LIFT_STOPS=['g','3','5','7','9','10'];   // lift gate opens (stair side) only on these floors

// doors: [x, y, 'v'|'h', length]   windows: same format, on outer walls
const D=(x,y,o,l)=>({x,y,o,l:l||7});
const STD_DOORS=[D(66,34,'v',5),D(92,30,'h'),D(108,30,'h'),D(126,30,'h'),D(75,78,'v'),D(75,126,'v'),
                 D(90,134,'h'),D(135,44,'v'),D(155,66,'v'),D(141,140,'h'),D(182,130,'v')];
const WC2=[at('W1','Girls WC','','wc',{stalls:3}),at('W2','Boys WC','','wc',{stalls:3})];   // each WC has 3 sections
// window plan of the 3rd floor, used on floors 3 - 8
const WIN3=[D(28,0,'h',14),D(76,0,'h',14),D(205,0,'h',14),
            D(0,17,'v',14),D(0,63,'v',14),D(0,109,'v',14),D(0,158,'v',14),
            D(230,30,'v',14),D(230,86,'v',14),D(230,131,'v',14),D(230,170,'v',14),
            D(28,188,'h',14),D(78,188,'h',14),D(158,188,'h',14),D(205,188,'h',14)];
const SAFE={x:106,y:40};
const CORR_STD=[{x:115,y:72,t:'Corridor'}];

const FLOORS = [
 {id:'g', name:'Ground Floor', short:'Ground', desc:'Main entrance, offices and canteen',
  core:{x1:84,x2:115,y1:98,ly:123,sy:150,dy:136,label:'Lift (Service)'},
  icPoints:[{label:'Gate - 1',at:[57,180]},{label:'Gate - 2',at:[28,4.5]},{label:'Lift',at:[93.7,141.5]}],
  gates:[{x1:48,y1:188,x2:79,y2:188,label:'Gate - 1',lx:63.5,ly:197},{x1:0,y1:2,x2:0,y2:14,label:'Gate - 2',lx:14,ly:9.5}],
  notes:[{x:144,y:80,t:'Lobby &'},{x:144,y:87,t:'Waiting Area'},{x:42,y:150,t:'Open Passage'}],
  spaces:['Lobby & Waiting Area','Open Passage'],
  walls:[[173,96,173,114]],
  doors:[D(127.6,26,'v'),D(124,16,'h',5),D(88,15,'h',5),D(152,17,'h'),D(107,46,'h'),D(13,86,'h'),D(173,41,'v'),D(173,89,'v'),
         D(148,142,'h',14),D(194,142,'h',9),D(206,148,'v',6),D(206,177,'v',6)],
  windows:[D(230,31,'v',12),D(230,71,'v',14)],
  rooms:[
   R(0,20,27,66,'Canteen','','special'),
   R(84,0,34,15,'Wash Room','','wc'),
   R(91,15,27,8,'Fresh Water','','service'),
   R(118,0,12,16,'Wash Room','','wc'),
   R(130,0,43,17,'Store Room','','service'),
   R(173,0,57,17,'Generator Room','','service'),
   R(115,142,91,46,"Principal's Room",'','office',{ac:2,icp:1}),
   R(173,17,57,29,'Admin Room','','office'),
   R(173,46,57,50,'Accounts Room','','office'),
   R(186,103,40,15,'Reception / Info Desk','','office',{icAt:[200,119.5]}),
   R(127.6,17,45.4,19,'Multi-function Room','','office'),
   R(84,46,31,52,'Green Book House','','special'),
   R(206,142,24,24,'Prayer Room','','prayer'),
   R(206,166,24,22,'Wash Room','','wc')
  ]},
 {id:'2', name:'2nd Floor', notes:CORR_STD, short:'2nd', desc:'Play, Nursery, KG and Class I · Education Advisor Room',
  safe:null,
  doors:[D(66,34,'v',5),D(92,30,'h'),D(108,30,'h'),D(126,30,'h'),D(75,74,'v'),D(92,86,'h'),D(40,168,'v',7),
         D(135,45,'v'),D(157,64,'v'),D(158,140,'h'),D(182,130,'v')],
  windows:[D(28,0,'h',14),D(160,0,'h',12),D(203,0,'h',14),D(0,17,'v',14),D(0,62,'v',14),D(0,112,'v',14),D(0,170,'v',14),
           D(230,20,'v',12),D(230,88,'v',12),D(230,130,'v',10),D(230,163,'v',12),
           D(25,188,'h',14),D(71,188,'h',14),D(155,188,'h',14),D(204,188,'h',14)],
  rooms:[
   C('TL','204','Class I (EV)'), at('TS','Prayer Room','','prayer'), ...WC2,
   C('TR','205','Play Class'), C('L2','203','Class I (BM)'),
   R(0,86,100,102,'Play Zone','201, 202','special',{icAt:[44,181.4],pts:[[0,86],[100,86],[100,188],[40,188],[40,150],[0,150]]}),
   R(0,150,40,38,'Junior Library','','special'),
   C('R2','206','Nursery Class'),
   at('B1','Education Advisor Room','208','office'),
   C('B2','207','KG Class')
  ]},
 {id:'3', name:'3rd Floor', notes:CORR_STD, short:'3rd', desc:'Classes II – IV · Finance Director · English Language Club',
  safe:SAFE, doors:STD_DOORS, windows:WIN3,
  rooms:[
   C('TL','304','Class IV (EV)'), at('TS','Finance Director','','office',{ac:1}), ...WC2,
   at('TR',"Teacher's Room",'305','office'), C('L2','303','Class III (EV)'),
   C('L3','302','Class II (EV)'), at('BL','English Language Club','301','special',{ac:1}),
   C('R2','306','Class IV (BM)'), C('B1','308','Class II (BM)'), C('B2','307','Class III (BM)')
  ]},
 {id:'4', name:'4th Floor', notes:CORR_STD, short:'4th', desc:'Classes V – X (English Version)',
  safe:SAFE, doors:STD_DOORS, windows:WIN3,
  rooms:[
   C('TL','404','Class VI (EV)',{ac:1}), at('TS',"Teacher's Room",'','office'), ...WC2,
   C('TR','405','Class X – Science (EV)',{ac:1}), C('L2','403','Class VII (EV)',{ac:1}),
   C('L3','402','Class IX – Irish (B.S.)',{ac:1}), C('BL','401','Class IX – Ivy (EV)',{ac:1}),
   C('R2','406','Class V (EV)',{ac:1}), C('B1','408','Class X – B.S. (EV)',{ac:1}), C('B2','407','Class VIII (EV)',{ac:1})
  ]},
 {id:'5', name:'5th Floor', notes:CORR_STD, short:'5th', desc:'Classes V – VIII (Bangla Medium) and Teacher’s Room',
  safe:SAFE, doors:STD_DOORS, windows:WIN3,
  rooms:[
   C('TL','504','Class VII – Garrison (BM)'), at('TS',"Teacher's Room",'','office'), ...WC2,
   C('TR','505','Class VI – Falguni (BM)'), C('L2','503','Class VII – Genius (BM)'),
   C('L3','502','Class V (BM)'), C('BL','501','Class V (BM)'),
   C('R2','506','Class VIII (BM)'), C('B1','508','Class VI (BM)'), C('B2','507','Class VIII (BM)')
  ]},
 {id:'6', name:'6th Floor', short:'6th', desc:'Auditorium (Hall Room), canteen and indoor games',
  core:{x1:95,x2:125,y1:88,ly:116,sy:128,dy:122},
  notes:[{x:47.5,y:183,t:'- - movable partition - -',small:true},{x:110,y:45,t:'Corridor'}],
  doors:[D(87,58,'h')], windows:WIN3,
  rooms:[
   R(0,0,95,58,'Canteen','','special',{dash:true}),
   R(0,58,95,36,'Indoor Games','','special',{dash:true}),
   R(0,94,95,94,'Room','602','class',{dash:true}),
   R(125,0,105,188,'Hall Room / Auditorium','601','special')
  ]},
 {id:'7', name:'7th Floor', notes:CORR_STD, short:'7th', desc:'Classes IX – X, Teacher’s Room and Vice Principal’s Room',
  safe:null, doors:STD_DOORS, windows:WIN3,
  rooms:[
   C('TL','704','Class X – Jupiter'), at('TS',"Vice Principal's Room",'','office',{icp:1}), ...WC2,
   C('TR','705','Class IX – Icon (BM)'), C('L2','703',''),
   at('L3','School Library','702','special'), C('BL','701','Class IX – Irish (BM)'),
   at('R2',"Teacher's Room",'706','office'), C('B1','708',''), C('B2','707','Class X – Juvenile, Science (BM)')
  ]},
 {id:'8', name:'8th Floor', notes:CORR_STD, short:'8th', desc:'Classes and Computer Lab',
  safe:SAFE,
  doors:[D(66,34,'v',5),D(92,30,'h'),D(108,30,'h'),D(126,30,'h'),D(75,78,'v'),D(75,126,'v'),D(90,134,'h'),
         D(135,44,'v'),D(150,64,'v'),D(150,108,'v'),D(142.5,128,'h',8)], windows:WIN3,
  rooms:[
   C('TL','804','',{ac:1}), at('TS',"Teacher's Room",'','office'), ...WC2,
   C('TR','805','',{ac:1}), C('L2','803','',{ac:1}), C('L3','802','',{ac:1}), C('BL','801','',{ac:1}),
   R(150,55,80,60,'Class Room','806','class'),
   R(150,115,80,73,'Computer Lab','807','lab',{ac:2,pts:[[150,115],[230,115],[230,188],[135,188],[135,128],[150,128]]})
  ]},
 {id:'9', name:'9th Floor', short:'9th', desc:'Class XII, science labs and Girls’ Common Room',
  core:{x1:100,x2:130,y1:88,ly:116,sy:128,dy:122}, safe:{x:108,y:20}, notes:[{x:87,y:62,t:'Corridor'}],
  doors:[D(66,34,'v',5),D(76,30,'h',6),D(93,30,'h',6),D(75,76,'v'),D(75,124,'v'),D(90,134,'h'),D(130,30,'v'),D(98,80,'v'),
         D(137,120,'h',8),D(137,132,'h',8),D(143.6,126,'v',6)],
  windows:[D(30,0,'h',14),D(0,20,'v',12),D(0,62,'v',14),D(0,110,'v',14),D(0,160,'v',14),D(30,188,'h',16),D(80,188,'h',14),
           D(182,0,'h',16),D(230,28,'v',14),D(230,90,'v',14),D(230,160,'v',14),D(178,188,'h',14)],
  rooms:[
   R(0,0,66,38,'Class Room','904','class',{sub:'Class XII – Science (EV)',ac:1}),
   R(66,0,19,30,"Teacher's Room",'','office'),
   R(85,0,22,30,'Wash Room','','wc'),
   R(98,38,32,50,"Girls' Common Room",'','office'),
   R(130,0,100,58,'Biology Lab','905','lab'),
   C('L2','903','Class XII – Business Studies (BM)',{ac:1}), C('L3','902','Class XII – Humanities (BM)',{ac:1}),
   C('BL','901','Class XII – Science (BM)',{ac:1}),
   R(130,58,100,62,'Physics Lab','906','lab'),
   R(143.6,120,86.4,12,'Store Room','','service'),
   R(130,132,100,56,'Chemistry Lab','907','lab')
  ]},
 {id:'10', name:'10th Floor (Top)', short:'10th', desc:'Chairman’s Room, meeting and guest rooms, College Library',
  core:{x1:90,x2:124,y1:88,ly:116,sy:128,dy:122}, notes:[{x:120,y:72,t:'Corridor'}],
  doors:[D(62,58,'h'),D(90,68,'v'),D(136,9,'v',6),D(113,53,'h'),D(142,52,'h'),D(150,62,'v'),D(182,116,'h'),
         D(150,125,'v'),D(140,134,'h'),D(150,145,'v',6),D(168,176,'v',6)],
  windows:[D(18,0,'h',14),D(52,0,'h',12),D(0,18,'v',12),D(178,0,'h',14),D(230,30,'v',14),D(230,88,'v',16),
           D(230,145,'v',10),D(230,172,'v',10),D(200,188,'h',14)],
  rooms:[
   R(0,0,72,58,'Staff Room','','office',{pts:[[0,0],[72,0],[72,34],[90,34],[90,58],[0,58]]}),
   R(72,0,18,34,'Wash Room','','wc'),
   R(0,58,55,42,'Store','','service'),
   R(55,58,35,42,'Dining','','special'),
   R(90,26,46,27,'Store Room','','service',{pts:[[90,0],[119,0],[119,26],[136,26],[136,53],[90,53]]}),
   R(119,0,17,26,'Wash Room','','wc'),
   R(136,0,94,52,'Guest Room','','office'),
   R(150,52,80,64,'Meeting Room','','office'),
   R(0,100,90,88,'North South Builders Pvt. Ltd.','','service'),
   R(124,134,26,54,'College Library','','special'),
   R(150,134,18,30,'Wash Room','','wc'),
   R(150,164,18,24,'Wash Room','','wc'),
   R(168,134,62,54,"Chairman's Room",'','office',{icp:1,pts:[[150,116],[230,116],[230,188],[168,188],[168,134],[150,134]]})
  ]}
];

// ---------- lights & fans (fill in later) ----------
// key = 'floor|Room name' (number added for numbered rooms). Value: [lights, fans]. Leave out = blank box.
const LIGHT_FAN = {
  // 'g|Principal\'s Room': [6, 2],
};
const SPACE_STD=['Corridor','Stair landing','Stairs','Lift'];
for(const f of FLOORS){
  f.rooms=f.rooms.map(r=>({...r,opt:{...r.opt}}));   // shared WC objects -> own copy per floor
  f.core=f.core||CORE_STD; f.liftStop=LIFT_STOPS.includes(f.id);
  const seen={};
  const mk=(name,o)=>{ seen[name]=(seen[name]||0)+1; const key=f.id+'|'+name+(seen[name]>1?' #'+seen[name]:'');
    const v=LIGHT_FAN[key]||[]; return Object.assign(o,{key,light:v[0],fan:v[1]}); };
  for(const r of f.rooms) mk(r.label+(r.num?' '+r.num:''), r);
  f.spaceItems=[...(f.spaces||[]), ...(f.id==='g'?['Stair landing','Stairs','Lift']:SPACE_STD)].map(n=>mk(n,{label:n,space:true}));
}

// ---------- AC totals ----------
const AC = {classRooms:0, rooms:0, units:0, byFloor:{}};
for(const f of FLOORS){ let n=0;
  for(const r of f.rooms){ const a=r.opt.ac||0; if(!a) continue; AC.rooms++; AC.units+=a; n+=a; if(r.kind==='class') AC.classRooms++; }
  AC.byFloor[f.id]=n; }

// ---------- intercom: every room except class rooms, stores, wash rooms, dining,
// labs (Computer Lab keeps one), prayer, guest, common room and indoor games.
// Serial starts at 01 with the Principal, then floor by floor upwards.
const NO_IC=/Store|Wash|WC|Dining|Prayer|Guest|Common|Indoor Games|Generator|Fresh Water/;
const hasIc=r=>r.opt.ic===true || (r.opt.ic!==false && !['class','wc','prayer','service'].includes(r.kind)
  && !(r.kind==='lab' && !/Computer/.test(r.label)) && !NO_IC.test(r.label));
const IC_LIST=[]; {
  const kindRank={office:0,special:1,lab:2,service:3};
  for(const id of ['g','2','3','4','5','6','7','8','9','10']){
    const f=FLOORS.find(x=>x.id===id);
    f.rooms.map((r,i)=>({r,i})).filter(o=>hasIc(o.r))
      .sort((a,b)=>(a.r.opt.icp||50)-(b.r.opt.icp||50) || kindRank[a.r.kind]-kindRank[b.r.kind] || a.i-b.i)
      .forEach(o=>{ o.r.ic=String(IC_LIST.length+1).padStart(2,'0'); IC_LIST.push({floor:f.short,room:o.r}); });
    for(const pt of (f.icPoints||[])){ pt.ic=String(IC_LIST.length+1).padStart(2,'0'); IC_LIST.push({floor:f.short,room:pt}); }
  }
}

// ---------- counts (per floor and whole building) ----------
function countFloor(f){
  const c={kinds:{},classRooms:0,acRooms:0,acUnits:0,acClass:0,wc:0,girls:0,boys:0,sections:0,ic:0,
           doors:(f.doors||[]).length,windows:(f.windows||[]).length,safe:f.safe?1:0,lift:1,stairs:1};
  for(const k in KIND) c.kinds[k]=0;
  for(const r of f.rooms){
    c.kinds[r.kind]++;
    if(r.kind==='class') c.classRooms++;
    if(r.opt.ac){ c.acRooms++; c.acUnits+=r.opt.ac; if(r.kind==='class') c.acClass++; }
    if(r.kind==='wc'){ c.wc++; if(/Girls/.test(r.label)) c.girls++; if(/Boys/.test(r.label)) c.boys++; c.sections+=r.opt.stalls||1; }
    if(r.ic) c.ic++;
  }
  c.ic+=(f.icPoints||[]).length;
  c.doors+=2;   // stair landing: left + right door
  const items=[...f.rooms,...f.spaceItems];
  c.lights=items.reduce((a,o)=>a+(o.light||0),0); c.fans=items.reduce((a,o)=>a+(o.fan||0),0);
  c.lfFilled=items.filter(o=>o.light!=null||o.fan!=null).length; c.lfItems=items.length;
  return c;
}
const FC={}; for(const f of FLOORS) FC[f.id]=countFloor(f);
const TOT=Object.values(FC).reduce((t,c)=>{
  for(const k of ['classRooms','acRooms','acUnits','acClass','wc','girls','boys','sections','ic','doors','windows','safe','lift','stairs','lights','fans','lfFilled','lfItems']) t[k]=(t[k]||0)+c[k];
  for(const k in c.kinds) t.kinds[k]=(t.kinds[k]||0)+c.kinds[k];
  return t;},{kinds:{}});

// ---------- SVG drawing ----------
const esc = s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function wrap(text,w,h,maxFs,minFs){
  const words=text.split(' ');
  for(let fs=maxFs; fs>=minFs; fs-=0.2){
    const maxc=Math.max(1,Math.floor((w-5)/(fs*0.58)));
    if(words.some(x=>x.length>maxc)) continue;
    const lines=[]; let cur='';
    for(const wd of words){ const t=cur?cur+' '+wd:wd; if(t.length<=maxc) cur=t; else {lines.push(cur); cur=wd;} }
    if(cur) lines.push(cur);
    if(lines.length*fs*1.18 <= h-2) return {fs,lines};
  }
  return {fs:minFs,lines:[text]};
}

function textBlock(r){
  const sTop=r.opt.stalls?11:0;
  const cx=r.x+r.w/2, cy=r.y+sTop+(r.h-sTop)/2 + (r.opt.ac?1.5:0);
  let rows=[];
  if(r.opt.stalls){
    const L=wrap(r.label, r.w, r.h-sTop-5, 6.2, 2.4);
    rows=[...L.lines.map(t=>({t,fs:L.fs,c:'#1d1f3a',w:700})),{t:`${r.opt.stalls} sections`,fs:2.7,c:'#5b5e7a',w:600}];
  } else
  if(r.kind==='class' && r.num){
    const nf=Math.min(13, r.h*0.32, (r.w-4)/(r.num.length*0.6));
    if(r.opt.sub){
      const S2=wrap(r.opt.sub, r.w, r.h*0.42, Math.min(5.4,nf*0.5), 2.2);
      rows=[{t:r.num,fs:nf,c:'#2E3192',w:800}, ...S2.lines.map(t=>({t,fs:S2.fs,c:'#A2410A',w:700}))];
    } else {
      const lf=Math.min(5.6, nf*0.5, (r.w-5)/(r.label.length*0.58));
      rows=[{t:r.label,fs:lf,c:'#5b5e7a',w:600},{t:r.num,fs:nf,c:'#2E3192',w:800}];
    }
  } else {
    const numFs = r.num ? Math.min(8, r.h*0.2) : 0;
    const L = wrap(r.label, r.w, r.h - (r.num?numFs*1.3:0) - (r.opt.ac?5:0), r.kind==='service'&&r.h<14?4.6:6.2, 2.4);
    rows=L.lines.map(t=>({t,fs:L.fs,c:'#1d1f3a',w:700}));
    if(r.num) rows.push({t:r.num,fs:Math.min(numFs,L.fs*1.25),c:'#2E3192',w:800});
  }
  const total=rows.reduce((a,b)=>a+b.fs*1.18,0);
  let y=cy-total/2;
  return rows.map(o=>{ y+=o.fs*1.18; return `<text x="${cx}" y="${(y-o.fs*0.28).toFixed(2)}" font-size="${o.fs.toFixed(2)}" font-weight="${o.w}" fill="${o.c}" text-anchor="middle">${esc(o.t)}</text>`; }).join('');
}

function acBadge(r){
  const n=r.opt.ac; if(!n) return '';
  const t=n>1?`AC ×${n}`:'AC', w=n>1?14:9, x=r.x+r.w-w-1.6, y=r.y+1.6;
  return `<rect x="${x}" y="${y}" width="${w}" height="5" rx="1.2" fill="#E3F3FC" stroke="#0B78B8" stroke-width=".4"/>
    <text x="${x+w/2}" y="${y+3.7}" font-size="3.4" font-weight="800" fill="#0B78B8" text-anchor="middle">${t}</text>`;
}
function icBadge(r){
  if(!r.ic) return '';
  const [x,y]=r.opt.icAt||[r.x+1.6, r.y+r.h-6.6], w=11.5;
  return `<rect x="${x}" y="${y}" width="${w}" height="5" rx="1.2" fill="#F3EEFB" stroke="#6B3FA0" stroke-width=".4"/>
    <g transform="translate(${x+1.2} ${y+0.9}) scale(.16)" fill="#6B3FA0">${PHONE}</g>
    <text x="${x+w-1.2}" y="${y+3.7}" font-size="3.4" font-weight="800" fill="#6B3FA0" text-anchor="end">${r.ic}</text>`;
}
// small telephone handset, 20 x 20 units
const PHONE=`<path d="M4.5 1.5 L8 1 L9.6 5.6 L7.4 7.2 C8.4 9.6 10.4 11.6 12.8 12.6 L14.4 10.4 L19 12 L18.5 15.5 C18.3 17 17 18 15.5 18 C8 17.5 2.5 12 2 4.5 C2 3 3 1.7 4.5 1.5Z"/>`;
function stallsSvg(r){
  const n=r.opt.stalls; if(!n) return '';
  const sw=r.w/n, y2=r.y+10; let g='';
  for(let i=1;i<n;i++) g+=`<line x1="${r.x+i*sw}" y1="${r.y}" x2="${r.x+i*sw}" y2="${y2}" stroke="#8a8ca8" stroke-width=".45"/>`;
  for(let i=0;i<n;i++){ const x0=r.x+i*sw;
    g+=`<line x1="${x0}" y1="${y2}" x2="${x0+sw*.22}" y2="${y2}" stroke="#8a8ca8" stroke-width=".45"/><line x1="${x0+sw*.78}" y1="${y2}" x2="${x0+sw}" y2="${y2}" stroke="#8a8ca8" stroke-width=".45"/>`; }
  return g;
}
function doorSvg(d){
  const h=d.l/2;
  if(d.o==='v') return `<line x1="${d.x}" y1="${d.y-h}" x2="${d.x}" y2="${d.y+h}" stroke="#fff" stroke-width="1.8"/>
    <line x1="${d.x-1.6}" y1="${d.y-h}" x2="${d.x+1.6}" y2="${d.y-h}" stroke="#F7941D" stroke-width=".7"/>
    <line x1="${d.x-1.6}" y1="${d.y+h}" x2="${d.x+1.6}" y2="${d.y+h}" stroke="#F7941D" stroke-width=".7"/>`;
  return `<line x1="${d.x-h}" y1="${d.y}" x2="${d.x+h}" y2="${d.y}" stroke="#fff" stroke-width="1.8"/>
    <line x1="${d.x-h}" y1="${d.y-1.6}" x2="${d.x-h}" y2="${d.y+1.6}" stroke="#F7941D" stroke-width=".7"/>
    <line x1="${d.x+h}" y1="${d.y-1.6}" x2="${d.x+h}" y2="${d.y+1.6}" stroke="#F7941D" stroke-width=".7"/>`;
}
function windowSvg(w){
  const h=w.l/2;
  const [x1,y1,x2,y2]= w.o==='v'?[w.x,w.y-h,w.x,w.y+h]:[w.x-h,w.y,w.x+h,w.y];
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#5BB6E8" stroke-width="2.6"/>
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#fff" stroke-width=".6"/>`;
}
function safeSvg(s){
  return `<g transform="translate(${s.x} ${s.y})"><path d="M0 -3.4 C1.8 -1 2.4 0 2.4 1 A2.4 2.4 0 0 1 -2.4 1 C-2.4 0 -1.8 -1 0 -3.4Z" fill="#2B9BD8"/>
    <text x="3.6" y="2.2" font-size="3.6" font-weight="700" fill="#0B78B8">Safe Water</text></g>`;
}

function liftSvg(l){
  const lab=l.label||'Lift';
  const fs=Math.min(5.5,(l.w-3)/(lab.length*0.55));
  const gate=l.stop?doorSvg(D(l.x+l.w/2,l.y+l.h,'h',l.w*0.42))
     :`<text x="${l.x+l.w/2}" y="${l.y+l.h-1.2}" font-size="2.6" font-weight="700" fill="#ED1C24" text-anchor="middle">no stop</text>`;
  return `<rect x="${l.x}" y="${l.y}" width="${l.w}" height="${l.h}" fill="${KIND.lift.fill}" stroke="#2E3192" stroke-width=".7"/>
  <rect x="${l.x+l.w*0.3}" y="${l.y+l.h*0.42}" width="${l.w*0.4}" height="${l.h*0.4}" fill="#fff" stroke="#2E3192" stroke-width=".5"/>
  <line x1="${l.x+l.w/2}" y1="${l.y+l.h*0.42}" x2="${l.x+l.w/2}" y2="${l.y+l.h*0.82}" stroke="#2E3192" stroke-width=".5"/>
  <text x="${l.x+l.w/2}" y="${l.y+l.h*0.32}" font-size="${fs}" font-weight="800" fill="#2E3192" text-anchor="middle">${esc(lab)}</text>${gate}`;
}
function stairSvg(s){
  let g=`<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" fill="#fff" stroke="#2E3192" stroke-width=".7"/>`;
  for(let y=s.y+4; y<s.y+s.h; y+=4) g+=`<line x1="${s.x}" y1="${y}" x2="${s.x+s.w}" y2="${y}" stroke="#9fa2d6" stroke-width=".4"/>`;
  g+=`<line x1="${s.x+s.w/2}" y1="${s.y}" x2="${s.x+s.w/2}" y2="${s.y+s.h}" stroke="#2E3192" stroke-width=".6"/>`;
  const fs=Math.min(4.6,(s.w-2)/(6*0.55));
  g+=`<rect x="${s.x+1.5}" y="${s.y+s.h/2-fs*0.9}" width="${s.w-3}" height="${fs*1.5}" fill="#fff"/>`;
  g+=`<text x="${s.x+s.w/2}" y="${s.y+s.h/2+fs*0.3}" font-size="${fs}" font-weight="800" fill="#2E3192" text-anchor="middle">Stairs</text>`;
  return g;
}

function icPointSvg(pt){
  return icBadge({ic:pt.ic,opt:{icAt:pt.at},x:0,y:0,h:0});
}
function coreParts(f){
  const c=f.core;
  return {lift:{x:c.x1,y:c.y1,w:c.x2-c.x1,h:c.ly-c.y1,label:c.label,stop:f.liftStop},
          stair:{x:c.x1,y:c.sy,w:c.x2-c.x1,h:188-c.sy},
          doors:[D(c.x1,c.dy,'v',6),D(c.x2,c.dy,'v',6)]};
}
function floorSvg(f,interactive){
  const cp=coreParts(f), lift=cp.lift, stair=cp.stair, c=f.core;
  let g=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 240 ${f.id==='g'?206:198}" font-family="Segoe UI, Arial, sans-serif">`;
  g+=`<rect x="0" y="0" width="230" height="188" fill="${CORRIDOR}"/>`;
  for(const r of f.rooms){
    const st=`fill="${KIND[r.kind].fill}" stroke="#2E3192" stroke-width=".7" ${r.opt.dash?'stroke-dasharray="3 2"':''}`;
    const da=interactive?` data-key="${esc(r.key)}" class="rm"`:'';
    g+= r.opt.pts ? `<polygon points="${r.opt.pts.map(p=>p.join(',')).join(' ')}" ${st}${da}/>`
                  : `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" ${st}${da}/>`;
  }
  for(const r of f.rooms) g+=stallsSvg(r);
  g+=`<rect x="${c.x1}" y="${c.y1}" width="${c.x2-c.x1}" height="${188-c.y1}" fill="${CORRIDOR}" stroke="#2E3192" stroke-width=".7"/>`;
  g+=liftSvg(lift)+stairSvg(stair);
  g+=`<text x="${(c.x1+c.x2)/2}" y="${(c.ly+c.sy)/2+(f.liftStop?2.4:1.2)}" font-size="2.7" font-style="italic" fill="#8a8ca8" text-anchor="middle">Landing</text>`;
  for(const w of (f.walls||[])) g+=`<line x1="${w[0]}" y1="${w[1]}" x2="${w[2]}" y2="${w[3]}" stroke="#2E3192" stroke-width=".7"/>`;
  for(const p of (f.partitions||[])) g+=`<line x1="${p[0]}" y1="${p[1]}" x2="${p[2]}" y2="${p[3]}" stroke="#2E3192" stroke-width=".6" stroke-dasharray="2 1.5"/>`;
  g+=`<rect x="0" y="0" width="230" height="188" fill="none" stroke="#2E3192" stroke-width="2"/>`;
  for(const d of [...(f.doors||[]),...cp.doors]) g+=doorSvg(d);
  for(const w of (f.windows||[])) g+=windowSvg(w);
  for(const r of f.rooms) g+=textBlock(r)+acBadge(r)+icBadge(r);
  for(const pt of (f.icPoints||[])) g+=icPointSvg(pt);
  for(const n of (f.notes||[])) g+=`<text x="${n.x}" y="${n.y}" font-size="${n.small?3.4:4.6}" font-style="italic" fill="#8a8ca8" text-anchor="middle">${esc(n.t)}</text>`;
  if(f.safe) g+=safeSvg(f.safe);
  for(const gt of (f.gates||[])){
    g+=`<line x1="${gt.x1}" y1="${gt.y1}" x2="${gt.x2}" y2="${gt.y2}" stroke="#fff" stroke-width="2.6"/>`;
    g+=`<line x1="${gt.x1}" y1="${gt.y1}" x2="${gt.x2}" y2="${gt.y2}" stroke="#ED1C24" stroke-width="1.6" stroke-dasharray="2 1.2"/>`;
    g+=`<text x="${gt.lx}" y="${gt.ly}" font-size="5.2" font-weight="800" fill="#ED1C24" text-anchor="middle">${esc(gt.label)}</text>`;
  }
  return g+'</svg>';
}

