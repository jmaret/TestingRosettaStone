# Framework & scenario matrix

All listed tools are open source (or have a fully OSS core usable without paid products). Prefer tools with OSI-approved licenses (MIT, Apache-2.0, BSD, GPL where acceptable for demos).

## Categories

| Category | What we demonstrate | What we do *not* require |
|----------|---------------------|---------------------------|
| **Unit** | Pure logic, mocks/stubs, parametrize, coverage basics | Cloud device farms |
| **Integration** | Module + DB/HTTP boundaries, contract-ish checks | Paid API mocking SaaS |
| **UX / E2E** | Browser flows, visual smoke, a11y checks | Proprietary browsers-as-a-service |
| **Performance** | Load/smoke scripts, Lighthouse budgets, microbench | Enterprise APM licenses |

## Framework shortlist (v1)

### Unit

| Tool | Language | License (typical) | Notes |
|------|----------|-------------------|-------|
| [Vitest](https://vitest.dev/) | JS/TS | MIT | Fast; Jest-compatible API |
| [Jest](https://jestjs.io/) | JS/TS | MIT | Industry baseline |
| [node:test](https://nodejs.org/api/test.html) | JS/TS | MIT (Node) | Zero extra deps |
| [pytest](https://pytest.org/) | Python | MIT | Fixtures / parametrize showcase |
| [JUnit 5](https://junit.org/junit5/) | Java | EPL-2.0 | Optional stretch |
| Go `testing` | Go | BSD-style | Optional stretch |

**v1 commit:** Vitest, Jest, `node:test`, pytest.

### Integration

| Tool | Language | Notes |
|------|----------|-------|
| [Supertest](https://github.com/ladjs/supertest) | JS | HTTP against Express/Fastify |
| [Playwright](https://playwright.dev/) APIRequest | JS | API + browser in one toolchain |
| [Testing Library](https://testing-library.com/) | JS | Component integration without full E2E |
| [Testcontainers](https://testcontainers.com/) | Multi | Real Postgres/Redis in Docker (optional CI job) |
| pytest + httpx / requests | Python | API integration twin |

**v1 commit:** Supertest + Testing Library + pytest/httpx. Testcontainers as phase 2 (needs Docker in CI).

### UX / E2E / a11y

| Tool | Notes |
|------|-------|
| [Playwright](https://playwright.dev/) | Primary E2E; OSS; strong traces |
| [Cypress](https://www.cypress.io/) (OSS) | Popular alternative; stay on open-source runner |
| [Selenium](https://www.selenium.dev/) | Classic WebDriver mapping |
| [axe-core](https://github.com/dequelabs/axe-core) | Accessibility assertions (paired with Playwright) |
| [Storybook](https://storybook.js.org/) + interaction tests | Component UX without full app (phase 2) |
| [Pa11y](https://pa11y.org/) | CLI a11y (phase 2) |

**v1 commit:** Playwright + Cypress for `ux.navigate-and-assert` and `ux.form-validation` (live). axe-core and Selenium remain.

### Performance

| Tool | Notes |
|------|-------|
| [k6](https://k6.io/) (OSS) | Load scripts as code; Grafana k6 OSS |
| [Artillery](https://www.artillery.io/) | Node-friendly load tests |
| [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | UX performance budgets |
| [Autocannon](https://github.com/mcollina/autocannon) | Simple HTTP bench |
| [Locust](https://locust.io/) | Python load twin (phase 2) |

**v1 commit:** k6 smoke + Lighthouse CI budget + Autocannon microbench.

## Rosetta scenarios (proposed v1 set)

Each row is one scenario page with ≥2 framework variants.

### Unit

| ID | Concept |
|----|---------|
| `unit.assert-equality` | Basic assertion on a pure function |
| `unit.parametrize` | Same test, many inputs |
| `unit.mock-dependency` | Replace collaborator / spy |
| `unit.async-promise` | Async / await failure paths |
| `unit.coverage-threshold` | Enforce coverage in config (docs + config snippet) |

### Integration

| ID | Concept |
|----|---------|
| `integration.http-get` | Hit real local HTTP handler |
| `integration.db-roundtrip` | Write/read via repository (sqlite in-memory first) |
| `integration.component-user-event` | Testing Library user-event flow |
| `integration.error-contract` | 4xx/5xx JSON shape |

### UX

| ID | Concept |
|----|---------|
| `ux.navigate-and-assert` | Click → URL / heading |
| `ux.form-validation` | Invalid submit shows message |
| `ux.a11y-axe-scan` | axe critical violations = 0 |
| `ux.auth-gated-route` | Redirect when logged out (mock auth) |

### Performance

| ID | Concept |
|----|---------|
| `perf.http-smoke-load` | k6 / Artillery N VUs for 30s, threshold on p95 |
| `perf.lighthouse-budget` | LCP / TBT budgets in CI |
| `perf.microbench-handler` | Autocannon against local API |

## Sample systems under test (SUTs)

Keep SUTs tiny and shared so variants stay comparable.

1. **`samples/js-counter`** — pure functions (unit).
2. **`samples/js-api`** — Express `/health` + `/items/:id` (HTTP integration).
3. **`samples/js-ui`** — static counter + About + Sign up pages (Playwright + Cypress UX).
4. **`samples/python-calc`** — pure calc twin (pytest; Locust later).

## Mapping discipline (“Rosetta rules”)

1. **Same SUT behavior** across variants of a scenario.
2. **Same assertions in spirit** (e.g. equality vs approximate float)—document intentional idiomatic differences.
3. **One primary happy path** per scenario; edge cases link out, don’t clutter the hero comparison.
4. **Runnable** — every variant has a verified `run.cmd` in CI.
5. **License badge** on each framework chip.

## Explicitly out of scope (paid / closed)

- BrowserStack, Sauce Labs, LambdaTest as required runners
- Datadog / New Relic synthetic-only examples
- GitHub Copilot / ChatGPT Plus as the only AI path
- Proprietary test management suites as the source of truth
