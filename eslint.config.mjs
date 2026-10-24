import nextVitals from "eslint-config-next/core-web-vitals"
import storybook from "eslint-plugin-storybook"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  ...nextVitals,
  ...storybook.configs["flat/recommended"],
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "storybook-static/**",
    "next-env.d.ts"
  ])
])
