import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  outputDir: "./tests/.results",
  use: { baseURL: "http://localhost:3000" },
  webServer: {
    command: process.env.CI_PROD ? "pnpm start" : "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "large-desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 2560, height: 1440 } } },
    { name: "laptop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 720 } } },
    { name: "tablet", use: { ...devices["iPad Pro 11"] } },
    { name: "tablet-landscape", use: { ...devices["iPad Pro 11 landscape"] } },
    { name: "iphone-pro-max", use: { ...devices["iPhone 14 Pro Max"] } },
    { name: "iphone-landscape", use: { ...devices["iPhone 14 Pro Max landscape"] } },
    { name: "galaxy-ultra", use: { ...devices["Galaxy S9+"], viewport: { width: 412, height: 915 } } },
    { name: "pixel", use: { ...devices["Pixel 7"] } },
    { name: "safari", use: { ...devices["Desktop Safari"], viewport: { width: 1440, height: 900 } } },
    { name: "firefox", use: { ...devices["Desktop Firefox"], viewport: { width: 1440, height: 900 } } },
    { name: "edge", use: { ...devices["Desktop Edge"], channel: "msedge", viewport: { width: 1440, height: 900 } } },
  ],
});
