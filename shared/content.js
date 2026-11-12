/* =====================================================================
   GFSC website content — ONE place for every text, in 4 languages.
   bn = বাংলা · en = English · ar = العربية · de = Deutsch
   To update a notice / text: change it here; all 3 website versions update.
   Items marked  // TODO(fill)  are waiting for real information (see docs/02_Content_Requirements).
   ===================================================================== */
const LANGS = {
  bn: {name:'বাংলা', dir:'ltr', font:'"Noto Sans Bengali","Hind Siliguri"'},
  en: {name:'English', dir:'ltr', font:'"Plus Jakarta Sans"'},
  ar: {name:'العربية', dir:'rtl', font:'"Cairo"'},
  de: {name:'Deutsch', dir:'ltr', font:'"Plus Jakarta Sans"'}
};

const SCHOOL = {
  site:'https://www.gfsc.edu.bd',
  img:'https://gfsc.edu.bd/media/',            // images are loaded from the school website
  logo:'../shared/gfsc_logo.png',
  phones:['02-48034676','02-48034072','02-58052555','01786-500930','01785 055 056','01754-825012'],
  email:'greenfieldcollege07@gmail.com',
  map:'https://maps.google.com/maps?q=Greenfield%20School%20%26%20College%2C%20Mirpur%2010%2C%20Dhaka&z=16&output=embed',
  mapLink:'https://maps.google.com/?q=Greenfield+School+%26+College+Mirpur+10+Dhaka',
  social:[ // TODO(fill): YouTube / Instagram / LinkedIn / WhatsApp links
    {k:'facebook', url:'https://www.facebook.com/GreenFieldSchoolCollege/'},
    {k:'youtube', url:'#'}, {k:'instagram', url:'#'}, {k:'whatsapp', url:'https://wa.me/8801786500930'}, {k:'linkedin', url:'#'}
  ],
  results:'https://eboardresults.com',
  stats:{est:2007, students:'1,700+', classrooms:54, floors:10, levels:'Play – XII', versions:2}
};

/* ---------- UI words ---------- */
const UI = {
 en:{home:'Home',about:'About',academics:'Academics',admission:'Admission',notices:'Notices',gallery:'Gallery',campus:'Campus Map',contact:'Contact',
  studentLogin:'Student Login',staffLogin:'Staff Login',menu:'Menu',quick:'Quick menu',search:'Where do you want to go?',
  heroKicker:'Since 2007 · Mirpur 10, Dhaka',heroTitle:'Learn boldly.<br>Grow kindly.',heroTitleText:'Learn boldly. Grow kindly.',
  heroSub:'Play Group to Class XII · Bangla Medium & English Version · a safe 10-storied campus with modern labs and smart classrooms.',
  ctaApply:'Apply Online',ctaVisit:'Book a Visit',ctaCampus:'Explore the Campus',ctaNotice:'Latest Notices',
  stEst:'Established',stStudents:'Students',stRooms:'Smart classrooms',stFloors:'Storied campus',stLabs:'Classes',stVersions:'Versions: Bangla & English',
  whyTitle:'Why families choose GFSC',whySub:'Everything a child needs to grow — in one safe building.',
  journeyTitle:'Your child’s journey',journeySub:'From the first day of Play Group to the HSC exam — one school, one family.',
  facTitle:'Facilities',leadersTitle:'Leadership',noticesTitle:'Notice Board',eventsTitle:'News & Events',galleryTitle:'Life at GFSC',
  resultsTitle:'Results & useful links',contactTitle:'Contact us',admissionTitle:'Online Admission & Appointment',
  admissionSub:'Fill in the form — the office will call you to confirm.',stepsTitle:'How admission works',
  campusTitle:'Interactive campus map',campusSub:'Find any room on any floor — with AC, intercom and lift info.',
  mapTitle:'Find us on Google Maps',address:'Plot-3, Block-C, Avenue-2, Mirpur-10, Dhaka-1216',
  fName:'Student’s name',fGuardian:'Guardian’s name',fPhone:'Mobile number',fEmail:'Email (optional)',fClass:'Class',fVersion:'Version',
  fType:'I want to',fTypeAdm:'Apply for admission',fTypeApp:'Book an appointment / visit',fDate:'Preferred date',fMsg:'Message',
  fSubmit:'Send request',fReq:'Required',fSent:'Thank you! Your request is ready — your email app will open to send it to the school office.',
  bm:'Bangla Medium',ev:'English Version',
  dockAdm:'Admission',dockMap:'Map',dockContact:'Contact',dockNotice:'Notice',
  close:'Close',loginId:'ID / Roll number',loginPass:'Password',signIn:'Sign in',
  loginNote:'The login portal will be connected to the school’s student/staff system (ODHYYON).',
  chatTitle:'Ask GFSC',chatHello:'Hi! 👋 I am the GFSC assistant. Ask me about admission, contact, classes, results or any room in the building.',
  chatPh:'Type your question…',chatNo:'Sorry, I don’t know that yet. Please call 01786-500930 or use the Contact button.',
  chatQ:['Change settings','How to get admission?','Phone number','Where is the Computer Lab?','Which classes are taught?','Where is the school?'],
  readMore:'Read more',viewAll:'View all',pinned:'Important',newTag:'New',soon:'Coming soon',
  msgSoon:'The full message will be published soon.',followUs:'Follow us',quickLinks:'Quick links',rights:'All rights reserved.',
  month:'Theme of the month',light:'Light',dark:'Dark',callUs:'Call us',emailUs:'Email us',openMaps:'Open in Google Maps',
  visitors:'Families welcome — Saturday to Thursday',  // TODO(fill): office hours
  noticeTitle:'Notice',dontShow:'Got it'},
 bn:{home:'হোম',about:'আমাদের কথা',academics:'একাডেমিক',admission:'ভর্তি',notices:'নোটিশ',gallery:'গ্যালারি',campus:'ক্যাম্পাস ম্যাপ',contact:'যোগাযোগ',
  studentLogin:'শিক্ষার্থী লগইন',staffLogin:'স্টাফ লগইন',menu:'মেনু',quick:'দ্রুত মেনু',search:'কোথায় যেতে চান?',
  heroKicker:'২০০৭ সাল থেকে · মিরপুর ১০, ঢাকা',heroTitle:'সাহস নিয়ে শিখি,<br>ভালোবাসায় বড় হই।',heroTitleText:'সাহস নিয়ে শিখি, ভালোবাসায় বড় হই।',
  heroSub:'প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি · বাংলা মাধ্যম ও ইংলিশ ভার্সন · আধুনিক ল্যাব ও স্মার্ট ক্লাসরুমসহ নিরাপদ ১০ তলা ক্যাম্পাস।',
  ctaApply:'অনলাইনে ভর্তি',ctaVisit:'সাক্ষাতের সময় নিন',ctaCampus:'ক্যাম্পাস ঘুরে দেখুন',ctaNotice:'সর্বশেষ নোটিশ',
  stEst:'প্রতিষ্ঠা',stStudents:'শিক্ষার্থী',stRooms:'স্মার্ট ক্লাসরুম',stFloors:'তলা ভবন',stLabs:'শ্রেণি',stVersions:'ভার্সন: বাংলা ও ইংলিশ',
  whyTitle:'অভিভাবকেরা কেন GFSC বেছে নেন',whySub:'একটি নিরাপদ ভবনে শিশুর বেড়ে ওঠার সব আয়োজন।',
  journeyTitle:'আপনার সন্তানের পথচলা',journeySub:'প্লে গ্রুপের প্রথম দিন থেকে এইচএসসি পরীক্ষা — একটি স্কুল, একটি পরিবার।',
  facTitle:'সুযোগ-সুবিধা',leadersTitle:'প্রতিষ্ঠান পরিচালনা',noticesTitle:'নোটিশ বোর্ড',eventsTitle:'খবর ও অনুষ্ঠান',galleryTitle:'GFSC-এর দিনগুলো',
  resultsTitle:'ফলাফল ও দরকারি লিংক',contactTitle:'যোগাযোগ করুন',admissionTitle:'অনলাইন ভর্তি ও অ্যাপয়েন্টমেন্ট',
  admissionSub:'ফর্মটি পূরণ করুন — অফিস থেকে ফোন করে নিশ্চিত করা হবে।',stepsTitle:'ভর্তির ধাপসমূহ',
  campusTitle:'ইন্টারঅ্যাকটিভ ক্যাম্পাস ম্যাপ',campusSub:'যেকোনো তলার যেকোনো রুম খুঁজুন — এসি, ইন্টারকম ও লিফটের তথ্যসহ।',
  mapTitle:'গুগল ম্যাপে আমাদের খুঁজুন',address:'প্লট-৩, ব্লক-সি, অ্যাভিনিউ-২, মিরপুর-১০, ঢাকা-১২১৬',
  fName:'শিক্ষার্থীর নাম',fGuardian:'অভিভাবকের নাম',fPhone:'মোবাইল নম্বর',fEmail:'ইমেইল (ঐচ্ছিক)',fClass:'শ্রেণি',fVersion:'ভার্সন',
  fType:'আমি চাই',fTypeAdm:'ভর্তির আবেদন',fTypeApp:'সাক্ষাৎ / ক্যাম্পাস ভিজিট',fDate:'পছন্দের তারিখ',fMsg:'বার্তা',
  fSubmit:'অনুরোধ পাঠান',fReq:'আবশ্যক',fSent:'ধন্যবাদ! আপনার অনুরোধ তৈরি — স্কুল অফিসে পাঠাতে আপনার ইমেইল অ্যাপ খুলবে।',
  bm:'বাংলা মাধ্যম',ev:'ইংলিশ ভার্সন',
  dockAdm:'ভর্তি',dockMap:'ম্যাপ',dockContact:'যোগাযোগ',dockNotice:'নোটিশ',
  close:'বন্ধ',loginId:'আইডি / রোল নম্বর',loginPass:'পাসওয়ার্ড',signIn:'প্রবেশ করুন',
  loginNote:'লগইন পোর্টালটি স্কুলের শিক্ষার্থী/স্টাফ সিস্টেমের (ODHYYON) সাথে যুক্ত করা হবে।',
  chatTitle:'GFSC-কে জিজ্ঞেস করুন',chatHello:'হ্যালো! 👋 আমি GFSC সহকারী। ভর্তি, যোগাযোগ, শ্রেণি, ফলাফল বা ভবনের যেকোনো রুম সম্পর্কে জিজ্ঞেস করুন।',
  chatPh:'আপনার প্রশ্ন লিখুন…',chatNo:'দুঃখিত, এটি এখনো জানি না। ০১৭৮৬-৫০০৯৩০ নম্বরে ফোন করুন বা যোগাযোগ বাটন ব্যবহার করুন।',
  chatQ:['সেটিং পরিবর্তন','ভর্তি কীভাবে হবে?','ফোন নম্বর','কম্পিউটার ল্যাব কোথায়?','কোন কোন শ্রেণি আছে?','স্কুলটি কোথায়?'],
  readMore:'বিস্তারিত',viewAll:'সব দেখুন',pinned:'জরুরি',newTag:'নতুন',soon:'শীঘ্রই আসছে',
  msgSoon:'সম্পূর্ণ বাণী শীঘ্রই প্রকাশ করা হবে।',followUs:'আমাদের অনুসরণ করুন',quickLinks:'দরকারি লিংক',rights:'সর্বস্বত্ব সংরক্ষিত।',
  month:'এ মাসের থিম',light:'লাইট',dark:'ডার্ক',callUs:'ফোন করুন',emailUs:'ইমেইল করুন',openMaps:'গুগল ম্যাপে খুলুন',
  visitors:'শনিবার থেকে বৃহস্পতিবার — অভিভাবকদের স্বাগতম',noticeTitle:'নোটিশ',dontShow:'ঠিক আছে'},
 ar:{home:'الرئيسية',about:'من نحن',academics:'الأكاديميات',admission:'القبول',notices:'الإعلانات',gallery:'المعرض',campus:'خريطة الحرم',contact:'اتصل بنا',
  studentLogin:'دخول الطلاب',staffLogin:'دخول الموظفين',menu:'القائمة',quick:'قائمة سريعة',search:'إلى أين تريد الذهاب؟',
  heroKicker:'منذ 2007 · ميربور 10، دكا',heroTitle:'نتعلّم بجرأة،<br>ونكبر بلطف.',heroTitleText:'نتعلّم بجرأة، ونكبر بلطف.',
  heroSub:'من مرحلة اللعب حتى الصف الثاني عشر · المسار البنغالي والمسار الإنجليزي · حرم آمن من عشرة طوابق مع مختبرات حديثة وفصول ذكية.',
  ctaApply:'التقديم عبر الإنترنت',ctaVisit:'احجز زيارة',ctaCampus:'استكشف الحرم',ctaNotice:'أحدث الإعلانات',
  stEst:'سنة التأسيس',stStudents:'طالب وطالبة',stRooms:'فصل ذكي',stFloors:'طوابق',stLabs:'الصفوف',stVersions:'مساران: بنغالي وإنجليزي',
  whyTitle:'لماذا تختار العائلات GFSC',whySub:'كل ما يحتاجه الطفل لينمو — في مبنى واحد آمن.',
  journeyTitle:'رحلة طفلك',journeySub:'من اليوم الأول في مرحلة اللعب حتى امتحان الثانوية العليا — مدرسة واحدة وعائلة واحدة.',
  facTitle:'المرافق',leadersTitle:'القيادة',noticesTitle:'لوحة الإعلانات',eventsTitle:'الأخبار والفعاليات',galleryTitle:'الحياة في GFSC',
  resultsTitle:'النتائج وروابط مفيدة',contactTitle:'تواصل معنا',admissionTitle:'القبول والمواعيد عبر الإنترنت',
  admissionSub:'املأ النموذج — سيتصل بك المكتب للتأكيد.',stepsTitle:'خطوات القبول',
  campusTitle:'خريطة تفاعلية للحرم',campusSub:'ابحث عن أي غرفة في أي طابق — مع معلومات التكييف والاتصال الداخلي والمصعد.',
  mapTitle:'موقعنا على خرائط Google',address:'قطعة 3، بلوك C، الجادة 2، ميربور 10، دكا 1216',
  fName:'اسم الطالب',fGuardian:'اسم ولي الأمر',fPhone:'رقم الجوال',fEmail:'البريد الإلكتروني (اختياري)',fClass:'الصف',fVersion:'المسار',
  fType:'أرغب في',fTypeAdm:'التقديم للقبول',fTypeApp:'حجز موعد / زيارة',fDate:'التاريخ المفضل',fMsg:'رسالة',
  fSubmit:'إرسال الطلب',fReq:'مطلوب',fSent:'شكرًا لك! طلبك جاهز — سيفتح تطبيق البريد لإرساله إلى مكتب المدرسة.',
  bm:'المسار البنغالي',ev:'المسار الإنجليزي',
  dockAdm:'القبول',dockMap:'الخريطة',dockContact:'اتصال',dockNotice:'إعلان',
  close:'إغلاق',loginId:'الرقم التعريفي',loginPass:'كلمة المرور',signIn:'تسجيل الدخول',
  loginNote:'سيتم ربط بوابة الدخول بنظام الطلاب والموظفين في المدرسة (ODHYYON).',
  chatTitle:'اسأل GFSC',chatHello:'مرحبًا! 👋 أنا مساعد GFSC. اسألني عن القبول أو التواصل أو الصفوف أو النتائج أو أي غرفة في المبنى.',
  chatPh:'اكتب سؤالك…',chatNo:'عذرًا، لا أعرف ذلك بعد. يرجى الاتصال على 01786-500930 أو استخدام زر الاتصال.',
  chatQ:['غيّر الإعدادات','كيف أقدّم للقبول؟','رقم الهاتف','أين مختبر الحاسوب؟','ما الصفوف المتاحة؟','أين تقع المدرسة؟'],
  readMore:'اقرأ المزيد',viewAll:'عرض الكل',pinned:'مهم',newTag:'جديد',soon:'قريبًا',
  msgSoon:'ستُنشر الكلمة كاملة قريبًا.',followUs:'تابعونا',quickLinks:'روابط سريعة',rights:'جميع الحقوق محفوظة.',
  month:'سمة الشهر',light:'فاتح',dark:'داكن',callUs:'اتصل بنا',emailUs:'راسلنا',openMaps:'افتح في خرائط Google',
  visitors:'نرحب بالعائلات من السبت إلى الخميس',noticeTitle:'إعلان',dontShow:'حسنًا'},
 de:{home:'Start',about:'Über uns',academics:'Unterricht',admission:'Aufnahme',notices:'Aushänge',gallery:'Galerie',campus:'Campusplan',contact:'Kontakt',
  studentLogin:'Schüler-Login',staffLogin:'Personal-Login',menu:'Menü',quick:'Schnellmenü',search:'Wohin möchten Sie?',
  heroKicker:'Seit 2007 · Mirpur 10, Dhaka',heroTitle:'Mutig lernen.<br>Freundlich wachsen.',heroTitleText:'Mutig lernen. Freundlich wachsen.',
  heroSub:'Spielgruppe bis Klasse 12 · Bangla-Zweig & englischer Zweig · ein sicherer 10-stöckiger Campus mit modernen Laboren und Smart-Klassenzimmern.',
  ctaApply:'Online bewerben',ctaVisit:'Besuch buchen',ctaCampus:'Campus entdecken',ctaNotice:'Neueste Aushänge',
  stEst:'Gegründet',stStudents:'Schülerinnen & Schüler',stRooms:'Smart-Klassenzimmer',stFloors:'Stockwerke',stLabs:'Klassen',stVersions:'Zweige: Bangla & Englisch',
  whyTitle:'Warum Familien GFSC wählen',whySub:'Alles, was ein Kind zum Wachsen braucht — in einem sicheren Gebäude.',
  journeyTitle:'Der Weg Ihres Kindes',journeySub:'Vom ersten Tag in der Spielgruppe bis zur HSC-Prüfung — eine Schule, eine Familie.',
  facTitle:'Ausstattung',leadersTitle:'Schulleitung',noticesTitle:'Schwarzes Brett',eventsTitle:'News & Veranstaltungen',galleryTitle:'Leben an der GFSC',
  resultsTitle:'Ergebnisse & nützliche Links',contactTitle:'Kontakt',admissionTitle:'Online-Aufnahme & Termin',
  admissionSub:'Formular ausfüllen — das Sekretariat ruft Sie zur Bestätigung an.',stepsTitle:'So läuft die Aufnahme',
  campusTitle:'Interaktiver Campusplan',campusSub:'Jeden Raum auf jeder Etage finden — mit Klima-, Telefon- und Aufzugsinfos.',
  mapTitle:'Finden Sie uns auf Google Maps',address:'Plot-3, Block-C, Avenue-2, Mirpur-10, Dhaka-1216',
  fName:'Name des Kindes',fGuardian:'Name des Erziehungsberechtigten',fPhone:'Handynummer',fEmail:'E-Mail (optional)',fClass:'Klasse',fVersion:'Zweig',
  fType:'Ich möchte',fTypeAdm:'mich um Aufnahme bewerben',fTypeApp:'einen Termin / Besuch buchen',fDate:'Wunschtermin',fMsg:'Nachricht',
  fSubmit:'Anfrage senden',fReq:'Pflichtfeld',fSent:'Danke! Ihre Anfrage ist fertig — Ihr E-Mail-Programm öffnet sich, um sie an das Sekretariat zu senden.',
  bm:'Bangla-Zweig',ev:'Englischer Zweig',
  dockAdm:'Aufnahme',dockMap:'Karte',dockContact:'Kontakt',dockNotice:'Aushang',
  close:'Schließen',loginId:'ID / Schülernummer',loginPass:'Passwort',signIn:'Anmelden',
  loginNote:'Das Login-Portal wird mit dem Schüler- und Personalsystem der Schule (ODHYYON) verbunden.',
  chatTitle:'Frag GFSC',chatHello:'Hallo! 👋 Ich bin der GFSC-Assistent. Fragen Sie nach Aufnahme, Kontakt, Klassen, Ergebnissen oder einem Raum im Gebäude.',
  chatPh:'Ihre Frage…',chatNo:'Das weiß ich leider noch nicht. Bitte rufen Sie 01786-500930 an oder nutzen Sie den Kontakt-Button.',
  chatQ:['Einstellungen ändern','Wie funktioniert die Aufnahme?','Telefonnummer','Wo ist das Computerlabor?','Welche Klassen gibt es?','Wo ist die Schule?'],
  readMore:'Mehr lesen',viewAll:'Alle ansehen',pinned:'Wichtig',newTag:'Neu',soon:'Demnächst',
  msgSoon:'Die vollständige Botschaft wird bald veröffentlicht.',followUs:'Folgen Sie uns',quickLinks:'Schnelllinks',rights:'Alle Rechte vorbehalten.',
  month:'Thema des Monats',light:'Hell',dark:'Dunkel',callUs:'Anrufen',emailUs:'E-Mail',openMaps:'In Google Maps öffnen',
  visitors:'Familien willkommen — Samstag bis Donnerstag',noticeTitle:'Aushang',dontShow:'Verstanden'}
};

/* ---------- longer content (each item has en / bn / ar / de) ---------- */
const CONTENT = {
 about:{
  en:'Greenfield School & College (GFSC) was founded in 2007 by the Greenways Foundation in Mirpur-10, Dhaka. It started with about 300 students and today welcomes more than 1,700 learners from Play Group to Class XII. We follow the national (NCTB) curriculum in both Bangla Medium and English Version, and we care for patriotism, equality and good character as much as for good results.',
  bn:'গ্রীনফিল্ড স্কুল এন্ড কলেজ (GFSC) ২০০৭ সালে গ্রিনওয়েজ ফাউন্ডেশনের উদ্যোগে ঢাকার মিরপুর-১০-এ প্রতিষ্ঠিত হয়। প্রায় ৩০০ শিক্ষার্থী নিয়ে যাত্রা শুরু করে আজ প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি পর্যন্ত ১,৭০০-এর বেশি শিক্ষার্থী এখানে পড়ে। আমরা বাংলা মাধ্যম ও ইংলিশ ভার্সন — দুই ধারাতেই জাতীয় (NCTB) শিক্ষাক্রম অনুসরণ করি এবং ভালো ফলাফলের পাশাপাশি দেশপ্রেম, সমতা ও সুন্দর চরিত্র গঠনে গুরুত্ব দিই।',
  ar:'تأسست مدرسة وكلية غرينفيلد (GFSC) عام 2007 على يد مؤسسة غرينويز في ميربور 10، دكا. بدأت بنحو 300 طالب، واليوم تستقبل أكثر من 1700 طالب وطالبة من مرحلة اللعب حتى الصف الثاني عشر. نتبع المنهج الوطني (NCTB) في المسارين البنغالي والإنجليزي، ونهتم بحب الوطن والمساواة وحسن الخلق بقدر اهتمامنا بالنتائج المتميزة.',
  de:'Die Greenfield School & College (GFSC) wurde 2007 von der Greenways Foundation in Mirpur-10, Dhaka, gegründet. Sie begann mit rund 300 Schülerinnen und Schülern und bildet heute über 1.700 Kinder und Jugendliche von der Spielgruppe bis Klasse 12 aus. Wir unterrichten nach dem nationalen Lehrplan (NCTB) im Bangla- und im englischen Zweig — und legen ebenso viel Wert auf Heimatliebe, Gleichberechtigung und Charakter wie auf gute Ergebnisse.'},
 mission:{ // TODO(fill): official mission & vision text
  en:'Mission: to give every child a safe, joyful and disciplined place to learn, discover their talents and become a responsible citizen.',
  bn:'লক্ষ্য: প্রতিটি শিশুকে নিরাপদ, আনন্দময় ও সুশৃঙ্খল পরিবেশে শেখার, প্রতিভা আবিষ্কারের এবং দায়িত্বশীল নাগরিক হয়ে ওঠার সুযোগ দেওয়া।',
  ar:'رسالتنا: أن نمنح كل طفل مكانًا آمنًا ومبهجًا ومنضبطًا ليتعلّم ويكتشف مواهبه ويصبح مواطنًا مسؤولًا.',
  de:'Mission: Jedem Kind einen sicheren, fröhlichen und geordneten Ort zu geben, um zu lernen, seine Talente zu entdecken und ein verantwortungsvoller Bürger zu werden.'},
 why:[
  {i:'🏫',en:['10-storied safe campus','Lift, two-door stair landings, wide corridors and safe drinking water on every floor.'],bn:['১০ তলা নিরাপদ ক্যাম্পাস','লিফট, দুই দরজার সিঁড়ি-ল্যান্ডিং, প্রশস্ত করিডোর ও প্রতিটি তলায় নিরাপদ পানি।'],ar:['حرم آمن من 10 طوابق','مصعد، ومداخل درج ببابين، وممرات واسعة، ومياه شرب آمنة في كل طابق.'],de:['Sicherer 10-stöckiger Campus','Aufzug, Treppenpodeste mit zwei Türen, breite Flure und sauberes Trinkwasser auf jeder Etage.']},
  {i:'💡',en:['54 multimedia classrooms','Projector-based lessons; 17 classrooms already air-conditioned.'],bn:['৫৪টি মাল্টিমিডিয়া ক্লাসরুম','প্রজেক্টরভিত্তিক পাঠদান; ১৭টি ক্লাসরুম শীতাতপ নিয়ন্ত্রিত।'],ar:['54 فصلًا بالوسائط المتعددة','دروس بأجهزة العرض؛ و17 فصلًا مكيّفًا.'],de:['54 Multimedia-Klassenzimmer','Unterricht mit Beamer; 17 Klassenzimmer sind klimatisiert.']},
  {i:'🔬',en:['Functional Labs','Hands-on practical classes in fully equipped labs.'],bn:['ফাংশনাল ল্যাব','সম্পূর্ণ সজ্জিত ল্যাবে হাতে-কলমে ব্যবহারিক ক্লাস।'],ar:['مختبرات متكاملة','حصص عملية في مختبرات مجهزة بالكامل.'],de:['Moderne Labore','Praktischer Unterricht in voll ausgestatteten Laboren.']},
  {i:'🌏',en:['Two versions, one standard','Bangla Medium and English Version under the national curriculum.'],bn:['দুই ভার্সন, এক মান','জাতীয় শিক্ষাক্রমে বাংলা মাধ্যম ও ইংলিশ ভার্সন।'],ar:['مساران بمعيار واحد','المسار البنغالي والإنجليزي وفق المنهج الوطني.'],de:['Zwei Zweige, ein Anspruch','Bangla-Zweig und englischer Zweig nach nationalem Lehrplan.']},
  {i:'🎭',en:['Clubs & culture','English Language Club, auditorium, indoor games, sports and cultural festivals like Pitha Utshob.'],bn:['ক্লাব ও সংস্কৃতি','ইংলিশ ল্যাঙ্গুয়েজ ক্লাব, অডিটোরিয়াম, ইনডোর গেমস, খেলাধুলা ও পিঠা উৎসবের মতো আয়োজন।'],ar:['أندية وثقافة','نادي اللغة الإنجليزية، قاعة احتفالات، ألعاب داخلية، رياضة ومهرجانات ثقافية.'],de:['Clubs & Kultur','English Language Club, Aula, Indoor-Spiele, Sport und Feste wie das Pitha-Festival.']},
  {i:'🏅',en:['Recognition that motivates','Monthly exam prizes, captain badges and class-representative ceremonies.'],bn:['উৎসাহ জাগানো স্বীকৃতি','মাসিক পরীক্ষার পুরস্কার, ক্যাপ্টেন ব্যাজ ও শ্রেণি প্রতিনিধি সম্মাননা।'],ar:['تكريم يحفّز','جوائز الامتحانات الشهرية وشارات القادة وتكريم ممثلي الفصول.'],de:['Anerkennung, die motiviert','Preise für Monatsprüfungen, Kapitänsabzeichen und Klassensprecher-Ehrungen.']}
 ],
 journey:[
  {k:'Pre-Primary',en:['Pre-Primary','Play · Nursery · KG','Learning through play in bright rooms and our own Play Zone.'],bn:['প্রাক-প্রাথমিক','প্লে · নার্সারি · কেজি','নিজস্ব প্লে জোন ও রঙিন ক্লাসরুমে খেলতে খেলতে শেখা।'],ar:['ما قبل الابتدائي','اللعب · الحضانة · الروضة','التعلّم باللعب في فصول مشرقة ومنطقة لعب خاصة.'],de:['Vorschule','Spielgruppe · Nursery · KG','Spielerisch lernen in hellen Räumen und unserer eigenen Spielzone.']},
  {k:'Primary',en:['Primary','Class I – V','Strong reading, maths and good habits in both versions.'],bn:['প্রাথমিক','১ম – ৫ম শ্রেণি','দুই ভার্সনেই পড়া, গণিত ও ভালো অভ্যাসের মজবুত ভিত।'],ar:['الابتدائي','الصف 1 – 5','أساس قوي في القراءة والرياضيات والعادات الحسنة في المسارين.'],de:['Grundschule','Klasse 1 – 5','Solides Lesen, Rechnen und gute Gewohnheiten in beiden Zweigen.']},
  {k:'Secondary',en:['Secondary','Class VI – X','Science, Business Studies and Humanities groups; SSC preparation.'],bn:['মাধ্যমিক','৬ষ্ঠ – ১০ম শ্রেণি','বিজ্ঞান, ব্যবসায় শিক্ষা ও মানবিক বিভাগ; এসএসসি প্রস্তুতি।'],ar:['الثانوي','الصف 6 – 10','شُعب العلوم والدراسات التجارية والإنسانيات؛ والتحضير لامتحان SSC.'],de:['Sekundarstufe','Klasse 6 – 10','Zweige Naturwissenschaften, Wirtschaft und Geisteswissenschaften; SSC-Vorbereitung.']},
  {k:'Higher Secondary',en:['Higher Secondary','Class XI – XII','College section with functional labs; HSC preparation.'],bn:['উচ্চ মাধ্যমিক','একাদশ – দ্বাদশ','ফাংশনাল ল্যাবসহ কলেজ শাখা; এইচএসসি প্রস্তুতি।'],ar:['الثانوي العالي','الصف 11 – 12','قسم الكلية مع مختبرات متكاملة؛ والتحضير لامتحان HSC.'],de:['Oberstufe','Klasse 11 – 12','College-Abteilung mit modernen Laboren; HSC-Vorbereitung.']}
 ],
 steps:[
  {en:'Fill in the online form or visit the office',bn:'অনলাইন ফর্ম পূরণ করুন বা অফিসে আসুন',ar:'املأ النموذج الإلكتروني أو زر المكتب',de:'Online-Formular ausfüllen oder ins Sekretariat kommen'},
  {en:'Collect the prospectus & admission form',bn:'প্রসপেক্টাস ও ভর্তি ফর্ম সংগ্রহ করুন',ar:'استلم الدليل ونموذج القبول',de:'Prospekt & Aufnahmeformular abholen'},
  {en:'Admission test / interview (by class)',bn:'ভর্তি পরীক্ষা / সাক্ষাৎকার (শ্রেণি অনুযায়ী)',ar:'اختبار القبول / المقابلة (حسب الصف)',de:'Aufnahmetest / Gespräch (je nach Klasse)'},
  {en:'Result, fee payment and welcome day',bn:'ফলাফল, ফি জমা ও স্বাগত দিবস',ar:'النتيجة ودفع الرسوم ويوم الترحيب',de:'Ergebnis, Gebührenzahlung und Willkommenstag'}
 ],
 facilities:[
  {i:'🧪',en:'Functional Labs',bn:'ফাংশনাল ল্যাব',ar:'مختبرات متكاملة',de:'Moderne Labore'},
  {i:'❄️',en:'AC classrooms',bn:'এসি ক্লাসরুম',ar:'فصول مكيّفة',de:'Klimatisierte Klassenzimmer'},
  {i:'🎤',en:'Auditorium / Hall Room (6th floor)',bn:'অডিটোরিয়াম / হলরুম (৬ষ্ঠ তলা)',ar:'قاعة احتفالات (الطابق السادس)',de:'Aula (6. Stock)'},
  {i:'📚',en:'School, College & Junior libraries',bn:'স্কুল, কলেজ ও জুনিয়র লাইব্রেরি',ar:'مكتبات المدرسة والكلية والصغار',de:'Schul-, College- & Juniorbibliothek'},
  {i:'🧸',en:'Play Zone for little ones',bn:'ছোটদের প্লে জোন',ar:'منطقة لعب للصغار',de:'Spielzone für die Kleinen'},
  {i:'🕌',en:'Prayer rooms',bn:'নামাজের কক্ষ',ar:'مصليات',de:'Gebetsräume'},
  {i:'🍽️',en:'Canteens',bn:'ক্যান্টিন',ar:'مقاصف',de:'Kantinen'},
  {i:'🛗',en:'Lift & safe water on every floor',bn:'লিফট ও প্রতি তলায় নিরাপদ পানি',ar:'مصعد ومياه آمنة في كل طابق',de:'Aufzug & Trinkwasser auf jeder Etage'}
 ],
 leaders:[ // TODO(fill): photos are from gfsc.edu.bd, messages still missing
  {name:{en:'Shamsul Alam',bn:'শামসুল আলম',ar:'شمس العالم',de:'Shamsul Alam'},role:{en:'Chairman & Founder',bn:'চেয়ারম্যান ও প্রতিষ্ঠাতা',ar:'رئيس مجلس الإدارة والمؤسس',de:'Vorsitzender & Gründer'},img:'308/1-1.jpg',photo:'people/leader-shamsul-alam.jpg'},
  {name:{en:'Dr. Rehana Parvin',bn:'ড. রেহানা পারভীন',ar:'د. ريحانة برفين',de:'Dr. Rehana Parvin'},role:{en:'Principal',bn:'অধ্যক্ষ',ar:'المديرة',de:'Schulleiterin'},img:'309/index.jpg',photo:'people/leader-rehana-parvin.jpg'},
  {name:{en:'Prof. Abdur Rahim Akon',bn:'প্রফেসর আব্দুর রহিম আকন',ar:'البروفيسور عبد الرحيم آكون',de:'Prof. Abdur Rahim Akon'},role:{en:'Advisor Principal',bn:'উপদেষ্টা অধ্যক্ষ',ar:'المدير المستشار',de:'Beratender Schulleiter'},img:'370/download.jpg',photo:'people/leader-abdur-rahim-akon.jpg'}
 ],
 // NOTICES — newest first. pin:true = shown in the popup when the website opens.
 notices:[
  {date:'2026-08-21',pin:true,file:'',en:'SSC Examination 2027 — exam schedule published',bn:'এসএসসি পরীক্ষা ২০২৭ — পরীক্ষার সময়সূচি প্রকাশিত',ar:'امتحان SSC 2027 — نُشر جدول الامتحانات',de:'SSC-Prüfung 2027 — Prüfungsplan veröffentlicht'},
  {date:'2025-12-01',file:'',en:'GFSC Teacher Recruitment 2025 — written exam result',bn:'জিএফএসসি শিক্ষক নিয়োগ ২০২৫ — লিখিত পরীক্ষার ফলাফল',ar:'توظيف المعلمين 2025 — نتيجة الاختبار الكتابي',de:'Lehrereinstellung 2025 — Ergebnis der schriftlichen Prüfung'},
  {date:'2026-11-12',file:'',en:'New: online admission & appointment form on the website',bn:'নতুন: ওয়েবসাইটে অনলাইন ভর্তি ও অ্যাপয়েন্টমেন্ট ফর্ম',ar:'جديد: نموذج القبول والمواعيد عبر الموقع',de:'Neu: Online-Formular für Aufnahme & Termine auf der Website'}
 ],
 events:[
  {img:'377/496546403_1234571352007271_7136739853902997197_n.jpg',en:'Prize giving & captain badges — 1st monthly exam',bn:'১ম মাসিক পরীক্ষার পুরস্কার ও ক্যাপ্টেন ব্যাজ প্রদান',ar:'توزيع الجوائز وشارات القادة — الامتحان الشهري الأول',de:'Preisverleihung & Kapitänsabzeichen — 1. Monatsprüfung'},
  {img:'375/498641191_1236992535098486_7576823462565813273_n.jpg',en:'Class representatives honoured — 2025',bn:'শ্রেণি প্রতিনিধিদের সম্মাননা — ২০২৫',ar:'تكريم ممثلي الفصول — 2025',de:'Ehrung der Klassensprecher — 2025'},
  {img:'374/499206134_1236992498431823_3337954746336068677_n.jpg',en:'Celebrating Class X & XI exam results',bn:'দশম ও একাদশ শ্রেণির ফলাফল উদযাপন',ar:'الاحتفال بنتائج الصفين العاشر والحادي عشر',de:'Feier der Ergebnisse von Klasse 10 & 11'},
  {img:'373/509358621_1261571315973941_963848674129774297_n.jpg',en:'Farewell & prayer for HSC 2025 candidates',bn:'এইচএসসি ২০২৫ পরীক্ষার্থীদের বিদায় ও দোয়া',ar:'حفل وداع ودعاء لطلاب HSC 2025',de:'Abschied & Gebet für die HSC-Prüflinge 2025'}
 ],
 gallery:['381/Annual-Exam_.jpg','384/Computer-Lab.jpg','385/CheLab.jpg','360/kids_kg_play.jpg','345/boyz.jpg','342/IMG_5211.JPG','339/IMG_6444.JPG','335/IMG_4577.JPG','343/Artboard-1.jpg','336/IMG-20240101-WA0099-copy.jpg','401/jhvjv.jpeg','402/ghgcjc.jpeg'],
 links:[
  ['Dhaka Education Board','https://dhakaeducationboard.gov.bd'],['Ministry of Education','https://moedu.gov.bd'],['NCTB','https://nctb.gov.bd'],
  ['DSHE','https://dshe.gov.bd'],['BANBEIS','https://banbeis.gov.bd'],['Teachers’ Batayon','https://teachers.gov.bd'],['Education Board Results','https://eboardresults.com']
 ],
 classes:['Play','Nursery','KG','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII']
};

/* ---------- 12-month Bangladesh themes (colour + mood + animation) ---------- */
const MONTHS = [
 {m:1, fx:'mist',   c:['#1F4E79','#7FB3D5','#F4D35E'], en:['Winter & new books','A fresh academic year begins in the morning fog.'], bn:['শীত ও নতুন বই','কুয়াশামাখা সকালে নতুন শিক্ষাবর্ষের শুরু।'], ar:['الشتاء والكتب الجديدة','عام دراسي جديد يبدأ في ضباب الصباح.'], de:['Winter & neue Bücher','Ein neues Schuljahr beginnt im Morgennebel.']},
 {m:2, fx:'letters',c:['#111111','#D7263D','#F2F2F2'], en:['Ekushey — Mother Language','We honour 21 February and every mother tongue.'], bn:['একুশ — মাতৃভাষা','২১ ফেব্রুয়ারি ও সকল মাতৃভাষার প্রতি শ্রদ্ধা।'], ar:['الحادي والعشرون — لغة الأم','نُكرّم 21 فبراير وكل لغة أم.'], de:['Ekushey — Muttersprache','Wir ehren den 21. Februar und jede Muttersprache.']},
 {m:3, fx:'flag',   c:['#006A4E','#F42A41','#F7F7F2'], en:['Independence month','Green and red — proud of 26 March.'], bn:['স্বাধীনতার মাস','লাল-সবুজে ২৬ মার্চের গর্ব।'], ar:['شهر الاستقلال','الأخضر والأحمر — فخورون بـ26 مارس.'], de:['Monat der Unabhängigkeit','Grün und Rot — stolz auf den 26. März.']},
 {m:4, fx:'alpona', c:['#C1121F','#FDF0D5','#F6AA1C'], en:['Pohela Boishakh','Shubho Noboborsho! Alpona, colour and new beginnings.'], bn:['পহেলা বৈশাখ','শুভ নববর্ষ! আল্পনা, রঙ আর নতুন শুরু।'], ar:['بوهيلا بويشاخ','عام بنغالي سعيد! ألوان وزخارف وبدايات جديدة.'], de:['Pohela Boishakh','Shubho Noboborsho! Alpona, Farben und Neuanfang.']},
 {m:5, fx:'sun',    c:['#E36414','#FFD166','#3A5A40'], en:['Summer of mangoes','Bright days, sweet fruits, steady studies.'], bn:['আমের গ্রীষ্ম','উজ্জ্বল দিন, মিষ্টি ফল, নিয়মিত পড়াশোনা।'], ar:['صيف المانجو','أيام مشرقة وفواكه حلوة ودراسة منتظمة.'], de:['Mangosommer','Helle Tage, süße Früchte, fleißiges Lernen.']},
 {m:6, fx:'rain',   c:['#14532D','#4ADE80','#FDE68A'], en:['Monsoon & kadam flowers','The first rain of Borsha brings everything to life.'], bn:['বর্ষা ও কদম ফুল','বর্ষার প্রথম বৃষ্টিতে প্রাণ ফিরে পায় সব।'], ar:['الرياح الموسمية وزهور الكدم','أول أمطار الموسم تُحيي كل شيء.'], de:['Monsun & Kadamblüten','Der erste Regen des Borsha bringt alles zum Leben.']},
 {m:7, fx:'rain',   c:['#0B3954','#5BC0EB','#C6F91F'], en:['Rivers & boats','Monsoon rivers remind us to keep moving forward.'], bn:['নদী ও নৌকা','বর্ষার নদী শেখায় এগিয়ে চলা।'], ar:['الأنهار والقوارب','أنهار الموسم تذكّرنا بالمضي قدمًا.'], de:['Flüsse & Boote','Monsunflüsse erinnern uns, immer weiterzugehen.']},
 {m:8, fx:'clouds', c:['#1D4ED8','#93C5FD','#FFFFFF'], en:['Blue sky, white clouds','Sharat is coming — light and calm.'], bn:['নীল আকাশ, সাদা মেঘ','শরৎ আসছে — হালকা ও শান্ত।'], ar:['سماء زرقاء وغيوم بيضاء','الخريف قادم — هادئ ومشرق.'], de:['Blauer Himmel, weiße Wolken','Sharat kommt — hell und ruhig.']},
 {m:9, fx:'kash',   c:['#2563EB','#E0E7FF','#94A3B8'], en:['Kash flowers of Sharat','Soft white kash fields under an autumn sky.'], bn:['শরতের কাশফুল','শরতের আকাশের নিচে সাদা কাশবন।'], ar:['زهور الكاش في الخريف','حقول الكاش البيضاء تحت سماء الخريف.'], de:['Kash-Blüten im Sharat','Weiche weiße Kashfelder unter Herbsthimmel.']},
 {m:10,fx:'leaves', c:['#7C2D12','#FDBA74','#FEF3C7'], en:['Hemanta harvest gold','The fields turn golden — time to reap what we sow.'], bn:['হেমন্তের সোনালি মাঠ','মাঠ সোনালি — যা বুনেছি তা ঘরে তোলার সময়।'], ar:['ذهب حصاد هيمانتا','الحقول تصبح ذهبية — حان وقت الحصاد.'], de:['Goldene Hemanta-Ernte','Die Felder werden golden — Zeit zu ernten, was wir säen.']},
 {m:11,fx:'paddy',  c:['#854D0E','#FACC15','#FFFBEB'], en:['Nobanno — festival of new rice','Pitha, payesh and the joy of the new harvest.'], bn:['নবান্ন — নতুন ধানের উৎসব','পিঠা, পায়েস আর নতুন ফসলের আনন্দ।'], ar:['نوبانو — مهرجان الأرز الجديد','حلوى البيتا والفرح بالمحصول الجديد.'], de:['Nobanno — Fest des neuen Reises','Pitha, Payesh und die Freude über die neue Ernte.']},
 {m:12,fx:'sparkle',c:['#006A4E','#F42A41','#FFD60A'], en:['Victory month','16 December — we celebrate victory and results day!'], bn:['বিজয়ের মাস','১৬ ডিসেম্বর — বিজয় আর ফলাফলের উৎসব!'], ar:['شهر النصر','16 ديسمبر — نحتفل بالنصر ويوم النتائج!'], de:['Siegesmonat','16. Dezember — wir feiern den Sieg und den Zeugnistag!']}
];

/* ---------- extra words (Teachers page, gallery viewer, news, robot) ---------- */
Object.assign(UI.en,{people:'Teachers',teachersTitle:'Our Teachers',teachersSub:'Experienced, caring teachers for every class and subject.',staffTitle:'Office & Support Staff',leadersShort:'Leadership',
  searchPeople:'Search by name, subject or post…',all:'All',staffChip:'Staff',newsTitle:'News & Updates',allPhotos:'All photos',photos:'photos',albums:'Albums',
  openAlbum:'Open album',source:'Original post',prev:'Previous',next:'Next',robotHi:'Hi! I am Robo 🤖 — ask me anything!',typing:'Robo is typing…',online:'Online · replies instantly',
  news:'News',status:'Status',post:'Post',noResult:'No match found.'});
Object.assign(UI.bn,{people:'শিক্ষকমণ্ডলী',teachersTitle:'আমাদের শিক্ষকমণ্ডলী',teachersSub:'প্রতিটি শ্রেণি ও বিষয়ের জন্য অভিজ্ঞ ও যত্নশীল শিক্ষক।',staffTitle:'অফিস ও সহায়ক কর্মী',leadersShort:'প্রতিষ্ঠান প্রধান',
  searchPeople:'নাম, বিষয় বা পদ লিখে খুঁজুন…',all:'সবাই',staffChip:'স্টাফ',newsTitle:'খবর ও আপডেট',allPhotos:'সব ছবি',photos:'টি ছবি',albums:'অ্যালবাম',
  openAlbum:'অ্যালবাম দেখুন',source:'মূল পোস্ট',prev:'আগের',next:'পরের',robotHi:'হাই! আমি রোবো 🤖 — যা খুশি জিজ্ঞেস করুন!',typing:'রোবো লিখছে…',online:'অনলাইন · সাথে সাথে উত্তর',
  news:'খবর',status:'স্ট্যাটাস',post:'পোস্ট',noResult:'কিছু পাওয়া যায়নি।'});
Object.assign(UI.ar,{people:'المعلمون',teachersTitle:'معلمونا',teachersSub:'معلمون ذوو خبرة واهتمام لكل صف ومادة.',staffTitle:'الموظفون الإداريون والمساندون',leadersShort:'القيادة',
  searchPeople:'ابحث بالاسم أو المادة أو الوظيفة…',all:'الكل',staffChip:'الموظفون',newsTitle:'الأخبار والمستجدات',allPhotos:'كل الصور',photos:'صورة',albums:'الألبومات',
  openAlbum:'افتح الألبوم',source:'المنشور الأصلي',prev:'السابق',next:'التالي',robotHi:'مرحبًا! أنا روبو 🤖 — اسألني أي شيء!',typing:'روبو يكتب…',online:'متصل · يرد فورًا',
  news:'خبر',status:'حالة',post:'منشور',noResult:'لا توجد نتائج.'});
Object.assign(UI.de,{people:'Lehrkräfte',teachersTitle:'Unsere Lehrkräfte',teachersSub:'Erfahrene, engagierte Lehrkräfte für jede Klasse und jedes Fach.',staffTitle:'Verwaltung & Personal',leadersShort:'Schulleitung',
  searchPeople:'Nach Name, Fach oder Funktion suchen…',all:'Alle',staffChip:'Personal',newsTitle:'News & Updates',allPhotos:'Alle Fotos',photos:'Fotos',albums:'Alben',
  openAlbum:'Album öffnen',source:'Originalbeitrag',prev:'Zurück',next:'Weiter',robotHi:'Hallo! Ich bin Robo 🤖 — frag mich alles!',typing:'Robo schreibt…',online:'Online · antwortet sofort',
  news:'News',status:'Status',post:'Beitrag',noResult:'Keine Treffer.'});
const DEPT = {English:{bn:'ইংরেজি',ar:'اللغة الإنجليزية',de:'Englisch'},Bangla:{bn:'বাংলা',ar:'اللغة البنغالية',de:'Bangla'},ICT:{bn:'আইসিটি',ar:'تقنية المعلومات',de:'Informatik'},
  Mathematics:{bn:'গণিত',ar:'الرياضيات',de:'Mathematik'},Science:{bn:'বিজ্ঞান',ar:'العلوم',de:'Naturwissenschaften'},'Business Studies':{bn:'ব্যবসায় শিক্ষা',ar:'الدراسات التجارية',de:'Wirtschaft'},
  Humanities:{bn:'মানবিক',ar:'العلوم الإنسانية',de:'Geisteswissenschaften'},Music:{bn:'সংগীত',ar:'الموسيقى',de:'Musik'}};

/* ---------- settings panel + chatbot settings ---------- */
Object.assign(UI.en,{settings:'Settings',setLang:'Language',setTheme:'Monthly theme',setMode:'Day / Night',setBg:'Background',auto:'Auto',
  bgPlain:'Plain',bgSoft:'Soft colour',bgDots:'Dots',bgGrid:'Grid',whatChange:'What would you like to change?',done:'Done! ✅',chooseOne:'Choose one:',
  thisMonth:'This month (auto)'});
Object.assign(UI.bn,{settings:'সেটিংস',setLang:'ভাষা',setTheme:'মাসের থিম',setMode:'দিন / রাত',setBg:'ব্যাকগ্রাউন্ড',auto:'স্বয়ংক্রিয়',
  bgPlain:'সাধারণ',bgSoft:'হালকা রঙ',bgDots:'ডট',bgGrid:'গ্রিড',whatChange:'কোনটি পরিবর্তন করতে চান?',done:'হয়ে গেছে! ✅',chooseOne:'একটি বেছে নিন:',
  thisMonth:'এই মাস (স্বয়ংক্রিয়)'});
Object.assign(UI.ar,{settings:'الإعدادات',setLang:'اللغة',setTheme:'سمة الشهر',setMode:'نهار / ليل',setBg:'الخلفية',auto:'تلقائي',
  bgPlain:'عادية',bgSoft:'لون ناعم',bgDots:'نقاط',bgGrid:'شبكة',whatChange:'ماذا تريد أن تغيّر؟',done:'تم! ✅',chooseOne:'اختر واحدًا:',
  thisMonth:'هذا الشهر (تلقائي)'});
Object.assign(UI.de,{settings:'Einstellungen',setLang:'Sprache',setTheme:'Monatsthema',setMode:'Tag / Nacht',setBg:'Hintergrund',auto:'Automatisch',
  bgPlain:'Schlicht',bgSoft:'Sanfte Farbe',bgDots:'Punkte',bgGrid:'Raster',whatChange:'Was möchten Sie ändern?',done:'Erledigt! ✅',chooseOne:'Bitte wählen:',
  thisMonth:'Dieser Monat (automatisch)'});

Object.assign(UI.en,{bnNotices:'Latest notices, news and updates from the campus.',bnGallery:'Moments from classrooms, festivals and celebrations.',bnContact:'We are happy to help — call, write or visit us.',bnAcademics:'One school from Play Group to Class XII.'});
Object.assign(UI.bn,{bnNotices:'ক্যাম্পাসের সর্বশেষ নোটিশ, খবর ও আপডেট।',bnGallery:'ক্লাসরুম, উৎসব ও উদযাপনের মুহূর্তগুলো।',bnContact:'আমরা সাহায্য করতে প্রস্তুত — ফোন করুন, লিখুন বা চলে আসুন।',bnAcademics:'প্লে গ্রুপ থেকে দ্বাদশ শ্রেণি — একটি স্কুল।'});
Object.assign(UI.ar,{bnNotices:'أحدث الإعلانات والأخبار من الحرم.',bnGallery:'لحظات من الفصول والمهرجانات والاحتفالات.',bnContact:'يسعدنا مساعدتك — اتصل أو اكتب أو زرنا.',bnAcademics:'مدرسة واحدة من مرحلة اللعب حتى الصف الثاني عشر.'});
Object.assign(UI.de,{bnNotices:'Neueste Aushänge, Nachrichten und Updates vom Campus.',bnGallery:'Momente aus Unterricht, Festen und Feiern.',bnContact:'Wir helfen gern — anrufen, schreiben oder vorbeikommen.',bnAcademics:'Eine Schule von der Spielgruppe bis Klasse 12.'});
