import { defineConfig } from "astro/config";

const githubPages = process.env.GITHUB_PAGES === "1";

export default defineConfig({
  site: githubPages ? "https://jmaret.github.io" : "http://localhost:4321",
  base: githubPages ? "/TestingRosettaStone" : "/",
  trailingSlash: "never",
});
