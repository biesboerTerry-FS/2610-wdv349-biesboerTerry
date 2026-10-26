# Lindbergh Ultimate API

MongoDB + Express backend for the Lindbergh Ultimate website. It captures the
site's forms (interest, registration, contact, email sign-up), exposes the
content the React pages display (coaches, schedule, booster club, fundraiser,
FAQs, testimonials, media, settings), and gives a single administrator a
validated Admin Panel API.

The Quick Interest and Spring Registration pages in the frontend are wired to
this API; the remaining public content pages still read local data. The Admin
Panel uses the authenticated endpoints under `/api/admin`.

| Item | Default |
| --- | --- |
| API URL | <http://localhost:5050> |
| Health check | <http://localhost:5050/api/health> |
| Database | `lindbergh_ultimate` (Atlas or local MongoDB) |
| Frontend dev origins | `http://localhost:5173`, `http://localhost:5174` (+ `127.0.0.1` variants) |
| Admin login | `/admin/login` on the frontend |
| Seed admin | `admin@example.com` / `ChangeMe123!` |

Frontend setup and site overview: [`../README.md`](../README.md).

## Quick start with MongoDB Atlas

```bash
cd server
cp .env.example .env   # paste your Atlas mongodb+srv:// URI
npm install
npm run seed           # site content + the single Admin Panel account
npm run dev            # http://localhost:5050
```

Create the cluster first:

1. Create a free cluster at <https://cloud.mongodb.com>.
2. Add a database user under **Database Access**.
3. Allow your IP under **Network Access**.
4. Copy the driver string from **Connect > Drivers** into `MONGODB_URI` in
   `server/.env`. Keep `/lindbergh_ultimate` in the path or set
   `MONGODB_DB_NAME`; if both are omitted, the server defaults to
   `lindbergh_ultimate` rather than MongoDB's `test` database.

For local development, set
`MONGODB_URI=mongodb://127.0.0.1:27017/lindbergh_ultimate` instead.

The single admin account comes from `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`
in `.env` (default `admin@example.com` / `ChangeMe123!`). Change the
password and `JWT_SECRET` before deploying. `npm run seed:admin` creates or
refreshes just that account without touching site content.

Requirements:

- Node.js 20+
- MongoDB Atlas (recommended) or MongoDB 6+ running locally.

## Database selection

The server uses, in order:

1. `MONGODB_DB_NAME` when set;
2. otherwise the database name in `MONGODB_URI`;
3. otherwise `lindbergh_ultimate`.

Keep both values aligned:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/lindbergh_ultimate?retryWrites=true&w=majority
MONGODB_DB_NAME=lindbergh_ultimate
```

On startup the log should say:

```text
[mongo] connected to lindbergh_ultimate
```

If it says `test`, stop and fix the configuration before seeding. The server
does not intentionally use MongoDB's `test` database.

## CORS and frontend ports

`CORS_ORIGINS` is a comma-separated allow-list. The defaults cover both local
Vite ports and both host spellings:

```env
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174
```

Vite normally uses `5173` and falls back to `5174` if the port is taken. If you
change the frontend port or deploy the site, add the production origin:

```env
CORS_ORIGINS=https://lindberghultimate.com,https://www.lindberghultimate.com
```

Restart the API after editing `server/.env`. A stale API process is the most
common cause of “Admin login works in one browser session but not another.”

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start with Node's watch mode |
| `npm start` | Start normally |
| `npm run seed` | Seed static/site content and the admin user |
| `npm run seed:admin` | Create/refresh only the single Admin Panel account |
| `npm run seed:demo` | Same as seed, plus demo players, parents, subscribers and donations |
| `npm run seed:clear` | Remove seeded content while preserving admin and form submissions |
| `npm run seed:reset` | Clear seeded content, then seed it again |
| `npm run lint` | Run ESLint |
| `npm run check` | Syntax-check `src/index.js` |

`npm run seed` replaces the seeded content collections (FAQ, testimonials,
highlights, galleries, media, booster members, schedule events, settings) and
re-hashes the seed admin password. It leaves player/parent/registration data
untouched unless `SEED_DEMO_DATA=true`.

`npm run seed:clear` removes the seeded public content and known demo records,
but preserves the admin login, registrations, interest forms, messages, and
other non-seed data. `npm run seed:reset` is a convenience shortcut that runs
the clear script and then reseeds.

## Admin Panel

The frontend Admin Panel lives at `/admin/login`. It signs in through
`POST /api/auth/login`, stores the JWT in `localStorage`, and uses the
authenticated `/api/admin` endpoints.

- One administrator is seeded; there is no coach login.
- `GET /api/admin/dashboard` supplies counts, status breakdowns, the active
  season/campaign, and recent submissions.
- Every standard resource has list/detail/create/edit/delete support generated
  from `GET /api/admin/meta`.
- User management under `/api/admin/users` requires the `admin` role.
- Change the seeded password from the Admin Panel or by updating
  `SEED_ADMIN_PASSWORD` and re-running `npm run seed:admin`.
- The admin JWT is valid for `JWT_EXPIRES_IN` (default `7d`). Clearing
  `localStorage` or using the logout action ends the browser session.

## Verifying the API locally

```bash
# Health check
curl http://localhost:5050/api/health

# Login and capture the token
curl -s -X POST http://localhost:5050/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"ChangeMe123!"}'

# Authenticated dashboard
curl -H "Authorization: Bearer <token>" \
  http://localhost:5050/api/admin/dashboard
```

Expected startup logs show the Mongo database name and the API port:

```text
[mongo] connected to lindbergh_ultimate
[api] listening on http://localhost:5050 (development)
```

## Project structure

```text
server/
  src/
    config/          env + Mongo connection
    models/          Mongoose models and shared schemas
    validators/      Zod request validation
    middleware/      auth, rate limits, validation, errors
    controllers/     public, admin, auth, generic CRUD
    services/        registration approval, email lists, fundraiser, stats
    routes/          /api, /api/auth, /api/admin
    seed/            seed script and site data (including 2026 calendar)
```

## Environment

| Variable | Purpose |
| --- | --- |
| `PORT` | API port (default `5050`) |
| `MONGODB_URI` | Atlas `mongodb+srv://` connection string (or local Mongo URI) |
| `MONGODB_DB_NAME` | Optional database override |
| `JWT_SECRET` | Signing key for admin JWTs (16+ chars) |
| `JWT_EXPIRES_IN` | Token lifetime (default `7d`) |
| `ADMIN_API_KEY` | Optional shared key for scripts (`x-api-key`) |
| `CORS_ORIGINS` | Comma-separated allowed origins; local ports 5173 and 5174 are included by default. Add your production frontend origin. |
| `RATE_LIMIT_*` | Global / public form limits |
| `SEED_ADMIN_EMAIL` | Single Admin Panel email |
| `SEED_ADMIN_PASSWORD` | Single Admin Panel password |
| `SEED_DEMO_DATA` | Add sample players/parents/donations |

## Authentication

Admin endpoints use a JWT from `POST /api/auth/login`:

```bash
curl -X POST http://localhost:5050/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"ChangeMe123!"}'
```

Send the returned token as `Authorization: Bearer <token>`.

Scripts may instead send `x-api-key: <ADMIN_API_KEY>` (or use it as the bearer
token). The API key maps to the `admin` role. User-management routes require
the `admin` role. The Admin Panel seeds one administrator; no coach login is
created.

## Data models

| Model | Purpose / key fields |
| --- | --- |
| `Player` | Roster record: name, grade/school/division, shirt size, contacts, guardians, teams/seasons, jersey, positions, USA Ultimate membership, medical/emergency info |
| `Parent` | Guardian record: contact info, address, relationship, linked players, email opt-in, emergency-contact flag |
| `Coach` | Staff record: program/division, title/role, bio, photo, certifications, teams, display order |
| `Team` | Team/roster grouping with program, division, season, captains; virtual `players` and `coaches` |
| `Season` | Season dates, registration window, fee, active flag |
| `Registration` | Spring/fall registration submission. Mirrors every field on the registration form plus guardian/emergency/waiver/payment/status fields |
| `InterestSubmission` | Quick Interest Form. Supports one or more divisions and legacy field aliases from the old form component |
| `ScheduleEvent` | Practices, clinics, games, tournaments, meetings, external pickup/league events; all-day, location, opponent, recurrence, visibility |
| `EmailList` | Named audience (`general`, `interest`, `players`, `parents`, `coaches`, `boosters`, `alumni`) |
| `EmailSubscriber` | Email, consent, tags, status, memberships across lists |
| `EmailCampaign` | Draft/scheduled/sent email tracking per list |
| `BoosterMember` | Booster directory rows, including open positions |
| `FundraiserCampaign` | Goal, story, dates, status, donation URL |
| `Donation` | Donor, amount, campaign, credited player, anonymous flag, payment/status |
| `Testimonial` | Family/player quotes with moderation and display order |
| `Faq` | Question/answer, category, optional internal/external link |
| `Highlight` | Program awards grouped by category with a list of years |
| `Gallery` | Photo gallery metadata and cover image |
| `MediaItem` | Video/photo items, YouTube ID, gallery link, year |
| `SiteSetting` | Public/site-wide values: contact email, socials, SportsYou code, team store, fundraiser slug, Power Lunch details |
| `ContactMessage` | Contact-form inbox with status/assignment |
| `User` | Admin Panel accounts (`admin`; legacy `editor`/`coach` roles remain for future use) |

## Form endpoints

These are public and rate-limited.

| Website form | Endpoint | Stored in |
| --- | --- | --- |
| Quick Interest (`/interest-form`) | `POST /api/interest-submissions` | `InterestSubmission` |
| Spring Registration (`/registration`) | `POST /api/registrations` | `Registration` |
| Email sign-up | `POST /api/email-lists/subscribe` or `POST /api/email-lists/:slug/subscribe` | `EmailSubscriber` |
| Unsubscribe | `POST /api/email-lists/unsubscribe` | `EmailSubscriber` |
| Contact / questions | `POST /api/contact` | `ContactMessage` |

The interest endpoint accepts both current and legacy field names:

- `grade` or `schoolGrade`
- `school` or `schoolAttended`
- `division` (string) or `divisions` (array)

The registration endpoint accepts:

- `grade` or `gradeLevel`
- `division` or `genderDivision`
- `phone` or `athletePhone`
- `schoolEmail` or `athleteEmail`

Example interest submission:

```bash
curl -X POST http://localhost:5050/api/interest-submissions \
  -H 'Content-Type: application/json' \
  -d '{
    "studentName": "Sam Player",
    "grade": "10th",
    "divisions": ["Boys"],
    "school": "Lindbergh High School",
    "studentPhone": "314-555-0123",
    "studentEmail": "sam@example.com",
    "parentPhone": "314-555-0124",
    "parentEmail": "parent@example.com",
    "interestLevel": "Probably playing"
  }'
```

Example registration submission:

```bash
curl -X POST http://localhost:5050/api/registrations \
  -H 'Content-Type: application/json' \
  -d '{
    "athleteName": "Sam Player",
    "grade": "10th",
    "school": "Lindbergh High School",
    "division": "Boys",
    "shirtSize": "L",
    "phone": "314-555-0123",
    "schoolEmail": "sam@example.com",
    "additionalEmail": "sam.personal@example.com",
    "parentName": "Pat Player",
    "parentEmail": "parent@example.com",
    "parentPhone": "314-555-0124",
    "waivers": { "medical": true, "media": true }
  }'
```

## Public read endpoints

| Endpoint | Returns |
| --- | --- |
| `GET /api/health` | Health check |
| `GET /api/coaches` | Active coaches |
| `GET /api/booster-members` | Booster directory (active + open positions) |
| `GET /api/schedules` | Public events. Filters: `from`, `to`, `type`, `division`, `program`, `source`, `past`, `group=day`, `limit` |
| `GET /api/fundraiser` | Campaign totals, leaderboard, supporters (`?campaign=slug`) |
| `GET /api/fundraiser/campaigns` | Non-draft campaigns |
| `GET /api/faqs` | Published FAQs |
| `GET /api/testimonials` | Approved testimonials |
| `GET /api/highlights` | Published program highlights |
| `GET /api/galleries` | Published galleries |
| `GET /api/media` | Published media items |
| `GET /api/settings` | Public site settings as a key/value object |

By default, `/api/schedules` only returns events from now forward. Use
`from=2026-01-01&to=2026-12-31&past=true` for an archive or calendar view.
`group=day` returns `[{ date, events }]` for the 2026 calendar layout.

## Admin endpoints

All paths below require authentication. Standard resources support:

```text
GET    /api/admin/meta                 field metadata used by the admin forms
GET    /api/admin/<resource>          list (page, limit, q, sort, filters)
GET    /api/admin/<resource>/:id
POST   /api/admin/<resource>
PATCH  /api/admin/<resource>/:id
DELETE /api/admin/<resource>/:id
```

Resources:

```text
players, parents, coaches, teams, seasons,
registrations, interest-submissions, schedules,
email-lists, email-subscribers, email-campaigns,
booster-members, fundraiser-campaigns, donations,
testimonials, faqs, highlights, galleries, media,
settings, messages
```

Workflow routes:

| Endpoint | Purpose |
| --- | --- |
| `GET /api/admin/dashboard` | Counts, status breakdowns, active season/campaign, recent submissions |
| `POST /api/admin/registrations/:id/approve` | Create/link `Player` + `Parent`, approve registration, add contacts to email lists |
| `POST /api/admin/interest-submissions/:id/convert` | Create/link a prospect `Player` from an interest submission |

User management (`admin` only):

```text
GET    /api/admin/users
POST   /api/admin/users          { name, email, password, role, coach?, isActive? }
PATCH  /api/admin/users/:id      { name?, email?, password?, role?, coach?, isActive? }
DELETE /api/admin/users/:id
```

Auth:

```text
POST /api/auth/login             { email, password }
GET  /api/auth/me
POST /api/auth/change-password   { currentPassword, newPassword }
```

List query examples:

```text
GET /api/admin/players?status=active&division=Boys&page=1&limit=25
GET /api/admin/registrations?status=submitted&season=<id>&sort=-submittedAt
GET /api/admin/schedules?from=2026-10-01&to=2026-12-31&program=middle-school
GET /api/admin/email-subscribers?status=subscribed&lists=<listId>
```

## Frontend integration

The Quick Interest (`/interest-form`) and Spring Registration (`/registration`)
pages are wired to the API through `src/lib/api.js`:

```js
// src/lib/api.js
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5050/api";

export const submitInterestForm = (form) => postJson("/interest-submissions", form);
export const submitRegistration = (form) => postJson("/registrations", form);
```

Both pages show a disabled "Submitting…" button, map server validation details
to inline field errors, display request failures in a banner, and render a
confirmation panel after a successful submit. Copy the root `.env.example` to
`.env` and set `VITE_API_URL` when the API is not on `http://127.0.0.1:5050/api`.

Not yet wired: the email sign-up, contact, booster-directory and testimonial
forms, plus the calendar/fundraiser/media pages, which still read local data.
The endpoints they need are listed above.

The Admin Panel at `/admin` uses the authenticated endpoints in `src/admin/`.
It signs in with `POST /api/auth/login`, stores the JWT in `localStorage`, and
renders a dashboard plus generic resource tables. Every resource listed under
Admin endpoints has a detail drawer and create/edit/delete forms generated from
`GET /api/admin/meta`; the `users` section is limited to the `admin` role.

## Troubleshooting

### `[mongo] connected to test`

`MONGODB_URI` or `MONGODB_DB_NAME` is not set correctly. Use the Atlas URI with
`/lindbergh_ultimate` in the path, set `MONGODB_DB_NAME=lindbergh_ultimate`, and
restart the API. Do not seed until the log shows the intended database.

### Admin Panel login fails with a CORS/network error

- Confirm the API is running: `curl http://localhost:5050/api/health`.
- Confirm the frontend origin is in `CORS_ORIGINS`.
- If Vite fell back to `5174`, make sure that origin is allowed.
- Restart the API after editing `server/.env`.
- Check that the browser is calling the same API URL shown by
  `VITE_API_URL` (or the default `http://127.0.0.1:5050/api`).

### Seed fails or leaves the admin password unchanged

Run `npm run seed:admin`. It reads `SEED_ADMIN_EMAIL` and
`SEED_ADMIN_PASSWORD` from `server/.env`, creates or updates the account, and
does not touch the rest of the content.

### Port 5050 is already in use

```bash
lsof -nP -iTCP:5050 -sTCP:LISTEN
```

Stop the stale process, then start the API again. A stale API from another
project folder can serve old environment settings and cause confusing login or
database behavior.

## Production notes

- Use a managed MongoDB (Atlas) and set `MONGODB_URI` to the SRV string.
- Set a long random `JWT_SECRET`; remove `ADMIN_API_KEY` or rotate it.
- Restrict `CORS_ORIGINS` to the deployed frontend origin.
- Put the API behind HTTPS/reverse proxy and keep `trust proxy` behaviour in
  mind for rate limiting.
- Add an email provider (Resend/SendGrid/Postmark) in `services/emailService.js`
  if confirmation/welcome messages are needed.
- Donations are stored, not processed. Wire a payment provider (e.g. Stripe
  Checkout/webhooks) to create `Donation` records with `status: "completed"`.
- Review `ScheduleEvent.recurrence`: it is stored but not expanded into
  individual occurrences; the seed data already expands recurring practices.

## Vercel API deployment

The API is configured as a Vercel serverless project. Its Express application
is reused by [`src/serverless.js`](./src/serverless.js), while local development
continues to use `src/index.js`.

The current Vercel project is `fast-cyclone-ney3302`, deployed at
<https://fast-cyclone-ney3302.tmp.now>. Add these variables in the Vercel
project's **Settings > Environment Variables** for the **Production**
environment:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/lindbergh_ultimate
MONGODB_DB_NAME=lindbergh_ultimate
JWT_SECRET=<long-random-production-secret>
SEED_ADMIN_EMAIL=<admin-email>
SEED_ADMIN_PASSWORD=<strong-admin-password>
CORS_ORIGINS=https://lindberghultimatefrisbee-terry-biesboers-projects.vercel.app
```

After adding the variables, redeploy the API and seed the administrator against
the production database. Do not commit these values or place them in
`.env.example`.

The frontend uses `https://fast-cyclone-ney3302-terry-biesboers-projects.vercel.app/api` as its production
`VITE_API_URL`, and is currently deployed at
<https://lindberghultimatefrisbee-terry-biesboers-projects.vercel.app>. If
either Vercel project receives a custom domain later, update both values to use
the production domains.
