# examples/

Side-by-side framework variants, grouped by category.

## Unit (live)

| Scenario | Frameworks |
|----------|------------|
| `assert-equality/` | Vitest, Jest, node:test, pytest |
| `parametrize/` | Vitest, Jest, pytest |
| `mock-dependency/` | Vitest, Jest, pytest |

Each folder has a `scenario.json` plus one subdirectory per framework.

Scenario pages show a **tool + architecture primer** (from `apps/web/src/lib/tools.ts` and `architecture` on the scenario) before the SUT, test, and cached results.

## Integration (live)

| Scenario | Frameworks |
|----------|------------|
| `http-get/` | Supertest, Playwright request, pytest + httpx |
| `error-contract/` | Supertest, Playwright request, pytest + httpx |

## UX (live)

| Scenario | Frameworks |
|----------|------------|
| `navigate-and-assert/` | Playwright (browser), Cypress |
| `form-validation/` | Playwright (browser), Cypress |

Each variant starts `samples/js-ui` and drives a real browser. CI installs Chromium for Playwright; Cypress uses its bundled Electron runner.

## Performance (live)

| Scenario | Frameworks |
|----------|------------|
| `http-smoke-load/` | k6, Artillery |
| `microbench-handler/` | Autocannon, k6 |

Each variant starts `samples/js-api` and generates a short burst of HTTP. Thresholds on error rate and high-percentile latency fail the process. CI installs the k6 binary; Artillery and Autocannon come from npm. Duration stays a few seconds so CI stays cheap.

## Security (live)

| Scenario | Frameworks |
|----------|------------|
| `http-headers/` | Supertest, Playwright request, pytest + httpx |
| `xss-escape/` | Playwright (browser), Cypress |

Header checks assert isolation headers on `samples/js-api`. XSS checks drive `samples/js-ui` and prove a script-like name is assigned with `textContent`.
