# Implementation roadmap

Phased delivery. Prefer vertical slices (one scenario fully comparable) over broad empty catalogs.

## Phase 0 — Planning & skeleton (this PR)

- [x] Vision, architecture, matrix, zero-cost/AI notes
- [ ] Repo skeleton (`apps/`, `samples/`, `examples/`, content schema)
- [ ] Root README that states goals and how to contribute scenarios
- [ ] MIT `LICENSE`

## Phase 1 — Content foundation

1. Define JSON Schema / Zod schema for `Scenario`.
2. Add shared SUT: `samples/js-counter` (pure `add` / `clamp`).
3. Ship **3 unit scenarios** with Vitest + Jest + pytest variants:
   - `unit.assert-equality`
   - `unit.parametrize`
   - `unit.mock-dependency`
4. Static site that lists scenarios and renders side-by-side code (Astro or Next) **plus a Results panel** from CI-cached logs.
5. GitHub Actions: install + run those sample tests + `capture:results` into `apps/web/public/results/` before build. Public `/quality` page documents the live gates.

**Exit:** Visitor can open a scenario page, compare frameworks, and see the last CI run output without executing locally.

## Phase 2 — Integration + UX

1. Add `samples/js-api` (minimal HTTP API) and `samples/js-ui` (static counter + signup).
2. Scenarios: `integration.http-get`, `integration.error-contract` (HTTP slice live); `integration.component-user-event` next.
3. Playwright + Cypress for `ux.navigate-and-assert` and `ux.form-validation` (live).
4. axe-core paired with Playwright (`ux.a11y-axe-scan`).
5. Pagefind search over scenario titles/tags.
6. Security: `security.http-headers` and `security.xss-escape` (live).

**Exit:** Unit → integration → UX path exists for one product story (counter or TODO). HTTP + browser slices are live; axe and component-user-event remain. Security headers + XSS-escape are live.

## Phase 3 — Performance + AI FAQ

1. k6 + Artillery smoke load and Autocannon + k6 microbench (live); Lighthouse CI budget next.
2. Phase-A AI: static FAQ / keyword assistant (no API key) (live).
3. Precompute embeddings in CI; document Worker `/api/ask` opt-in.
4. “Ask about this scenario” UI wired to FAQ, then RAG when secrets present.

**Exit:** Perf examples green in CI; AI answers cite scenario ids without a paid plan. Smoke load + microbench and the FAQ matcher are live; Lighthouse and embeddings remain.

## Phase 4 — Breadth & polish

1. Selenium twin for one UX scenario; Locust twin for one perf scenario.
2. Testcontainers optional job; Storybook interaction tests.
3. Browser-local WebLLM offline mode.
4. Contribution guide + scenario template (“add a framework variant in 15 minutes”).
5. Accessibility and performance pass on the *documentation site itself*.
6. Public `/quality` page for CI/CD gates (live).

## Phase 5 — Stretch

- Java (JUnit) / Go unit twins
- Locust Python load twin
- Visual regression with OSS baselines (e.g. Playwright screenshots + careful CI artifacts)
- i18n of concept blurbs

## Build order rules

1. Never add a framework without a **paired scenario** already existing in another framework.
2. Never add AI features that require a paid API as the only path.
3. Prefer fixing SUT clarity over adding more frameworks.
4. Keep the first viewport of the marketing/home page brand-first and uncluttered (see project design rules when implementing UI).

## Decision log (initial)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Primary web stack | Astro + MDX (preferred) | Content-heavy, static, free host |
| Primary demo language | TypeScript | Largest overlap of OSS web test tools |
| Second language | Python | pytest + future Locust; low cost to show “Rosetta” across languages |
| AI v1 | FAQ matcher → RAG on free LLM | Ships without keys; upgrades without rewrite |
| Hosting | GitHub Pages | $0 static host; deploy from CI only after tests pass on `main` |
