# GFSC Website — Research & Design Rationale
*Prepared 12 November 2026 · ওয়েবসাইট গবেষণা ও ডিজাইনের যুক্তি*

## 1. What I studied

### a) Current GFSC website — https://www.gfsc.edu.bd
**Useful content found:**
- Founding: 2007, by the Greenways Foundation.
- Growth: from about 300 students to about 1,700 students.
- Classes: Play Group to Class XII, in Bangla Medium and English Version.
- Leaders: Chairman Shamsul Alam, Principal Dr. Rehana Parvin, Advisor Principal Prof. Abdur Rahim Akon.
- Contact: address, 6 phone numbers, email and Facebook page.
- Notices: SSC 2027 schedule; teacher recruitment result 2025.
- Gallery: event captions and about 20 photos.
- Links: government and education-board links.

**Weak points for a parent or student today:**
- The menu is long: 10 menus and about 35 sub-items.
- The hero is a photo slider with no clear message and no "Apply" button.
- The leaders' messages and the "Achievements" section are empty.
- The notice board is not visible straight away, and there is no popup.
- There is no Google map, no online appointment form and no chatbot.
- The site is only in English, although most families read Bangla first.
- On a phone, the mobile layout is hard to use.

### b) Award-listed school websites (2026 lists by Orange Monke, Morweb and School Jotter)

| School | What makes it attractive |
|---|---|
| bina Global (UK) | Emotional copy for parents and "day-in-the-life" photos. |
| Brentwood Academy (US) | "Apply Now" is fixed in the header on every page. Outcome numbers are shown as big badges. |
| American School of Paris | Key facts appear in the first lines. The high-contrast "Inquire" button is fixed and repeated. |
| Beau Soleil (Switzerland) | Interactive campus tour map and an EN/FR language toggle. |
| Bilingual School of Paris | The two languages are its main selling point, shown in the hero and the stats. |
| Blundell's School (UK) | A numbered school journey from Nursery to Sixth Form. |
| Greenhill School (US) | Editorial cream-and-green design with serif headings and storytelling. |
| Kent College (UK) | Navigation by age group and a strong colour identity. |
| Sunbeam World School (India) | A clear claim with two CTAs (Enroll / Book a demo) and a click-to-call bar. Mobile-first. |
| San Francisco School | A stats bar above the fold and four primary CTAs. |
| AGBU MDS | Bilingual design, with quick links split between current and new families. |
| Hamilton Primary (UK) | Social media always one click away. |
| Upwood Primary (UK) | Parents find anything "within 2 clicks". |

Sources:
- [Orange Monke — 11 Best School Websites 2026](https://orangemonke.com/blogs/best-school-websites/)
- [Morweb — Best School Websites 2026](https://morweb.org/Post/best-school-websites)
- [School Jotter — Best School Websites 2026](https://www.schooljotter.com/best-school-websites-2026/)
- [Colorlib — school website examples](https://colorlib.com/wp/best-school-website-design-examples/)
- [My Codeless Website — school website design](https://mycodelesswebsite.com/school-website-design)

## 2. Why a website is attractive — for a guardian and for a student

| Who | What they want in the first 10 seconds | How the new GFSC site gives it |
|---|---|---|
| **Guardian (new)** | "Is it safe, is it good, how do I apply, what does it cost?" | The hero shows the classes, both versions and the safe campus. "Admission" glows on the left of every page. Numbers (students, classrooms, labs) build trust. The admission steps are numbered. |
| **Guardian (current)** | "Any new notice? Exam routine? Result?" | The latest notice pops up on entry. The Notice button is always visible. Results links are on the home page. |
| **Student** | "Looks cool? Can I find my class or room? Can I log in?" | Monthly animated themes, a dark mode and a floor explorer with every room. A chatbot answers instantly, and Student Login is in the header. |
| **Teacher / staff** | "Quick access to the portal and contacts." | Staff Login is in the header. The quick menu (Ctrl+K) jumps anywhere. |
| **Overseas family / visitor** | "Can I read it in my language?" | The full site switches to বাংলা, English, العربية (right-to-left) or Deutsch. All content changes, not just the menu. |

**Design principles I followed:**
1. **One clear action.** "Admission / Appointment" is fixed on the left side of every page and glows softly.
2. **Always-reachable help.** Map, Contact and Notice stay on the right side, plus the chatbot, on every page.
3. **Trust in numbers and real photos.** It uses only the school's own photos (loaded from gfsc.edu.bd).
4. **Two clicks to anything.** The menu has only 8 items, and the quick menu covers everything else.
5. **Readable everywhere.** Every button and form field gets its text colour from its own background, so text never disappears on a dark colour. Focused fields are highlighted.
6. **Bangladesh identity.** There are 12 monthly themes, for example:
   - February: Ekushey letters.
   - March: red and green.
   - April: Boishakh alpona.
   - June and July: monsoon rain.
   - September: kash flowers.
   - November: Nobanno paddy.
   - December: Victory.
   
   Both the colours and the animation change with the month.
7. **Mobile first.** The dock moves to the bottom, the menu folds and the forms become one column.

## 3. The three versions

| | V1 Aurora | V2 Heritage | V3 Bento |
|---|---|---|---|
| Inspired by | Modern tech brands and Sunbeam / San Francisco School | Greenhill, Blundell's, Kent College | Apple / Notion bento grids, Hamilton Primary |
| Feeling | Energetic, young, premium | Calm, trusted, academic | Friendly, playful, organised |
| Hero | Gradient with animated month effect and a floating photo stack | Split layout: serif headline and one big framed photo | A grid of tiles: welcome, photo, numbers, latest notice, campus map |
| Best for | Students and new-generation parents | Guardians who value tradition and results | Pre-primary and primary families |

All three versions share the same content, chatbot, languages, monthly themes, forms and floor explorer. Only the look is different, so you can pick one (or mix them).

## 4. Features checklist

| Feature | Status | Note |
|---|---|---|
| Notice popup on entry | ✅ | Once per visit; pinned notices first |
| Admission / appointment button, left side, glowing, stays when scrolling | ✅ | |
| Map, Contact, Notice buttons on every page | ✅ | |
| Google Map | ✅ | Popup and Contact page |
| Student Login and Staff Login in the header | ✅ | Front-end only; it needs the school's ERP |
| Social media links | ✅ | YouTube, Instagram and LinkedIn links are still needed |
| Quick popup menu | ✅ | Button or Ctrl+K |
| 12-month Bangladesh themes (colour, animation and message) | ✅ | Automatic by date; the visitor can also choose |
| Dark / light mode | ✅ | |
| 4 full languages, with Arabic right-to-left | ✅ | |
| High-contrast, highlighted forms | ✅ | |
| Chatbot | ✅ | Admission, phone, address, classes, results, lift and any room |
| Interactive campus map | ✅ | Floor navigation, filters, search, room popups, chatbot |

## 5. What is needed to go live
1. **Domain.** gfsc.edu.bd already exists, so ask the current provider (ADDIE Soft / ODHYYON) for hosting access, or move it to new hosting. Any static hosting works, for example Netlify, Cloudflare Pages, GitHub Pages or cPanel.
2. **Upload.** Copy the whole `website` folder to the hosting. No database is needed.
3. **Forms.** At the moment, the admission form opens the visitor's email app. For real online forms, connect it to a form service (Google Forms, Formspree or the school ERP).
4. **Logins.** These need the student/staff system (ODHYYON) URL to link to.
5. **Photos.** These now load from gfsc.edu.bd. Before launch, download them into `website/shared/img/` so the site does not depend on the old server.
