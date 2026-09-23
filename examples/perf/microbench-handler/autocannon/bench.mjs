// Autocannon microbench — burst GET /health, then fail the process on the contract
import autocannon from "autocannon";

const url = process.env.BASE_URL || "http://127.0.0.1:4181/health";

const result = await autocannon({
  url,
  connections: 10,
  duration: 5,
  pipelining: 1,
});

autocannon.printResult(result);

const p99 = result.latency.p99;
const errors = (result.errors ?? 0) + (result.non2xx ?? 0) + (result.timeouts ?? 0);

if ((result["2xx"] ?? 0) < 1) {
  console.error("Expected at least one 2xx response");
  process.exit(1);
}
if (errors > 0) {
  console.error(`Expected zero errors/non-2xx/timeouts, got ${errors}`);
  process.exit(1);
}
// Generous p99 so shared CI CPUs do not flake — the threshold is the lesson
if (p99 > 500) {
  console.error(`Expected p99 < 500ms, got ${p99}ms`);
  process.exit(1);
}

console.log(`ok: 2xx=${result["2xx"]} p99=${p99}ms`);
