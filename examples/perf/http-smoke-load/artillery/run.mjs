// Run Artillery and fail the process on the same p95 / error contract as k6
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const report = path.join(dir, "report.json");
const result = spawnSync("artillery", ["run", "--output", report, "smoke.yml"], {
  cwd: dir,
  stdio: "inherit",
  env: process.env,
  shell: true,
});
if ((result.status ?? 1) !== 0) process.exit(result.status ?? 1);

const data = JSON.parse(fs.readFileSync(report, "utf8"));
const counters = data.aggregate?.counters ?? {};
const p95 = data.aggregate?.summaries?.["http.response_time"]?.p95;
const failed = counters["vusers.failed"] ?? 0;
const ok = counters["http.codes.200"] ?? 0;

if (ok < 1) {
  console.error("Expected at least one HTTP 200");
  process.exit(1);
}
if (failed > 0) {
  console.error(`Expected zero failed VUs, got ${failed}`);
  process.exit(1);
}
if (typeof p95 === "number" && p95 > 500) {
  console.error(`Expected p95 < 500ms, got ${p95}ms`);
  process.exit(1);
}

console.log(`ok: http.codes.200=${ok} p95=${p95}ms failed=${failed}`);
