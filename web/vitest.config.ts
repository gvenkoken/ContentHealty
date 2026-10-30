import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    // T01 permits this file for tests, but no separate test file paths.
    include: ["vitest.setup.ts", "src/**/*.test.{ts,tsx}", "src/**/*.spec.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**", "e2e/**"],
    clearMocks: true,
  },
  esbuild: { jsx: "automatic" },
});
