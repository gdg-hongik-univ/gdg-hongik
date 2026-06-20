import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import { baseConfig } from './base.js'

/**
 * React 앱/패키지용 ESLint (base + react-hooks + react-refresh + 브라우저 globals).
 * @gdg/landing, @gdg/ui 등 React 를 쓰는 곳은 이걸 쓴다.
 */
export const reactConfig = defineConfig([
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      globals: globals.browser,
    },
  },
])

export default reactConfig
