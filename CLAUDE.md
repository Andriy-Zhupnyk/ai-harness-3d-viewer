# CLAUDE.md — Project Instructions

This file is the harness contract for this repository. It is read by Claude Code at
the start of every session and defines how work here is planned, implemented, and
validated. Treat it as binding unless the user explicitly overrides a rule.

## What this project is

A minimal, interactive 3D object viewer (Vite + React + TypeScript + three.js via
`@react-three/fiber`/`@react-three/drei`). Users drag to rotate and scroll to zoom
a 3D object, picked from a small panel. The application itself is intentionally
small — the primary deliverable being evaluated is **this harness**: how agents
plan, implement, and validate changes autonomously.

## Stack & structure

- Vite + React 19 + TypeScript (strict, project-references build via `tsc -b`).
- `three` / `@react-three/fiber` / `@react-three/drei` for the 3D scene.
- ESLint (flat config) + Prettier for style/correctness gates.
- Vitest + React Testing Library + jsdom for **non-WebGL** unit tests.
- Playwright (real Chromium) for the WebGL/interaction smoke test — jsdom cannot
  create a WebGL context, so anything involving the `<canvas>` is verified there,
  not in Vitest.

```
src/
  models/
    index.ts              MODELS registry (id/label/Component) — single source
                           of truth for Scene and ObjectPicker
    TorusKnot.tsx          3D mesh, uses useIdleSpin
    House.tsx              3D mesh, uses useIdleSpin
    useIdleSpin.ts         shared idle-rotation hook (mesh/group ref)
  components/
    Scene.tsx              <Canvas> + lighting + OrbitControls + active model
    ObjectPicker.tsx       UI panel to switch models (unit-testable, no WebGL)
    InfoOverlay.tsx        UI text overlay (unit-testable, no WebGL)
    ViewerDebugBridge.tsx  exposes window.__viewerDebug for e2e assertions
  App.tsx                  owns the selected ModelId state
tests/
  unit/        Vitest + RTL (non-WebGL components/logic only)
  e2e/         Playwright (real browser, real WebGL canvas)
```

Adding another object means adding one file under `src/models/` and one entry
in `src/models/index.ts` — `Scene`/`ObjectPicker` need no changes.

## Agent roles (how work happens here)

This harness separates a **rare, expensive planning step** from a **frequent,
cheap, deterministic verification loop**:

1. **Planner** — Claude Code Plan Mode. Used once per non-trivial feature/change
   to decompose the work and get explicit user sign-off before touching files.
   Not re-invoked for every small fix.
2. **Implementer** — the main agent loop. Writes code for one step of the plan at
   a time.
3. **Gates** (deterministic, no planner involved) — `npm run verify`
   (lint → typecheck → unit test → build). This is the single source of truth for
   "is this green" and is run automatically by the `Stop` hook in
   `.claude/settings.json` **when the agent considers a turn finished**, not after
   every single edit — small intermediate edits should not pay for a full
   lint+test+build cycle each time. If `verify` fails, the hook blocks completion
   and the agent keeps fixing instead of stopping.
4. **Reviewer** — run the `code-review` skill against the diff before considering
   a feature done. This is a "softer" gate for quality/duplication/simplification
   issues that `verify` cannot catch.
5. **Escalation** — if `verify`/Reviewer keep failing after a few fix attempts, or
   the failure reveals the *approach* is wrong (not just a typo), re-enter Plan
   Mode to revise the plan. Do not loop indefinitely on mechanical fixes.

## Definition of done

A change is "done" only when **all** of the following hold:

- `npm run verify` passes locally (lint, typecheck, unit tests, build).
- `npm run test:e2e` passes (Playwright smoke test against the production build).
- `code-review` skill run against the diff reports no unresolved
  correctness-level findings.
- No `--no-verify`, no skipped tests, no commented-out failing assertions, no
  disabling of lint/type rules to "make it pass" — fix the underlying issue.

## Conventions

- No comments explaining *what* code does — only ever explain *why* when a
  constraint is non-obvious (see root-level agent instructions). This file is the
  exception, since it *is* documentation.
- Keep components small and colocated under `src/components/`; one concern per
  file.
- WebGL/canvas behavior is verified in Playwright, never mocked in Vitest.
- Prefer `@react-three/drei` helpers over hand-rolled three.js boilerplate.
- Do not add dependencies, abstractions, or configuration options the current
  scope does not need.

## CI

`.github/workflows/ci.yml` mirrors `npm run verify` plus the Playwright suite on
every push/PR — it is the independent, non-bypassable copy of the same gate.
`.github/workflows/deploy.yml` builds and publishes `main` to GitHub Pages after
CI is green.
