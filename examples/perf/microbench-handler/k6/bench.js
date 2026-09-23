// k6 microbench — same /health burst + error / p99 contract as Autocannon
import http from "k6/http";
import { check } from "k6";

const BASE = __ENV.BASE_URL || "http://127.0.0.1:4181";

export const options = {
  vus: 10,
  duration: "5s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(99)<500"],
  },
};

export default function () {
  const res = http.get(`${BASE}/health`);
  check(res, {
    "status is 200": (r) => r.status === 200,
    "ok is true": (r) => r.json("ok") === true,
  });
}
