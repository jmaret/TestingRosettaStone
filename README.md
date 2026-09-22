# Testing Rosetta Stone

Comparing the **same testing concepts** across open-source frameworks—unit, integration, UX/E2E, and performance—plus a zero-cost AI helper grounded in this repo’s examples.

> Status: **planning**. Implementation has not started; see [`docs/plan/`](docs/plan/).

## Why

Documentation usually teaches one tool at a time. This project is a Rosetta Stone: one scenario, many frameworks, runnable samples, and answers that cite those samples.

## Constraints

- **Open source tools only** for frameworks and samples
- **Zero cost** to host and operate on free tiers (or fully local AI)
- **AI Q&A** that retrieves from this corpus (FAQ → RAG → optional in-browser LLM)

## Plan docs

| Doc | Purpose |
|-----|---------|
| [Vision](docs/plan/VISION.md) | Problem, goals, non-goals, success criteria |
| [Architecture](docs/plan/ARCHITECTURE.md) | Stack, repo layout, AI design |
| [Framework matrix](docs/plan/FRAMEWORK_MATRIX.md) | Tools + scenario IDs by category |
| [Zero cost & AI](docs/plan/ZERO_COST_AND_AI.md) | Free hosting, quotas, AI phases |
| [Roadmap](docs/plan/ROADMAP.md) | Phased delivery |
| [Content schema](docs/plan/CONTENT_SCHEMA.md) | Scenario metadata draft |

## Proposed shape (later)

```
apps/web          Documentation + comparison UI
samples/          Tiny systems under test
examples/         Side-by-side framework variants
docs/plan/        Planning (you are here)
```

## License

MIT (to be added with the first implementation commit). Trademark names of third-party tools belong to their owners.
