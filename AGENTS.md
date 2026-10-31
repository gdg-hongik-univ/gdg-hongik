# AI 작업 안내

## 먼저 확인할 것

- 실행 방법은 [README.md](README.md), 디자인 시스템 사용법은
  [packages/wowds/README.md](packages/wowds/README.md)를 확인한다.
- 작업 시작 시 `git status --short`와 기준 브랜치를 확인하고 기존 작업을 보존한다.
- 저장소 분석과 미해결 항목은 [docs/repository-review.md](docs/repository-review.md)에 있다.
  이 보고서는 특정 커밋의 기록이므로 수정 전 현재 코드에서 다시 확인한다.
- 랜딩 동작·콘텐츠를 수정할 때는 [docs/landing-spec.md](docs/landing-spec.md)를 확인한다.
  현재 구현, 개선 제안, 운영·디자인 미확정 항목을 구분하고 초안을 확정 정책으로 간주하지 않는다.

## 실제 구조와 변경 위치

- `apps/landing`: React + Vite 랜딩 앱. 진입점은 `src/main.tsx`, 라우트는
  `src/routes/index.tsx`, 공통 레이아웃은 `src/layout/RootLayout.tsx`다.
- `src/pages/LandingPage.tsx`: 랜딩 섹션 조립, 스터디·이벤트 요청, 모집 상태와 모달 연결.
- `src/components`: 랜딩 전용 UI. `src/hooks`, `src/utils`, `src/api`, `src/types`는
  각각 상태·상호작용, 계산, 요청·응답 변환, 타입을 둔다.
- `packages/wowds` (`@gdg/wowds`): 도메인과 무관한 UI, 아이콘, 디자인 토큰, 폰트.
  앱 전용 콘텐츠나 모집 로직을 공유 패키지에 넣지 않는다.
- `packages/config` (`@gdg/config`): 공유 ESLint·TypeScript 설정.
- 현재 앱은 FSD 폴더 구조가 아니다. `packages/ui`와 `@gdg/ui`도 존재하지 않는다.
  구조 개편이 작업 범위에 없으면 현재 폴더와 공개 export를 활용한다.

## 실행과 검증

- Node 버전은 `.nvmrc`와 루트 `engines`, pnpm 버전은 루트 `packageManager`를 따른다.
- 설치: `pnpm install --frozen-lockfile`
- 실행: `pnpm dev`
- 코드 변경 확인: `pnpm lint`, `pnpm typecheck`, `pnpm build`
- 특정 패키지 린트: `pnpm --filter @gdg/landing lint`, `pnpm --filter @gdg/wowds lint`
- 문서만 변경했다면 변경 파일에 `pnpm exec prettier --check <파일...>`을 실행한다.
- 현재 자동 테스트 스크립트는 없다. `pnpm test`가 실행되었다고 보고하지 않는다.
  버그 수정 시 관련 재현 절차 또는 필요한 최소 회귀 검증을 함께 남긴다.
- UI 변경은 관련 탭·모집 상태·오류 상태·키보드 동작을 확인한다. 반응형 변경은
  360/600/768/1024/1440px와 변경한 경계의 양쪽을 확인한다.
- 검증을 실행하지 못하면 명령과 원인을 구분해 보고한다. 설치나 서명 확인 실패를
  해결하려고 보안 검증을 끄거나 lockfile을 임의로 재생성하지 않는다.

## 디자인 시스템 주의점

- Tailwind 설정은 `packages/wowds/theme.css`, TS 토큰은 `packages/wowds/tokens`에 있다.
- `xs/s/m/l/xl`은 구간 한정 variant다. 예를 들어 `m:`은 768–1023px에만 적용되고
  `l:`이나 `xl:`로 이어지지 않는다. 360px 미만에는 `xs:`가 적용되지 않는다.
- `Typography`는 테마 CSS 변수에 따라 자동 반응형 크기를 사용한다.
  화면별 `text-[…]!` 재정의 전 해당 variant와 기존 예외를 확인한다.
- 클래스 병합은 기존 `cn`, 아이콘·UI는 `@gdg/wowds`의 공개 export를 우선 사용한다.
- 전역 CSS의 폰트·테마 import와 공유 UI용 `@source` 설정을 보존한다.
- 시각적 크기와 HTML 의미를 구분한다. 제목은 적절한 `as`, 클릭 동작은 키보드로
  사용할 수 있는 요소, 모달은 포커스 이동·복귀와 닫기 동작을 갖춰야 한다.

## 데이터와 도메인 주의점

- 현재 데이터는 `apps/landing/public/{config,events,studies,stats}.json`에 있다.
  `stats.json`은 아직 화면에 연결되지 않았으므로 파일 수정만으로 통계가 바뀌지 않는다.
- 이벤트 요청·타입이 `api/event.ts`, `types/event.ts`와
  `hooks/useUpcomingEvents.ts`, `types/upcomingEvents.ts`로 나뉘어 있다.
  데이터 형식을 바꾸면 카드와 타임라인 양쪽을 확인한다.
- 현재 타임라인은 `image === null`로 대상을 분류한다. 이미지 유무를 새 도메인 규칙으로
  확정하지 말고, 관련 변경 시 지난 활동·예정 일정의 의도를 함께 확인한다.
- 모집 실패와 모집 종료는 서로 다른 상태다. 로딩·오류·정상·빈 결과를 구분한다.
- JSON 타입 선언은 런타임 검증을 대신하지 않는다. 응답 구조와 날짜 경계를 확인한다.
- 운영 일정·통계·외부 링크는 확인된 값만 사용하고 추정값을 운영 데이터에 넣지 않는다.
- 배포 경로, 시간대, 지원 브라우저가 불명확하면 가정을 명시한다.

## 변경 범위

- 기존 구현과 설치된 도구를 먼저 찾고, 요청과 무관한 구조 개편이나 의존성 추가를 피한다.
- 동작이 달라지면 관련 명세·README도 같은 변경에서 갱신한다. 문서마다 규칙을 복사하기보다
  원본 파일을 링크한다.
- 패키지별 안내는 현재 이 파일과 각 원본 문서를 사용한다. 하위 `AGENTS.md`는 해당 경로에만
  필요한 작업 규칙·검증 절차가 생겼을 때 분리하고, 공통 규칙은 복사하지 않는다.
- `public` 데이터는 공개 콘텐츠다. 비밀값은 코드·문서·fixture에 기록하지 않는다.
- `.github/workflows/ci.yml`에는 다른 저장소로 강제 push하는 sync 작업이 있다.
  CI 수정 시 QA와 동기화의 영향을 구분하고, 로컬 검증에 원격 push를 포함하지 않는다.
