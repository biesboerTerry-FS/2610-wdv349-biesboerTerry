# Lindbergh Ultimate Image Asset Map

Last reviewed: **2026-10-25**  
Scope: every image imported by `src/**/*.jsx`, browser icons referenced by `index.html`, hosted media, PDFs and PDF previews in `public/docs/`, and unused files in `src/assets/` and `public/`.

> **Dummy content notice:** all people, names, email addresses, phone numbers, and portraits in this project are fictional. Photos that showed identifiable coaches, players, families, or students have been replaced with generated placeholder graphics. The PDFs in `public/docs/` were regenerated as sample documents.

Use this as the source of truth when checking whether an image name matches the page or section that displays it.

---

## Where each used image appears (route view)

| Route / area | Images used | What the visitor sees |
| --- | --- | --- |
| Global header/nav (all public routes) | `ultimateLogoTransparent.png` | Sticky navbar with the Lindbergh Ultimate logo and current-page label |
| `/` Home | `welcome.png`, `ultimateRules.png`, `circle.png`, `swag.png` | Welcome placeholder; field-size rules diagram; team photo placeholder; team-store swag graphic |
| `/middle-school` | `circle.png`, `Lindbergh Ultimate - Grades 3-8.jpg` | Hero placeholder; Fall After School Club card; 5 Week Summer Camps card |
| `/high-school` | `circle.png`, `coach-1.jpg`, `coach-2.jpg`, `coach-3.jpg`, `coach-4.jpg`, PDF cover previews | Hero placeholder; four dummy coach monograms; interest-meeting slides and season-letter cards with Open/Download links |
| `/coaching-apprenticeship` | `circle.png` | Hero placeholder; coaching apprenticeship copy and application link |
| `/media` | `circle.png`, `Lindbergh Ultimate - Grades 3-8.jpg`, `Lindbergh Ultimate - Media.jpg`, `Lindbergh Ultimate - Play Opportunities.jpg`, `Lindbergh Ultimate - Power Lunch.jpg` | Hero placeholder; nine photo-gallery cover placeholders |
| `/play-opportunities` | `circle.png`, `Lindbergh Ultimate - Play Opportunities.jpg`, `slua.png` | Hero placeholder; Lindbergh Players Pickup GroupMe card; Saint Louis Ultimate Association partner card |
| `/power-lunch` | `circle.png`, `Lindbergh Ultimate - Power Lunch.jpg`, `5week.jpg` | Hero placeholder; three gallery placeholders (`Power Lunch.jpg`, `5week.jpg`, `circle.png`) |
| `/families` | `circle.png`, `wordCloud.png` | Hero placeholder; supplied word-cloud image in a white card |
| `/booster-club` | `circle.png`, `coach-1.jpg` … `coach-4.jpg`, `booster-1.jpg` … `booster-5.jpg`, `blankAvatar.svg` | Hero placeholder; dummy monogram portraits for named members and a blank avatar for open seats, each with a Lindbergh-yellow glow |
| `/usa-ultimate` | `circle.png` | Hero placeholder |
| `/fundraiser` | `circle.png` | Faint hero placeholder; the campaign image is still a text placeholder (“Image”) |
| `/admin`, `/admin/login` | `ultimateLogoTransparent.png` | Admin header and login logo |
| `/interest-form`, `/registration`, `/calendar`, `/sportsyou` | none | No local images |

> `Header` and the navbar logo come from `Layout`; `/fundraiser` renders its own `Header`/`Footer`. The sticky navbar lives on `components/Header.jsx` so it stays pinned across the public site.

---

## Used assets (asset view)

### Brand and global

| Preview | File | Size | Used in | Context / notes |
| --- | --- | --- | --- | --- |
| ![Lindbergh Ultimate logo](src/assets/ultimateLogoTransparent.png) | `src/assets/ultimateLogoTransparent.png` | 1536×988 · 148.6 KB | `components/Navbar.jsx`, `admin/AdminLayout.jsx`, `admin/AdminLogin.jsx` | Main transparent logo. `ultimateLogo.png` is an unused smaller/older logo. |
| <img src="src/assets/circle.png" width="180" alt="Team photo placeholder"> | `src/assets/circle.png` | 1790×762 · 29.8 KB | `components/Header.jsx`, `components/Rules.jsx`, `pages/MiddleSchool.jsx`, `pages/HighSchool.jsx`, `pages/Media.jsx`, `pages/PlayOpportunities.jsx`, `pages/PowerLunch.jsx`, `pages/Families.jsx`, `pages/BoosterClub.jsx`, `pages/USUltimate.jsx`, `pages/Fundraiser.jsx` | Generic team-photo placeholder. Used as a low-opacity hero/banner background on many pages, as the “Spirit Circle” image on Home > Rules, and as the third Power Lunch gallery tile. |

### Home page (`/`)

| Preview | File | Size | Used in | Context / notes |
| --- | --- | --- | --- | --- |
| <img src="src/assets/welcome.png" width="180" alt="Team photo placeholder"> | `src/assets/welcome.png` | 895×502 · 15.9 KB | `components/Welcome.jsx` (Home) | Welcome placeholder. |
| <img src="src/assets/ultimateRules.png" width="180" alt="Ultimate field size diagram"> | `src/assets/ultimateRules.png` | 1792×757 · 786.5 KB | `components/Rules.jsx` (Home) | Field-size diagram under “Ultimate in 10 Simple Rules.” `rules.png` is an unused smaller duplicate. |
| <img src="src/assets/swag.png" width="160" alt="Flyers Ultimate team store graphic"> | `src/assets/swag.png` | 960×896 · 1.3 MB | `components/Swag.jsx` (Home) | Team-store/swag collage. |

### Middle School page (`/middle-school`)

| Preview | File | Size | Used in | Context / notes |
| --- | --- | --- | --- | --- |
| <img src="src/assets/Lindbergh%20Ultimate%20-%20Grades%203-8.jpg" width="180" alt="Youth program photo placeholder"> | `src/assets/Lindbergh Ultimate - Grades 3-8.jpg` | 960×539 · 44.2 KB | `pages/MiddleSchool.jsx`, `pages/Media.jsx` | Placeholder used on both program cards and several historical gallery covers. |

### High School page (`/high-school`)

| Preview | File | Size | Used in | Context / notes |
| --- | --- | --- | --- | --- |
| <img src="src/assets/coach-1.jpg" width="120" alt="Taylor Quinn monogram"> | `src/assets/coach-1.jpg` | 904×904 · 48.2 KB | `pages/HighSchool.jsx`, `pages/BoosterClub.jsx` | **Taylor “T” Quinn**, Girls Team Coach. Dummy monogram. |
| <img src="src/assets/coach-2.jpg" width="120" alt="Morgan Blake monogram"> | `src/assets/coach-2.jpg` | 409×409 · 16.7 KB | `pages/HighSchool.jsx`, `pages/BoosterClub.jsx` | **Morgan Blake**, Boys Ultimate Coach. Dummy monogram. |
| <img src="src/assets/coach-3.jpg" width="120" alt="Casey Brooks monogram"> | `src/assets/coach-3.jpg` | 710×710 · 37.6 KB | `pages/HighSchool.jsx`, `pages/BoosterClub.jsx` | **Casey “Brooks” Brooks**, Boys Team Coach. Dummy monogram. |
| <img src="src/assets/coach-4.jpg" width="120" alt="Jordan Ellis monogram"> | `src/assets/coach-4.jpg` | 960×960 · 44.1 KB | `pages/HighSchool.jsx`, `pages/BoosterClub.jsx` | **Jordan Ellis**, Girls Team Coach and Booster Club President. Dummy monogram. |

### High School documents (`/high-school`)

| File | Size | Used in | Context / notes |
| --- | --- | --- | --- |
| `public/docs/Flyers-Info-Meeting-Slides-2026.pdf` | 56.6 KB · 12 pages | `pages/HighSchool.jsx` | Regenerated dummy interest-meeting slide deck. |
| `public/docs/Flyers-Info-Meeting-Slides-2026-cover.png` | 540×304 · 18.2 KB | `pages/HighSchool.jsx` | First-page preview for the slides card. |
| `public/docs/Lindbergh-Ultimate-2026-Season-Letter-to-Families.pdf` | 38.4 KB · 5 pages | `pages/HighSchool.jsx` | Regenerated dummy season letter/info packet. |
| `public/docs/Lindbergh-Ultimate-2026-Season-Letter-to-Families-cover.png` | 459×594 · 65.6 KB | `pages/HighSchool.jsx` | First-page preview for the season-letter card. |

### Media page (`/media`)

| Preview | File | Size | Used in | Context / notes |
| --- | --- | --- | --- | --- |
| <img src="src/assets/Lindbergh%20Ultimate%20-%20Media.jpg" width="180" alt="Team photo placeholder"> | `src/assets/Lindbergh Ultimate - Media.jpg` | 960×548 · 41.9 KB | `pages/Media.jsx` | Generic gallery cover placeholder. |
| <img src="src/assets/Lindbergh%20Ultimate%20-%20Play%20Opportunities.jpg" width="180" alt="Team photo placeholder"> | `src/assets/Lindbergh Ultimate - Play Opportunities.jpg` | 960×539 · 40.8 KB | `pages/Media.jsx`, `pages/PlayOpportunities.jsx` | Generic gallery cover placeholder. |
| <img src="src/assets/Lindbergh%20Ultimate%20-%20Power%20Lunch.jpg" width="180" alt="Power Lunch photo placeholder"> | `src/assets/Lindbergh Ultimate - Power Lunch.jpg` | 960×959 · 82.3 KB | `pages/Media.jsx`, `pages/PowerLunch.jsx` | Generic Power Lunch placeholder. |

### Families page (`/families`)

| Preview | File | Size | Used in | Context / notes |
| --- | --- | --- | --- | --- |
| <img src="src/assets/wordCloud.png" width="180" alt="Lindbergh Ultimate word cloud"> | `src/assets/wordCloud.png` | 960×785 · 576 KB | `pages/Families.jsx` | Supplied word cloud in the “Describe Lindbergh Ultimate in Three Words” section. It has a solid white background, so it is displayed on a cream rounded card. |

### Booster Club page (`/booster-club`)

| Preview | File | Size | Used in | Context / notes |
| --- | --- | --- | --- | --- |
| <img src="src/assets/coach-4.jpg" width="120" alt="Jordan Ellis monogram"> | `src/assets/coach-4.jpg` | 960×960 · 44.1 KB | `pages/BoosterClub.jsx` | Jordan Ellis, President. Dummy monogram. |
| <img src="src/assets/booster-1.jpg" width="120" alt="Riley Hayes monogram"> | `src/assets/booster-1.jpg` | 960×960 · 41.6 KB | `pages/BoosterClub.jsx` | Riley Hayes, Secretary. Dummy monogram. |
| <img src="src/assets/booster-2.jpg" width="120" alt="Avery Bennett monogram"> | `src/assets/booster-2.jpg` | 960×960 · 49.7 KB | `pages/BoosterClub.jsx` | Avery Bennett, Co-Treasurer. Dummy monogram. |
| <img src="src/assets/booster-3.png" width="120" alt="Cameron Price monogram"> | `src/assets/booster-3.png` | 808×808 · 29.1 KB | `pages/BoosterClub.jsx` | Cameron Price, Co-Treasurer. Dummy monogram. |
| <img src="src/assets/booster-4.jpg" width="120" alt="Reese Morgan monogram"> | `src/assets/booster-4.jpg` | 241×241 · 10.2 KB | `pages/BoosterClub.jsx` | Reese Morgan, Vice-President. Dummy monogram. |
| <img src="src/assets/booster-5.jpg" width="120" alt="Quinn Collins monogram"> | `src/assets/booster-5.jpg` | 960×960 · 58.0 KB | `pages/BoosterClub.jsx` | Quinn Collins, Alumni Rep. Dummy monogram. |
| <img src="src/assets/coach-1.jpg" width="120" alt="Taylor Quinn monogram"> | `src/assets/coach-1.jpg` | 904×904 · 48.2 KB | `pages/BoosterClub.jsx`, `pages/HighSchool.jsx` | Taylor “T” Quinn, Girls Team Coach. Dummy monogram. |
| <img src="src/assets/coach-2.jpg" width="120" alt="Morgan Blake monogram"> | `src/assets/coach-2.jpg` | 409×409 · 16.7 KB | `pages/BoosterClub.jsx`, `pages/HighSchool.jsx` | Morgan Blake, Boys Team Coach. Dummy monogram. |
| <img src="src/assets/coach-3.jpg" width="120" alt="Casey Brooks monogram"> | `src/assets/coach-3.jpg` | 710×710 · 37.6 KB | `pages/BoosterClub.jsx`, `pages/HighSchool.jsx` | Casey “Brooks” Brooks, Boys Team Coach. Dummy monogram. |
| <img src="src/assets/blankAvatar.svg" width="120" alt="Blank avatar silhouette"> | `src/assets/blankAvatar.svg` | 400×400 · <1 KB | `pages/BoosterClub.jsx` | Neutral silhouette used for the three open positions (Middle School Rep, Gxrls Team Historian, Boys Team Historian). The card keeps the role label and a dashed yellow border. |

All portraits and the blank avatar use the `.booster-photo-shadow` utility in `src/index.css`, which adds a Lindbergh-yellow glow.

### Power Lunch page (`/power-lunch`)

| Preview | File | Size | Used in | Context / notes |
| --- | --- | --- | --- | --- |
| <img src="src/assets/5week.jpg" width="180" alt="Team photo placeholder"> | `src/assets/5week.jpg` | 960×539 · 40.8 KB | `pages/PowerLunch.jsx` | Second gallery placeholder on Power Lunch. |
| `circle.png` | see above | — | `pages/PowerLunch.jsx` | Third gallery placeholder. |

### Partner logos

| Preview | File | Size | Used in | Context / notes |
| --- | --- | --- | --- | --- |
| <img src="src/assets/slua.png" width="160" alt="St. Louis Ultimate Association logo"> | `src/assets/slua.png` | 514×282 · 616.9 KB | `pages/PlayOpportunities.jsx` | St. Louis Ultimate Association partner card. |

---

## Browser icons (`public/`)

| File | Size | Referenced by | Notes |
| --- | --- | --- | --- |
| `public/favicon.ico` | 15.0 KB | `index.html` (`/favicon.ico`) | Primary browser icon. Good. |
| `public/favicon-32x32.png` | 1.3 KB | `index.html` | 32×32 PNG icon. |
| `public/favicon-16x16.png` | 0.6 KB | `index.html` | 16×16 PNG icon. |
| `public/apple-touch-icon.png` | 14.4 KB | `index.html` | 180×180 Apple touch icon. |
| `public/android-chrome-192x192.png` | 15.2 KB | not referenced | Add a `site.webmanifest` to use these, or remove them. |
| `public/android-chrome-512x512.png` | 73.9 KB | not referenced | Same as above. |
| `public/favicon.svg` | 0.3 KB | not referenced | **Misnamed:** the file contains PNG data, not SVG. It is identical to `LindberghSchoolsfavicon_1.png`. Remove it or replace it with a real SVG. |
| `public/icons.svg` | 4.9 KB | not referenced | Unused icon sprite. Verify before deleting. |

---

## External images / placeholders

| Source | Where | Notes |
| --- | --- | --- |
| YouTube embed `PrinnxHyWlo` | `components/WhatIs.jsx` | “What is Ultimate?” video. |
| YouTube embeds with empty IDs | `pages/Media.jsx` | Two video placeholders until real YouTube IDs are added. |
| “Image” text box | `pages/Fundraiser.jsx` | Campaign image placeholder; not a file. |

---

## Unused assets

These files are **not imported anywhere** in the current React code. Keep the ones you still need; remove the rest before pushing to GitHub to keep the repo small.

| File | Size | What it appears to be / recommendation |
| --- | --- | --- |
| `src/assets/openPosition.jpg` | 190×190 · 5.3 KB | “OPEN POSITION” stamp graphic. No longer used; open Booster Club seats now use `blankAvatar.svg`. |
| `src/assets/openPositionStamp.jpg` | 262×262 · 30.5 KB | Another “OPEN POSITION” stamp. No longer used. |
| `src/assets/3.jpg` | 934×934 · 75.9 KB | Indoor practice placeholder; possible alternate Power Lunch image. |
| `src/assets/Lindbergh Ultimate - Play Opportunities.png` | 647×364 · 60.4 KB | **Not a photo:** it is the St. Louis Ultimate Association (STLUA) logo. Duplicate of `slua.png`; use `slua.png` on `/play-opportunities`. |
| `src/assets/Lindbergh Ultimate - Power Lunch.png` | 220×220 · 6.0 KB | Thumbnail-sized Power Lunch placeholder. |
| `src/assets/rules.png` | 825×334 · 20.1 KB | Small duplicate of `ultimateRules.png` field diagram. |
| `src/assets/ultimateLogo.png` | 130×76 · 5.2 KB | Small/older logo; the transparent 1536×988 version is used instead. |
| `src/assets/LindberghSchools.png` | 192×64 · 2.6 KB | Lindbergh Schools logo; not referenced. |
| `src/assets/LindberghSchoolsfavicon_1.png` | 24×24 · 0.3 KB | Old favicon; identical to `public/favicon.svg`. |
| `src/assets/fall3-5.jpg`, `fallMiddleSchoolClub.jpg`, `champions.jpg`, `groupme.jpg`, `lunch1.jpg`, `lunch2.png`, `lunch3.jpg`, `spectatorGuide.png` | — | Additional placeholder graphics retained for future page sections. |

---

## Notes on anonymization

- Real coach, booster, parent, and player names were replaced with fictional names throughout the React pages, seed data, and PDFs.
- Real email addresses were replaced with `example.com` addresses.
- Real portrait and group photos were replaced with generated monogram avatars and field/disc placeholder graphics.
- The two PDFs in `public/docs/` and the duplicate season-letter PDF in `src/assets/` were regenerated as sample documents with “SAMPLE DOCUMENT - DUMMY DATA” footers.
- The unused `src/assets/Join Sports You.pdf` invitation was sanitized: the real access code and QR code were replaced with `SAMPLE-CODE` and a dummy QR grid.
- The SportsYou access code in `src/pages/SportsYou.jsx` and `server/src/seed/seedData.js` is now `SAMPLE-CODE`.
- `server/.env` is git-ignored. It still contains local development credentials and should never be committed or shared.

---

## Quick verification commands

```bash
# List every image file and its dimensions
find src/assets public -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.webp' -o -iname '*.gif' -o -iname '*.svg' -o -iname '*.ico' \) -print

# Find every image import in the React source
grep -RIn --include='*.jsx' --include='*.js' -E '\.(png|jpe?g|webp|gif|svg|avif)' src

# Find duplicate files by hash (macOS/Linux with shasum)
find src/assets public -type f -print0 | xargs -0 shasum -a 256 | sort
```
