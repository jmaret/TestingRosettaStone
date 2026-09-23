// Playwright request API (no page / no browser)
import { test, expect, request as playwrightRequest } from "@playwright/test";
import { createApp } from "../../../../samples/js-api/src/app.js";

let server;
let baseURL;

test.beforeAll(async () => {
  const app = createApp();
  // listen(0) lets the OS pick a free port
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

test("GET /items/999 returns the not_found JSON contract", async () => {
  // Fresh APIRequest context pointed at the ephemeral server
  const context = await playwrightRequest.newContext({ baseURL });
  const res = await context.get("/items/999");
  expect(res.status()).toBe(404);
  expect(await res.json()).toEqual({ error: "not_found", id: "999" });
  await context.dispose();
});
