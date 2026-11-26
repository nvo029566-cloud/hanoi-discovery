import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

// E2E_PROD=1 runs the tests against a production build (next build + next start),
// which is what actually ships. The default uses the dev server for fast local runs.
const useProduction = process.env.E2E_PROD === "1";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  use: { baseURL: "http://localhost:3001", trace: "on-first-retry" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: useProduction ? "npm run build && npm run start" : "npm run dev",
    url: "http://localhost:3001",
    reuseExistingServer: !useProduction,
    timeout: useProduction ? 300_000 : 120_000,
  },
});
