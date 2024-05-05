import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      enabled: true,
      exclude: [
        "rsbuild.config.ts",
        "**/*.stories.tsx",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
