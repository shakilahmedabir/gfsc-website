# Design sources — all 3 versions in one file
*ছবি, ফন্ট, রং ও অন্যান্য ডিজাইন উৎস*

## Folder map
```
website/
  index.html               ← choose a version
  v1-aurora/   index.html + style.css   (modern glass)
  v2-heritage/ index.html + style.css   (calm editorial)
  v3-bento/    index.html + style.css   (playful cards)
  shared/
    content.js             ← ALL text in 4 languages, notices, photos, month themes (edit this!)
    site.js                ← engine: languages, themes, popups, forms, chatbot, quick menu
    site.css               ← shared components (buttons, forms, dock, chat, modal)
    floor_core.js          ← floor plan data (same file as the PDF building guide)
    gfsc_floor_explorer.html ← interactive campus map
    gfsc_logo.png
  docs/                    ← these documents
```
To change text or a notice, edit `shared/content.js`. All 3 versions update together.
The floor data comes from `E:\floor plan\Final\source\floor_core.js`. After you change the floor plan, copy that file into `shared/` again.

## Fonts (Google Fonts, free)
| Use | Font |
|---|---|
| Bangla text, all versions | Hind Siliguri |
| Arabic text | Cairo |
| English / German text | Plus Jakarta Sans |
| V1 headings | Sora |
| V2 headings | Fraunces (serif) |
| V3 headings | Baloo Da 2, which also supports Bangla |

## Brand colours
- From the GFSC logo: navy `#2E3192`, red `#ED1C24`, orange `#F7941D`.
- Each month replaces these with its theme colours.
- The darkest colour of each theme is always used as the main colour, with text colour chosen for contrast.

| Month | Theme | Colours | Animation |
|---|---|---|---|
| Jan | Winter & new books | #1F4E79 #7FB3D5 #F4D35E | Mist |
| Feb | Ekushey | #111111 #D7263D #F2F2F2 | Falling Bangla letters |
| Mar | Independence | #006A4E #F42A41 #F7F7F2 | Red/white glowing dots |
| Apr | Pohela Boishakh | #C1121F #FDF0D5 #F6AA1C | Rotating alpona |
| May | Summer of mangoes | #E36414 #FFD166 #3A5A40 | Sun rays |
| Jun | Monsoon & kadam | #14532D #4ADE80 #FDE68A | Rain |
| Jul | Rivers & boats | #0B3954 #5BC0EB #C6F91F | Rain |
| Aug | Blue sky | #1D4ED8 #93C5FD #FFFFFF | Clouds |
| Sep | Kash flowers | #2563EB #E0E7FF #94A3B8 | Floating kash |
| Oct | Hemanta harvest | #7C2D12 #FDBA74 #FEF3C7 | Falling leaves |
| Nov | Nobanno | #854D0E #FACC15 #FFFBEB | Golden paddy |
| Dec | Victory | #006A4E #F42A41 #FFD60A | Sparkles |

## Photos used (all from https://gfsc.edu.bd/media/…)
- **Hero and tiles:**
  - 384/Computer-Lab.jpg
  - 360/kids_kg_play.jpg
  - 385/CheLab.jpg
- **Events:**
  - 377/…n.jpg (prize giving)
  - 375/…n.jpg (class representatives)
  - 374/…n.jpg (results celebration)
  - 373/…n.jpg (HSC farewell)
- **Leaders:**
  - 308/1-1.jpg (Chairman)
  - 309/index.jpg (Principal)
  - 370/download.jpg (Advisor Principal)
- **Gallery:**
  - 381/Annual-Exam_.jpg
  - 345/boyz.jpg
  - 342/IMG_5211.JPG
  - 339/IMG_6444.JPG
  - 335/IMG_4577.JPG
  - 343/Artboard-1.jpg
  - 336/IMG-20240101-WA0099-copy.jpg
  - 401/jhvjv.jpeg
  - 402/ghgcjc.jpeg

The images are linked, not copied. Before launch, save them into `shared/img/` and change `SCHOOL.img` in content.js to `'../shared/img/'`.

## Icons
- Simple inline SVG icons drawn in site.js: phone, mail, social, bell and others. No external icon library is used.
- Emoji are used for the friendly section icons.

## Design references (see 01_Research_and_Design_Rationale.md)
| Version | References |
|---|---|
| V1 | Sunbeam World School, San Francisco School, Brentwood Academy (fixed Apply, stats) |
| V2 | Greenhill School, Blundell's, Kent College (editorial, journey timeline) |
| V3 | Hamilton Primary, Upwood Primary, Apple-style bento grids (playful tiles) |
