import type { Scenario } from "./scenarios";

export type AskResult = {
  answer: string;
  matches: { id: string; title: string; score: number }[];
  citations: string[];
};

const FAQ: { q: string; a: string; tags: string[] }[] = [
  {
    q: "What is Testing Playground?",
    a: "A free, open-source site that shows the same testing idea side by side across frameworks (unit, integration, UX, performance), with runnable samples and corpus-grounded answers.",
    tags: ["about", "what", "project", "rosetta", "playground"],
  },
  {
    q: "Which frameworks are included so far?",
    a: "Phase 1 covers Vitest, Jest, node:test, and pytest for unit scenarios: assert equality, parametrize, and mock a dependency. Integration, UX, and performance frameworks are planned next (Playwright, Cypress, k6, Lighthouse, and more).",
    tags: ["framework", "vitest", "jest", "pytest", "list"],
  },
  {
    q: "How do I run the examples locally?",
    a: "Clone the repo, run `npm install`, then `npm test`. Start the site with `npm run dev` and open http://localhost:4321. Python scenarios need `pip install pytest`.",
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
