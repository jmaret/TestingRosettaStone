import { defineConfig } from "astro/config";

const githubPages = process.env.GITHUB_PAGES === "1";

export default defineConfig({
  // Custom domain serves this project site at the domain root.
  site: githubPages ? "https://test-play-ground.aathira-services.com" : "http://localhost:4321",
  base: "/",
  trailingSlash: "never",
});
