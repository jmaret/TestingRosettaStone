import { defineConfig } from "@playwright/test";

const port = Number(process.env.PORT) || 4175;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: ".",
  testMatch: "*.spec.js",
  fullyParallel: false,
  use: { baseURL },
  webServer: {
    command: `node ../../../../samples/js-ui/scripts/serve.mjs`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    env: { PORT: String(port) },
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
