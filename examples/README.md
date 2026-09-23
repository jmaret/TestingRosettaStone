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
