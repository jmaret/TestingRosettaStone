# Testing Playground

Compare the **same testing concepts** across open-source frameworks — with runnable samples and a zero-cost AI helper grounded in this repo.

## Quick start (macOS)

```bash
mkdir -p ~/Documents/CursorProjects
cd ~/Documents/CursorProjects
git clone https://github.com/jmaret/TestingRosettaStone.git
cd TestingRosettaStone
git checkout cursor/build-phase1-7617   # or main after merge
npm install
python3 -m pip install pytest httpx
npm test
npm run dev
```

Open http://localhost:4321

Absolute path if you use that folder:

`/Users/johnymaret/Documents/CursorProjects/TestingRosettaStone`

## What’s included

| Area | Status |
|------|--------|
| Web app (`apps/web`) | Astro site: home, scenarios, Ask AI, local setup |
| Unit Rosetta scenarios | `unit.assert-equality`, `unit.parametrize`, `unit.mock-dependency` |
| Integration scenarios | `integration.http-get`, `integration.error-contract` |
| Frameworks | Vitest, Jest, `node:test`, pytest, Supertest, Playwright request, httpx |
| Samples | `samples/js-counter`, `samples/python-calc`, `samples/js-api` |
| AI | Corpus FAQ + scenario keyword matcher (no API key) |
| Results panel | CI-cached stdout/stderr beside each scenario (`npm run capture:results`) |
| CI | GitHub Actions (Node 24): validate, `npm test`, capture results, build |
| Hosting | GitHub Pages only after that CI job succeeds on `main` — https://jmaret.github.io/TestingRosettaStone/ |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the site on port 4321 |
| `npm test` | Run unit + integration examples (JS and Python) |
| `npm run capture:results` | Re-run each scenario variant and write static result JSON for the site |
| `npm run build` | Production build of the site |
| `npm run validate:scenarios` | Check scenario JSON + file paths |

## Docs

Planning notes remain in [`docs/plan/`](docs/plan/). Local clone help: [`docs/LOCAL_SETUP.md`](docs/LOCAL_SETUP.md).

Live site (after enabling Pages in repo settings): https://jmaret.github.io/TestingRosettaStone/

## License

MIT
