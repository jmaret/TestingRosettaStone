# Vision and requirements

**Last updated:** 2026-09-27  
**Status:** Living document — rewrite the current-state sections when the product changes; prepend a changelog entry the same day.

This file is the product contract: who Testing Playground is for, what it must do, and what it must not claim. Implementation detail lives in [ARCHITECTURE.md](ARCHITECTURE.md).

## Vision

Help someone learning or comparing test tools see the same testing idea side by side across open-source frameworks — unit, TDD, BDD, HTTP integration, browser UX, performance, and security — with runnable samples and answers grounded in this repo.

The product is an educational Rosetta site, not a hosted test runner and not a replacement for official framework docs.

## Users

| User | Need |
|------|------|
| Engineer learning a second stack | Open one scenario and switch frameworks without changing the idea |
| Team standardizing or migrating tools | Compare idioms on the same SUT before picking a default |
| Educator or interview coach | Point at a short, parallel example instead of inventing one |
| Maintainer / agent | Keep scenario JSON, samples, and this document honest |

## Goals

1. Compare the same scenario in more than one framework — do not just catalog tools.
2. Cover the testing pyramid and beyond: unit, integration, UX, performance, and security.
3. Use open-source frameworks and a free-to-run hosting path only.
4. Stay at zero cost for the public site: GitHub repo, Actions, and Pages.
5. Answer “how do I do X in Y?” from this corpus, not from generic internet inventiveness.
6. Teach by doing: small samples visitors can clone, plus CI-cached run output on each scenario page.

## Non-goals

Do not claim or implement:

- Paid SaaS test platforms (device clouds, commercial synthetics) as primary examples
- A replacement for official Vitest, Playwright, k6, or other vendor docs
- Running arbitrary visitor code in the browser or through a live execute API
- Multi-tenant accounts, billing, or enterprise SSO
- A complete catalog of every test tool in a language

## Functional requirements

| ID | Requirement | Status |
|----|-------------|--------|
| FR-1 | Home and `/scenarios` list every scenario with category, title, and framework count | Shipped |
| FR-2 | A scenario page shows the idea, then framework tabs with SUT, test files, and CI-cached results | Shipped |
| FR-3 | Each scenario has at least two framework variants and files that exist on disk | Shipped |
| FR-4 | Unit pages cover assert equality, parametrize, and mock a dependency (Vitest, Jest, pytest; node:test on assert) | Shipped |
| FR-5 | TDD is its own page (`unit.tdd-red-green`) on a checkout coupon — red, green, refactor | Shipped |
| FR-6 | BDD is a separate page (`unit.bdd-given-when-then`) on meeting-room reservations with Gherkin | Shipped |
| FR-7 | Integration pages cover HTTP GET and a 404 error contract (SuperTest, Playwright request, pytest + httpx) | Shipped |
| FR-8 | UX pages drive a real browser: navigate-and-assert and empty-form validation (Playwright, Cypress) | Shipped |
| FR-9 | Performance pages smoke-load `/items/1` and microbench `/health` (k6, Artillery, Autocannon) | Shipped |
| FR-10 | Security pages check isolation headers on `/health` and a signup XSS oracle | Shipped |
| FR-11 | Ask AI answers from a local FAQ and scenario keywords with citations — no API key | Shipped |
| FR-12 | Quality page (`/quality`) explains the live CI/CD gates | Shipped |
| FR-13 | Run locally page documents clone, install, `npm test`, and `npm run dev` | Shipped |
| FR-14 | Header shows the current release version; click opens that version’s comments | Shipped |
| FR-15 | Results panel is CI-cached stdout/stderr, not a live runner | Shipped |
| FR-16 | CI validates scenario JSON before tests; Pages deploys only after a green `main` build | Shipped |
| FR-17 | Header Vision link opens a summarized product contract and links to the GitHub document | Shipped |
| FR-18 | Header Architecture link opens logical and physical diagrams with supporting copy | Shipped |
| FR-19 | TDD and BDD pages lead with the story, then how the approach is exercised, then the files | Shipped |

## Non-functional requirements

| ID | Requirement | Status |
|----|-------------|--------|
| NFR-1 | Public site costs $0 on free GitHub tiers | Shipped |
| NFR-2 | Every listed framework is open source or fully usable without paid lock-in | Shipped |
| NFR-3 | No login and no server-side PII | Shipped |
| NFR-4 | Hosted UI must not execute visitor-supplied tests | Shipped |
| NFR-5 | `npm test` is the example gate (unit, HTTP, UX, perf, security) | Shipped |
| NFR-6 | GitHub Pages publishes only the artifact from a green `test-and-build` on `main` | Shipped |
| NFR-7 | Static HTML — no application database | Shipped |

## UX requirements

| ID | Requirement | Status |
|----|-------------|--------|
| UX-1 | Slate ink, teal accent `#0f4c5c`, Source Serif 4 + Source Sans 3 | Shipped |
| UX-2 | Full-page office photo washed so cards stay readable | Shipped |
| UX-3 | Sticky frosted header with brand mark and tagline | Shipped |
| UX-4 | Pages sit in glass workspace cards | Shipped |
| UX-5 | Scenario pages use compact framework tabs and a tool + architecture primer | Shipped |
| UX-6 | Version chip in the header; `/releases` lists past notes | Shipped |
| UX-7 | Vision page summarizes who/what/not, with a GitHub link for the full ID tables | Shipped |
| UX-8 | Architecture page renders living-doc Mermaid with teal-slate theme and a GitHub link | Shipped |
| UX-9 | Header has Scenarios, Ask AI, Vision, Architecture, Quality, and Run locally | Shipped |

## Constraints

- The site compares frameworks; it must not imply it is the official documentation for any of them.
- Answers on Ask AI must cite this repo (FAQ or scenario ids) or refuse.
- The public site is served at the custom-domain root (`https://test-play-ground.aathira-services.com`). Production `base` is `/`.
- Cached Results logs are only as fresh as the last successful `capture:results` on `main`.

## Changelog

### 2026-10-03 — Custom domain at the site root

- Production no longer prefixes URLs with `/TestingRosettaStone`. That prefix 404s CSS, images, and links on the custom domain.

### 2026-09-27 — Vision and Architecture pages

- Added FR-17, FR-18, UX-7, UX-8, UX-9: `/vision` and `/architecture` summarize these living docs.
- Rewrote this file as the product contract (who, what, not, requirement IDs).
