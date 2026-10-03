import { FlatCompat } from "@eslint/eslintrc"
import { defineConfig, globalIgnores } from "eslint/config"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default defineConfig([
  globalIgnores([".next/**", ".next-build/**", "out/**", "next-env.d.ts"]),
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),
])