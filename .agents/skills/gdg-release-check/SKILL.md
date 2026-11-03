---
name: gdg-release-check
description: GDG Hongik의 develop에서 main으로 릴리스할 준비 상태와 병합 후 태그·Release·역병합 상태를 읽기 전용으로 확인해요. '릴리스 준비 확인', 'develop main 병합 전 점검', '릴리스 완료 확인' 요청에 사용해요. PR 생성·병합·태그 게시에는 사용하지 않아요.
---

# 릴리스 점검

자동화의 기존 검사와 실제 diff·CI 결과를 연결해 완료 항목과 남은 TODO를 정리해요.
절차·설정 원본은 `docs/release-workflow.md`, `.changeset/config.json`,
`.github/workflows/ci.yml`, `.github/workflows/release-pr.yml`이에요.
검사를 위해 파일·버전·태그·브랜치·PR을 변경하지 않아요.

## 대상 확인

- `AGENTS.md`, 작업 트리 상태와 HEAD, 실제 대상 저장소를 확인해요. 사용자 지정 ref·PR을
  우선하고, 없으면 확인 가능한 main/develop ref를 사용해 정확한 base/head SHA를 기록해요.
  fetch하지 않은 ref를 최신 원격이라고 부르지 않아요.
- 릴리스 대상은 커밋된 develop head예요. 로컬 미커밋 변경은 따로 나열하고 포함하지 않아요.
  대상과 작업 트리가 다르면 `gdg-verify`의 별도 worktree 절차로 대상 SHA 환경을 준비해요.
  대상 SHA에 검사 도구가 없으면 준비되지 않은 항목으로 보고해요.

## 병합 전

- 같은 저장소의 develop → main PR인지, 버전 PR이 최신 변경을 반영했는지 확인해요.
- 대상 환경에서 `pnpm changeset:check`, `pnpm changeset status --verbose`,
  `pnpm release:check <main-sha> <develop-sha>`를 실행해요. 버전 계산을 별도로 구현하지 않아요.
  미반영 changeset, 패키지별 증가 종류·CHANGELOG·lockfile과 소비 앱 영향을 실제 diff로 확인해요.
- `QA & Build Verification`, `Release PR Metadata`의 결과가 해당 PR의 최신 head에 대한 것인지
  확인해요. 실행 중·미실행·실패·접근 불가를 통과와 구분해요. 원격 결과와 로컬 실행도 구분해요.
- merge commit 방식과 저장소 설정의 미확인 항목을 남겨요. 자동 검사가 놓칠 수 있는
  changeset 누락·잘못된 설명은 실제 기능 diff와 대조해요.

## 병합 후 요청

- main의 실제 병합 SHA와 그 SHA의 CI·릴리스 작업 결과를 확인해요.
- 예상한 패키지 태그·GitHub Release가 존재하고, 태그가 버전을 반영한 main 병합 커밋을
  가리키는지 확인해요. Release 설명은 그 태그의 CHANGELOG 항목과 비교해요.
- main → develop 역병합 반영 여부를 확인해요. 브랜치 이름 대신 대상 커밋의 ancestry로 판단해요.
- 실패한 작업의 재실행은 방법만 안내해요. 점검 요청으로 workflow dispatch·원격 게시·병합을
  실행하지 않아요. 서비스 배포는 릴리스 완료와 별도로 확인해요.

검사 대상 SHA와 로컬 미커밋 제외 목록, 실행 명령·결과, 확인한 원격 결과,
완료 항목·남은 TODO를 전달해요. 종료 시 base/head가 바뀌었으면 이전 결과를 최신으로 쓰지 않아요.
