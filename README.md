# GDG Hongik

GDG Hongik 동아리 서비스 모노레포입니다. 랜딩 앱과 공유 패키지를 pnpm workspace로 관리합니다.

## 기술 스택

- TypeScript, React 19, Vite 8, Tailwind CSS 4
- ESLint, Prettier, husky + lint-staged
- Changesets로 패키지별 버전·CHANGELOG·GitHub Release 관리

## 프로젝트 구조

| 경로              | 패키지         | 역할                            |
| ----------------- | -------------- | ------------------------------- |
| `apps/landing`    | `@gdg/landing` | React + Vite 랜딩 앱            |
| `packages/wowds`  | `@gdg/wowds`   | 공유 UI·아이콘·디자인 토큰·폰트 |
| `packages/utils`  | `@gdg/utils`   | 공통 HTTP 요청 유틸리티         |
| `packages/config` | `@gdg/config`  | 공유 ESLint·TypeScript 설정     |

랜딩 앱은 `src/pages`, `components`, `hooks`, `api`, `types`, `utils`, `routes`, `layout`으로 구성됩니다.

## 설치와 실행

- Node.js 24.x: [.nvmrc](.nvmrc)와 [engines](package.json) 기준
- pnpm 12.14.0: [packageManager](package.json) 기준

```bash
nvm install && nvm use
npm install -g pnpm@12.14.0
pnpm install --frozen-lockfile
pnpm dev
```

## 주요 명령

```bash
pnpm build           # 전체 앱·패키지 빌드
pnpm lint            # 전체 린트 검사
pnpm typecheck       # 전체 TypeScript 타입 검사
pnpm format          # Prettier 포맷 적용
pnpm format:check    # Prettier 포맷 검사
pnpm changeset       # 패키지별 릴리스 변경 기록 작성
pnpm changeset:check # changeset 검사
pnpm test:release    # 릴리스 도구 회귀 검증
```

특정 패키지는 `pnpm --filter @gdg/landing <script>`처럼 실행합니다.
제품 UI 자동 테스트는 없으며, HTTP 요청 유틸리티 테스트는 `pnpm --filter @gdg/utils test`로 실행합니다.

커밋 시 pre-commit 훅에서 lint-staged를 실행합니다. 스테이징된 파일에 Prettier를 적용하고,
TypeScript·TSX 파일에는 ESLint도 실행합니다.

## 작업 문서

- [AI 작업 안내](AGENTS.md): 공통 작업·검증 규칙과 작업별 문서 안내
- [PR 준비와 리뷰](docs/pr-workflow.md): 작성자·리뷰어 절차와 검증 결과 기록 기준
- [팀 공용 AI 스킬](docs/ai-skills.md): changeset 작성·릴리스 점검·PR 제목과 본문 작성 스킬
- [디자인 시스템](packages/wowds/README.md): 토큰·Typography·반응형 구간과 사용법
- [릴리스 워크플로](docs/release-workflow.md): changeset 작성, 버전 PR·릴리스 절차와 GitHub 설정

저장소에는 `gdg-changeset`, `gdg-release-check`, `gdg-pr-description` 세 스킬만 공유합니다.
리팩토링, 검증, 코드 리뷰 등에 쓸 스킬은 각자 만들어 사용하고 커밋하지 않습니다.
