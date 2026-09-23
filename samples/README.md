# samples/

Shared systems under test (SUTs).

| Sample | Role |
|--------|------|
| `js-counter` | Pure JS helpers (`add`, `clamp`, `priceWithTax`) |
| `python-calc` | Python twin of the same behaviors |
| `js-api` | Tiny Express API (`GET /health`, `GET /items/:id`) plus isolation headers for HTTP, load, and security |
| `js-ui` | Static HTML/CSS/JS (counter, About, Sign up) for UX and XSS-escape tests |

Keep SUTs tiny so framework comparisons stay fair.
