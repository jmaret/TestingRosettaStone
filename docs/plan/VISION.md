# Testing Rosetta Stone — Vision

## Problem

Teams choose testing tools by habit, language, or job posting requirements—not by comparing how the *same* testing idea looks across frameworks. Documentation is siloed: Jest tutorials do not show the Vitest or pytest equivalent; Playwright guides rarely map concepts to Cypress or Selenium. Newcomers struggle to answer: “What is the unit / integration / UX / performance version of this check?”

## Product thesis

**Testing Rosetta Stone** is a free, open-source web app that shows the *same* testing scenarios side by side across frameworks—like a language Rosetta Stone—plus runnable samples and an AI helper grounded in those examples.

## Goals

1. **Compare, don’t just catalog** — Same scenario (e.g. “assert a pure function”, “mock an HTTP client”, “click a button and check URL”) rendered in multiple frameworks.
2. **Cover the testing pyramid & beyond** — Unit, integration, UX/E2E (including accessibility), and performance.
3. **Open source only** — Every framework, library, runner, and hosting/AI path must be FOSS or free-to-use without paid lock-in.
4. **Zero cost to run & host** — Public GitHub repo, free CI, free static/edge hosting, free-tier or fully local AI.
5. **AI that answers from our corpus** — Questions about “how do I do X in Y?” answered from curated examples and docs, not generic internet inventiveness.
6. **Teach by doing** — Small sample apps with real tests that visitors can clone and run locally.

## Non-goals (v1)

- Paid SaaS test platforms (BrowserStack, Sauce Labs, Datadog Synthetics, etc.) as primary examples.
- Replacing official framework docs.
- Running arbitrary user code in the browser (security / cost risk).
- Multi-tenant accounts, billing, or enterprise SSO.

## Success criteria

| Signal | Target |
|--------|--------|
| Scenario coverage | ≥ 12 Rosetta scenarios spanning unit → performance |
| Frameworks | ≥ 3 tools per category (unit, integration, UX, performance) |
| Cost | $0 infra for public deployment on free tiers |
| AI | Answers cite example IDs / file paths from this repo |
| Local DX | `npm install && npm test` (or language-equivalent) works for sample suites |

## Audience

- Engineers learning a second testing stack
- Teams standardizing or migrating frameworks
- Educators and interview coaches needing parallel examples
- AI-assisted learners who want grounded, copy-pasteable answers
