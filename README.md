# GDG Hongik

GDG Hongik 동아리 서비스 모노레포입니다. 도메인별로 **독립 배포 가능한 앱**으로 나누고, 공통 코드는 **공유 패키지**로 관리합니다.

## 기술 스택

- **언어/런타임**: TypeScript, Node.js 20+
- **패키지 매니저**: pnpm 10+ (workspace 모노레포)
- **프레임워크**: React 19, Vite 8
- **코드 품질**: ESLint 10, Prettier, husky + lint-staged (pre-commit 훅)

## 프로젝트 구조

```
gdg-hongik/
├── apps/
│   └── landing/        # 랜딩페이지 (Vite + React + TS, 독립 배포)
│       └── src/        # 내부는 FSD 레이어 (app/pages/widgets/features/entities/shared)
│       # 추가 예정: onboarding (온보딩 가입), studies (스터디 관리)
├── packages/
│   ├── ui/             # 전역 공유 디자인 시스템 (@gdg/ui)
│   └── config/         # 공유 tsconfig / eslint 베이스 (@gdg/config)
├── pnpm-workspace.yaml # 워크스페이스 범위 (apps/*, packages/*)
└── package.json        # 루트 (private)
```

## 아키텍처

모노레포는 **앱(`apps/*`)** 과 **공유 패키지(`packages/*`)** 두 축으로 구성됩니다.

- **도메인 = 앱**: 각 도메인은 `apps/*` 아래의 독립 앱입니다. 온보딩만 수정하면 온보딩만 배포합니다.
- **앱 내부 = FSD**: Feature-Sliced Design 레이어로 단방향 의존성을 따릅니다. (app → pages → widgets → features → entities → shared)
- **공유 UI = 아토믹 디자인**: `@gdg/ui` 는 도메인과 무관한 순수 UI 만 담으며 atoms/molecules 로 구분합니다.
- **공유 설정**: `@gdg/config` 가 tsconfig 와 eslint 베이스를 제공해 앱·패키지가 동일한 규칙을 공유합니다.
- **빌드 도구**: 현재는 pnpm workspace 만 사용합니다. 앱이 늘고 CI 빌드가 느려지면 Turborepo 를 도입할 예정입니다.

### 워크스페이스 패키지

| 패키지            | 이름           | 역할                                |
| ----------------- | -------------- | ----------------------------------- |
| `apps/landing`    | `@gdg/landing` | 랜딩페이지 앱 (독립 배포)           |
| `packages/ui`     | `@gdg/ui`      | 공유 디자인 시스템 (React 컴포넌트) |
| `packages/config` | `@gdg/config`  | 공유 tsconfig / eslint 설정         |

## 요구사항

- Node.js >= 20
- pnpm >= 10

## 실행 방법

```bash
pnpm install          # 전체 워크스페이스 의존성 설치
pnpm dev              # 랜딩 앱 dev 서버 실행 (= pnpm dev:landing)
pnpm build            # 전체 앱·패키지 빌드
pnpm lint             # 전체 lint 검사
pnpm format           # Prettier 포맷 적용
pnpm format:check     # Prettier 포맷 검사 (수정 없이 확인)
```

특정 앱·패키지만 실행하려면 `--filter` 를 사용합니다.

```bash
pnpm --filter @gdg/landing <script>   # 예: pnpm --filter @gdg/landing dev
```

## 커밋

husky pre-commit 훅에서 lint-staged 가 실행됩니다. 스테이징된 파일에 대해 Prettier 포맷과 ESLint 검사가 자동으로 적용됩니다.
