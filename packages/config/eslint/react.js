import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import { baseConfig } from './base.js'

export const reactRules = {
  extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
  languageOptions: { globals: globals.browser },
}

export const reactConfig = defineConfig([
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx}'],
    ...reactRules,
  },
])

export default reactConfig
