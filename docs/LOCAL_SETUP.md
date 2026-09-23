# Local setup (including macOS CursorProjects)

This cloud agent cannot write to your Mac filesystem. To run the app at
`/Users/johnymaret/Documents/CursorProjects`, clone from GitHub on your machine:

```bash
mkdir -p /Users/johnymaret/Documents/CursorProjects
cd /Users/johnymaret/Documents/CursorProjects
git clone https://github.com/jmaret/TestingRosettaStone.git
cd TestingRosettaStone
git fetch origin
git checkout cursor/build-phase1-7617
npm install
npx playwright install chromium
python3 -m pip install pytest httpx
npm test
npm run capture:results   # refreshes Results panel fixtures
npm run dev
```

Then open http://localhost:4321 — scenario pages show code beside the last cached run output. UX examples need Playwright Chromium (command above); Cypress installs its own runner with `npm install`.

The public site deploys from `main` to GitHub Pages only after CI `npm test` and `capture:results` succeed: https://jmaret.github.io/TestingRosettaStone/

### Open in Cursor

```bash
cursor /Users/johnymaret/Documents/CursorProjects/TestingRosettaStone
```

### Update later

```bash
cd /Users/johnymaret/Documents/CursorProjects/TestingRosettaStone
git pull
npm install
```
