import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "*.cy.js",
    supportFile: false,
    baseUrl: "http://127.0.0.1:4175",
    video: false,
    screenshotOnRunFailure: false,
  },
});
