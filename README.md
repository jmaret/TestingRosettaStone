# Testing Rosetta Stone

Compare the **same testing concepts** across open-source frameworks — with runnable samples and a zero-cost AI helper grounded in this repo.

## Quick start (macOS)

```bash
mkdir -p ~/Documents/CursorProjects
cd ~/Documents/CursorProjects
git clone https://github.com/jmaret/TestingRosettaStone.git
cd TestingRosettaStone
git checkout cursor/build-phase1-7617   # or main after merge
npm install
python3 -m pip install pytest
npm test
npm run dev
```

Open http://localhost:4321

Absolute path if you use that folder:

`/Users/johnymaret/Documents/CursorProjects/TestingRosettaStone`

## What’s included (Phase 1)

| Area | Status |
|------|--------|
| Web app (`apps/web`) | Astro site: home, scenarios, Ask AI, local setup |
| Unit Rosetta scenarios | `unit.assert-equality`, `unit.parametrize`, `unit.mock-dependency` |
| Frameworks | Vitest, Jest, `node:test`, pytest |
| Samples | `samples/js-counter`, `samples/python-calc` |
| AI | Corpus FAQ + scenario keyword matcher (no API key) |
| Results panel | CI-cached stdout/stderr beside each scenario (`npm run capture:results`) |
| CI | GitHub Actions: validate, test, capture results, build |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start the site on port 4321 |
| `npm test` | Run all Phase 1 JS + Python unit examples |
| `npm run capture:results` | Re-run each scenario variant and write static result JSON for the site |
| `npm run build` | Production build of the site |
| `npm run validate:scenarios` | Check scenario JSON + file paths |

## Docs

Planning notes remain in [`docs/plan/`](docs/plan/). Local clone help: [`docs/LOCAL_SETUP.md`](docs/LOCAL_SETUP.md).

## License

MIT
