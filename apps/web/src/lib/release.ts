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
