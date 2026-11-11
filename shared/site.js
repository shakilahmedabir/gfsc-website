/* =====================================================================
   GFSC website engine — shared by all 3 design versions.
   Needs: content.js (texts), floor_core.js (rooms for the chatbot).
   Each version sets  window.SITE = {version:'aurora'|'heritage'|'bento'}  before this file.
   ===================================================================== */
(function(){
const V = (window.SITE && SITE.version) || 'aurora';
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const store = {get(k){try{return localStorage.getItem('gfsc-'+k);}catch(e){return null;}}, set(k,v){try{localStorage.setItem('gfsc-'+k,v);}catch(e){}}};
const ses = {get(k){try{return sessionStorage.getItem('gfsc-'+k);}catch(e){return null;}}, set(k,v){try{sessionStorage.setItem('gfsc-'+k,v);}catch(e){}}};
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- language ---------- */
const navLang = (navigator.language || 'bn').slice(0,2);
let lang = store.get('lang') || (LANGS[navLang] ? navLang : 'bn');
const t = k => (UI[lang] && UI[lang][k] != null) ? UI[lang][k] : (typeof GOALS!=='undefined' && GOALS.ui[lang][k] != null) ? GOALS.ui[lang][k] : UI.en[k] ?? (typeof GOALS!=='undefined' ? GOALS.ui.en[k] : k);
const L = o => o == null ? '' : (o[lang] ?? o.en ?? o.bn ?? '');
/* editable data (shared/site-data.js, edited with admin/) — falls back to content.js */
const SD = window.SITE_DATA || {};
const NOTICES = SD.notices ? SD.notices.map(n => Object.assign({date:n.date,pin:n.pin,file:n.file}, n.title)) : NOTICES;
const POSTS = SD.posts || [];
const ALBUMS = SD.albums || [];
const TEACHERS = SD.teachers || [], STAFF = SD.staff || [];
const ALL_PHOTOS = ALBUMS.flatMap((a,ai) => a.photos.map((p,pi) => ({src:p, ai, pi})));
const digits = s => lang === 'bn' ? String(s).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]) : lang === 'ar' ? String(s).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]) : String(s);
const fmtDate = d => { try { return new Date(d+'T00:00:00').toLocaleDateString({bn:'bn-BD',en:'en-GB',ar:'ar-EG',de:'de-DE'}[lang], {day:'numeric',month:'long',year:'numeric'}); } catch(e){ return d; } };

/* ---------- month theme + light/dark ---------- */
let month = +(store.get('month') || 0) || (new Date().getMonth() + 1);
let mode = store.get('mode') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
const lum = hex => { const n = parseInt(hex.slice(1),16), c = [n>>16, n>>8&255, n&255].map(v => { v/=255; return v<=.03928 ? v/12.92 : ((v+.055)/1.055)**2.4; }); return .2126*c[0]+.7152*c[1]+.0722*c[2]; };
const onColor = hex => lum(hex) > .38 ? '#141414' : '#ffffff';   // text colour that is always readable on that background
function applyTheme(){
  const th = MONTHS[month-1], r = document.documentElement;
  // the darkest of the 3 colours is the main brand colour, so white text on it stays readable
  const sorted = [...th.c].sort((a,b) => lum(a)-lum(b));
  r.style.setProperty('--p', sorted[0]); r.style.setProperty('--s', th.c[1]); const acc=[th.c[2],th.c[1],th.c[0]].find(c=>{const l=lum(c); return l>.1&&l<.72;})||'#F7941D'; r.style.setProperty('--a', acc);
  r.style.setProperty('--on-p', onColor(sorted[0])); r.style.setProperty('--on-s', onColor(th.c[1]));
  r.style.setProperty('--on-a', onColor(acc));
  r.dataset.mode = mode; r.dataset.fx = th.fx; r.dataset.month = month;
  startFx(th.fx);
}

/* ---------- small icons ---------- */
const I = {
  facebook:'<path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.7-.6z"/>',
  youtube:'<path d="M22 8.2c-.2-1.6-1-2.6-2.6-2.8C17 5 12 5 12 5s-5 0-7.4.4C3 5.6 2.2 6.6 2 8.2 1.8 9.6 1.8 12 1.8 12s0 2.4.2 3.8c.2 1.6 1 2.6 2.6 2.8C7 19 12 19 12 19s5 0 7.4-.4c1.6-.2 2.4-1.2 2.6-2.8.2-1.4.2-3.8.2-3.8s0-2.4-.2-3.8zM10 15V9l5.2 3z"/>',
  instagram:'<path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.9-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM21.9 7c-.1-1.6-.4-3-1.6-4.2S17.6 1.2 16 1.1C14.4 1 9.6 1 8 1.1 6.4 1.2 5 1.5 3.8 2.7S2.2 5.4 2.1 7C2 8.6 2 15.4 2.1 17c.1 1.6.4 3 1.6 4.2s2.6 1.5 4.3 1.6c1.6.1 6.4.1 8 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.6.1-8.4 0-10z"/>',
  whatsapp:'<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.6 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.4z"/>',
  linkedin:'<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/>',
  phone:'<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/>',
  mail:'<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z"/>',
  pin:'<path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>',
  bell:'<path d="M12 22a2.5 2.5 0 0 0 2.5-2.5h-5A2.5 2.5 0 0 0 12 22zm7-6V11c0-3.1-1.6-5.6-4.5-6.3V4a2.5 2.5 0 0 0-5 0v.7C6.6 5.4 5 7.9 5 11v5l-2 2v1h18v-1z"/>',
  chat:'<path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 1-2z"/>',
  grid:'<path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z"/>',
  user:'<path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-9 2.2-9 5v3h18v-3c0-2.8-4.6-5-9-5z"/>',
  sun:'<circle cx="12" cy="12" r="4.5"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" stroke-width="2" fill="none"/>',
  moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  apply:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 7V3.5L18.5 9zM8 13h8v2H8zm0 4h5v2H8z"/>',
  globe:'<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-3a15.7 15.7 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.8 1.9-4zM4.3 14a8 8 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4zm.8 2h3a15.7 15.7 0 0 0 1.4 3.6A8 8 0 0 1 5.1 16zm3-8h-3a8 8 0 0 1 4.4-3.6C8 5.5 7.6 6.7 8.1 8zM12 20c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.8-1.9 4zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4zm.3 5.6c.6-1.1 1.1-2.4 1.4-3.6h3a8 8 0 0 1-4.4 3.6zM16.3 14a16.5 16.5 0 0 0 0-4h3.4a8 8 0 0 1 0 4z"/>'
};
const svg = (k, cls='ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${I[k]}</svg>`;
const img = p => SCHOOL.img + p;

/* ---------- pages ---------- */
const PAGES = ['home','about','academics','goals','people','admission','notices','gallery','campus','contact'];
const PAGE_ICON = {goals:'🌍',people:'👩‍🏫',home:'🏠',about:'🏫',academics:'📘',admission:'📝',notices:'📢',gallery:'🖼️',campus:'🗺️',contact:'☎️'};

function topbar(){
  return `<div class="tb-in">
   <div class="tb-l"><a href="tel:${SCHOOL.phones[3].replace(/[^\d+]/g,'')}">${svg('phone')}<span>${digits(SCHOOL.phones[3])}</span></a>
     <a href="mailto:${SCHOOL.email}">${svg('mail')}<span>${SCHOOL.email}</span></a></div>
   <div class="tb-r">
     <span class="soc">${SCHOOL.social.map(s=>`<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.k}" class="s-${s.k}">${svg(s.k)}</a>`).join('')}</span>
     <button class="tb-btn" data-open="login-student">${svg('user')}<span>${t('studentLogin')}</span></button>
     <button class="tb-btn" data-open="login-staff">${svg('user')}<span>${t('staffLogin')}</span></button>
   </div></div>`;
}
function nav(){
  return `<div class="nv-in">
   <a class="brand" href="#/home"><img src="${SCHOOL.logo}" alt="GFSC logo"><span><b>${lang==='bn'?'গ্রীনফিল্ড স্কুল এন্ড কলেজ':'Greenfield School & College'}</b><small>${t('heroKicker')}</small></span></a>
   <nav class="menu" id="menu">${PAGES.map(p=>`<a href="#/${p}" data-p="${p}">${t(p)}</a>`).join('')}</nav>
   <div class="nv-tools">
     <label class="sel" title="${t('month')}">🎨<select id="monthSel" aria-label="${t('month')}">${MONTHS.map(m=>`<option value="${m.m}" ${m.m===month?'selected':''}>${digits(m.m)} · ${esc(L(m)[0])}</option>`).join('')}</select></label>
     <label class="sel" title="Language">${svg('globe')}<select id="langSel" aria-label="Language">${Object.entries(LANGS).map(([k,v])=>`<option value="${k}" ${k===lang?'selected':''}>${v.name}</option>`).join('')}</select></label>
     <button class="iconb" id="modeBtn" aria-label="${mode==='dark'?t('light'):t('dark')}">${svg(mode==='dark'?'sun':'moon')}</button>
     <button class="iconb quickb" data-open="quick" aria-label="${t('quick')}">${svg('grid')}<kbd>Ctrl K</kbd></button>
     <button class="iconb burger" id="burger" aria-label="${t('menu')}">☰</button>
   </div></div>`;
}

function hero(){
  const th = MONTHS[month-1];
  const ctas = `<div class="cta-row"><a class="btn btn-a" data-open="admission">${svg('apply')} ${t('ctaApply')}</a>
     <a class="btn btn-ghost" href="#/campus">🗺️ ${t('ctaCampus')}</a></div>`;
  const theme = `<div class="month-chip">🎨 ${esc(L(th)[0])} — <span>${esc(L(th)[1])}</span></div>`;
  if(V==='heritage') return `<div class="hero-in"><div class="h-copy"><p class="kicker">${t('heroKicker')}</p><h1>${t('heroTitle')}</h1><p class="lead">${t('heroSub')}</p>${ctas}${theme}</div>
     <figure class="h-photo"><img src="${img('360/kids_kg_play.jpg')}" alt="" loading="eager"><figcaption>${t('galleryTitle')}</figcaption></figure></div>`;
  if(V==='bento') return `<div class="bento">
     <div class="b b-hero"><p class="kicker">${t('heroKicker')}</p><h1>${t('heroTitle')}</h1><p class="lead">${t('heroSub')}</p>${ctas}</div>
     <a class="b b-photo" href="#/gallery" style="background-image:url('${img('384/Computer-Lab.jpg')}')"><span>🔬 ${esc(L(CONTENT.facilities[0]))}</span></a>
     <div class="b b-stat"><b>${digits(SCHOOL.stats.students)}</b><span>${t('stStudents')}</span></div>
     <a class="b b-notice" href="#/notices"><span class="tag">${t('newTag')}</span><b>${esc(L(sortedNotices()[0]))}</b><small>${fmtDate(sortedNotices()[0].date)}</small></a>
     <div class="b b-theme">${theme}</div>
     <a class="b b-campus" href="#/campus"><b>🗺️ ${t('campusTitle')}</b><small>${t('campusSub')}</small></a>
     <a class="b b-photo2" href="#/gallery" style="background-image:url('${img('360/kids_kg_play.jpg')}')"></a>
   </div>`;
  return `<div class="hero-in"><p class="kicker">${t('heroKicker')}</p><h1>${t('heroTitle')}</h1><p class="lead">${t('heroSub')}</p>${ctas}${theme}
     <div class="h-cards"><img src="${img('384/Computer-Lab.jpg')}" alt=""><img src="${img('360/kids_kg_play.jpg')}" alt=""><img src="${img('385/CheLab.jpg')}" alt=""></div></div>`;
}

const sec = (id, title, sub, body, cls='') => `<section class="sec ${cls}" id="s-${id}"><div class="wrap"><header class="sh"><h2>${title}</h2>${sub?`<p>${sub}</p>`:''}</header>${body}</div></section>`;
const statsHtml = () => `<div class="stats">${[[SCHOOL.stats.est,t('stEst')],[SCHOOL.stats.students,t('stStudents')],[SCHOOL.stats.classrooms,t('stRooms')],[SCHOOL.stats.floors,t('stFloors')],[SCHOOL.stats.levels,t('stLabs')],[SCHOOL.stats.versions,t('stVersions')]].map(([n,l])=>`<div class="stat"><b data-count="${typeof n==='number'&&n!==SCHOOL.stats.est?n:(n===SCHOOL.stats.students?1700:'')}">${digits(n)}</b><span>${l}</span></div>`).join('')}</div>`;
const whyHtml = () => `<div class="cards why">${CONTENT.why.map(w=>{const x=L(w);return `<article class="card"><div class="emo">${w.i}</div><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></article>`;}).join('')}</div>`;
const journeyHtml = () => `<ol class="journey">${CONTENT.journey.map((j,i)=>{const x=L(j);return `<li><span class="jn">${digits(i+1)}</span><div><small>${esc(x[1])}</small><h3>${esc(x[0])}</h3><p>${esc(x[2])}</p></div></li>`;}).join('')}</ol>`;
const sortedNotices = () => [...NOTICES].sort((a,b)=>(b.pin?1:0)-(a.pin?1:0)||b.date.localeCompare(a.date));
const noticeList = (n) => `<ul class="notices">${sortedNotices().slice(0,n).map(x=>`<li><time>${fmtDate(x.date)}</time><span>${x.pin?`<em class="pinned">${t('pinned')}</em>`:''}${esc(L(x))}</span>${x.file?`<a href="${x.file}" target="_blank">PDF</a>`:''}</li>`).join('')}</ul>`;
const albumCard = (a,i) => `<button class="card ev album" data-album="${i}"><span class="cover"><img src="${a.photos[0]}" alt="" loading="lazy"><i>🖼️ ${digits(a.photos.length)} ${t('photos')}</i></span><span class="ev-t">${a.year?`<small>${digits(a.year)}</small>`:''}<b>${esc(L(a.title))}</b></span></button>`;
const eventsHtml = (n=4) => ALBUMS.length ? `<div class="cards events">${ALBUMS.slice(0,n).map(albumCard).join('')}</div>`
  : `<div class="cards events">${CONTENT.events.map(e=>`<article class="card ev"><img src="${img(e.img)}" alt="" loading="lazy"><h3>${esc(L(e))}</h3></article>`).join('')}</div>`;
const leadersHtml = () => `<div class="cards leaders">${CONTENT.leaders.map(p=>`<article class="card ld"><img src="${img(p.img)}" alt="${esc(L(p.name))}" loading="lazy"><h3>${esc(L(p.name))}</h3><small>${esc(L(p.role))}</small><p class="muted">${t('msgSoon')}</p></article>`).join('')}</div>`;
const facHtml = () => `<div class="chips-grid">${CONTENT.facilities.map(f=>`<div class="fac"><span>${f.i}</span>${esc(L(f))}</div>`).join('')}</div>`;
const galleryHtml = (n) => ALL_PHOTOS.length
  ? `<div class="gallery">${ALL_PHOTOS.slice(0,n).map((p,k)=>`<button class="ph" data-photo="${k}" aria-label="${esc(L(ALBUMS[p.ai].title))}"><img src="${p.src}" alt="" loading="lazy"></button>`).join('')}</div>`
  : `<div class="gallery">${CONTENT.gallery.slice(0,n).map(g=>`<button class="ph" data-src="${img(g)}"><img src="${img(g)}" alt="" loading="lazy"></button>`).join('')}</div>`;
const postsHtml = (n=6) => POSTS.length ? `<div class="cards posts">${[...POSTS].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,n).map(p=>`<article class="card post">${p.img?`<img src="${p.img}" alt="" loading="lazy">`:''}<div><span class="ptype t-${p.type}">${t(p.type)||p.type}</span> <time>${fmtDate(p.date)}</time><h3>${esc(L(p.title))}</h3><p>${esc(L(p.body))}</p>${p.link?`<a class="more" href="${p.link}" target="_blank" rel="noopener">${t('readMore')} →</a>`:''}</div></article>`).join('')}</div>` : '';
const initials = n => n.replace(/^(Dr|Md|Mst|Prof(essor)?)\.?\s+/i,'').split(/\s+/).slice(0,2).map(w=>w[0]).join('').toUpperCase();
const personCard = p => `<article class="person" data-dept="${esc(p.dept||'')}" data-search="${esc((p.name+' '+p.desig+' '+(p.dept||'')+' '+(p.roles||[]).join(' ')+' '+(p.qual||[]).join(' ')).toLowerCase())}">
   ${p.photo?`<img src="${p.photo.startsWith('http')?p.photo:'../shared/'+p.photo}" alt="${esc(p.name)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'avatar',textContent:'${initials(p.name)}'}))">`:`<span class="avatar">${initials(p.name)}</span>`}
   <div><h3>${esc(p.name)}</h3><b>${esc(p.desig)}</b>${p.dept?`<span class="dchip">${esc(DEPT[p.dept]?.[lang]||p.dept)}</span>`:''}
   ${(p.roles||[]).filter(r=>r!=='Co-curricular').map(r=>`<small class="role">★ ${esc(r)}</small>`).join('')}
   ${(p.qual||[]).length?`<small class="qual">🎓 ${esc(p.qual.join(' · '))}</small>`:''}</div></article>`;
function peopleHtml(){
  const depts=[...new Set(TEACHERS.map(p=>p.dept).filter(Boolean))];
  return `<div class="pp-tools"><input class="pp-search" id="ppSearch" placeholder="${t('searchPeople')}" aria-label="${t('searchPeople')}">
    <div class="pp-chips" id="ppChips"><button class="on" data-f="">${t('all')}</button>${depts.map(d=>`<button data-f="${esc(d)}">${esc(DEPT[d]?.[lang]||d)}</button>`).join('')}</div></div>
    <div class="people" id="ppTeachers">${TEACHERS.map(personCard).join('')}</div><p class="muted" id="ppNone" hidden>${t('noResult')}</p>`;
}
const linksHtml = () => `<div class="links"><a class="btn btn-p" href="${SCHOOL.results}" target="_blank" rel="noopener">📊 SSC · HSC · JSC · PSE results</a>${CONTENT.links.map(l=>`<a href="${l[1]}" target="_blank" rel="noopener">${l[0]} ↗</a>`).join('')}</div>`;
const campusTeaser = () => `<a class="campus-teaser" href="#/campus"><div><h3>🗺️ ${t('campusTitle')}</h3><p>${t('campusSub')}</p><span class="btn btn-a">${t('ctaCampus')} →</span></div><div class="mini">${typeof FLOORS!=='undefined'?floorSvg(FLOORS[4]):''}</div></a>`;
const contactInfo = () => `<div class="contact-grid"><div class="card">
   <p>${svg('pin')} <b>${t('address')}</b></p>
   <p>${svg('phone')} ${SCHOOL.phones.map(p=>`<a href="tel:${p.replace(/[^\d+]/g,'')}">${digits(p)}</a>`).join(' · ')}</p>
   <p>${svg('mail')} <a href="mailto:${SCHOOL.email}">${SCHOOL.email}</a></p><p class="muted">${t('visitors')}</p>
   <p class="soc big">${SCHOOL.social.map(s=>`<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.k}" class="s-${s.k}">${svg(s.k)}</a>`).join('')}</p></div>
   <div class="card map"><iframe title="Map" src="${SCHOOL.map}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><a class="btn btn-p" href="${SCHOOL.mapLink}" target="_blank" rel="noopener">${t('openMaps')} ↗</a></div></div>`;

const mvvHtml = () => typeof GOALS==='undefined' ? `<p>${esc(L(CONTENT.mission))}</p>` : `<div class="mvv">
   <article class="card mv"><span class="mv-i">🎯</span><h3>${t('mission')}</h3><p>${esc(L(GOALS.mission))}</p></article>
   <article class="card mv"><span class="mv-i">🔭</span><h3>${t('vision')}</h3><p>${esc(L(GOALS.vision))}</p></article>
   <article class="card mv"><span class="mv-i">💎</span><h3>${t('values')}</h3><div class="vals">${GOALS.values.map(v=>`<span>${esc(L(v))}</span>`).join('')}</div></article></div>`;
const sdgGrid = (small) => `<div class="sdgs ${small?'small':''}">${GOALS.sdgs.map(([n,col,ic,name,act])=>`<article class="sdg" style="--c:${col}"><b>${digits(n)}</b><span class="sdg-ic">${ic}</span><h3>${esc(L(name))}</h3>${small?'':`<p><em>${t('act')}:</em> ${esc(L(act))}</p>`}</article>`).join('')}</div>`;
function goalsHtml(){
  if(typeof GOALS==='undefined') return '';
  return sec('gl1',t('title'),t('sub'),sdgGrid(false))
   + sec('gl2',t('sdg4'),'',`<div class="sdg4"><div class="sdg4-badge">4<small>${esc(L(GOALS.sdgs[3][3]))}</small></div><ul class="ticks">${GOALS.sdg4.map(x=>`<li>${esc(L(x))}</li>`).join('')}</ul></div>`,'alt')
   + sec('gl3',t('skills'),'',`<div class="chips-grid">${GOALS.skills.map(([i,x])=>`<div class="fac"><span>${i}</span>${esc(L(x))}</div>`).join('')}</div>`)
   + sec('gl4',t('careers'),'',`<div class="cards careers">${GOALS.careers.map(c=>`<article class="card career" style="--c:${c.c}"><h3>${esc(L(c.g))}</h3><p>${esc(L(c.jobs)).split(' · ').map(j=>`<span>${j}</span>`).join('')}</p></article>`).join('')}</div>`,'alt')
   + sec('gl5',t('compete'),'',`<div class="chips-grid">${GOALS.programs.map(([i,x])=>`<div class="fac"><span>${i}</span>${esc(L(x))}</div>`).join('')}</div>`)
   + sec('gl6',t('days'),'',`<ul class="days">${GOALS.days.map(([d,x])=>`<li><time>${digits(d)}</time>${esc(L(x))}</li>`).join('')}</ul>`,'alt');
}
const goalsTeaser = () => typeof GOALS==='undefined' ? '' : `<a class="goals-teaser" href="#/goals"><div><h3>🌍 ${t('goals')} · SDG</h3><p>${t('teaser')}</p><span class="btn btn-a">${t('explore')} →</span></div>${sdgGrid(true)}</a>`;

function admissionForm(id){
  const opt = CONTENT.classes.map(c=>`<option>${c}</option>`).join('');
  return `<form class="form" id="${id}" novalidate>
   <fieldset class="seg"><legend>${t('fType')}</legend>
     <label><input type="radio" name="type" value="adm" checked><span>${t('fTypeAdm')}</span></label>
     <label><input type="radio" name="type" value="app"><span>${t('fTypeApp')}</span></label></fieldset>
   <div class="row2"><label class="field"><span>${t('fName')} <i>*</i></span><input name="name" required autocomplete="name"></label>
   <label class="field"><span>${t('fGuardian')} <i>*</i></span><input name="guardian" required></label></div>
   <div class="row2"><label class="field"><span>${t('fPhone')} <i>*</i></span><input name="phone" type="tel" required inputmode="tel" pattern="[0-9+\\- ]{8,}"></label>
   <label class="field"><span>${t('fEmail')}</span><input name="email" type="email" autocomplete="email"></label></div>
   <div class="row3"><label class="field"><span>${t('fClass')}</span><select name="cls">${opt}</select></label>
   <label class="field"><span>${t('fVersion')}</span><select name="ver"><option>${t('bm')}</option><option>${t('ev')}</option></select></label>
   <label class="field"><span>${t('fDate')}</span><input name="date" type="date"></label></div>
   <label class="field"><span>${t('fMsg')}</span><textarea name="msg" rows="3"></textarea></label>
   <p class="req"><i>*</i> ${t('fReq')}</p>
   <button class="btn btn-a wide" type="submit">${t('fSubmit')}</button><p class="ok" hidden>${t('fSent')}</p></form>`;
}

function pages(){
  return {
   home: `<section class="hero" id="hero"><canvas class="fx" aria-hidden="true"></canvas>${hero()}</section>
     ${V==='bento'?'':`<div class="wrap">${statsHtml()}</div>`}
     ${sec('why',t('whyTitle'),t('whySub'),whyHtml())}
     ${sec('journey',t('journeyTitle'),t('journeySub'),journeyHtml(),'alt')}
     ${sec('nb',t('noticesTitle'),'',noticeList(4)+`<a class="more" href="#/notices">${t('viewAll')} →</a>`)}
     ${sec('ct','','',campusTeaser(),'alt')}
     ${sec('gt','','',goalsTeaser())}
     ${POSTS.length?sec('nw',t('newsTitle'),'',postsHtml(3)):''}
     ${sec('ev',t('eventsTitle'),'',eventsHtml(4)+`<a class="more" href="#/gallery">${t('viewAll')} →</a>`)}
     ${sec('ld',t('leadersTitle'),'',leadersHtml(),'alt')}
     ${sec('gl',t('galleryTitle'),'',galleryHtml(8)+`<a class="more" href="#/gallery">${t('viewAll')} →</a>`)}
     ${sec('lk',t('resultsTitle'),'',linksHtml(),'alt')}`,
   about: sec('ab',t('about'),'',`<div class="prose"><p>${esc(L(CONTENT.about))}</p></div>${mvvHtml()}<div class="stats-plain">${statsHtml()}</div>`)+sec('ld2',t('leadersTitle'),'',leadersHtml(),'alt')+sec('fc',t('facTitle'),'',facHtml()),
   people: sec('ld3',t('leadersShort'),'',leadersHtml())+sec('tc',t('teachersTitle'),t('teachersSub'),peopleHtml(),'alt')+(STAFF.length?sec('sf',t('staffTitle'),'',`<div class="people staff">${STAFF.map(personCard).join('')}</div>`):''),
   goals: goalsHtml(),
   academics: sec('jr',t('journeyTitle'),t('journeySub'),journeyHtml())+sec('fc2',t('facTitle'),'',facHtml(),'alt')+sec('lk2',t('resultsTitle'),'',linksHtml()),
   admission: sec('ad',t('admissionTitle'),t('admissionSub'),`<div class="adm-grid"><div><h3>${t('stepsTitle')}</h3><ol class="steps">${CONTENT.steps.map(s=>`<li>${esc(L(s))}</li>`).join('')}</ol></div><div class="card">${admissionForm('admForm')}</div></div>`),
   notices: sec('nt',t('noticesTitle'),'',noticeList(99))+(POSTS.length?sec('nw2',t('newsTitle'),'',postsHtml(99),'alt'):''),
   gallery: (ALBUMS.length?sec('al',t('albums'),'',eventsHtml(99)):'')+sec('ga',t('allPhotos'),'',galleryHtml(999),'alt'),
   campus: sec('cp',t('campusTitle'),t('campusSub'),`<iframe class="explorer" id="explorer" title="${t('campusTitle')}" src="../shared/gfsc_floor_explorer.html?embed=1&mode=${mode}"></iframe>`),
   contact: sec('co',t('contactTitle'),'',contactInfo())
  };
}

function footer(){
  return `<div class="wrap ft"><div><img src="${SCHOOL.logo}" alt="" width="56"><p><b>Greenfield School &amp; College</b><br>${t('address')}</p></div>
   <div><h4>${t('quickLinks')}</h4>${PAGES.map(p=>`<a href="#/${p}">${t(p)}</a>`).join('')}</div>
   <div><h4>${t('contact')}</h4><a href="tel:01786500930">${digits('01786-500930')}</a><a href="mailto:${SCHOOL.email}">${SCHOOL.email}</a><h4>${t('followUs')}</h4><p class="soc">${SCHOOL.social.map(s=>`<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.k}" class="s-${s.k}">${svg(s.k)}</a>`).join('')}</p></div></div>
   <div class="wrap copy">© ${digits(new Date().getFullYear())} Greenfield School &amp; College · ${t('rights')}</div>`;
}

const ROBOT = (cls='robot') => `<svg class="${cls}" viewBox="0 0 64 64" aria-hidden="true">
  <line x1="32" y1="4" x2="32" y2="13" stroke="#cfd3ff" stroke-width="3" stroke-linecap="round"/><circle class="r-ant" cx="32" cy="5" r="4.5" fill="#FF4D6D"/>
  <rect x="7" y="27" width="6" height="14" rx="3" fill="#cfd3ff"/><rect x="51" y="27" width="6" height="14" rx="3" fill="#cfd3ff"/>
  <rect x="11" y="13" width="42" height="38" rx="14" fill="#ffffff"/><rect x="16" y="19" width="32" height="24" rx="10" fill="#1d1f5e"/>
  <g class="r-eyes"><circle cx="25" cy="30" r="4.2" fill="#5CF2FF"/><circle cx="39" cy="30" r="4.2" fill="#5CF2FF"/></g>
  <path d="M26 37 Q32 41 38 37" stroke="#5CF2FF" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <rect x="22" y="52" width="20" height="8" rx="4" fill="#cfd3ff"/></svg>`;
/* ---------- always-visible: admission (left, glowing) + map / contact / notice (right) + chat ---------- */
function dock(){
  return `<button class="adm-float" data-open="admission"><span class="dot"></span>${svg('apply')}<b>${t('dockAdm')}</b></button>
   <div class="dock"><button data-open="map" title="${t('mapTitle')}">${svg('pin')}<span>${t('dockMap')}</span></button>
   <button data-open="contactm" title="${t('contactTitle')}">${svg('phone')}<span>${t('dockContact')}</span></button>
   <button data-open="notice" title="${t('noticesTitle')}">${svg('bell')}<span>${t('dockNotice')}</span><i class="badge">${digits(NOTICES.filter(n=>n.pin).length||1)}</i></button></div>
   <div class="robo-hi" id="roboHi">${t('robotHi')}<button aria-label="${t('close')}">×</button></div>
   <button class="chat-fab robo-fab" id="chatFab" aria-label="${t('chatTitle')}">${ROBOT()}<span>${t('chatTitle')}</span></button>
   <div class="chat" id="chat" role="dialog" aria-label="${t('chatTitle')}"><div class="ch-h"><span class="ch-av">${ROBOT('robot sm')}</span><span class="ch-t"><b>Robo · ${t('chatTitle')}</b><small><i class="live"></i>${t('online')}</small></span><button data-close-chat aria-label="${t('close')}">×</button></div>
   <div class="ch-m" id="chMsgs"></div><div class="ch-q">${t('chatQ').map(q=>`<button>${esc(q)}</button>`).join('')}</div>
   <form class="ch-f" id="chForm"><input id="chIn" placeholder="${t('chatPh')}" autocomplete="off" aria-label="${t('chatPh')}"><button aria-label="Send">➤</button></form></div>`;
}

const MODALS = {
  notice: () => `<h3>${svg('bell')} ${t('noticesTitle')}</h3>${noticeList(3)}<div class="m-act"><a class="btn btn-p" href="#/notices" data-close>${t('viewAll')}</a><button class="btn btn-ghost" data-close>${t('dontShow')}</button></div>`,
  map: () => `<h3>${svg('pin')} ${t('mapTitle')}</h3><p>${t('address')}</p><iframe class="m-map" title="Map" src="${SCHOOL.map}" loading="lazy"></iframe><a class="btn btn-p" href="${SCHOOL.mapLink}" target="_blank" rel="noopener">${t('openMaps')} ↗</a>`,
  contactm: () => `<h3>${svg('phone')} ${t('contactTitle')}</h3><div class="m-list">${SCHOOL.phones.map(p=>`<a class="m-row" href="tel:${p.replace(/[^\d+]/g,'')}">${svg('phone')} ${digits(p)}</a>`).join('')}<a class="m-row" href="mailto:${SCHOOL.email}">${svg('mail')} ${SCHOOL.email}</a><a class="m-row" href="${SCHOOL.social[3].url}" target="_blank" rel="noopener">${svg('whatsapp')} WhatsApp</a></div><p class="muted">${t('address')}</p>`,
  admission: () => `<h3>${svg('apply')} ${t('admissionTitle')}</h3><p class="muted">${t('admissionSub')}</p>${admissionForm('admFormM')}`,
  'login-student': () => loginForm('studentLogin'),
  'login-staff': () => loginForm('staffLogin'),
  quick: () => `<input class="q-in" id="qIn" placeholder="${t('search')}" aria-label="${t('search')}"><div class="q-list" id="qList"></div>`
};
function loginForm(k){
  return `<h3>${svg('user')} ${t(k)}</h3><form class="form" data-login><label class="field"><span>${t('loginId')}</span><input required autocomplete="username"></label>
    <label class="field"><span>${t('loginPass')}</span><input type="password" required autocomplete="current-password"></label>
    <button class="btn btn-p wide">${t('signIn')}</button><p class="note">ℹ️ ${t('loginNote')}</p></form>`;
}
function openModal(k){
  if(k==='quick') return openQuick();
  const m = $('#modal'); $('#mBody').innerHTML = MODALS[k](); m.className = 'modal open m-'+k; m.setAttribute('aria-hidden','false');
  bindForms(m); setTimeout(()=>{ const f=$('input,select,button',$('#mBody')); f && f.focus(); },50);
}
const closeModal = () => { const m=$('#modal'); m.classList.remove('open'); m.setAttribute('aria-hidden','true'); };

/* ---------- quick menu (Ctrl+K) ---------- */
function quickItems(){
  const items = PAGES.map(p=>({icon:PAGE_ICON[p], label:t(p), go:'#/'+p}));
  items.push({icon:'📝',label:t('ctaApply'),open:'admission'},{icon:'📍',label:t('mapTitle'),open:'map'},{icon:'☎️',label:t('contactTitle'),open:'contactm'},
    {icon:'📢',label:t('noticesTitle'),open:'notice'},{icon:'👤',label:t('studentLogin'),open:'login-student'},{icon:'👥',label:t('staffLogin'),open:'login-staff'},
    {icon:'💬',label:t('chatTitle'),chat:true},{icon:'📊',label:'Education Board Results',href:SCHOOL.results});
  if(typeof FLOORS!=='undefined') for(const f of FLOORS) items.push({icon:'🏢',label:`${t('campus')} · ${f.name}`,go:'#/campus',floor:f.id});
  return items;
}
function openQuick(){
  const m=$('#modal'); $('#mBody').innerHTML=MODALS.quick(); m.className='modal open m-quick';
  const all=quickItems(); let sel=0;
  const draw=()=>{ const q=$('#qIn').value.toLowerCase(); const list=all.filter(i=>i.label.toLowerCase().includes(q)); sel=Math.min(sel,list.length-1);
    $('#qList').innerHTML=list.map((i,n)=>`<button class="${n===sel?'on':''}" data-i="${all.indexOf(i)}"><span>${i.icon}</span>${esc(i.label)}</button>`).join(''); return list; };
  let list=draw();
  const run=i=>{ closeModal(); if(i.go){ location.hash=i.go; if(i.floor) setTimeout(()=>{const e=$('#explorer'); if(e) e.contentWindow.location.hash='floor='+i.floor;},400);} else if(i.open) openModal(i.open); else if(i.chat) toggleChat(true); else if(i.href) open(i.href,'_blank'); };
  $('#qIn').oninput=()=>{sel=0; list=draw();};
  $('#qIn').onkeydown=e=>{ if(e.key==='ArrowDown'){sel=Math.min(sel+1,list.length-1); list=draw(); e.preventDefault();} else if(e.key==='ArrowUp'){sel=Math.max(sel-1,0); list=draw(); e.preventDefault();} else if(e.key==='Enter'&&list[sel]) run(list[sel]); };
  $('#qList').onclick=e=>{const b=e.target.closest('button'); if(b) run(all[+b.dataset.i]);};
  $('#qIn').focus();
}

/* ---------- forms (admission → email to the office; login → info only) ---------- */
function bindForms(root){
  $$('form.form', root).forEach(f=>{
    if(f.dataset.bound) return; f.dataset.bound=1;
    f.addEventListener('submit', e=>{
      e.preventDefault();
      if(f.hasAttribute('data-login')){ $('.note',f).classList.add('flash'); return; }
      let ok=true; $$('[required]',f).forEach(i=>{ const bad=!i.value.trim()||(i.pattern&&!new RegExp('^'+i.pattern+'$').test(i.value)); i.closest('.field').classList.toggle('err',bad); if(bad) ok=false; });
      if(!ok){ const first=$('.err input',f); first&&first.focus(); return; }
      const d=Object.fromEntries(new FormData(f)); const type=d.type==='app'?t('fTypeApp'):t('fTypeAdm');
      const body=[`${t('fType')}: ${type}`,`${t('fName')}: ${d.name}`,`${t('fGuardian')}: ${d.guardian}`,`${t('fPhone')}: ${d.phone}`,`${t('fEmail')}: ${d.email||'-'}`,`${t('fClass')}: ${d.cls} · ${d.ver}`,`${t('fDate')}: ${d.date||'-'}`,`${t('fMsg')}: ${d.msg||'-'}`].join('\n');
      $('.ok',f).hidden=false;
      location.href=`mailto:${SCHOOL.email}?subject=${encodeURIComponent('GFSC website — '+type)}&body=${encodeURIComponent(body)}`;
    });
  });
}

/* ---------- chatbot (answers from content.js + floor_core.js, in the chosen language) ---------- */
const A = {
 en:{adm:'Admission: fill the online form (left “Admission” button) or visit the office. Steps: ',phone:'Call us: ',addr:'We are at ',cls:'Classes: Play Group to Class XII, in Bangla Medium and English Version.',res:'Board results: ',prin:'Principal: Dr. Rehana Parvin. Chairman: Shamsul Alam.',fee:'Fees and dates are announced by the office — please call 01786-500930.',lift:'The lift stops at Ground, 3rd, 5th, 7th, 9th and 10th floor (gate on the stair side).',room:'is on the',ac:'AC',ic:'intercom',notice:'Latest notice: ',open:'Open on the campus map'},
 bn:{adm:'ভর্তি: বাম পাশের “ভর্তি” বাটনে অনলাইন ফর্ম পূরণ করুন বা অফিসে আসুন। ধাপ: ',phone:'ফোন করুন: ',addr:'আমাদের ঠিকানা: ',cls:'শ্রেণি: প্লে গ্রুপ থেকে দ্বাদশ, বাংলা মাধ্যম ও ইংলিশ ভার্সন।',res:'বোর্ড পরীক্ষার ফলাফল: ',prin:'অধ্যক্ষ: ড. রেহানা পারভীন। চেয়ারম্যান: শামসুল আলম।',fee:'বেতন ও তারিখ অফিস থেকে জানানো হয় — ০১৭৮৬-৫০০৯৩০ নম্বরে ফোন করুন।',lift:'লিফট থামে নিচতলা, ৩য়, ৫ম, ৭ম, ৯ম ও ১০ম তলায় (সিঁড়ির দিকে দরজা)।',room:'অবস্থিত',ac:'এসি',ic:'ইন্টারকম',notice:'সর্বশেষ নোটিশ: ',open:'ক্যাম্পাস ম্যাপে দেখুন'},
 ar:{adm:'القبول: املأ النموذج الإلكتروني (زر «القبول») أو زر المكتب. الخطوات: ',phone:'اتصل بنا: ',addr:'عنواننا: ',cls:'الصفوف: من مرحلة اللعب حتى الصف الثاني عشر، بالمسارين البنغالي والإنجليزي.',res:'نتائج المجلس: ',prin:'المديرة: د. ريحانة برفين. رئيس مجلس الإدارة: شمس العالم.',fee:'تُعلن الرسوم والمواعيد من المكتب — يرجى الاتصال على 01786-500930.',lift:'يتوقف المصعد في الطوابق: الأرضي، 3، 5، 7، 9، 10 (الباب جهة الدرج).',room:'يقع في',ac:'تكييف',ic:'اتصال داخلي',notice:'آخر إعلان: ',open:'افتح على خريطة الحرم'},
 de:{adm:'Aufnahme: Online-Formular ausfüllen (Button „Aufnahme“ links) oder ins Sekretariat kommen. Schritte: ',phone:'Rufen Sie uns an: ',addr:'Sie finden uns: ',cls:'Klassen: Spielgruppe bis Klasse 12, im Bangla- und im englischen Zweig.',res:'Prüfungsergebnisse: ',prin:'Schulleiterin: Dr. Rehana Parvin. Vorsitzender: Shamsul Alam.',fee:'Gebühren und Termine gibt das Sekretariat bekannt — bitte 01786-500930 anrufen.',lift:'Der Aufzug hält im EG, 3., 5., 7., 9. und 10. Stock (Tür zur Treppenseite).',room:'befindet sich im',ac:'Klima',ic:'Telefon',notice:'Neuester Aushang: ',open:'Im Campusplan öffnen'}
};
const KW = { // keywords in all 4 languages
 adm:['admission','admit','apply','enrol','ভর্তি','আবেদন','قبول','تسجيل','aufnahme','anmeld','bewerb'],
 phone:['phone','call','number','contact','ফোন','নম্বর','যোগাযোগ','هاتف','رقم','اتصال','telefon','anruf','kontakt','nummer'],
 addr:['where is the school','address','location','map','school located','ঠিকানা','স্কুলটি কোথায়','স্কুল কোথায়','ম্যাপ','عنوان','أين تقع','موقع','adresse','wo ist die schule','karte'],
 cls:['class','classes','grade','version','শ্রেণি','ক্লাস','ভার্সন','صف','الصفوف','klasse','zweig'],
 res:['result','ফলাফল','রেজাল্ট','نتيجة','نتائج','ergebnis'],
 prin:['principal','chairman','head','অধ্যক্ষ','প্রিন্সিপাল','চেয়ারম্যান','مدير','رئيس','schulleit','vorsitz'],
 fee:['fee','fees','cost','salary','বেতন','ফি','খরচ','رسوم','gebühr','kosten'],
 lift:['lift','elevator','লিফট','مصعد','aufzug'],
 notice:['notice','news','নোটিশ','খবর','إعلان','aushang','neuigkeit'],
 teacher:['teacher','teachers','sir','madam','শিক্ষক','স্যার','ম্যাডাম','معلم','lehrer','lehrkraft']
};
let ROOMS=[];
function buildRooms(){ if(typeof FLOORS==='undefined') return;
  ROOMS=[]; for(const f of FLOORS) for(const r of f.rooms) ROOMS.push({r,f,hay:`${r.num} ${r.label} ${r.opt.sub||''}`.toLowerCase()}); }
const ROOM_WORDS = {'কম্পিউটার':'computer','ল্যাব':'lab','অধ্যক্ষ':'principal','প্রিন্সিপাল':'principal','ক্যান্টিন':'canteen','নামাজ':'prayer','লাইব্রেরি':'library','মেয়েদের':'girls','ছাত্রীদের':'girls','কমন':'common','অডিটোরিয়াম':'auditorium','হল':'hall','শিক্ষক':'teacher','রসায়ন':'chemistry','পদার্থ':'physics','জীববিজ্ঞান':'biology','প্লে':'play',
  'حاسوب':'computer','مختبر':'lab','مدير':'principal','computerlabor':'computer lab','labor':'lab','kantine':'canteen','aula':'auditorium','physik':'physics','chemie':'chemistry','biologie':'biology'};
const floorName = f => { if(lang==='en') return f.name; const n=f.id==='g'?0:+f.id;
  if(lang==='bn') return n?digits(n)+({2:'য়',3:'য়',4:'র্থ',6:'ষ্ঠ'}[n]||'ম')+' তলা':'নিচতলা';
  if(lang==='ar') return n?'الطابق '+digits(n):'الطابق الأرضي'; return n?n+'. Stock':'Erdgeschoss'; };
function roomAnswer(q){
  if(!ROOMS.length) return null;
  let s=q.toLowerCase(); for(const [k,v] of Object.entries(ROOM_WORDS)) s=s.split(k).join(' '+v+' ');
  s=s.replace(/[০-৯]/g,d=>'০১২৩৪৫৬৭৮৯'.indexOf(d));
  const words=s.split(/[^a-z0-9]+/).filter(w=>w.length>1&&!['where','is','the','room','what','how','to','go','find','wo','ist','der','die','das'].includes(w));
  if(!words.length) return null;
  const best=ROOMS.map(o=>{let sc=0; for(const w of words){ if(/^\d{3}$/.test(w)&&o.r.num.split(/[ ,]+/).includes(w)) sc+=10; else if(o.hay.includes(w)) sc+=w.length>3?2:1; } return {o,sc};})
    .filter(x=>x.sc>1).sort((a,b)=>b.sc-a.sc)[0];
  if(!best) return null;
  const {r,f}=best.o, a=A[lang];
  const name=r.num&&r.kind==='class'?`${r.num} (${r.opt.sub||r.label})`:`${r.label}${r.num?' '+r.num:''}`;
  return `<b>${esc(name)}</b> ${a.room} <b>${floorName(f)}</b>${r.opt.ac?` · ${a.ac}`:''}${r.ic?` · ${a.ic} ☎ ${r.ic}`:''}.<br><a href="#/campus" data-room="${esc(r.num||r.label)}">🗺️ ${a.open}</a>`;
}
function botAnswer(q){
  const s=q.toLowerCase(), a=A[lang], has=k=>KW[k].some(w=>s.includes(w));
  const person=TEACHERS.concat(STAFF).find(p=>{ const n=p.name.toLowerCase().replace(/^(dr|md|mst)\.?\s+/,''); return n.split(' ').filter(w=>w.length>2).some(w=>s.includes(w)) && n.split(' ').filter(w=>w.length>2&&s.includes(w)).length>=Math.min(2,n.split(' ').length); });
  if(person) return `<b>${esc(person.name)}</b> — ${esc(person.desig)}${person.dept?` · ${esc(DEPT[person.dept]?.[lang]||person.dept)}`:''}${(person.qual||[]).length?`<br>🎓 ${esc(person.qual.join(' · '))}`:''}<br><a href="#/people">👩‍🏫 ${t('people')} →</a>`;
  if(has('teacher')){ const d=Object.keys(DEPT).find(k=>s.includes(k.toLowerCase())||s.includes(DEPT[k].bn));
    const list=TEACHERS.filter(p=>!d||p.dept===d); return `${digits(list.length)} ${t('people')}${d?` · ${DEPT[d][lang]||d}`:''}: ${list.slice(0,8).map(p=>esc(p.name)).join(', ')}${list.length>8?' …':''}<br><a href="#/people">${t('viewAll')} →</a>`; }
  const room=roomAnswer(q);
  if(has('lift')) return a.lift;
  if(room && !has('adm') && !has('addr')) return room;
  if(has('adm')) return a.adm+CONTENT.steps.map((x,i)=>`${digits(i+1)}. ${esc(L(x))}`).join(' · ');
  if(has('fee')) return a.fee;
  if(has('addr')) return a.addr+t('address')+` · <a href="${SCHOOL.mapLink}" target="_blank" rel="noopener">${t('openMaps')} ↗</a>`;
  if(has('phone')) return a.phone+SCHOOL.phones.map(p=>`<a href="tel:${p.replace(/[^\d+]/g,'')}">${digits(p)}</a>`).join(', ')+` · <a href="mailto:${SCHOOL.email}">${SCHOOL.email}</a>`;
  if(has('res')) return a.res+`<a href="${SCHOOL.results}" target="_blank" rel="noopener">eboardresults.com ↗</a>`;
  if(has('prin')) return a.prin;
  if(has('notice')) return a.notice+esc(L(sortedNotices()[0]))+` (${fmtDate(sortedNotices()[0].date)})`;
  if(has('cls')) return a.cls;
  return room || t('chatNo');
}
function toggleChat(force){ const c=$('#chat'); const on=force??!c.classList.contains('open'); c.classList.toggle('open',on); if(on){ $('#chIn').focus(); $('#roboHi')?.classList.remove('show'); ses.set('roboHi','1'); } }
function bindChat(){
  const box=$('#chMsgs'); const say=(h,who)=>{box.insertAdjacentHTML('beforeend',who==='bot'?`<div class="cm-row">${ROBOT('robot xs')}<div class="cm bot">${h}</div></div>`:`<div class="cm ${who}">${h}</div>`); box.scrollTop=box.scrollHeight;};
  say(t('chatHello'),'bot');
  const ask=q=>{ say(esc(q),'me'); box.insertAdjacentHTML('beforeend',`<div class="cm-row typing">${ROBOT('robot xs')}<div class="cm bot"><i></i><i></i><i></i></div></div>`); box.scrollTop=box.scrollHeight;
    setTimeout(()=>{ $('.typing',box)?.remove(); say(botAnswer(q),'bot'); },650); };
  const hi=$('#roboHi'); if(!ses.get('roboHi')) setTimeout(()=>hi.classList.add('show'),2600);
  hi.onclick=e=>{ hi.classList.remove('show'); ses.set('roboHi','1'); if(!e.target.closest('button')) toggleChat(true); };
  $('#chForm').onsubmit=e=>{e.preventDefault(); const v=$('#chIn').value.trim(); if(v){ask(v); $('#chIn').value='';}};
  $('.ch-q').onclick=e=>{ if(e.target.tagName==='BUTTON') ask(e.target.textContent); };
  $('#chatFab').onclick=()=>toggleChat();
  $('[data-close-chat]').onclick=()=>toggleChat(false);
  box.onclick=e=>{ const l=e.target.closest('[data-room]'); if(l){ setTimeout(()=>{const ex=$('#explorer'); if(ex) ex.contentWindow.location.hash='room='+encodeURIComponent(l.dataset.room);},500);} };
}

/* ---------- photo viewer (same page, dark background, next / previous, album info) ---------- */
let LB={list:[],i:0};
function lbList(albumIndex){ return albumIndex==null ? ALL_PHOTOS : ALBUMS[albumIndex].photos.map((src,pi)=>({src,ai:albumIndex,pi})); }
function openLB(list,i){ LB={list,i}; $('#lb').classList.add('open'); document.body.style.overflow='hidden'; drawLB(); $('#lb .lb-x').focus(); }
function closeLB(){ $('#lb').classList.remove('open'); document.body.style.overflow=''; }
function drawLB(){
  const p=LB.list[LB.i]; if(!p) return; const a=p.ai!=null?ALBUMS[p.ai]:null;
  $('#lbImg').src=p.src; $('#lbImg').alt=a?L(a.title):'';
  $('#lbCount').textContent=`${digits(LB.i+1)} / ${digits(LB.list.length)}`;
  $('#lbInfo').innerHTML=a?`<b>${esc(L(a.title))}</b>${a.year?` · ${digits(a.year)}`:''}<small>${esc(L(a.about))}</small>${a.source?`<a href="${a.source}" target="_blank" rel="noopener">${t('source')} ↗</a>`:''}`:'';
  const from=Math.max(0,Math.min(LB.i-6,LB.list.length-13));
  $('#lbThumbs').innerHTML=LB.list.slice(from,from+13).map((q,k)=>`<button data-k="${from+k}" class="${from+k===LB.i?'on':''}"><img src="${q.src}" alt=""></button>`).join('');
  [LB.i-1,LB.i+1].forEach(k=>{ if(LB.list[k]) (new Image()).src=LB.list[k].src; });
}
const stepLB=d=>{ LB.i=(LB.i+d+LB.list.length)%LB.list.length; drawLB(); };
function lbMarkup(){
  return `<div class="lb" id="lb" role="dialog" aria-modal="true"><button class="lb-x" aria-label="Close">×</button>
   <button class="lb-nav lb-prev" aria-label="Previous">‹</button><figure><img id="lbImg" alt=""><figcaption><span id="lbCount"></span><span id="lbInfo"></span></figcaption></figure>
   <button class="lb-nav lb-next" aria-label="Next">›</button><div class="lb-thumbs" id="lbThumbs"></div></div>`;
}
function bindLB(){
  const lb=$('#lb'); let x0=null;
  lb.addEventListener('click',e=>{ if(e.target===lb||e.target.closest('.lb-x')) closeLB(); else if(e.target.closest('.lb-prev')) stepLB(-1); else if(e.target.closest('.lb-next')) stepLB(1);
    else { const b=e.target.closest('[data-k]'); if(b){ LB.i=+b.dataset.k; drawLB(); } } });
  lb.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;},{passive:true});
  lb.addEventListener('touchend',e=>{ if(x0==null) return; const dx=e.changedTouches[0].clientX-x0; if(Math.abs(dx)>50) stepLB(dx<0?1:-1); x0=null; });
  addEventListener('keydown',e=>{ if(!lb.classList.contains('open')) return; if(e.key==='ArrowRight') stepLB(document.dir==='rtl'?-1:1); if(e.key==='ArrowLeft') stepLB(document.dir==='rtl'?1:-1); if(e.key==='Escape') closeLB(); });
}
function bindPeople(){
  const box=$('#ppTeachers'); if(!box) return; let dept='';
  const apply=()=>{ const q=$('#ppSearch').value.trim().toLowerCase(); let n=0;
    $$('.person',box).forEach(el=>{ const ok=(!dept||el.dataset.dept===dept)&&(!q||el.dataset.search.includes(q)); el.hidden=!ok; if(ok) n++; }); $('#ppNone').hidden=n>0; };
  $('#ppSearch').oninput=apply;
  $('#ppChips').onclick=e=>{ const b=e.target.closest('button'); if(!b) return; dept=b.dataset.f; $$('#ppChips button').forEach(x=>x.classList.toggle('on',x===b)); apply(); };
}

/* ---------- monthly background animation (hero only, respects reduced motion) ---------- */
let fxRaf=0;
function startFx(type){
  cancelAnimationFrame(fxRaf);
  const cv=$('canvas.fx'); if(!cv) return;
  const ctx=cv.getContext('2d'); const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fit=()=>{ cv.width=cv.offsetWidth*devicePixelRatio; cv.height=cv.offsetHeight*devicePixelRatio; }; fit(); addEventListener('resize',fit);
  const W=()=>cv.width, H=()=>cv.height, dpr=devicePixelRatio, th=MONTHS[month-1];
  const LET='অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ';
  const n={mist:26,letters:34,flag:30,alpona:22,sun:16,rain:120,clouds:9,kash:44,leaves:30,paddy:46,sparkle:60}[type]||30;
  const P=Array.from({length:n},()=>({x:Math.random(),y:Math.random(),s:Math.random()*.8+.4,v:Math.random()*.5+.5,a:Math.random()*6.28,ch:LET[Math.random()*LET.length|0],c:th.c[Math.random()*3|0]}));
  const draw=()=>{
    ctx.clearRect(0,0,W(),H());
    for(const p of P){
      const x=p.x*W(), y=p.y*H(), s=p.s*dpr;
      ctx.globalAlpha=.55;
      if(type==='rain'){ ctx.strokeStyle='rgba(255,255,255,.55)'; ctx.lineWidth=1.2*dpr; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x-4*s,y+18*s); ctx.stroke(); p.y+=.018*p.v; p.x-=.002; }
      else if(type==='letters'){ ctx.fillStyle='rgba(255,255,255,.5)'; ctx.font=`${22*s}px "Hind Siliguri",sans-serif`; ctx.fillText(p.ch,x,y); p.y+=.0012*p.v; }
      else if(type==='mist'||type==='clouds'){ const g=ctx.createRadialGradient(x,y,0,x,y,(type==='clouds'?120:80)*s); g.addColorStop(0,'rgba(255,255,255,.35)'); g.addColorStop(1,'rgba(255,255,255,0)'); ctx.fillStyle=g; ctx.fillRect(x-200*s,y-200*s,400*s,400*s); p.x+=.0006*p.v; }
      else if(type==='kash'){ ctx.fillStyle='rgba(255,255,255,.85)'; for(let k=0;k<6;k++){ ctx.beginPath(); ctx.arc(x+Math.cos(p.a+k)*4*s,y+Math.sin(p.a+k)*4*s,1.6*s,0,7); ctx.fill(); } p.y+=.0015*p.v; p.x+=Math.sin(p.a+=.02)*.0015; }
      else if(type==='leaves'||type==='paddy'){ ctx.fillStyle=type==='paddy'?'#FACC15':p.c; ctx.save(); ctx.translate(x,y); ctx.rotate(p.a+=.02); ctx.beginPath(); ctx.ellipse(0,0,(type==='paddy'?3:7)*s,(type==='paddy'?7:3.5)*s,0,0,7); ctx.fill(); ctx.restore(); p.y+=.002*p.v; p.x+=Math.sin(p.a)*.001; }
      else if(type==='sparkle'||type==='flag'){ const tw=(Math.sin(p.a+=.05)+1)/2; ctx.globalAlpha=.25+tw*.6; ctx.fillStyle=type==='flag'?(p.c==='#F42A41'?'#F42A41':'#fff'):p.c; ctx.beginPath(); ctx.arc(x,y,(type==='flag'?5:2.4)*s*(.6+tw*.6),0,7); ctx.fill(); p.y-=.0008*p.v; }
      else if(type==='sun'){ ctx.strokeStyle='rgba(255,220,120,.35)'; ctx.lineWidth=2*dpr; ctx.beginPath(); ctx.moveTo(W()*.85,H()*.1); ctx.lineTo(W()*.85+Math.cos(p.a)*W(),H()*.1+Math.sin(p.a)*W()); ctx.stroke(); p.a+=.0015; }
      else if(type==='alpona'){ ctx.strokeStyle='rgba(255,255,255,.5)'; ctx.lineWidth=1.4*dpr; ctx.save(); ctx.translate(x,y); ctx.rotate(p.a+=.004); for(let k=0;k<8;k++){ ctx.rotate(Math.PI/4); ctx.beginPath(); ctx.ellipse(10*s,0,9*s,3.5*s,0,0,7); ctx.stroke(); } ctx.beginPath(); ctx.arc(0,0,3*s,0,7); ctx.stroke(); ctx.restore(); }
      if(p.y>1.05){p.y=-.05;p.x=Math.random();} if(p.y<-.06){p.y=1.05;} if(p.x>1.1)p.x=-.1; if(p.x<-.1)p.x=1.1;
    }
    ctx.globalAlpha=1; if(!reduce) fxRaf=requestAnimationFrame(draw);
  };
  draw();
}

/* ---------- router ---------- */
function route(){
  const p=(location.hash.match(/^#\/(\w+)/)||[])[1]||'home';
  const page=PAGES.includes(p)?p:'home';
  $$('main > .page').forEach(el=>el.hidden=el.dataset.page!==page);
  $$('#menu a').forEach(a=>a.classList.toggle('on',a.dataset.p===page));
  document.body.dataset.page=page; $('#menu').classList.remove('open');
  if(page==='home') startFx(MONTHS[month-1].fx);
  scrollTo({top:0,behavior:'instant'});
}

/* ---------- build everything ---------- */
function render(){
  const lg=LANGS[lang]; const r=document.documentElement;
  r.lang=lang; r.dir=lg.dir; r.style.setProperty('--font',`${lg.font},"Hind Siliguri","Cairo",system-ui,sans-serif`);
  document.title=`${lang==='bn'?'গ্রীনফিল্ড স্কুল এন্ড কলেজ':'Greenfield School & College'} · GFSC`;
  $('#topbar').innerHTML=topbar(); $('#nav').innerHTML=nav();
  const pg=pages(); $('main').innerHTML=PAGES.map(p=>`<div class="page" data-page="${p}" hidden>${pg[p]}</div>`).join('');
  $('#footer').innerHTML=footer(); $('#dockWrap').innerHTML=dock();
  if(!$('.preview-ribbon')) document.body.insertAdjacentHTML('beforeend','<div class="preview-ribbon">Preview · প্রস্তাবিত নতুন ডিজাইন</div>');
  bindForms(document); bindChat(); bindPeople(); applyTheme(); route(); countUp();
  $('#langSel').onchange=e=>{lang=e.target.value; store.set('lang',lang); render();};
  $('#monthSel').onchange=e=>{month=+e.target.value; store.set('month',month); render();};
  $('#modeBtn').onclick=()=>{mode=mode==='dark'?'light':'dark'; store.set('mode',mode); render();};
  $('#burger').onclick=()=>$('#menu').classList.toggle('open');
}
function countUp(){
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(!e.isIntersecting) return; io.unobserve(e.target);
    const el=e.target, end=+el.dataset.count, txt=el.textContent; if(!end||end<20) return; let n=0; const step=Math.ceil(end/40);
    const tick=()=>{ n=Math.min(end,n+step); el.textContent=digits((/,/.test(txt)?n.toLocaleString('en'):String(n))+(txt.includes('+')?'+':'')); if(n<end) requestAnimationFrame(tick); }; tick(); }),{threshold:.6});
  $$('[data-count]').forEach(el=>io.observe(el));
}

document.addEventListener('DOMContentLoaded',()=>{
  document.body.insertAdjacentHTML('beforeend',`<div class="modal" id="modal" aria-hidden="true" role="dialog" aria-modal="true"><div class="m-box"><button class="m-x" data-close aria-label="Close">×</button><div id="mBody"></div></div></div>`);
  document.body.insertAdjacentHTML('beforeend',lbMarkup()); bindLB();
  buildRooms(); render();
  addEventListener('hashchange',route);
  document.addEventListener('click',e=>{
    const o=e.target.closest('[data-open]'); if(o){ e.preventDefault(); openModal(o.dataset.open); return; }
    const al=e.target.closest('[data-album]'); if(al){ openLB(lbList(+al.dataset.album),0); return; }
    const ph=e.target.closest('[data-photo]'); if(ph){ openLB(ALL_PHOTOS,+ph.dataset.photo); return; }
    const ps=e.target.closest('[data-src]'); if(ps){ openLB([{src:ps.dataset.src}],0); return; }
    if(e.target.closest('[data-close]')||e.target.id==='modal') closeModal();
  });
  addEventListener('keydown',e=>{ if(e.key==='Escape'){closeModal(); toggleChat(false);} if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault(); openQuick();} });
  // the latest pinned notice pops up once per visit
  if(!ses.get('noticeSeen')){ ses.set('noticeSeen','1'); setTimeout(()=>openModal('notice'),700); }
});
})();
