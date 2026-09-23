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

test("GET /items/1 returns the known item", async () => {
  // Fresh APIRequest context pointed at the ephemeral server
  const context = await playwrightRequest.newContext({ baseURL });
  const res = await context.get("/items/1");
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ id: "1", name: "Notebook" });
  await context.dispose();
});
