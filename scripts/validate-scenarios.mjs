#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const examplesRoot = path.join(root, "examples");
let count = 0;
const errors = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === "scenario.json") validate(full);
  }
}

function validate(file) {
  count += 1;
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!data.id || !data.title || !data.category) {
    errors.push(`${file}: missing id/title/category`);
  }
  if (!Array.isArray(data.variants) || data.variants.length < 2) {
    errors.push(`${file}: need at least 2 variants`);
  }
  for (const v of data.variants ?? []) {
    for (const f of v.files ?? []) {
      const abs = path.join(root, f);
      if (!fs.existsSync(abs)) errors.push(`${file}: missing file ${f}`);
    }
  }
}

if (!fs.existsSync(examplesRoot)) {
  console.error("No examples/ directory");
  process.exit(1);
}

walk(examplesRoot);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${count} scenario(s).`);
