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
python3 -m pip install pytest
npm test
npm run dev
```

Then open http://localhost:4321

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
