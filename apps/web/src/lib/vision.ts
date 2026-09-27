import fs from "node:fs";
import path from "node:path";
import { getRepoRoot } from "./scenarios";

const DEFAULT_REPO = "jmaret/TestingRosettaStone";
const VISION_REL = "docs/plan/VISION.md";

export function visionPath(): string {
  return path.join(getRepoRoot(), VISION_REL);
}

export function githubVisionUrl(): string {
  const ownerRepo =
    process.env.GITHUB_REPOSITORY ||
    (process.env.GITHUB_REPOSITORY_OWNER && process.env.GITHUB_REPOSITORY_NAME
      ? `${process.env.GITHUB_REPOSITORY_OWNER}/${process.env.GITHUB_REPOSITORY_NAME}`
      : DEFAULT_REPO);
  return `https://github.com/${ownerRepo}/blob/main/${VISION_REL}`;
}

export function sections(markdown: string): Record<string, string> {
  const parts = markdown.split(/^## /m);
  const out: Record<string, string> = {};
  for (const part of parts.slice(1)) {
    const nl = part.indexOf("\n");
    const title = (nl === -1 ? part : part.slice(0, nl)).trim();
    const body = nl === -1 ? "" : part.slice(nl + 1).trim();
    out[title] = body;
  }
  return out;
}

function stripDecor(text: string): string {
  return text.replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
}

export function paragraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((chunk) => stripDecor(chunk))
    .filter(Boolean);
}

export function listItems(body: string): string[] {
  const items: string[] = [];
  for (const line of body.split("\n")) {
    const match = line.match(/^\s*(?:[-*]|\d+\.)\s+(.*)$/);
    if (match) items.push(stripDecor(match[1]));
  }
  return items;
}

export function tableRows(body: string): string[][] {
  const rows: string[][] = [];
  for (const line of body.split("\n")) {
    if (!line.startsWith("|")) continue;
    const cells = line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());
    if (cells.length < 2) continue;
    if ([...cells[0]].every((ch) => ch === "-" || ch === ":")) continue;
    if (["user", "id"].includes(cells[0].toLowerCase())) continue;
    rows.push(cells);
  }
  return rows;
}

function pairRows(body: string): [string, string][] {
  return tableRows(body).map((row) => [row[0], row[1]]);
}

function shippedCount(body: string): number {
  return tableRows(body).filter((row) => row[row.length - 1].toLowerCase() === "shipped").length;
}

export type VisionSummary = {
  updated: string;
  vision: string[];
  users: [string, string][];
  goals: string[];
  nonGoals: string[];
  constraints: string[];
  requirementCounts: { functional: number; nonFunctional: number; ux: number };
  githubUrl: string;
};

export function summarizeVision(filePath = visionPath()): VisionSummary {
  const empty: VisionSummary = {
    updated: "",
    vision: [],
    users: [],
    goals: [],
    nonGoals: [],
    constraints: [],
    requirementCounts: { functional: 0, nonFunctional: 0, ux: 0 },
    githubUrl: githubVisionUrl(),
  };
  if (!fs.existsSync(filePath)) return empty;

  const text = fs.readFileSync(filePath, "utf8");
  const updatedMatch = text.match(/\*\*Last updated:\*\*\s*(\d{4}-\d{2}-\d{2})/);
  const s = sections(text);
  return {
    updated: updatedMatch?.[1] ?? "",
    vision: paragraphs(s["Vision"] ?? ""),
    users: pairRows(s["Users"] ?? ""),
    goals: listItems(s["Goals"] ?? ""),
    nonGoals: listItems(s["Non-goals"] ?? ""),
    constraints: listItems(s["Constraints"] ?? ""),
    requirementCounts: {
      functional: shippedCount(s["Functional requirements"] ?? ""),
      nonFunctional: shippedCount(s["Non-functional requirements"] ?? ""),
      ux: shippedCount(s["UX requirements"] ?? ""),
    },
    githubUrl: githubVisionUrl(),
  };
}
