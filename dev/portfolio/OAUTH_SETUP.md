# Google / Apple OAuth setup

Sign-in with Google and Apple works for **both audiences**:

- **Public visitors** (`/login`, `/account`): email is enough; an account is
  created automatically on first sign-in. No passwords.
- **Admin Panel** (`/admin/login`): email/password still works. OAuth also
  works, but only for emails that already exist as a staff `User`, or that are
  listed in `ADMIN_OAUTH_ALLOWLIST` (or match `SEED_ADMIN_EMAIL`). Anyone else
  sees “This email is not authorized for the admin panel.”

The flow is a standard Authorization Code + PKCE redirect through the API:

```text
Browser ( /login, /admin/login )
  → GET /api/auth/oauth/:provider/start?audience=public|admin&returnTo=/account
  → API sets state cookie, redirects to Google/Apple
  → Provider redirects to /api/auth/oauth/:provider/callback (code)
  → API exchanges code, verifies id_token (JWKS), creates/links user
  → API redirects to <FRONTEND_URL>/auth/callback#token=…&audience=…&returnTo=…
  → /auth/callback stores the JWT and navigates to returnTo
```

Apple needs `response_mode=form_post`, so the callback accepts both `GET`
(Google) and `POST` (Apple).

## 1. Google Cloud Console

1. Create a project at <https://console.cloud.google.com>.
2. **APIs & Services → Credentials → Create Credentials → OAuth client ID**
   (type **Web application**).
3. **Authorized redirect URIs** (use your production API domain):
   - `http://localhost:5050/api/auth/oauth/google/callback` (local dev)
   - `https://<api-domain>/api/auth/oauth/google/callback` (production)
4. Copy the **Client ID** and **Client secret** into the API env (Vercel or
   `server/.env`): `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
5. No special consent-screen scopes are needed; the app requests
   `openid profile email`.

## 2. Apple Developer

1. Go to <https://developer.apple.com> → **Identifiers**.
2. Enable **Sign in with Apple** for your App ID, and create a **Services ID**
   (e.g. `com.example.lindbergh.web`). Note its ID — that is
   `APPLE_CLIENT_ID`.
3. Set the Services ID **Return URLs** to:
   - `https://<api-domain>/api/auth/oauth/apple/callback`
   (Local `http://localhost…` cannot be used for Apple web flow; test Apple in
   production or via a tunnel that gives you an HTTPS domain.)
4. **Keys → Create a key** → enable **Sign in with Apple**. Download the
   `.p8` file (you can only download it once). Note:
   - **Key ID** → `APPLE_KEY_ID`
   - **Team ID** (top-right of the developer portal) → `APPLE_TEAM_ID`
   - **`.p8` contents** → paste into `APPLE_PRIVATE_KEY` (real newlines are
     fine; escaped `\n` and base64 are also accepted). Locally you can instead
     set `APPLE_PRIVATE_KEY_PATH=/path/to/AuthKey_XXXX.p8`.

## 3. API environment variables

Set these on `server/.env` locally, and in **Vercel → API project
(`fast-cyclone-ney3302`) → Settings → Environment Variables** for production:

```env
# Frontend / API public URLs (required for OAuth redirects)
FRONTEND_URL=https://<frontend-domain>
API_PUBLIC_URL=https://<api-domain>

# Google
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Apple
APPLE_CLIENT_ID=com.example.lindbergh.web
APPLE_TEAM_ID=...
APPLE_KEY_ID=...
APPLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...

# Staff allowlist (comma-separated, lowercase). Existing staff users can
# always link; SEED_ADMIN_EMAIL is always allowed.
ADMIN_OAUTH_ALLOWLIST=you@example.com,coach@example.com

# Already required
JWT_SECRET=<long-random-string>
MONGODB_URI=mongodb+srv://...
MONGODB_DB_NAME=lindbergh_ultimate
CORS_ORIGINS=https://<frontend-domain>
```

The frontend needs **no** OAuth vars — buttons appear only for providers the
API reports as enabled (`GET /api/auth/oauth/providers`).

## 4. Vercel deploy + Mongo

1. **API project**: add the vars above, then **Redeploy**.
2. **Frontend project** (`lindberghultimatefrisbee`): no new vars needed
   unless you change `VITE_API_URL`. **Redeploy** so the new `/login`,
   `/account`, `/auth/callback` routes ship.
3. Verify in the deployed API:
   ```bash
   curl https://<api-domain>/api/auth/oauth/providers
   # → { "success": true, "data": { "enabled": true, "providers": [...] } }
   ```
4. **Mongo**: no manual migration needed. The `PublicUser` collection and
   `User.providers[]` are created automatically on first OAuth login (new
   indexes are built on startup). Confirm the API log says
   `[mongo] connected to lindbergh_ultimate`. If the wrong DB is selected,
   fix `MONGODB_URI` / `MONGODB_DB_NAME` in Vercel and redeploy the API.
5. If your admin email changed, run `npm run seed:admin` (locally or in a
   one-off deploy job) so `User` matches `SEED_ADMIN_EMAIL`, then sign in
   with Google/Apple using that same email.

## Local development

```bash
cd portfolio/server
cp .env.example .env   # fill in GOOGLE_*/APPLE_*/FRONTEND_URL
npm install            # pulls in `jose` for JWT verification
npm run dev            # http://localhost:5050

cd ../
npm install
npm run dev            # http://localhost:5173
```

- Google works locally over `http://localhost:5050`.
- Apple web flow requires HTTPS, so use a tunnel (e.g. ngrok / Cloudflare
  tunnel) or test Apple in production.
- Open <http://localhost:5173/login> and <http://localhost:5173/admin/login>
  to see the Google/Apple buttons.

## Security notes

- State + PKCE verifier live in an HttpOnly signed cookie
  (`lu_oauth_state`, 10 min, `SameSite=Lax`).
- `id_token`s are verified against Google/Apple JWKS with issuer + audience
  checks; only `email`-verified accounts can access the admin panel.
- Staff and public JWTs carry a `kind` claim (`admin` vs `public`) and are
  rejected cross-audience (`authenticate` vs `authenticatePublic`).
- JWTs are returned in a URL **fragment** (`#token=`) so they never hit
  server logs or the API.

## Troubleshooting

- **Buttons say “isn’t configured yet”** → the API has no
  `GOOGLE_CLIENT_ID`/`APPLE_*` vars (or the frontend `VITE_API_URL` points at
  the wrong API). Check `GET /api/auth/oauth/providers`.
- **Redirect mismatch** → the callback URL in Google/Apple consoles must
  exactly match `API_PUBLIC_URL + /api/auth/oauth/<provider>/callback`.
- **Admin: “not authorized”** → add your email to `ADMIN_OAUTH_ALLOWLIST` in
  the API env and redeploy, or create the user via `/admin/users` (admin
  role) first, then link with OAuth.
- **`login failed` after Apple consent** → Apple only sends `user`/`name`
  once; subsequent logins fall back to the email prefix. Check
  `APPLE_PRIVATE_KEY` parses as PKCS#8.
