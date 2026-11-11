/* =====================================================================
   GLOBAL GOALS page — UN Sustainable Development Goals (SDGs), education & career goals.
   4 languages: bn / en / ar / de. Edit freely.
   ===================================================================== */
const GOALS = {
 ui:{
  en:{goals:'Global Goals',title:'Global Goals: learning that changes the world',sub:'In 2015 the United Nations agreed 17 Sustainable Development Goals (SDGs) for 2030. Here is how GFSC students can act on every one of them.',
      sdg4:'Our focus: SDG 4, Quality Education',careers:'Future skills & careers',skills:'21st-century skills we build',days:'Global days we celebrate',compete:'Go global: competitions & programs',act:'At GFSC',
      mission:'Mission',vision:'Vision',values:'Our values',teaser:'17 goals. One future. Find out how our students take part.',explore:'Explore the Global Goals'},
  bn:{goals:'বৈশ্বিক লক্ষ্য',title:'বৈশ্বিক লক্ষ্য: যে শিক্ষা পৃথিবী বদলায়',sub:'২০১৫ সালে জাতিসংঘ ২০৩০ সালের জন্য ১৭টি টেকসই উন্নয়ন লক্ষ্য (SDG) গ্রহণ করে। প্রতিটি লক্ষ্যে GFSC-এর শিক্ষার্থীরা কীভাবে ভূমিকা রাখতে পারে, তা এখানে।',
      sdg4:'আমাদের মূল লক্ষ্য: SDG ৪, মানসম্মত শিক্ষা',careers:'ভবিষ্যতের দক্ষতা ও ক্যারিয়ার',skills:'একবিংশ শতাব্দীর যে দক্ষতাগুলো গড়ে তুলি',days:'যে আন্তর্জাতিক দিবসগুলো পালন করি',compete:'বিশ্বমঞ্চে: প্রতিযোগিতা ও প্রোগ্রাম',act:'GFSC-তে',
      mission:'মিশন',vision:'ভিশন',values:'আমাদের মূল্যবোধ',teaser:'১৭টি লক্ষ্য, একটি ভবিষ্যৎ। আমাদের শিক্ষার্থীরা কীভাবে অংশ নেয়, জানুন।',explore:'বৈশ্বিক লক্ষ্য দেখুন'},
  ar:{goals:'الأهداف العالمية',title:'الأهداف العالمية: تعليم يغيّر العالم',sub:'في عام 2015 اعتمدت الأمم المتحدة 17 هدفًا للتنمية المستدامة حتى عام 2030. إليك كيف يمكن لطلاب GFSC المساهمة في كل هدف.',
      sdg4:'تركيزنا: الهدف 4، التعليم الجيد',careers:'مهارات المستقبل والمهن',skills:'مهارات القرن الحادي والعشرين التي نبنيها',days:'أيام عالمية نحتفل بها',compete:'نحو العالمية: مسابقات وبرامج',act:'في GFSC',
      mission:'الرسالة',vision:'الرؤية',values:'قيمنا',teaser:'17 هدفًا ومستقبل واحد. اكتشف كيف يشارك طلابنا.',explore:'استكشف الأهداف العالمية'},
  de:{goals:'Globale Ziele',title:'Globale Ziele: Lernen, das die Welt verändert',sub:'2015 haben die Vereinten Nationen 17 Ziele für nachhaltige Entwicklung (SDGs) bis 2030 beschlossen. So können GFSC-Schülerinnen und -Schüler zu jedem Ziel beitragen.',
      sdg4:'Unser Schwerpunkt: SDG 4, Hochwertige Bildung',careers:'Zukunftskompetenzen & Berufe',skills:'Kompetenzen des 21. Jahrhunderts',days:'Internationale Tage, die wir feiern',compete:'Weltweit dabei: Wettbewerbe & Programme',act:'An der GFSC',
      mission:'Mission',vision:'Vision',values:'Unsere Werte',teaser:'17 Ziele. Eine Zukunft. Sehen Sie, wie unsere Schüler mitmachen.',explore:'Globale Ziele entdecken'}
 },
 // official SDG colours (UN), names and one action students can take
 sdgs:[
  [1,'#E5243B','🏠',{en:'No Poverty',bn:'দারিদ্র্য বিলোপ',ar:'القضاء على الفقر',de:'Keine Armut'},{en:'Charity drives and sharing books & uniforms.',bn:'দান কর্মসূচি, বই ও পোশাক ভাগাভাগি।',ar:'حملات خيرية وتبادل الكتب والزي.',de:'Spendenaktionen, Bücher & Uniformen teilen.'}],
  [2,'#DDA63A','🍚',{en:'Zero Hunger',bn:'ক্ষুধা মুক্তি',ar:'القضاء التام على الجوع',de:'Kein Hunger'},{en:'Healthy tiffin, no food waste in our canteens.',bn:'স্বাস্থ্যকর টিফিন, ক্যান্টিনে খাবার অপচয় নয়।',ar:'وجبات صحية ولا هدر للطعام.',de:'Gesundes Pausenbrot, keine Essensverschwendung.'}],
  [3,'#4C9F38','💚',{en:'Good Health & Well-being',bn:'সুস্বাস্থ্য ও কল্যাণ',ar:'الصحة الجيدة والرفاه',de:'Gesundheit & Wohlergehen'},{en:'Sports, indoor games and mental-health talks.',bn:'খেলাধুলা, ইনডোর গেমস ও মানসিক স্বাস্থ্য আলোচনা।',ar:'الرياضة والألعاب وجلسات الصحة النفسية.',de:'Sport, Spiele und Gespräche über psychische Gesundheit.'}],
  [4,'#C5192D','📘',{en:'Quality Education',bn:'মানসম্মত শিক্ষা',ar:'التعليم الجيد',de:'Hochwertige Bildung'},{en:'Smart classrooms, labs and two curriculum versions.',bn:'স্মার্ট ক্লাসরুম, ল্যাব ও দুই ভার্সনের পাঠ্যক্রম।',ar:'فصول ذكية ومختبرات ومساران دراسيان.',de:'Smart-Klassen, Labore und zwei Zweige.'}],
  [5,'#FF3A21','⚖️',{en:'Gender Equality',bn:'লিঙ্গ সমতা',ar:'المساواة بين الجنسين',de:'Geschlechtergleichheit'},{en:'Equal leadership: girls and boys as class captains.',bn:'সমান নেতৃত্ব: মেয়ে ও ছেলে উভয়েই ক্লাস ক্যাপ্টেন।',ar:'قيادة متساوية للبنات والبنين.',de:'Gleiche Führung: Mädchen und Jungen als Klassensprecher.'}],
  [6,'#26BDE2','💧',{en:'Clean Water & Sanitation',bn:'নিরাপদ পানি ও স্যানিটেশন',ar:'المياه النظيفة والنظافة الصحية',de:'Sauberes Wasser'},{en:'Safe drinking water on every floor; clean WCs.',bn:'প্রতি তলায় নিরাপদ পানি; পরিচ্ছন্ন ওয়াশরুম।',ar:'مياه شرب آمنة في كل طابق.',de:'Trinkwasser auf jeder Etage, saubere WCs.'}],
  [7,'#FCC30B','⚡',{en:'Affordable & Clean Energy',bn:'সাশ্রয়ী ও পরিচ্ছন্ন জ্বালানি',ar:'طاقة نظيفة وبأسعار معقولة',de:'Saubere Energie'},{en:'Switch off fans & lights — energy monitors in class.',bn:'ফ্যান-লাইট বন্ধ রাখা — ক্লাসে এনার্জি মনিটর।',ar:'إطفاء الأنوار والمراوح — مراقبو الطاقة.',de:'Licht & Ventilator aus — Energiedienst in jeder Klasse.'}],
  [8,'#A21942','💼',{en:'Decent Work & Economic Growth',bn:'শোভন কাজ ও অর্থনৈতিক প্রবৃদ্ধি',ar:'العمل اللائق ونمو الاقتصاد',de:'Menschenwürdige Arbeit'},{en:'Career talks and Business Studies projects.',bn:'ক্যারিয়ার আলোচনা ও ব্যবসায় শিক্ষা প্রকল্প।',ar:'محاضرات مهنية ومشاريع تجارية.',de:'Berufsvorträge und Wirtschaftsprojekte.'}],
  [9,'#FD6925','🔧',{en:'Industry, Innovation & Infrastructure',bn:'শিল্প, উদ্ভাবন ও অবকাঠামো',ar:'الصناعة والابتكار والبنية التحتية',de:'Industrie & Innovation'},{en:'Computer lab, coding and science fairs.',bn:'কম্পিউটার ল্যাব, কোডিং ও বিজ্ঞান মেলা।',ar:'مختبر الحاسوب والبرمجة ومعارض العلوم.',de:'Computerlabor, Programmieren, Wissenschaftsmessen.'}],
  [10,'#DD1367','🤝',{en:'Reduced Inequalities',bn:'বৈষম্য হ্রাস',ar:'الحد من أوجه عدم المساواة',de:'Weniger Ungleichheiten'},{en:'Respect for every religion, background and ability.',bn:'সব ধর্ম, পরিবার ও সামর্থ্যের প্রতি সম্মান।',ar:'احترام كل دين وخلفية وقدرة.',de:'Respekt vor jeder Religion, Herkunft und Fähigkeit.'}],
  [11,'#FD9D24','🏙️',{en:'Sustainable Cities & Communities',bn:'টেকসই নগর ও জনপদ',ar:'مدن ومجتمعات مستدامة',de:'Nachhaltige Städte'},{en:'Road-safety and clean-Mirpur campaigns.',bn:'সড়ক নিরাপত্তা ও পরিচ্ছন্ন মিরপুর ক্যাম্পেইন।',ar:'حملات السلامة المرورية ونظافة الحي.',de:'Verkehrssicherheit und saubere Nachbarschaft.'}],
  [12,'#BF8B2E','♻️',{en:'Responsible Consumption & Production',bn:'দায়িত্বশীল ভোগ ও উৎপাদন',ar:'الاستهلاك والإنتاج المسؤولان',de:'Verantwortungsvoller Konsum'},{en:'Reduce, reuse, recycle — paper & plastic sorting.',bn:'কম ব্যবহার, পুনর্ব্যবহার, রিসাইকেল — কাগজ ও প্লাস্টিক আলাদা করা।',ar:'قلّل، أعد الاستخدام، أعد التدوير.',de:'Vermeiden, wiederverwenden, recyceln.'}],
  [13,'#3F7E44','🌍',{en:'Climate Action',bn:'জলবায়ু কার্যক্রম',ar:'العمل المناخي',de:'Klimaschutz'},{en:'Tree planting and climate clubs — Bangladesh is on the front line.',bn:'বৃক্ষরোপণ ও জলবায়ু ক্লাব — বাংলাদেশ জলবায়ু ঝুঁকির সামনের সারিতে।',ar:'زراعة الأشجار ونوادي المناخ — بنغلاديش في خط المواجهة.',de:'Bäume pflanzen, Klimaclubs — Bangladesch ist besonders betroffen.'}],
  [14,'#0A97D9','🐟',{en:'Life Below Water',bn:'জলজ জীবন',ar:'الحياة تحت الماء',de:'Leben unter Wasser'},{en:'Learn about our rivers & the Bay of Bengal; no plastic in drains.',bn:'নদী ও বঙ্গোপসাগর সম্পর্কে জানা; ড্রেনে প্লাস্টিক নয়।',ar:'التعرّف على أنهارنا وخليج البنغال.',de:'Unsere Flüsse & den Golf von Bengalen schützen.'}],
  [15,'#56C02B','🌳',{en:'Life on Land',bn:'স্থলজ জীবন',ar:'الحياة في البر',de:'Leben an Land'},{en:'Biology lab field work and rooftop plants.',bn:'জীববিজ্ঞান ল্যাবের মাঠকর্ম ও ছাদবাগান।',ar:'العمل الميداني في الأحياء وحديقة السطح.',de:'Biologie-Exkursionen und Dachgarten.'}],
  [16,'#00689D','🕊️',{en:'Peace, Justice & Strong Institutions',bn:'শান্তি, ন্যায়বিচার ও কার্যকর প্রতিষ্ঠান',ar:'السلام والعدل والمؤسسات القوية',de:'Frieden & Gerechtigkeit'},{en:'Class representatives, prefects and debate.',bn:'শ্রেণি প্রতিনিধি, প্রিফেক্ট ও বিতর্ক।',ar:'ممثلو الفصول والمراقبون والمناظرات.',de:'Klassensprecher, Präfekten und Debattierclub.'}],
  [17,'#19486A','🌐',{en:'Partnerships for the Goals',bn:'লক্ষ্য অর্জনে অংশীদারত্ব',ar:'عقد الشراكات لتحقيق الأهداف',de:'Partnerschaften für die Ziele'},{en:'Parents, teachers and community — one team.',bn:'অভিভাবক, শিক্ষক ও সমাজ — এক দল।',ar:'الأهل والمعلمون والمجتمع فريق واحد.',de:'Eltern, Lehrkräfte und Gemeinde — ein Team.'}]
 ],
 sdg4:[ // selected SDG 4 targets (UN), simplified
  {en:'Every child completes free, quality primary and secondary school.',bn:'প্রতিটি শিশু মানসম্মত প্রাথমিক ও মাধ্যমিক শিক্ষা সম্পন্ন করবে।',ar:'أن يُكمل كل طفل تعليمًا ابتدائيًا وثانويًا جيدًا.',de:'Jedes Kind schließt eine hochwertige Grund- und Sekundarschule ab.'},
  {en:'Quality early childhood care and pre-primary education.',bn:'মানসম্মত প্রারম্ভিক শৈশব যত্ন ও প্রাক-প্রাথমিক শিক্ষা।',ar:'رعاية جيدة للطفولة المبكرة وتعليم ما قبل الابتدائي.',de:'Gute frühkindliche Bildung und Vorschule.'},
  {en:'More young people with technical, digital and job skills.',bn:'আরও বেশি তরুণের কারিগরি, ডিজিটাল ও কর্মদক্ষতা।',ar:'مزيد من الشباب بمهارات تقنية ورقمية ومهنية.',de:'Mehr junge Menschen mit technischen, digitalen und beruflichen Fähigkeiten.'},
  {en:'Equal access for girls and boys, and for every learner.',bn:'মেয়ে-ছেলে ও সকল শিক্ষার্থীর সমান সুযোগ।',ar:'وصول متساوٍ للبنات والبنين ولكل متعلم.',de:'Gleicher Zugang für Mädchen, Jungen und alle Lernenden.'},
  {en:'Education for sustainable development and global citizenship.',bn:'টেকসই উন্নয়ন ও বৈশ্বিক নাগরিকত্বের শিক্ষা।',ar:'التعليم من أجل التنمية المستدامة والمواطنة العالمية.',de:'Bildung für nachhaltige Entwicklung und Weltbürgerschaft.'},
  {en:'Safe, inclusive learning environments and qualified teachers.',bn:'নিরাপদ, অন্তর্ভুক্তিমূলক পরিবেশ ও যোগ্য শিক্ষক।',ar:'بيئات تعلم آمنة وشاملة ومعلمون مؤهلون.',de:'Sichere, inklusive Lernorte und qualifizierte Lehrkräfte.'}
 ],
 skills:[
  ['🧠',{en:'Critical thinking',bn:'সমালোচনামূলক চিন্তা',ar:'التفكير النقدي',de:'Kritisches Denken'}],['🎨',{en:'Creativity',bn:'সৃজনশীলতা',ar:'الإبداع',de:'Kreativität'}],
  ['🤝',{en:'Collaboration',bn:'দলগত কাজ',ar:'التعاون',de:'Zusammenarbeit'}],['🗣️',{en:'Communication (Bangla & English)',bn:'যোগাযোগ (বাংলা ও ইংরেজি)',ar:'التواصل (البنغالية والإنجليزية)',de:'Kommunikation (Bangla & Englisch)'}],
  ['💻',{en:'Digital & AI literacy',bn:'ডিজিটাল ও এআই সাক্ষরতা',ar:'الثقافة الرقمية والذكاء الاصطناعي',de:'Digital- & KI-Kompetenz'}],['🌱',{en:'Global citizenship',bn:'বৈশ্বিক নাগরিকত্ব',ar:'المواطنة العالمية',de:'Weltbürgerschaft'}],
  ['🧭',{en:'Leadership & ethics',bn:'নেতৃত্ব ও নৈতিকতা',ar:'القيادة والأخلاق',de:'Führung & Ethik'}],['💰',{en:'Financial literacy',bn:'আর্থিক সাক্ষরতা',ar:'الثقافة المالية',de:'Finanzwissen'}]
 ],
 careers:[
  {g:{en:'Science',bn:'বিজ্ঞান',ar:'العلوم',de:'Naturwissenschaften'},c:'#0B78B8',jobs:{en:'Doctor · Engineer · Software developer · AI & data scientist · Pharmacist · Researcher · Pilot',bn:'ডাক্তার · ইঞ্জিনিয়ার · সফটওয়্যার ডেভেলপার · এআই ও ডেটা সায়েন্টিস্ট · ফার্মাসিস্ট · গবেষক · পাইলট',ar:'طبيب · مهندس · مطوّر برمجيات · عالم بيانات وذكاء اصطناعي · صيدلي · باحث · طيار',de:'Ärztin · Ingenieur · Softwareentwicklerin · KI- & Datenwissenschaftler · Apotheker · Forscherin · Pilot'}},
  {g:{en:'Business Studies',bn:'ব্যবসায় শিক্ষা',ar:'الدراسات التجارية',de:'Wirtschaft'},c:'#C5192D',jobs:{en:'Chartered accountant · Banker · Entrepreneur · Digital marketer · Economist · Supply-chain manager',bn:'চার্টার্ড অ্যাকাউন্ট্যান্ট · ব্যাংকার · উদ্যোক্তা · ডিজিটাল মার্কেটার · অর্থনীতিবিদ · সাপ্লাই-চেইন ম্যানেজার',ar:'محاسب قانوني · مصرفي · رائد أعمال · مسوّق رقمي · اقتصادي · مدير سلاسل الإمداد',de:'Wirtschaftsprüferin · Banker · Gründerin · Digital-Marketer · Ökonomin · Supply-Chain-Manager'}},
  {g:{en:'Humanities',bn:'মানবিক',ar:'العلوم الإنسانية',de:'Geisteswissenschaften'},c:'#3F7E44',jobs:{en:'Lawyer · Civil service (BCS) · Journalist · Diplomat · Teacher · Psychologist · Designer',bn:'আইনজীবী · সিভিল সার্ভিস (বিসিএস) · সাংবাদিক · কূটনীতিক · শিক্ষক · মনোবিজ্ঞানী · ডিজাইনার',ar:'محامٍ · خدمة مدنية · صحفي · دبلوماسي · معلم · أخصائي نفسي · مصمم',de:'Anwältin · Staatsdienst (BCS) · Journalist · Diplomatin · Lehrer · Psychologin · Designer'}}
 ],
 days:[ // well-known UN / international days
  ['24 Jan',{en:'International Day of Education',bn:'আন্তর্জাতিক শিক্ষা দিবস',ar:'اليوم الدولي للتعليم',de:'Internationaler Tag der Bildung'}],
  ['21 Feb',{en:'International Mother Language Day',bn:'আন্তর্জাতিক মাতৃভাষা দিবস',ar:'اليوم الدولي للغة الأم',de:'Internationaler Tag der Muttersprache'}],
  ['22 Apr',{en:'Earth Day',bn:'ধরিত্রী দিবস',ar:'يوم الأرض',de:'Tag der Erde'}],
  ['5 Jun',{en:'World Environment Day',bn:'বিশ্ব পরিবেশ দিবস',ar:'اليوم العالمي للبيئة',de:'Weltumwelttag'}],
  ['15 Jul',{en:'World Youth Skills Day',bn:'বিশ্ব যুব দক্ষতা দিবস',ar:'اليوم العالمي لمهارات الشباب',de:'Welttag der Jugendfertigkeiten'}],
  ['12 Aug',{en:'International Youth Day',bn:'আন্তর্জাতিক যুব দিবস',ar:'اليوم الدولي للشباب',de:'Internationaler Tag der Jugend'}],
  ['8 Sep',{en:'International Literacy Day',bn:'আন্তর্জাতিক সাক্ষরতা দিবস',ar:'اليوم الدولي لمحو الأمية',de:'Weltalphabetisierungstag'}],
  ['5 Oct',{en:'World Teachers’ Day',bn:'বিশ্ব শিক্ষক দিবস',ar:'اليوم العالمي للمعلمين',de:'Weltlehrertag'}],
  ['11 Oct',{en:'International Day of the Girl Child',bn:'আন্তর্জাতিক কন্যাশিশু দিবস',ar:'اليوم الدولي للطفلة',de:'Welt-Mädchentag'}],
  ['20 Nov',{en:'World Children’s Day',bn:'বিশ্ব শিশু দিবস',ar:'اليوم العالمي للطفل',de:'Weltkindertag'}]
 ],
 programs:[
  ['🧮',{en:'Mathematical Olympiad (national → international)',bn:'গণিত অলিম্পিয়াড (জাতীয় থেকে আন্তর্জাতিক)',ar:'أولمبياد الرياضيات (وطني ثم دولي)',de:'Mathematik-Olympiade (national → international)'}],
  ['⚛️',{en:'Physics, Chemistry & Biology Olympiads',bn:'পদার্থ, রসায়ন ও জীববিজ্ঞান অলিম্পিয়াড',ar:'أولمبياد الفيزياء والكيمياء والأحياء',de:'Physik-, Chemie- & Biologie-Olympiaden'}],
  ['💻',{en:'Informatics Olympiad & coding contests',bn:'ইনফরমেটিক্স অলিম্পিয়াড ও কোডিং প্রতিযোগিতা',ar:'أولمبياد المعلوماتية ومسابقات البرمجة',de:'Informatik-Olympiade & Programmierwettbewerbe'}],
  ['🚀',{en:'NASA Space Apps Challenge',bn:'নাসা স্পেস অ্যাপস চ্যালেঞ্জ',ar:'تحدي ناسا لتطبيقات الفضاء',de:'NASA Space Apps Challenge'}],
  ['🇺🇳',{en:'Model United Nations (MUN) & debate',bn:'মডেল ইউনাইটেড নেশনস (MUN) ও বিতর্ক',ar:'نموذج الأمم المتحدة والمناظرات',de:'Model United Nations & Debatten'}],
  ['🔬',{en:'Science fairs & young innovators',bn:'বিজ্ঞান মেলা ও তরুণ উদ্ভাবক',ar:'معارض العلوم والمبتكرون الشباب',de:'Wissenschaftsmessen & junge Erfinder'}]
 ],
 // official text from the orientation presentation
 mission:{en:'To provide quality education with discipline, moral values and modern technology, preparing students for the challenges of the 21st century.',
  bn:'শৃঙ্খলা, নৈতিক মূল্যবোধ ও আধুনিক প্রযুক্তির সমন্বয়ে মানসম্মত শিক্ষা দিয়ে শিক্ষার্থীদের একবিংশ শতাব্দীর চ্যালেঞ্জের জন্য প্রস্তুত করা।',
  ar:'تقديم تعليم جيد يجمع الانضباط والقيم الأخلاقية والتقنية الحديثة، لإعداد الطلاب لتحديات القرن الحادي والعشرين.',
  de:'Hochwertige Bildung mit Disziplin, Werten und moderner Technik — als Vorbereitung auf die Herausforderungen des 21. Jahrhunderts.'},
 vision:{en:'Our aim is to build you a well-educated and ideal citizen.',bn:'আমাদের লক্ষ্য তোমাকে সুশিক্ষিত ও আদর্শ নাগরিক হিসেবে গড়ে তোলা।',ar:'هدفنا أن نصنع منك مواطنًا متعلمًا ومثاليًا.',de:'Unser Ziel: dich zu einem gebildeten und vorbildlichen Bürger zu machen.'},
 values:[{en:'Discipline',bn:'শৃঙ্খলা',ar:'الانضباط',de:'Disziplin'},{en:'Innovation',bn:'উদ্ভাবন',ar:'الابتكار',de:'Innovation'},{en:'Patriotism',bn:'দেশপ্রেম',ar:'حب الوطن',de:'Heimatliebe'},{en:'Equality',bn:'সমতা',ar:'المساواة',de:'Gleichberechtigung'},{en:'Integrity',bn:'সততা',ar:'النزاهة',de:'Integrität'}]
};
