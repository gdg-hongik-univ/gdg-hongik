# AI 작업 안내

## 먼저 확인할 것

- 실행 방법은 [README.md](README.md), 디자인 시스템 사용법은
  [packages/wowds/README.md](packages/wowds/README.md)를 확인한다.
- 작업 시작 시 `git status --short`와 기준 브랜치를 확인하고 기존 작업을 보존한다.

## 실제 구조와 변경 위치

- `apps/landing`: React + Vite 랜딩 앱. 진입점은 `src/main.tsx`, 라우트는
  `src/routes/index.tsx`, 공통 레이아웃은 `src/layout/RootLayout.tsx`다.
- `src/pages/LandingPage.tsx`: 랜딩 섹션 조립, 스터디·이벤트 요청, 모집 상태와 모달 연결.
- `src/components`: 랜딩 전용 UI. `src/hooks`, `src/utils`, `src/api`, `src/types`는
  각각 상태·상호작용, 계산, 요청·응답 변환, 타입을 둔다.
- `packages/wowds` (`@gdg/wowds`): 도메인과 무관한 UI, 아이콘, 디자인 토큰, 폰트.
  앱 전용 콘텐츠나 모집 로직을 공유 패키지에 넣지 않는다.
- `packages/utils` (`@gdg/utils`): 공통 HTTP 요청 유틸리티.
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
- 릴리스 도구 회귀 검증은 `pnpm test:release`다. 제품 UI 자동 테스트와 `pnpm test` 스크립트는
  없으므로 실행했다고 보고하지 않는다. 버그 수정 시 재현 절차 또는 최소 회귀 검증을 남긴다.
- changeset 검사는 `pnpm changeset:check`, 릴리스 계획 확인은 `pnpm changeset status --verbose`다.
  릴리스 도구·CI를 변경하면 `pnpm test:release`도 실행한다. 태그 push·원격 릴리스는 로컬 검증에서 제외한다.
- UI 변경은 관련 탭·모집 상태·오류 상태·키보드 동작을 확인한다. 반응형 변경은
  360/600/768/1024/1440px와 변경한 경계의 양쪽을 확인한다.
- 검증을 실행하지 못하면 명령과 원인을 구분해 보고한다. 설치나 서명 확인 실패를
  해결하려고 보안 검증을 끄거나 lockfile을 임의로 재생성하지 않는다.

## PR 준비와 리뷰

- 작성자는 구현 후 브랜치 범위 리팩토링 → 실행 검증 → 자체 코드 리뷰 → 필요한 수정과 재검증·재리뷰 →
  changeset 작성·확인 → 최종 변경 기준 PR 제목·본문 작성 순서로 준비한다. 정리할 코드가 없으면
  리팩토링은 생략하고 이유를 남긴다.
- 리뷰어는 제출된 PR의 base/head SHA를 확인하고 해당 head를 직접 실행·검증한 뒤
  코드 리뷰를 한다. 최종 승인은 사람이 판단한다.
- 자체 리뷰는 미커밋 변경도 포함할 수 있다. 제출된 PR 리뷰는 PR에 포함된 커밋만 대상으로
  하며, 리뷰어의 로컬 변경을 섞지 않는다. 기존 작업과 대상이 다르면 별도 worktree를 사용한다.
- 검증 결과에는 대상 HEAD SHA, 미커밋 포함 여부와 변경 목록, 실행 명령·결과,
  화면 재현 절차와 미확인 항목을 남긴다. 이전 실행이나 CI 결과를 직접 실행한 결과로 쓰지 않는다.
- 검증·리뷰 후 코드가 바뀌면 영향받는 검증과 리뷰를 다시 확인한다. PR 제목·본문은
  최종 diff에 맞춰 작성하고, 다른 커밋이나 작업 트리에서 얻은 결과는 구분한다.
- 공유 스킬은 `gdg-changeset`, `gdg-release-check`, `gdg-pr-description` 세 개이며,
  호출 예시는 [팀 공용 AI 스킬](docs/ai-skills.md)을 참고한다.
  리팩토링, 검증, 코드 리뷰 등의 스킬은 개인이 만들어 사용하고 커밋하지 않는다.
  개인 스킬의 유무와 관계없이 위 작업·검증 기준을 지킨다.
- 코드 리뷰·검증 요청만으로 원격 승인이나 게시를 하지 않는다.

## Changesets와 릴리스

- 패키지별 릴리스 기준·changeset 작성법·역할별 TODO·GitHub 설정은
  [릴리스 워크플로](docs/release-workflow.md)를 원본으로 사용한다.
- 기능 코드와 changeset을 함께 반영한다. 릴리스가 필요 없으면 PR에 구체적인 생략 사유를 적는다.
  버전 PR·릴리스 PR·역병합 PR은 기능 changeset 누락 안내 대상에서 제외한다.
- 버전과 CHANGELOG는 develop 대상 버전 PR에서 반영한다. main 릴리스는 같은 저장소의
  develop → main PR을 merge commit으로 병합하고, 패키지 태그·GitHub Release와 역병합을 확인한다.
- 자동화는 npm 게시나 서비스 배포를 수행하지 않는다. GitHub 설정 적용·PR 게시·병합·원격
  재실행은 해당 작업의 명시적인 요청 범위에서만 수행한다.

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

## 변경 범위

- 기존 구현과 설치된 도구를 먼저 찾고, 요청과 무관한 구조 개편이나 의존성 추가를 피한다.
- 동작이 달라지면 관련 명세·README도 같은 변경에서 갱신한다. 문서마다 규칙을 복사하기보다
  원본 파일을 링크한다.
- 패키지별 안내는 현재 이 파일과 각 원본 문서를 사용한다. 하위 `AGENTS.md`는 해당 경로에만
  필요한 작업 규칙·검증 절차가 생겼을 때 분리하고, 공통 규칙은 복사하지 않는다.
- `public` 데이터는 공개 콘텐츠다. 비밀값은 코드·문서·fixture에 기록하지 않는다.
- `.github/workflows/ci.yml`에는 다른 저장소로 강제 push하는 sync 작업이 있다.
  CI 수정 시 QA와 동기화의 영향을 구분하고, 로컬 검증에 원격 push를 포함하지 않는다.

## 작업 지침 유지보수

- 앱·패키지 추가/삭제, 폴더 구조·의존 방향, 실행·검증 명령, 공통 개발 방식이 바뀌면
  관련 `AGENTS.md`와 원본 문서를 같은 변경에서 갱신한다.
- 작업 완료 전 이번 변경과 기존 지침이 충돌하는지 확인한다. 오래된 설명은 수정하거나
  제거하고, 이번 작업에만 필요한 임시 우회책이나 미확정 제안을 공통 규칙으로 확정하지 않는다.
- 루트에는 공통 규칙과 문서 위치를 유지한다. 특정 앱·패키지만의 규칙은 필요할 때 해당 경로로
  분리하며, 버전·명령·공개 API는 원본 파일을 참조해 중복을 줄인다.
- 공유 스킬의 동작을 바꾸면 관련 README와 연결 파일을 확인한다. 스킬 이름·설명을 바꾸면
  Claude 연결 파일과 Codex용 `agents/openai.yaml`도 맞춘다.
- 읽기 전용 리뷰에서는 문서를 직접 고치지 않고, 변경으로 인해 갱신이 필요한 지침을 보고한다.
