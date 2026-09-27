import fs from "node:fs";
import path from "node:path";
import { getRepoRoot } from "./scenarios";
import { sections, tableRows } from "./vision";

const DEFAULT_REPO = "jmaret/TestingRosettaStone";
const ARCH_REL = "docs/plan/ARCHITECTURE.md";
const MERMAID_FENCE = /```mermaid\n(.*?)```/s;
const HEADER_CELLS = new Set(["layer", "piece"]);

export function architecturePath(): string {
  return path.join(getRepoRoot(), ARCH_REL);
}

export function githubArchitectureUrl(): string {
  const ownerRepo =
    process.env.GITHUB_REPOSITORY ||
    (process.env.GITHUB_REPOSITORY_OWNER && process.env.GITHUB_REPOSITORY_NAME
      ? `${process.env.GITHUB_REPOSITORY_OWNER}/${process.env.GITHUB_REPOSITORY_NAME}`
      : DEFAULT_REPO);
  return `https://github.com/${ownerRepo}/blob/main/${ARCH_REL}`;
}

function mermaid(body: string): string {
  const match = body.match(MERMAID_FENCE);
  return match?.[1].trim() ?? "";
}

function intro(body: string): string {
  const preface = body.split(/```mermaid/)[0] ?? "";
  return preface.replace(/\s+/g, " ").trim();
}

function pairRows(body: string): [string, string][] {
  const after = body.split(/```mermaid[\s\S]*?```/);
  const tableSrc = after[1] ?? after[0] ?? "";
  return tableRows(tableSrc)
    .filter((row) => row.length >= 2 && !HEADER_CELLS.has(row[0].toLowerCase()))
    .map((row) => [row[0], row[1]]);
}

export type ArchitecturePage = {
  updated: string;
  logicalIntro: string;
  logicalMermaid: string;
  logicalRows: [string, string][];
  physicalIntro: string;
  physicalMermaid: string;
  physicalRows: [string, string][];
  githubUrl: string;
};

export function loadArchitecture(filePath = architecturePath()): ArchitecturePage {
  const empty: ArchitecturePage = {
    updated: "",
    logicalIntro: "",
    logicalMermaid: "",
    logicalRows: [],
    physicalIntro: "",
    physicalMermaid: "",
    physicalRows: [],
    githubUrl: githubArchitectureUrl(),
  };
  if (!fs.existsSync(filePath)) return empty;

  const text = fs.readFileSync(filePath, "utf8");
  const updatedMatch = text.match(/\*\*Last updated:\*\*\s*(\d{4}-\d{2}-\d{2})/);
  const s = sections(text);
  const logical = s["Logical architecture"] ?? "";
  const physical = s["Physical architecture"] ?? "";

  return {
    updated: updatedMatch?.[1] ?? "",
    logicalIntro: intro(logical),
    logicalMermaid: mermaid(logical),
    logicalRows: pairRows(logical),
    physicalIntro: intro(physical),
    physicalMermaid: mermaid(physical),
    physicalRows: pairRows(physical),
    githubUrl: githubArchitectureUrl(),
  };
}
