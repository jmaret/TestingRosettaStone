// k6 smoke load — a few VUs, short duration, fail the process on thresholds
import http from "k6/http";
import { check, sleep } from "k6";

const BASE = __ENV.BASE_URL || "http://127.0.0.1:4180";

export const options = {
  vus: 5,
  duration: "8s",
  thresholds: {
    // Contract: almost no failed requests, p95 stays under half a second
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
  },
};

export default function () {
  const res = http.get(`${BASE}/items/1`);
  check(res, {
    "status is 200": (r) => r.status === 200,
    "body is Notebook": (r) => r.json("name") === "Notebook",
  });
  sleep(0.2);
}
