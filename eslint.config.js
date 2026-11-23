import baseConfig from '@gdg/config/eslint/base'
import { reactRules } from '@gdg/config/eslint/react'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ...baseConfig,
  {
    files: ['apps/landing/**/*.{ts,tsx}', 'packages/wowds/**/*.{ts,tsx}'],
    ...reactRules,
  },
])
