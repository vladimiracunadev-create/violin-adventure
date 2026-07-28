import { defineConfig, devices } from "@playwright/test";

// Pruebas E2E de humo sobre la app compilada (Vite preview en :1420).
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "line" : "list",
  use: {
    baseURL: "http://localhost:1420",
    trace: "on-first-retry"
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } }
  ],
  webServer: {
    command: "pnpm build && pnpm preview --port 1420 --strictPort",
    url: "http://localhost:1420",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});
