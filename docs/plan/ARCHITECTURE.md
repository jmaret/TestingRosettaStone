# Architecture

## High-level shape

```
┌─────────────────────────────────────────────────────────────┐
│  Web app (static + light edge)                              │
│  Browse scenarios · Compare frameworks · Ask AI             │
└───────────────┬─────────────────────────────┬───────────────┘
                │                             │
                ▼                             ▼
┌───────────────────────────┐   ┌─────────────────────────────┐
│  Content corpus (MDX/JSON)│   │  AI Q&A (RAG)               │
│  scenarios, snippets,     │──▶│  embeddings + free LLM      │
│  metadata, licenses       │   │  or browser-local model     │
└───────────────┬───────────┘   └─────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────────────┐
│  Sample monorepo packages                                 │
│  apps/demo-web · apps/demo-api · tests/* by category      │
└───────────────────────────────────────────────────────────┘
```

## Recommended stack (all free / open source)

| Layer | Choice | Why |
|-------|--------|-----|
| App framework | **Astro** + React islands *or* **Next.js** (App Router) static export | Content-first site; excellent MDX; free deploy |
| Styling | **Vanilla CSS** + CSS variables (or UnoCSS) | No design-system tax; stays brandable |
| Content | **MDX** + typed JSON frontmatter | Scenarios as data; AI can ingest cleanly |
| Sample apps | Small **Node/TS** API + **Vite React** UI | Matches most JS testing demos; easy CI |
| Multi-language samples | Isolated folders (`samples/python`, `samples/java`, …) | Avoid forcing one language for all frameworks |
| CI | **GitHub Actions** | Free for public repos |
| Hosting | **GitHub Pages** (Actions deploy on `main`) | $0 static; artifact from `apps/web/dist` |
| Search | **Pagefind** (static) | Offline-friendly, no backend |
| AI (preferred path) | **RAG over corpus** + free LLM API | Grounded answers |
| AI (fallback / offline) | **Transformers.js** or **WebLLM** in-browser | Truly $0, no key |

### Why not a heavy backend?

A blank-slate, zero-cost product should avoid always-on servers. Prefer:

1. Prebuilt static site from MDX.
2. Optional **edge function** only for AI chat (Cloudflare Workers free tier / Vercel serverless free tier).
3. Samples that run **locally** and in CI—not inside the hosted UI.
4. **Cached results panel** — CI (or `npm run capture:results`) writes stdout/stderr JSON under `apps/web/public/results/`; the static site shows that log beside each scenario writeup. No live runner API.

## Repository layout (proposed)

```
/
├── apps/
│   └── web/                 # Astro/Next site
├── packages/
│   └── content/             # Shared scenario schema + MDX
├── samples/
│   ├── js-counter/          # Tiny shared SUT
│   ├── js-api/              # Tiny HTTP API SUT
│   └── python-calc/         # Non-JS SUT for pytest etc.
├── examples/                # Canonical side-by-side snippets (source of truth for Rosetta)
│   ├── unit/
│   ├── integration/
│   ├── ux/
│   └── performance/
├── docs/
│   └── plan/                # This planning set
├── scripts/
│   ├── embed-corpus.mjs     # Build embeddings for RAG
│   └── validate-examples.mjs
└── .github/workflows/
    ├── ci.yml               # lint + sample tests
    └── deploy.yml
```

## Content model

### Scenario

A scenario is one testing *idea* expressed in N frameworks.

```ts
type TestCategory = "unit" | "integration" | "ux" | "performance" | "a11y";

type Scenario = {
  id: string;                 // e.g. "unit.assert-equality"
  title: string;
  category: TestCategory;
  description: string;        // what concept is being shown
  sut: string;                // sample under test id
  variants: ScenarioVariant[];
};

type ScenarioVariant = {
  framework: string;          // "vitest" | "pytest" | "playwright" | ...
  language: string;
  license: "MIT" | "Apache-2.0" | ...; // of the tool, for display
  files: { path: string; language: string }[];
  run: { cmd: string; cwd: string };
  notes?: string;             // gotchas / idioms
};
```

### Rosetta UI

For each scenario page:

1. Short concept blurb (one job).
2. Horizontal or tabbed **framework switcher** with synced scroll / “highlight equivalent lines” where feasible.
3. Copy buttons + “open in sample” links.
4. Adjacent **Results** panel fed by static files from `apps/web/public/results/` (CI-captured logs + timestamp)—not a live execute API.
5. “Ask AI about this scenario” deep-link with scenario id in context.

## AI Q&A design

### Corpus

Index only first-party content:

- Scenario MDX
- Example source files under `examples/` and `samples/`
- Short curated FAQ (`docs/faq.md`)

### Retrieval

1. Chunk by scenario + file (~500–800 tokens).
2. Embed with a free model (e.g. `bge-small` via Transformers.js offline, or a free embedding API).
3. Store vectors as static JSON or SQLite baked into the deploy artifact / Worker KV.

### Generation

**Path A — Edge + free API (recommended for quality)**

- Cloudflare Worker receives question + optional scenario id.
- Retrieve top-k chunks.
- Call **Groq** / **Google Gemini** / **Hugging Face Inference** free tier with a strict system prompt: *answer only from context; cite scenario ids and file paths; refuse if not in corpus*.
- Keys live in host secrets—never in the client.
- Rate-limit by IP; daily budget alerts.

**Path B — Fully client-side (recommended as offline mode)**

- WebLLM / Transformers.js loads a small model.
- Same retrieval over static embeddings.
- Slower / weaker answers; zero API cost and works without keys.

**Path C — Hybrid**

- Default to Path A when a key is configured in the deployment.
- Fall back to Path B or a deterministic FAQ matcher when quota is exhausted.

### Safety & cost controls

- Max tokens / max requests per IP per day.
- No tool-calling into shell or arbitrary code execution.
- Log only anonymized metrics (optional, off by default).
- Disclose model + that answers may be wrong; always show citations.

## CI / quality gates

1. **Schema validation** — every scenario has ≥2 variants and a run command.
2. **Sample tests** — matrix jobs per language/framework that actually execute examples.
3. **License check** — `licensee` / `osv-scanner` / simple allowlist of OSS licenses.
4. **Link check** — MDX internal links.
5. **Deploy** — `.github/workflows/deploy-pages.yml` builds with `GITHUB_PAGES=1` and publishes `apps/web/dist` to GitHub Pages on push to `main`.

## Security notes

- No user-uploaded code execution on the server.
- CSP on the web app; sanitize MDX.
- AI endpoints: prompt-injection resistant system prompt + retrieval-only context.
- Secrets only in CI/host env.

## Alternatives considered

| Option | Rejected because |
|--------|------------------|
| Full Django/Rails monolith | Always-on hosting cost; overkill for content + samples |
| Only Storybook | Weak for non-UI categories (perf, API integration) |
| Embed CodeSandbox/StackBlitz for everything | Network dependency; free quotas; less “real” local CI |
| Live backend `/api/run` for on-demand tests | Always-on sandbox cost; security surface; breaks $0 static host |
| Closed AI-only (no RAG) | Hallucinated APIs; not grounded in our examples |

**Chosen for “show results without local run”:** CI-cached logs (`scripts/capture-results.mjs` → `apps/web/public/results/`) rendered beside the writeup.
