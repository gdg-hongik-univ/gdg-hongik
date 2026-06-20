import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

/**
 * 프레임워크 무관 ESLint 베이스 (js + ts + prettier).
 * React 를 쓰지 않는 패키지(@gdg/api, 순수 util 등)는 이걸 그대로 쓴다.
 */
export const baseConfig = defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended, prettierConfig],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
])

export default baseConfig
