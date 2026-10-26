# AI Harness 3D Viewer

A minimal, interactive 3D object viewer — drag to rotate, scroll to zoom — built
with Vite, React, TypeScript, and three.js (`@react-three/fiber` / `@react-three/drei`).

**The application is intentionally small.** The point of this repository is the
**harness**: an agent-driven development process with explicit planning, automated
quality gates, and a validation feedback loop. See [`CLAUDE.md`](./CLAUDE.md) for
the full harness contract (agent roles, definition of done, escalation rules).

## Run it

```bash
npm install
npm run dev
```

## Quality gates

```bash
npm run verify    # lint + typecheck + unit tests + build — the single source of truth
npm run test:e2e  # Playwright smoke test against the production build (real WebGL canvas)
```

Both are run in CI on every push/PR (`.github/workflows/ci.yml`), and `npm run verify`
is also run automatically by a Claude Code `Stop` hook (`.claude/settings.json`) once
an agent considers a turn finished.

## Deployment

`main` is auto-deployed to GitHub Pages (`.github/workflows/deploy.yml`) once CI is
green.

## Stack

- Vite + React 19 + TypeScript (strict, project-references build)
- `three` / `@react-three/fiber` / `@react-three/drei`
- ESLint (flat config) + Prettier
- Vitest + React Testing Library (non-WebGL unit tests)
- Playwright (real-browser WebGL/interaction smoke test)
