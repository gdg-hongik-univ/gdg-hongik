# GDG Hongik

GDG Hongik 동아리 서비스 모노레포.
도메인별로 **독립 배포 가능한 앱**으로 나누고, 공통 코드는 **공유 패키지**로 관리한다.

## 구조

```
gdg-hongik/
├── apps/
│   └── landing/        # 랜딩페이지 (Vite + React + TS, 독립 배포)
│       └── src/        # 내부는 FSD 레이어 (app/pages/widgets/features/entities/shared)
│       # 추가 예정: onboarding (온보딩 가입), studies (스터디 관리)
├── packages/
│   ├── ui/             # 모노레포 전역 공유 디자인 시스템 (@gdg/ui)
│   └── config/         # 공유 tsconfig / eslint 베이스 (@gdg/config)
├── pnpm-workspace.yaml
└── package.json        # 루트 (private)
```

### 설계 원칙

- **도메인 = 앱**: 각 도메인은 `apps/*` 아래 독립 앱. 온보딩만 고치면 온보딩만 배포한다.
- **앱 내부 = FSD**: 단방향 의존성(app → pages → widgets → features → entities → shared).
- **공유 UI = 아토믹 차용**: `@gdg/ui` 는 도메인 무관 순수 UI 만, atoms/molecules 로 구분.
- **빌드 도구**: 지금은 pnpm workspace 만 사용. 앱이 늘고 CI 빌드가 느려지면 Turborepo 를 `turbo.json` 한 파일로 추가한다.

## 개발

```bash
pnpm install          # 전체 워크스페이스 설치
pnpm dev              # 랜딩 앱 dev 서버 (= pnpm dev:landing)
pnpm build            # 전체 빌드
pnpm lint             # 전체 lint
pnpm format           # prettier 포맷
```

특정 앱만: `pnpm --filter @gdg/landing <script>`

## 요구사항

- Node >= 20
- pnpm 10+
