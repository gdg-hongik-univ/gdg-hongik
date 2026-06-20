import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

/**
 * 프레임워크 무관 ESLint 베이스 (js + ts).
 * React 를 쓰지 않는 패키지(@gdg/api, 순수 util 등)는 이걸 그대로 쓴다.
 *
 * 포맷은 ESLint 가 관여하지 않는다. prettier 가 직접 담당하고(lint-staged/format 스크립트),
 * ESLint 는 코드 품질만 본다. eslint-config-prettier 는 prettier 와 겹치는
 * 스타일 규칙을 꺼서 둘이 충돌하지 않게 하려고 `extends` 맨 끝에 둔다.
 */
export const baseConfig = defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended, prettierConfig],
  },
])

export default baseConfig
