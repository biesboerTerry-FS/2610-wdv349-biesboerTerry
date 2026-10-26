# Lindbergh Ultimate

Website for the Lindbergh Ultimate program: a React + Vite frontend with an
Express + MongoDB Atlas backend and a single-administrator Admin Panel.

The public site includes the team word-cloud image, program pages—including
the Coaching Apprenticeship page—media galleries, registration/interest forms,
and the Admin Panel at `/admin`.

## Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite 7, React Router 7, Tailwind CSS 4 |
| Backend | Node.js 20+, Express 5, Mongoose 9 |
| Database | MongoDB Atlas (or local MongoDB 6+) |
| Auth | JWT stored in `localStorage` for the Admin Panel |
| Icons | Font Awesome + local image assets |

## Repository layout

This app lives at `dev/portfolio` in the course repository. The paths below are
relative to this folder.

```text
.
├── src/                    React frontend
│   ├── admin/              Admin Panel (login, dashboard, CRUD views)
│   ├── assets/             Site images
│   ├── components/         Shared sections and layout
│   ├── pages/              Public routes
│   └── lib/api.js          API client
├── public/                 Favicons and static files
├── server/                 Express + MongoDB API
│   ├── src/config/         Env + Mongo connection
│   ├── src/models/         Mongoose models
│   ├── src/routes/         Public and admin routes
│   ├── src/seed/           Seed data and admin seed
│   └── README.md           Backend details
├── ASSET_MAP.md            Every image, its page/section, and asset issues
├── GITHUB_MIGRATION_PLAN.md  Historical migration checklist
└── index.html
```

## Quick start

### 1. Start the API

```bash
cd server
cp .env.example .env
# Edit server/.env and set MONGODB_URI to your Atlas connection string.
npm install
npm run seed          # site content + the single Admin Panel account
npm run dev           # http://localhost:5050
```

If you are using a local MongoDB instead of Atlas:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/lindbergh_ultimate
```

The server defaults to the database named `lindbergh_ultimate` when
`MONGODB_DB_NAME` is unset, so it will not silently write to MongoDB's `test`
database. See [`server/README.md`](./server/README.md) for the full backend
setup, models, routes, and environment reference.

### 2. Start the frontend

From the project root:

```bash
npm install
npm run dev           # http://localhost:5173
```

The frontend calls `http://127.0.0.1:5050/api` by default. To override it:

```bash
cp .env.example .env
# .env
VITE_API_URL=http://127.0.0.1:5050/api
```

If port `5173` is already in use, Vite falls back to `http://localhost:5174`.
The API allows both local ports, plus their `127.0.0.1` variants, by default.

### 3. Open the site

- Public site: <http://localhost:5173>
- Admin Panel: <http://localhost:5173/admin/login>
- API health: <http://localhost:5050/api/health>

## Admin Panel

One administrator account manages the database. The email and password come
from `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` in `server/.env`. The defaults
in `server/.env.example` are placeholders; **change the password and
`JWT_SECRET` before deploying.**

`npm run seed` creates or refreshes the admin account. Use
`npm run seed:admin` if you only want to reset the login without touching site
content.

The Admin Panel includes a dashboard and searchable, paginated tables for
players, parents, coaches, teams, seasons, registrations, interest forms,
schedules, email lists/subscribers/campaigns, booster members, fundraiser
campaigns, donations, testimonials, FAQs, highlights, galleries, media, site
settings, and the contact inbox. Selecting a row opens every stored field,
including populated references and raw JSON. Records can be created, edited,
and deleted from the same view.

There is intentionally **one admin login**; no coach login is seeded.

## Seed data

```bash
cd server
npm run seed        # static/site content + admin account
npm run seed:admin  # only the admin account
npm run seed:demo   # seed + sample players, parents, subscribers, donations
npm run seed:clear  # remove seeded content, keep admin + form submissions
npm run seed:reset  # clear the seed data, then seed it again
```

`npm run seed` replaces the seeded content collections (FAQs, testimonials,
highlights, galleries, media, booster members, schedule events, settings) and
re-hashes the seed admin password. It leaves player/parent/registration data
untouched unless `SEED_DEMO_DATA=true`.

`npm run seed:clear` removes the seeded public content and known demo records,
but preserves the admin login, registrations, interest forms, messages, and
other non-seed data. Use `npm run seed:reset` when you want a clean refresh.

## Frontend scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite with HMR |
| `npm run build` | Build for production into `dist/` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

## Backend scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start with Node watch mode |
| `npm start` | Start the API normally |
| `npm run seed` | Seed site content + admin |
| `npm run seed:admin` | Create/refresh only the admin account |
| `npm run seed:demo` | Seed with sample demo records |
| `npm run seed:clear` | Remove seeded content while preserving admin and submissions |
| `npm run seed:reset` | Clear seeded content, then seed it again |
| `npm run lint` | Run ESLint |
| `npm run check` | Syntax-check the server entry point |

## API integration status

- **Wired to the API:** Quick Interest (`/interest-form`) and Spring
  Registration (`/registration`) submit to the backend and show inline
  validation and confirmation states. The Admin Panel uses the authenticated
  admin endpoints.
- **Still local data:** the public booster directory, testimonials, calendar,
  fundraiser, media, and other content pages currently read their content from
  local React data. The API endpoints and models for those sections exist; see
  `server/README.md` for the available routes.

## Images and assets

See [`ASSET_MAP.md`](./ASSET_MAP.md) for:

- Every used image and the page/section that displays it.
- High School coach-photo mismatches and Middle School/Media image reuse.
- Unused files, duplicates, misnamed assets, and large images to optimize.
- The favicon setup and unused browser icons.

The old `index.html` favicon reference pointed to a missing source image; it
now uses the PNG/ICO files in `public/`.

## Repository status

This app is part of the course repository at `dev/portfolio`. It is a normal
directory, not a Git submodule. See the root [`README.md`](../../README.md) for
the repository overview and
[`GITHUB_MIGRATION_PLAN.md`](./GITHUB_MIGRATION_PLAN.md) for historical
migration notes.

Do not commit `node_modules`, `dist`, `.env`, `portfolio.zip`, or generated
assets. The root and app-level `.gitignore` files cover those paths.

## Troubleshooting

### Admin login fails with a network/CORS error

1. Confirm the API is running on `http://localhost:5050`:
   ```bash
   curl http://localhost:5050/api/health
   ```
2. Confirm the frontend is on `http://localhost:5173` or
   `http://localhost:5174`.
3. Check `CORS_ORIGINS` in `server/.env`. Both local ports are allowed by
   default.
4. If you changed `server/.env`, restart the API.

### Data appears in the wrong database

Check `server/.env`:

```env
MONGODB_URI=mongodb+srv://.../lindbergh_ultimate?retryWrites=true&w=majority
MONGODB_DB_NAME=lindbergh_ultimate
```

The server logs the database it connects to on startup:

```text
[mongo] connected to lindbergh_ultimate
```

If it says `test`, fix `MONGODB_URI` / `MONGODB_DB_NAME` and restart.

### Port already in use

Vite will normally move to `5174`. If you have an old Vite process from another
copy of the project, stop it before starting this one:

```bash
lsof -nP -iTCP:5173 -sTCP:LISTEN
lsof -nP -iTCP:5050 -sTCP:LISTEN
```

## Before deploying

- Set a strong `JWT_SECRET` and change the seeded admin password.
- Restrict `CORS_ORIGINS` to the production frontend origin.
- Set `VITE_API_URL` to the production API URL.
- Use HTTPS for the API.
- Compress the large images listed in `ASSET_MAP.md`.
- Review the production notes in [`server/README.md`](./server/README.md).
