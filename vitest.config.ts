/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  test: {
    globals: true,
    environment: "happy-dom",
    exclude: [...configDefaults.exclude, "test-e2e/**/*"],
    setupFiles: ["./test/setup-test-env.ts"],
  },
});
