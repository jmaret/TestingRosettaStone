// Playwright request API (no page / no browser) — same header contract as SuperTest
import { test, expect, request as playwrightRequest } from "@playwright/test";
import { createApp } from "../../../../samples/js-api/src/app.js";

let server;
let baseURL;

test.beforeAll(async () => {
  const app = createApp();
  server = await new Promise((resolve) => {
    const s = app.listen(0, "127.0.0.1", () => resolve(s));
  });
  const { port } = server.address();
  baseURL = `http://127.0.0.1:${port}`;
});

test.afterAll(async () => {
  await new Promise((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
});

test("GET /health sends nosniff and DENY framing", async () => {
  const context = await playwrightRequest.newContext({ baseURL });
  const res = await context.get("/health");
  expect(res.status()).toBe(200);
  expect(res.headers()["x-content-type-options"]).toBe("nosniff");
  expect(res.headers()["x-frame-options"]).toBe("DENY");
  await context.dispose();
});
