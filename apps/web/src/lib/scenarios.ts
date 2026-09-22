import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type TestCategory = "unit" | "integration" | "ux" | "performance" | "a11y";

export type ScenarioVariant = {
  framework: string;
  label: string;
  language: string;
  frameworkLicense: string;
  files: string[];
  run: { cwd: string; command: string };
  notes?: string;
};

export type Scenario = {
  id: string;
  title: string;
  category: TestCategory;
  summary: string;
  description: string;
  sut: string;
  tags: string[];
  variants: ScenarioVariant[];
};

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");

export function getRepoRoot() {
  return repoRoot;
}

export function loadScenarios(): Scenario[] {
  const examplesRoot = path.join(repoRoot, "examples");
  const scenarios: Scenario[] = [];

  function walk(dir: string) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name === "scenario.json") {
        const raw = fs.readFileSync(full, "utf8");
        scenarios.push(JSON.parse(raw) as Scenario);
      }
    }
  }

  walk(examplesRoot);
  return scenarios.sort((a, b) => a.id.localeCompare(b.id));
}

export function loadScenario(id: string): Scenario | undefined {
  return loadScenarios().find((s) => s.id === id);
}

export function readExampleFile(repoRelativePath: string): string {
  const full = path.join(repoRoot, repoRelativePath);
  return fs.readFileSync(full, "utf8");
}

export type ScenarioResult = {
  scenarioId: string;
  framework: string;
  label: string;
  cwd: string;
  command: string;
  exitCode: number;
  ok: boolean;
  durationMs: number;
  capturedAt: string;
  output: string;
};

export type ResultsManifest = {
  capturedAt: string;
  source: string;
  gitSha: string | null;
  variantCount: number;
  failureCount: number;
};

const resultsRoot = path.join(repoRoot, "apps/web/public/results");

export function loadResultsManifest(): ResultsManifest | null {
  const file = path.join(resultsRoot, "manifest.json");
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as ResultsManifest;
}

export function loadVariantResult(scenarioId: string, framework: string): ScenarioResult | null {
  const file = path.join(resultsRoot, scenarioId, `${framework}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as ScenarioResult;
}
