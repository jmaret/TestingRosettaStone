export type Release = {
  version: string;
  date: string;
  title: string;
  /** Visitor-facing comments: what landed and why. */
  notes: string[];
};

/** Newest first. Header shows RELEASES[0]; bump + prepend on every merge to main. */
export const RELEASES: Release[] = [
  {
    version: "0.4.3",
    date: "2026-10-03",
    title: "Parchment palette shared with AetherForge",
    notes: [
      "The logo uses the AetherForge parchment tile and dark bronze mark instead of crimson and white.",
      "The page background and the panels behind text use the same parchment field as AetherForge.",
    ],
  },
  {
    version: "0.4.2",
    date: "2026-10-03",
    title: "Custom domain serves the site root",
    notes: [
      "Styles, the logo, and in-app links load on https://test-play-ground.aathira-services.com.",
      "The production build no longer prefixes URLs with /TestingRosettaStone. A custom domain serves this project site at the domain root, so that prefix returned 404s.",
    ],
  },
  {
    version: "0.4.1",
    date: "2026-10-02",
    title: "Review agent for maintainers",
    notes: [
      "No change to scenarios or pages.",
      "A review agent can check a diff for bugs and secrets, and update the AetherForge catalog only when a public fact changes.",
    ],
  },
  {
    version: "0.4.0",
    date: "2026-09-27",
    title: "Vision and architecture pages",
    notes: [
      "The header now opens Vision and Architecture — who the site is for, what it will not do, and how the static app is built.",
      "Both pages summarize the living docs in docs/plan and link to the full requirement tables on GitHub.",
      "Architecture shows logical and physical diagrams: Astro pages over the example corpus, hosted on GitHub Pages after CI.",
    ],
  },
  {
    version: "0.3.2",
    date: "2026-09-27",
    title: "Separate TDD and BDD scenarios",
    notes: [
      "TDD is its own page: red–green–refactor on a checkout coupon in Vitest, Jest, and pytest.",
      "BDD is a separate page: a meeting-room Gherkin feature bound by Cucumber.js and pytest-bdd — not a restatement of the coupon tests.",
      "Each page leads with the story, then the steps that exercise the method, then the runnable files. Scenario pages can show more than one test file so a feature and its step glue sit together.",
    ],
  },
  {
    version: "0.3.1",
    date: "2026-09-27",
    title: "Workspace look from JobFit",
    notes: [
      "The site now follows the JobFit assistant visual system: teal accent, serif headings, and a cool office wash.",
      "The header is a product bar — name on the left, links on the right — and pages sit in quiet workspace cards.",
      "Buttons and framework tabs use the same compact controls as the JobFit app.",
    ],
  },
  {
    version: "0.3.0",
    date: "2026-09-23",
    title: "Code and deployment quality",
    notes: [
      "A Quality page walks through the live CI/CD gates: validate scenarios, run every example category, cache Results logs, then build.",
      "GitHub Pages still deploys only after that job succeeds on main — the same pipeline is now readable from the header and footer.",
      "Ask AI can answer how CI deploys the site, with a suggested question on the Ask page.",
    ],
  },
  {
    version: "0.2.0",
    date: "2026-09-23",
    title: "Release notes in the header",
    notes: [
      "The header shows the product release (v0.2.0). Click it to read these comments.",
      "Past releases are listed on /releases so you can open any earlier note set.",
      "The home scenario list has more inset so titles and counts are not flush to the card edges.",
    ],
  },
  {
    version: "0.1.0",
    date: "2026-09-23",
    title: "Unit through security on GitHub Pages",
    notes: [
      "Shipped the static Testing Playground: unit, HTTP integration, browser UX, performance, and security Rosetta scenarios.",
      "Scenario pages show a tool primer, SUT, test, and CI-cached results — no live runner API.",
      "Ask AI answers from the repo FAQ; GitHub Pages deploys from main after CI tests pass.",
    ],
  },
];

export const RELEASE_VERSION = RELEASES[0]?.version ?? "0.0.0";

export function loadReleases(): Release[] {
  return RELEASES;
}

export function loadRelease(version: string): Release | undefined {
  return RELEASES.find((r) => r.version === version);
}
