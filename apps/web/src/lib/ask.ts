import type { Scenario } from "./scenarios";

export type AskResult = {
  answer: string;
  matches: { id: string; title: string; score: number }[];
  citations: string[];
};

const FAQ: { q: string; a: string; tags: string[] }[] = [
  {
    q: "What is Testing Playground?",
    a: "A free, open-source site that shows the same testing idea side by side across frameworks (unit, integration, UX, performance, security), with runnable samples and corpus-grounded answers.",
    tags: ["about", "what", "project", "rosetta", "playground"],
  },
  {
    q: "Which frameworks are included so far?",
    a: "Unit scenarios use Vitest, Jest, node:test, and pytest (assert equality, parametrize, mock a dependency). Integration scenarios use Supertest, Playwright request, and pytest + httpx (HTTP GET and 404 error contract). UX scenarios use Playwright and Cypress against samples/js-ui (click About; empty form shows “Name is required”). Performance scenarios use k6, Artillery, and Autocannon against samples/js-api (HTTP smoke load and a /health microbench). Security scenarios reuse those HTTP and browser tools: isolation headers on /health, and a signup XSS oracle (script-like name must not run). Each scenario page explains the tool and test architecture before showing code. Lighthouse budgets are planned next.",
    tags: ["framework", "vitest", "jest", "pytest", "list"],
  },
  {
    q: "How do UX or browser tests work here?",
    a: "UX scenarios drive a real browser against samples/js-ui. Playwright and Cypress both click About and assert the next heading (ux.navigate-and-assert), or submit an empty form and assert “Name is required” (ux.form-validation). The docs site shows CI-cached logs — it does not launch a browser in your tab.",
    tags: ["ux", "e2e", "playwright", "cypress", "browser", "ui", "form"],
  },
  {
    q: "How do performance or load tests work here?",
    a: "Performance scenarios start samples/js-api and generate a short burst of HTTP. k6 and Artillery smoke-load GET /items/1 (perf.http-smoke-load); Autocannon and k6 microbench GET /health (perf.microbench-handler). The pass/fail contract is error rate plus high-percentile latency, not a single JSON body. The docs site shows CI-cached logs.",
    tags: ["performance", "perf", "load", "k6", "artillery", "autocannon", "p95", "latency"],
  },
  {
    q: "How do security tests work here?",
    a: "Security scenarios reuse the HTTP and browser tools. SuperTest, Playwright request, and pytest + httpx assert X-Content-Type-Options: nosniff and X-Frame-Options: DENY on GET /health (security.http-headers). Playwright and Cypress submit a script-like name on Sign up and assert it is shown as text and window.__xss stays unset (security.xss-escape).",
    tags: ["security", "xss", "headers", "nosniff", "clickjacking", "owasp"],
  },
  {
    q: "How do I run the examples locally?",
    a: "Clone the repo, run `npm install`, `npx playwright install chromium`, `brew install k6`, then `npm test`. Start the site with `npm run dev` and open http://localhost:4321. Python scenarios need `pip install pytest httpx`.",
    tags: ["run", "local", "install", "clone", "npm"],
  },
  {
    q: "Is this free and open source?",
    a: "Yes. The project targets $0 hosting on free tiers, OSS frameworks only, MIT license for this repo, and AI that can run without a paid API (FAQ matcher now; optional free-tier RAG later).",
    tags: ["free", "cost", "open source", "license", "oss"],
  },
  {
    q: "How does the AI work?",
    a: "Right now answers come from a local FAQ + scenario keyword matcher that cites scenario ids from this repo. Later phases add RAG over example files and optional free-tier or in-browser LLMs — still grounded in the corpus.",
    tags: ["ai", "ask", "faq", "rag", "llm"],
  },
];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s.+#:/-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

export function answerQuestion(question: string, scenarios: Scenario[]): AskResult {
  const qTokens = new Set(tokenize(question));
  if (qTokens.size === 0) {
    return {
      answer: "Ask a question about a testing concept, framework, or how to run samples.",
      matches: [],
      citations: [],
    };
  }

  const faqScored = FAQ.map((item) => {
    const hay = tokenize(`${item.q} ${item.a} ${item.tags.join(" ")}`);
    const score = hay.reduce((sum, t) => sum + (qTokens.has(t) ? 1 : 0), 0);
    return { item, score };
  }).sort((a, b) => b.score - a.score);

  const scenarioMatches = scenarios
    .map((s) => {
      const hay = tokenize(
        `${s.id} ${s.title} ${s.summary} ${s.description} ${s.category} ${s.tags.join(" ")} ${s.variants
          .map((v) => `${v.framework} ${v.label}`)
          .join(" ")}`,
      );
      const score = hay.reduce((sum, t) => sum + (qTokens.has(t) ? 1 : 0), 0);
      return { id: s.id, title: s.title, score };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const bestFaq = faqScored[0];
  const parts: string[] = [];
  const citations: string[] = [];

  if (bestFaq && bestFaq.score > 0) {
    parts.push(bestFaq.item.a);
    citations.push(`faq:${bestFaq.item.q}`);
  }

  if (scenarioMatches.length) {
    parts.push(
      "Related scenarios in this repo: " +
        scenarioMatches.map((m) => `\`${m.id}\` (${m.title})`).join("; ") +
        ".",
    );
    citations.push(...scenarioMatches.map((m) => m.id));
  }

  if (!parts.length) {
    return {
      answer:
        "I do not have that in the corpus yet. Try asking about Vitest, Jest, pytest, parametrize, mocks, or how to run locally — or browse /scenarios.",
      matches: [],
      citations: [],
    };
  }

  return {
    answer: parts.join(" "),
    matches: scenarioMatches,
    citations,
  };
}
