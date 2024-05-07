import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      enabled: true,
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "**/*.stories.tsx",
        "src/bootstrap.tsx",
        "src/**/index.{ts,tsx}",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
