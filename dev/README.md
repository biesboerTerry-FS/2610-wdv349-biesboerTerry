# Development

The final project lives in [`portfolio/`](./portfolio/). The duplicate legacy
frontend has been removed so there is one source of truth.

## Project

- **Application:** [`dev/portfolio/`](./portfolio/)
- **Frontend README:** [`portfolio/README.md`](./portfolio/README.md)
- **API README:** [`portfolio/server/README.md`](./portfolio/server/README.md)
- **Weekly log:** [`docs/log.md`](../docs/log.md)
- **Research:** [`docs/research/`](../docs/research/)
- **Design notes:** [`docs/designs/`](../docs/designs/)
- **Figma prototype:** [Lindbergh Ultimate design](https://www.figma.com/site/TOze5vN2cIgcQ1yQXx25GB/Lindbergh-Ultimate?node-id=0-1&t=b5QKfFgOkyA7nLAw-1)

## Run

See [`portfolio/README.md`](./portfolio/README.md) for the full frontend and
backend setup. The short version:

```bash
cd portfolio/server
cp .env.example .env
npm ci
npm run seed
npm run dev
```

In a second terminal:

```bash
cd portfolio
npm ci
npm run dev
```

## Repository notes

- `portfolio/` is a normal directory, not a Git submodule.
- Do not commit `node_modules`, `dist`, `.env`, `portfolio.zip`, or generated
  assets. The root and app-level `.gitignore` files cover those paths.
- The app is part of the course repository at `dev/portfolio`.
