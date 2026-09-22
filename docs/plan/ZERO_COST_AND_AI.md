# Zero-cost operations & AI

## Cost envelope

Target: **$0 / month** for a public educational site at modest traffic.

| Need | Free option | Limits to watch |
|------|-------------|-----------------|
| Source hosting | GitHub public repo | Soft abuse limits |
| CI | GitHub Actions | Minutes; cache browsers carefully |
| Web hosting | Cloudflare Pages / GitHub Pages / Vercel Hobby | Bandwidth & build minutes |
| DNS | Free subdomain (`*.pages.dev`, `*.vercel.app`) or Cloudflare DNS | Custom domain optional later |
| Package registry | npm / PyPI public | N/A |
| AI inference | Groq / Gemini / HF free tier **or** in-browser WebLLM | Rate limits; model size |
| Embeddings | Precompute in CI; ship static vectors | Rebuild on content change |
| Observability | Optional: Cloudflare analytics (privacy-friendly) | Avoid paid APM |

## AI answering questions

### Product behavior

- Chat panel: “Ask about this scenario” or global “Ask Testing Rosetta Stone”.
- Answers must **cite** `scenario.id` and file paths.
- If retrieval score is low → “I don’t have that in the corpus yet” + suggest related scenarios.
- Suggested prompts seeded from each scenario (e.g. “How does Vitest’s mock differ from Jest here?”).

### Implementation phases

#### Phase A — Rule-based + FAQ (week-zero, $0)

- Keyword / fuzzy match over scenario titles and tags.
- No LLM required; ships with the static site.
- Good enough for demos and CI without secrets.

#### Phase B — RAG + free LLM API

1. CI job `embed-corpus` writes `apps/web/public/corpus/{chunks.json,vectors.bin}`.
2. Edge function `POST /api/ask`:
   - embed query (same model as corpus) or use lexical + vector hybrid
   - top-k retrieve
   - call free LLM with citations required
3. Env: `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL`.
4. Document how maintainers obtain free keys (Groq / Google AI Studio / HF).

#### Phase C — Browser-local LLM

- Lazy-load WebLLM when user enables “Offline AI”.
- Same retrieval over static vectors.
- Warn about download size and weaker quality.

### Prompt contract (sketch)

```
You are Testing Rosetta Stone's assistant.
Use ONLY the provided context chunks.
Cite scenario ids and file paths.
If the answer is not in context, say so and list closest scenarios.
Do not invent APIs or CLI flags.
Prefer showing the smallest relevant snippet.
```

### Privacy

- Do not store chat transcripts by default.
- If logging is enabled for debugging, strip PII and keep ≤7 days on free KV with TTL.
- Show a clear notice when an external LLM API is used.

## License & attribution

- App & examples: **MIT** (recommended) unless a sample must match upstream license notes.
- Display third-party framework licenses on scenario pages.
- `NOTICE` or `docs/ATTRIBUTIONS.md` for logos/names (follow each project’s trademark policy—text names first, logos only with permission).

## Risk register

| Risk | Mitigation |
|------|------------|
| Free LLM quota exhausted | Fall back to FAQ matcher / WebLLM; cache frequent Qs |
| CI minutes (Playwright + Lighthouse) | Shard jobs; run heavy browsers on `main` + nightly; PR runs smoke subset |
| Example drift across frameworks | Shared SUT + scenario validation script |
| Scope creep (too many languages) | Freeze v1 languages to JS/TS + Python |
| Trademark/logo misuse | Text-only badges until clearance |
