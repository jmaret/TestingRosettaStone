# examples/

Side-by-side framework variants, grouped by category.

## Unit (live)

| Scenario | Frameworks |
|----------|------------|
| `assert-equality/` | Vitest, Jest, node:test, pytest |
| `parametrize/` | Vitest, Jest, pytest |
| `mock-dependency/` | Vitest, Jest, pytest |

Each folder has a `scenario.json` plus one subdirectory per framework.

## Integration (live)

| Scenario | Frameworks |
|----------|------------|
| `http-get/` | Supertest, Playwright request, pytest + httpx |
| `error-contract/` | Supertest, Playwright request, pytest + httpx |
