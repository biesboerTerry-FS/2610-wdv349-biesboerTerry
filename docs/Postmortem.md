# Lindbergh Ultimate — Project Postmortem

- **Author:** Terry Biesboer
- **Course:** WDV349
- **Milestone:** 4 — Full-Stack Alpha
- **Date:** 2026-10-25
- **Repository:** <https://github.com/biesboerTerry-FS/2610-wdv349-biesboerTerry>
- **App location:** [`dev/portfolio`](../dev/portfolio)

---

## 1. Executive summary

Lindbergh Ultimate is a full-stack team website and management prototype for a
high school Ultimate Frisbee program. The public site gives families a single
place to find program information, schedules, media, registration, and booster
club details. A single-administrator panel provides authenticated CRUD access to
the site's content and form submissions.

The original plan was a broad MERN application with role-based dashboards for
coaches, players, and parents. Milestone 4 delivered a working alpha of the
public site, the API, the database models, seed data, and the Admin Panel. The
remaining gap is production deployment and full API wiring for every public
content page.

The biggest Milestone 4 risk was not a feature bug. It was repository health:
the app had been duplicated across folders, one copy was stored as a broken Git
gitlink, and the working branch contained a large archive plus tracked
`node_modules`. I rebuilt the branch from a clean base, consolidated the app into
`dev/portfolio`, hardened the ignore rules, and verified the frontend and server
before merging.

---

## 2. Original goals and scope

The proposal described a centralized communication and management hub for
players, parents, and coaches. The main promised capabilities were:

- Role-based authentication and dashboards for coaches, players, and parents.
- A dynamic team calendar with practice, game, and tournament information.
- An announcement board for time-sensitive updates.
- A secure roster and directory with emergency contacts.
- A custom REST API backed by MongoDB.
- Map and weather integrations for field locations and forecasts.

The alpha kept the same product direction but narrowed the implementation to a
realistic Milestone 4 scope:

- Public program pages and navigation.
- Registration and interest forms connected to the API.
- A single-admin panel for content and submission management.
- MongoDB models, validation, seed scripts, and documented API routes.
- An anonymized public UI that can be demonstrated safely.

The role-based multi-user dashboards, live weather, and map routing remain future
work.

---

## 3. What was delivered

### Public frontend

- React 19 + Vite 7 + React Router 7 single-page application.
- Tailwind CSS 4 styling with a custom Lindbergh palette and responsive layouts.
- Public routes for home, middle school, high school, coaching apprenticeship,
  media, play opportunities, power lunch, families, booster club, USA Ultimate,
  fundraiser, interest form, registration, calendar, and SportsYou.
- Reusable layout, navigation, footer, cards, galleries, and form components.
- Placeholder/dummy content for people, contact details, and documents.
- A public `/admin/login` entry point for the administrator.

### Backend API

- Node.js 20+ / Express 5 API with MongoDB Atlas or local MongoDB support.
- Mongoose models for players, parents, coaches, teams, seasons, registrations,
  interest forms, schedules, email lists, booster members, fundraiser campaigns,
  donations, testimonials, FAQs, highlights, galleries, media, settings, and
  contact messages.
- JWT authentication for one administrator account.
- Public routes for forms and content, plus authenticated `/api/admin` routes.
- Generic admin CRUD generated from resource metadata.
- Zod request validation, rate limiting, centralized error handling, and CORS
  allow-listing.
- Seed scripts for site content, the admin account, demo records, clearing, and
  resetting data.

### Documentation and repository hygiene

- Root and app-level `README.md` files with setup and troubleshooting steps.
- `dev/portfolio/ASSET_MAP.md` documenting every image, its use, and known asset
  issues.
- `GITHUB_MIGRATION_PLAN.md` retained as historical migration context.
- `.env.example` files for the frontend and server.
- `.gitignore` rules for `.env`, `node_modules`, `dist`, archives, and OS files.
- Restored legacy photos under `src/assets/legacy/` with generic filenames and
  redactions where visible personal text appeared.

### Verification performed

```bash
# Frontend
cd dev/portfolio
npm ci
npm run lint
npm run build

# Server
cd dev/portfolio/server
npm ci
npm run lint
npm run check
```

The build completes with two known warnings: a JavaScript chunk larger than
500 kB and a Node `module.register()` deprecation warning. Neither blocks the
alpha.

---

## 4. What went well

### The app is demonstrable end to end

A reviewer can start the API, seed the database, start Vite, browse the public
site, submit an interest form or registration, and sign into the Admin Panel to
inspect the stored records. That is a meaningful full-stack loop rather than a
static mockup.

### The API surface is broader than the UI currently uses

The models and admin routes cover far more content than the public pages consume
today. This gives the project a clear path for future wiring without redesigning
the database.

### The Admin Panel is genuinely useful

The single-admin design reduced authentication complexity while still providing
searchable, paginated CRUD views, dashboard counts, and access to every stored
field. It is a practical tool for a volunteer-run program.

### The cleanup produced a maintainable repository

The final repository has one canonical app, no tracked dependencies or build
output, no committed secrets, and a documented structure. The clean branch was
verified before merge instead of relying on the original local state.

### Anonymization was handled deliberately

Real names, emails, phone numbers, documents, access codes, and portraits were
replaced or redacted in the tracked source. The public UI uses fictional data and
placeholder avatars. Restored legacy photos are isolated as unused archival
assets with a consent warning.

---

## 5. Challenges and how they were resolved

### 5.1 Duplicate app folders and a broken gitlink

**Problem:** The repository contained both a legacy `lindberghUltimate` tree and
a `dev/portfolio` entry. At one point `dev/portfolio` was recorded as a Git
gitlink (`160000 commit`) rather than a normal directory. A fresh clone could not
browse the app reliably.

**Resolution:** I treated `dev/portfolio` as the single canonical app, removed
the duplicate legacy tree, replaced the gitlink with a normal tracked directory,
and verified the tree type on `origin/dev`. The migration plan was updated to
describe the final structure.

**Lesson:** Decide the canonical app path early and verify `git ls-tree` after
any submodule, archive, or folder move.

### 5.2 A branch that could not be pushed

**Problem:** The working branch contained a 168 MB archive and tracked
`node_modules`, so a normal push was rejected. The local state also included
build output and OS files.

**Resolution:** I rebuilt the branch from `origin/dev`, copied only source and
documentation, removed generated content, added ignore rules, and re-ran the
frontend and server installs from lockfiles.

**Lesson:** Add ignore rules before the first large dependency install. A clean
copy plus lockfile install is faster and safer than trying to surgically untrack
thousands of files.

### 5.3 Personal information in source and assets

**Problem:** The original site included real names, contact details, portrait
photos, PDFs, and a SportsYou access code.

**Resolution:** I replaced public-facing people and contact data with fictional
values, regenerated sample PDFs, sanitized the SportsYou code, and restored only
the unique legacy photos with generic filenames. Two photos were cropped to
remove visible clipboard text. The restored photos are not imported by any page.

**Lesson:** Treat content anonymization as a data migration, not a find-and-
replace pass. Check filenames, EXIF, PDFs, screenshots, and image backgrounds.

### 5.4 Stale pull requests and branch confusion

**Problem:** PR #30 was an old `dev` → `stage` promotion with no useful
description. PR #35 targeted `main` from a `components` branch and was already
merged before cleanup.

**Resolution:** PR #30 was closed as superseded. PR #35 could not be closed
because it was already merged; I corrected the record to explain that it predates
the clean app. The milestone description now links the relevant PRs and states
the actual merge status.

**Lesson:** PR titles and descriptions are part of the deliverable. A stale PR
can misrepresent the project even when the code is fine.

### 5.5 Partial API integration

**Problem:** The public pages were built with local data. Only the interest and
registration forms, plus the Admin Panel, were wired to the API.

**Resolution:** I documented the integration status honestly in the README
instead of implying the whole site was API-driven. The API models and routes are
ready for the remaining pages.

**Lesson:** A full-stack alpha can ship with a narrow integration slice if the
boundary is explicit. Hidden gaps are worse than documented gaps.

### 5.6 No deployment or CI pipeline

**Problem:** There is no live URL, deployment configuration, or automated test
pipeline. The showcase must run locally.

**Resolution:** The README includes exact local setup and troubleshooting steps,
including MongoDB Atlas configuration and CORS ports. Deployment is listed as
next work rather than claimed as complete.

**Lesson:** Deployment should be an early milestone, not a final-week task. A
local-only alpha is harder to demo and easier to break on another machine.

---

## 6. Key technical decisions and tradeoffs

| Decision | Why | Tradeoff |
| --- | --- | --- |
| Single canonical app at `dev/portfolio` | Removes duplicate source and broken gitlink ambiguity | Requires updating docs and branch assumptions |
| Normal directory, not a Git submodule | Reviewers can browse the code directly | The course repo and standalone app history are coupled |
| React + Vite + Tailwind | Fast iteration and a component-driven UI | Large client bundle; no server rendering |
| Express + Mongoose + MongoDB | Flexible document model for many content types | Less relational integrity than SQL for roster/registration data |
| One admin role | Avoids multi-role auth complexity in the alpha | Does not yet deliver coach/player/parent dashboards |
| JWT in `localStorage` | Simple SPA authentication | Requires careful XSS handling and logout/token expiry UX |
| Generic admin CRUD from metadata | Covers many resources without duplicate code | Less tailored screens than purpose-built forms |
| Placeholder public data | Safe demo and public repository | Less realistic showcase; real content must be reconnected later |
| Legacy photos archived, not imported | Preserves originals without exposing them in the UI | Adds unused weight to the repository |

---

## 7. What I would do differently

1. **Choose the final app path in Week 1.** One canonical folder, one README, one
   deployment target. No duplicate frontend.
2. **Add ignore rules and environment templates before installing anything.**
   `.env.example`, `node_modules`, `dist`, archives, and OS files should be
   handled on day one.
3. **Deploy a walking skeleton early.** A live URL with one page and one API
   route would have exposed CORS, environment, and build issues much sooner.
4. **Use synthetic data from the start.** Retrofitting anonymization across
   React pages, seed data, PDFs, and images is slower and riskier than starting
   with fake content.
5. **Keep pull requests small and descriptive.** Each PR should state the user
   problem, the change, the verification, and the follow-up. Stale PRs should be
   closed or retargeted immediately.
6. **Add a minimal test and CI layer.** At least one API health test, one form
   submission test, and one frontend build check on every push.
7. **Wire one public content page to the API before building more pages.** That
   would have validated the content-loading pattern earlier.
8. **Document the integration boundary in the UI or README.** Mark local-data
   pages clearly so reviewers do not assume they are live.

---

## 8. Lessons learned

- **Repository hygiene is a feature.** A broken gitlink or tracked dependency
  tree can make a good app look unfinished.
- **A clean branch is cheaper than a heroic cleanup.** Rebuilding from a known
  good base was faster than untracking a large, messy working tree.
- **Anonymization needs a checklist.** Names, emails, phone numbers, filenames,
  image backgrounds, PDFs, and access codes all count.
- **Full-stack means the whole loop.** A form that writes to MongoDB and appears
  in the Admin Panel is more valuable than ten static pages.
- **Honest scope beats inflated claims.** The README states what is wired and
  what is still local data.
- **A postmortem is a planning tool.** The next steps below are the backlog I
  would start with, not a vague wish list.

---

## 9. Next steps

### Immediate

1. Promote the cleaned `dev` branch through `stage` to `main` so `main` no longer
   contains the old broken gitlink.
2. Record the 4.6 Showcase walkthrough: public pages, form submission, API
   health, Admin Panel login, and a CRUD demonstration.
3. Submit the 4.7 Postmortem with the repository and PR links.

### Short term

4. Deploy the frontend and API (for example Vercel/Netlify + Render/Railway) and
   configure production `CORS_ORIGINS`, `VITE_API_URL`, MongoDB Atlas network
   access, and secrets.
5. Add a smoke-test checklist for login, form submission, admin CRUD, and the
   public routes.
6. Wire the remaining public pages to the existing API endpoints, starting with
   booster members, testimonials, calendar, and media.
7. Add loading, empty, and error states to every API-backed page.

### Medium term

8. Add role-based coach/player/parent views if the program needs them.
9. Add calendar exports, map links, and weather integration.
10. Add automated tests and CI for lint, build, API health, and form submission.
11. Optimize images and split the JavaScript bundle; resolve the Vite chunk-size
    warning.
12. Complete an accessibility pass: keyboard navigation, focus states, labels,
    contrast, and alt text.

---

## 10. Final assessment

Milestone 4 succeeded as an alpha: the app is browsable, the API is functional,
the Admin Panel works, and the repository is clean enough to review. The project
did not reach a production deployment or full API integration, and the postmortem
should not pretend otherwise.

The most valuable outcome is not just the feature list. It is the corrected
repository structure and the documented boundary between what works, what is
mocked, and what comes next. That gives the project a credible path forward.

---

## Appendix: key links

- Repository: <https://github.com/biesboerTerry-FS/2610-wdv349-biesboerTerry>
- Milestone 4: <https://github.com/biesboerTerry-FS/2610-wdv349-biesboerTerry/milestone/4>
- Clean app PR #36: <https://github.com/biesboerTerry-FS/2610-wdv349-biesboerTerry/pull/36>
- Superseded promotion PR #30: <https://github.com/biesboerTerry-FS/2610-wdv349-biesboerTerry/pull/30>
- Earlier merged PR #35: <https://github.com/biesboerTerry-FS/2610-wdv349-biesboerTerry/pull/35>
- App README: [`dev/portfolio/README.md`](../dev/portfolio/README.md)
- Asset map: [`dev/portfolio/ASSET_MAP.md`](../dev/portfolio/ASSET_MAP.md)
- Server README: [`dev/portfolio/server/README.md`](../dev/portfolio/server/README.md)
- Legacy photo notes: [`dev/portfolio/src/assets/legacy/README.md`](../dev/portfolio/src/assets/legacy/README.md)
