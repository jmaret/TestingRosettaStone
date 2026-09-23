# samples/

Shared systems under test (SUTs).

| Sample | Role |
|--------|------|
| `js-counter` | Pure JS helpers (`add`, `clamp`, `priceWithTax`) |
| `python-calc` | Python twin of the same behaviors |
| `js-api` | Tiny Express API (`GET /health`, `GET /items/:id`) for HTTP integration |
| `js-ui` | Static HTML/CSS/JS (counter, About, Sign up) for Playwright + Cypress UX tests |

Keep SUTs tiny so framework comparisons stay fair.
