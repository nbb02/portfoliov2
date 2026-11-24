# Portfolio

Personal portfolio for Nathaniel Berres. React + TypeScript + Vite, with a
paper/ink/teal visual system, 3D hero, scroll-driven journey, and project case
studies.

## Routes

- `/` — v2 home
- `/projects` — project index + case studies (`client-portal`, `logistics`,
  `vitech`, `load-balancer-monitoring`, `finance`, `huntxp`,
  `recycling-platform`, `virtual-office`, `printset`)
- `/references` — credits and asset licenses
- `/v1` — preserved v1 portfolio
- `/desktop` — 3D desktop easter egg
- `/stats` — visitor dashboard, **dev-only**

## Setup

```bash
npm install
npm run dev
```

The Firebase web config lives in `src/lib/firebaseConfig.ts`. It is public by
design (it ships in the client bundle); security is enforced with Firestore
rules, App Check, and API-key restrictions. Keeping it in version control means
the build works on a fresh clone and in CI with no extra setup.

## Scripts

```bash
npm run dev      # Vite dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
npm run lint     # ESLint
npm run deploy   # build, then commit + push dist/ to nbb02.github.io
```

## Deploy

`dist/` is intentionally its own git repo pointing at
`https://github.com/nbb02/nbb02.github.io.git`, because that is the user-site
repo GitHub Pages serves at the domain root. The parent repo ignores `dist/`,
so the source and deploy histories stay separate.

`npm run deploy` builds the site, commits the output inside `dist/`, and pushes
`main`. GitHub Pages then serves it at `https://nbb02.github.io/`.

## Notes

- The app uses `HashRouter`, so routes are served as `/#/projects/...`. This
  keeps static hosting simple but is not ideal for SEO.
- 3D route chunks (`three`, the journey, the hero laptop/Rubik's cube) are
  lazy-loaded.
- `.local/` holds private working notes (`HANDOFF.md`, `crm.md`, mocks) and is
  git-ignored.
