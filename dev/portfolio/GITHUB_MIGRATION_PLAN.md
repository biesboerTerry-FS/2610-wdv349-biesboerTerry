# GitHub Migration Plan

Goal: move the Lindbergh Ultimate project into a clean folder and publish it to
GitHub without committing dependencies, build output, or secrets.

The project is **not currently a Git repository**. The commands below create a
new repository from scratch.

> **Safety first:** `server/.env` contains your real Atlas connection string.
> It is already ignored by Git, but do not copy it into a public place or paste
> it into a commit. If a secret is ever committed, rotate it immediately.

---

## 0. Prerequisites

You need:

- macOS/Linux shell (these commands use `zsh`/`bash`)
- Git 2.28+ (this machine has Git 2.54)
- Node.js 20+ and npm
- A GitHub account
- Optional: GitHub CLI (`gh`) for creating the repository from the terminal

Check the basics:

```bash
git --version
node --version
npm --version
```

If `gh` is missing, install it with Homebrew:

```bash
brew install gh
gh --version
```

If you do not have Homebrew, create the repository in the GitHub web UI instead
(see Step 7B).

---

## 1. Set the old and new paths

Choose the new location. The example uses `~/git/lindbergh-ultimate`; change it
if you prefer a different folder name.

```bash
OLD="$HOME/git/lindberghUltimateSite/lindberghUltimateFrisbee"
NEW="$HOME/git/lindbergh-ultimate"

echo "Old: $OLD"
echo "New: $NEW"
```

Confirm the old folder exists and the new one does **not** already contain a
project:

```bash
ls "$OLD"
ls "$NEW" 2>/dev/null || echo "New folder does not exist yet (good)"
```

If `$NEW` already exists and has files, choose another name or back it up first.

---

## 2. Create a clean copy (recommended)

Copy only the source, docs, and lockfiles. Leave behind `node_modules`, `dist`,
build junk, `.DS_Store`, local tool state, and secrets.

```bash
mkdir -p "$NEW"

rsync -av --progress \
  --exclude 'node_modules/' \
  --exclude 'server/node_modules/' \
  --exclude 'dist/' \
  --exclude '.git/' \
  --exclude '.DS_Store' \
  --exclude '.freebuff/' \
  --exclude '.env' \
  --exclude 'server/.env' \
  "$OLD/" "$NEW/"
```

The trailing slash on `"$OLD/"` is important: it copies the **contents** of the
old folder into the new folder.

### Copy your local secrets separately (optional but convenient)

The app needs `server/.env` to run. It is ignored by Git, so copying it locally
is safe:

```bash
# Only if the old file exists
if [ -f "$OLD/server/.env" ]; then
  cp "$OLD/server/.env" "$NEW/server/.env"
  chmod 600 "$NEW/server/.env"
fi

# Optional frontend override
if [ -f "$OLD/.env" ]; then
  cp "$OLD/.env" "$NEW/.env"
fi
```

If you prefer to recreate it:

```bash
cd "$NEW/server"
cp .env.example .env
# Edit .env and set MONGODB_URI, MONGODB_DB_NAME, JWT_SECRET,
# SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD.
```

At minimum, `server/.env` should contain:

```env
PORT=5050
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/lindbergh_ultimate?retryWrites=true&w=majority
MONGODB_DB_NAME=lindbergh_ultimate
JWT_SECRET=replace-with-a-long-random-string
SEED_ADMIN_EMAIL=admin@lindberghultimate.com
SEED_ADMIN_PASSWORD=ChangeMe123!
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174
```

Do not commit this file. The root `.gitignore` and `server/.gitignore` already
exclude `.env`, `.env.*` (except `.env.example`), `node_modules`, `dist`, and
`.DS_Store`.

---

## 3. Verify the clean copy before touching Git

```bash
cd "$NEW"

# These should NOT be present in the new folder:
find . -maxdepth 3 \( -name node_modules -o -name dist -o -name '.env' \) -print

# Confirm the important files came across:
ls -la
ls -la server
test -f package-lock.json && echo "frontend lockfile: yes"
test -f server/package-lock.json && echo "backend lockfile: yes"
test -f ASSET_MAP.md && echo "asset map: yes"
test -f GITHUB_MIGRATION_PLAN.md && echo "migration plan: yes"
```

If the new folder looks right, you can keep the old folder as a backup until
the new copy has been verified end-to-end.

---

## 4. Initialize Git

```bash
cd "$NEW"

git init -b main
```

Set your Git identity if it is not already configured. Use your real name and
the email associated with GitHub:

```bash
git config --get user.name
git config --get user.email

# If either is blank:
git config user.name "Your Name"
git config user.email "you@example.com"
```

Using `git config` without `--global` sets the identity only for this repo,
which is the safer default.

---

## 5. Review what will be committed

Before staging, check the ignore rules:

```bash
git status --short
git check-ignore -v server/.env
git check-ignore -v node_modules
git check-ignore -v dist
```

Expected:

- `server/.env` is ignored.
- `node_modules` is ignored.
- `dist` is ignored.
- `.env.example` is **not** ignored.

Stage everything:

```bash
git add .
git status --short
```

Now verify no secrets or dependencies were staged:

```bash
# Should print nothing except .env.example paths, if anything:
git ls-files | grep -E '(^|/)\.env($|\.)|node_modules/|(^|/)dist/' | grep -v '\.env\.example' || true

# Inspect the staged diff summary:
git diff --cached --stat
```

If `server/.env` or `node_modules` appears, unstage it before committing:

```bash
git rm --cached server/.env
git rm -r --cached node_modules server/node_modules dist 2>/dev/null || true
git status --short
```

Also check for unexpectedly large files:

```bash
git ls-files -z | xargs -0 du -h | sort -h | tail -20
```

The remaining images in `ASSET_MAP.md` are large but intentional. The duplicate
and unused gallery assets have already been removed; if you want a smaller
repository, compress `circle.png`, `dave.png`, `welcome.png`, and `swag.png`
before running `git add .`.

---

## 6. Make the first commit

```bash
git commit -m "Initial commit: Lindbergh Ultimate website"
```

Check it:

```bash
git log --oneline --decorate -1
git status
```

---

## 7. Create the GitHub repository and push

### Option A — GitHub CLI (recommended if `gh` is installed)

Authenticate once:

```bash
gh auth login
gh auth setup-git
```

Choose GitHub.com, HTTPS, and login with a browser or a personal access token.

Create the repository and push in one step. Replace `lindbergh-ultimate` if you
want a different repo name:

```bash
cd "$NEW"
REPO_NAME="lindbergh-ultimate"

gh repo create "$REPO_NAME" --private --source=. --remote=origin --push
```

Use `--public` instead of `--private` if you want a public repository.

If the repository should belong to an organization:

```bash
gh repo create "YOUR-ORG/lindbergh-ultimate" --private --source=. --remote=origin --push
```

Verify:

```bash
git remote -v
git branch -vv
gh repo view --web
```

### Option B — GitHub web UI (no `gh` required)

1. Open <https://github.com/new>.
2. Choose an owner and repository name (for example `lindbergh-ultimate`).
3. Choose **Private** or **Public**.
4. Do **not** initialize with a README, `.gitignore`, or license — the local
   repo already has them.
5. Click **Create repository**.
6. Copy the repository URL and run one of the following:

HTTPS:

```bash
cd "$NEW"
git remote add origin https://github.com/USERNAME/lindbergh-ultimate.git
git push -u origin main
```

SSH:

```bash
cd "$NEW"
git remote add origin git@github.com:USERNAME/lindbergh-ultimate.git
git push -u origin main
```

If `origin` already exists:

```bash
git remote set-url origin https://github.com/USERNAME/lindbergh-ultimate.git
git push -u origin main
```

### If the push is rejected

If GitHub already has commits (for example, you initialized it with a README):

```bash
git pull --rebase origin main
git push -u origin main
```

If Git asks for a password over HTTPS, GitHub no longer accepts account
passwords. Use a personal access token (PAT) as the password, or switch to SSH:

```bash
git remote set-url origin git@github.com:USERNAME/lindbergh-ultimate.git
git push -u origin main
```

---

## 8. Verify the published repository

```bash
cd "$NEW"

git status
git log --oneline --decorate -5
git remote -v
git ls-remote origin
```

Open the repository:

```bash
gh repo view --web
# or
open "https://github.com/USERNAME/lindbergh-ultimate"
```

Check on GitHub that:

- `README.md`, `ASSET_MAP.md`, `GITHUB_MIGRATION_PLAN.md`, `src/`, `public/`,
  and `server/` are present.
- `node_modules/`, `dist/`, `.env`, and `server/.env` are **not** present.
- `server/.env.example` and `.env.example` are present.
- Both `package-lock.json` files are present.

---

## 9. Reinstall and run from the new folder

Because dependencies were intentionally excluded, reinstall with the lockfiles:

```bash
cd "$NEW"

# Frontend
npm ci

# Backend
cd "$NEW/server"
npm ci
```

Make sure `server/.env` exists and points at the right Atlas database:

```bash
cd "$NEW/server"
grep -E '^(MONGODB_URI|MONGODB_DB_NAME|PORT|CORS_ORIGINS)=' .env
```

Do not print the full `MONGODB_URI` in a shared terminal or screenshot; it
contains the database password.

Start the API:

```bash
cd "$NEW/server"
npm run dev
```

In a second terminal, start the frontend:

```bash
cd "$NEW"
npm run dev
```

Open:

- <http://localhost:5173>
- <http://localhost:5173/admin/login>
- <http://localhost:5050/api/health>

Log in with the seeded admin account. If you changed the password, use the new
one. If the database is empty, run:

```bash
cd "$NEW/server"
npm run seed
```

---

## 10. Keep working in the new folder

Daily workflow:

```bash
cd "$NEW"
git status
git add .
git commit -m "Describe the change"
git push
```

Useful checks before every push:

```bash
cd "$NEW"
npm run lint
npm run build
cd server && npm run lint && npm run check
```

---

## 11. Optional: remove the old folder

Only do this after the new folder runs, the admin login works, and the GitHub
push is verified. Keep a backup until then.

```bash
# Preview first:
du -sh "$OLD"

# Then remove (destructive):
# rm -rf "$OLD"
```

---

## 12. After the repository is on GitHub

### Protect your secrets

- `server/.env` stays local. Never add it to Git.
- Change the default admin password (`ChangeMe123!`) before deploying.
- Set a long random `JWT_SECRET` for production.
- Rotate the Atlas database password if it was ever pasted into a commit,
  screenshot, issue, or chat.
- If a secret was committed and pushed, rotate it **first**, then remove it from
  history with `git filter-repo` or the BFG Repo-Cleaner. A normal delete commit
  does not remove it from history.

### Suggested repository settings

- Add a short description: “Lindbergh Ultimate website and admin API.”
- Add topics: `react`, `vite`, `express`, `mongodb`, `ultimate-frisbee`.
- Keep the repo private until you have reviewed the image assets, coach
  photos, and any personal contact information in the code.
- Add branch protection for `main` if other people will contribute.

### Deployment shape

This is a two-part app, so GitHub Pages alone is not enough:

| Piece | Suggested host |
| --- | --- |
| React/Vite frontend | Netlify, Vercel, Cloudflare Pages, or GitHub Pages |
| Express API | Render, Railway, Fly.io, or a VPS |
| Database | MongoDB Atlas |

When deploying, set:

```env
# Frontend build environment
VITE_API_URL=https://api.your-domain.com/api
```

```env
# API environment
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
MONGODB_DB_NAME=lindbergh_ultimate
JWT_SECRET=<long-random-value>
CORS_ORIGINS=https://your-frontend-domain.com
```

Then update the Atlas **Network Access** allow-list for the API host if your
provider uses static outbound IPs.

---

## Command cheat sheet

```bash
# 1. Paths
OLD="$HOME/git/lindberghUltimateSite/lindberghUltimateFrisbee"
NEW="$HOME/git/lindbergh-ultimate"

# 2. Clean copy
mkdir -p "$NEW"
rsync -av --progress \
  --exclude 'node_modules/' \
  --exclude 'server/node_modules/' \
  --exclude 'dist/' \
  --exclude '.git/' \
  --exclude '.DS_Store' \
  --exclude '.freebuff/' \
  --exclude '.env' \
  --exclude 'server/.env' \
  "$OLD/" "$NEW/"

# 3. Copy local secrets separately (never commit)
cp "$OLD/server/.env" "$NEW/server/.env"
chmod 600 "$NEW/server/.env"

# 4. Git init + first commit
cd "$NEW"
git init -b main
git config user.name "Your Name"
git config user.email "you@example.com"
git add .
git status --short
git commit -m "Initial commit: Lindbergh Ultimate website"

# 5. Create GitHub repo + push (GitHub CLI)
gh auth login
gh auth setup-git
gh repo create lindbergh-ultimate --private --source=. --remote=origin --push

# 6. Verify
git remote -v
git log --oneline --decorate -5
gh repo view --web

# 7. Reinstall dependencies
npm ci
cd server && npm ci && npm run dev

# 8. Run frontend in another terminal
cd "$NEW"
npm run dev
```
