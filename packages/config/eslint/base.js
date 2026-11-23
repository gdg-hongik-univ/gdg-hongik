import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'

/**
 * 프레임워크에 공통으로 적용하는 JS·TS 규칙.
 *
 * 포맷은 ESLint 가 관여하지 않는다. prettier 가 직접 담당하고(lint-staged/format 스크립트),
 * ESLint 는 코드 품질만 본다. eslint-config-prettier 는 prettier 와 겹치는
 * 스타일 규칙을 꺼서 둘이 충돌하지 않게 하려고 `extends` 맨 끝에 둔다.
 */
export const baseConfig = defineConfig([
  globalIgnores(['**/dist/']),
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended, prettierConfig],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended, prettierConfig],
  },
])

export default baseConfig
