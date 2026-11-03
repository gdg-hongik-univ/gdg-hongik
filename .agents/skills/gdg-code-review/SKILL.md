---
name: gdg-code-review
description: GDG Hongik의 브랜치 자체 리뷰나 제출된 PR·커밋·미커밋 변경에서 재현 가능한 결함을 읽기 전용으로 검토해요. '자체 코드 리뷰', '이 PR 코드 리뷰', 'develop 기준 리뷰' 요청에 사용해요. 일반 구현이나 PR 본문 작성에는 사용하지 않아요.
---

# GDG 코드 리뷰

Inspect the requested target directly and return every finding that the author would likely fix.
Keep the code review read-only. Do not edit source or documentation, create commits, push branches,
post review comments, or delegate the review to another agent.

## Review the change

1. Read the applicable `AGENTS.md` instructions.
2. Inspect the complete diff for the requested target and enough surrounding code to understand
   each changed path.
3. Identify concrete regressions introduced by the change. Continue through the whole diff after
   finding the first issue.
4. Check the relevant tests and call sites to confirm that each finding is real and actionable.

## 비교 범위

- `git status --short`, 현재 브랜치와 요청 범위를 먼저 확인한다. 명시된 기준과 확인 가능한
  PR 대상을 우선하고, 둘 다 없으면 이 저장소의 `develop`을 사용한다.
- 로컬 기준 브랜치와 upstream을 확인한다. upstream이 로컬보다 앞서면 upstream을,
  그렇지 않으면 로컬을 사용한다. 사용자가 정확한 ref를 지정했다면 그대로 사용한다.
  로컬 브랜치를 해석할 수 없으면 해당 기준 브랜치의 `branch.<name>.remote`와
  `branch.<name>.merge` 설정으로 upstream ref를 직접 확인하고, 설정이 없으면 해당 원격 추적
  ref도 확인한다. 현재 feature 브랜치의 upstream을 `develop`의 upstream으로 혼동하지 않는다.
  사용할 ref를 모두 확인한 뒤에만 기준을 찾을 수 없다고 보고한다.
  fetch하지 않았다면 최신 원격이라고 단정하지 않는다.
- 현재 브랜치 자체 리뷰는 `git merge-base HEAD <comparison-ref>`로 공통 조상을 구한 뒤
  `git diff <merge-base-sha>`를 읽는다. 커밋된 변경과 staged·unstaged 변경을 함께 포함하고,
  `git ls-files --others --exclude-standard`로 미추적 파일도 확인해 필요한 내용을 직접 읽는다.
  커밋된 변경만 요청하면 `git diff <merge-base-sha> HEAD`를 사용한다.
- 제출된 PR 리뷰는 실제 대상 저장소와 PR의 base/head SHA를 확인하고
  `git merge-base <base-sha> <head-sha>`를 구한 뒤 `git diff <merge-base-sha> <head-sha>`를 읽는다.
  현재 로컬 HEAD나 리뷰어의 미커밋 변경을 PR 범위에 섞지 않는다. 주변 코드도 PR head 기준으로
  읽으며, 현재 작업 트리가 다르면 `git show <head-sha>:<path>` 등으로 확인한다.
  PR 정보를 확인할 수 없으면 필요한 ref나 SHA를 요청하고, 로컬 브랜치로 임의 대체하지 않는다.
- 미커밋 리뷰는 `git diff HEAD`와 `git ls-files --others --exclude-standard`를 함께 확인한다.
  미추적 파일은 필요한 내용을 직접 읽는다. staged만 요청하면 `git diff --cached`를 사용한다.
- 커밋 리뷰는 지정한 커밋의 부모 대비 변경을 읽는다. merge commit은 어떤 부모 기준인지 밝힌다.
- 브랜치 리뷰에 미커밋 변경이 있으면 커밋된 변경과 구분해 검토한다.
  요청 범위의 diff와 미추적 파일이 모두 없으면 변경 없음이라고 보고하고
  기존 코드에서 억지로 결함을 찾지 않는다.
- 시작한 작업 디렉터리는 바꾸지 않는다. 원본 파일을 수정하거나 checkout·stash·reset으로
  비교 환경을 만들지 않는다.
- 직접 실행도 요청받았다면 실행 검증은 `gdg-verify` 절차로 대상 head와 일치하는 환경에서
  수행하고, 코드 리뷰는 그 head의 diff를 검토한다. 코드 리뷰만 요청받으면 설치·실행까지
  했다고 쓰지 않는다. PR base/head가 바뀌면 변경된 범위와 기존 결과의 유효성을 다시 확인한다.

## 결함 판단 기준

Flag an issue only when all of these are true:

- It affects correctness, security, performance, or maintainability in a meaningful way.
- It is discrete and actionable.
- It was introduced by the reviewed change.
- The affected scenario or call path can be demonstrated from the code.
- The author would probably fix it if they knew about it.

Do not flag speculative concerns, pre-existing problems, intentional behavior changes, or style
nits that do not obscure the code.

## 이 저장소에서 확인할 영향

변경에 관련된 항목만 확인하고, 상세 규칙과 명령은 저장소 루트의 `AGENTS.md`를 따른다.
아래 문서 경로는 모두 저장소 루트 기준이다.

- `apps/landing`: `docs/landing-spec.md`와 실제 호출부를 확인한다. 모집·탭·모달,
  로딩·오류·빈 결과, 날짜 경계, 키보드 접근성 중 변경의 영향을 받는 동작을 살핀다.
- `packages/wowds`: `packages/wowds/README.md`의 공개 API와 랜딩 소비 코드를 함께 본다.
  반응형 variant가 구간 한정이라는 점과 Typography의 자동 반응형 동작을 고려한다.
- `packages/config`: 상속하는 앱·패키지에 미치는 ESLint·TypeScript 영향을 함께 확인한다.
- 공개 JSON 변경은 소비하는 API·타입·화면을 함께 확인한다. 이벤트 카드와 타임라인의
  데이터 경로가 다르므로 한쪽만 확인하고 호환된다고 판단하지 않는다.
- `docs/repository-review.md`는 과거 분석 기록이다. 기존 문제를 이번 변경의 새 결함으로
  보고하지 않는다. `docs/landing-spec.md`의 개선 제안·운영 확인·디자인 확인 항목도
  확정된 요구사항으로 간주하지 않는다.
- 필요한 검증은 현재 정의된 명령으로 실행하고 실행 여부와 결과를 정확히 기록한다.
  자동 테스트가 존재한다고 가정하지 않고, 로컬 검증에 원격 동기화 작업을 포함하지 않는다.
- 구조·패키지·명령·개발 방식 변경이 관련 `AGENTS.md`, README와 공개 사용법에도 반영됐는지
  확인한다. 실제 작업에 영향을 주는 누락을 구체적인 근거로 보고하고 문서는 직접 수정하지 않는다.
- 릴리스에 영향이 있는 변경은 `docs/release-workflow.md`를 기준으로 이번 PR의 changeset 대상,
  증가 종류와 설명을 실제 diff에 대조한다. 생략 사유의 타당성과 공개 API 호환성도 확인한다.
  의존 패키지의 자동 버전 증가를 직접 changeset 누락으로 단정하지 않고 CLI 설정과 결과를 확인한다.

## Write the result

한국어로 결과를 작성한다. 시작 부분에 비교 base/head SHA와 미커밋 포함 여부를 짧게 밝힌다.
자체 리뷰에 미커밋 변경이 있으면 변경 목록과 해당 작업 트리를 검토했다는 점을 남긴다.

Present findings first, ordered by severity. Use one entry per issue in this form:

`[P1] Imperative finding title — path/to/file.tsx:line`

Follow the title with one short paragraph explaining the affected scenario and why the behavior is
wrong. Keep the cited range as small as possible and make sure it overlaps the reviewed diff.

Use these priorities:

- `P0`: universal release blocker or critical failure.
- `P1`: urgent defect that should be fixed next.
- `P2`: ordinary defect that should be fixed.
- `P3`: low-impact issue that is still worth fixing.

If there are no qualifying findings, say `새로 도입된 결함을 찾지 못했어요.` Do not invent a finding to fill the result.
After the findings, add a brief overall assessment and mention any material test gaps or residual
risks.

실행 검증은 대상 커밋과 실제 확인한 범위를 함께 적고, 결과가 없으면 미실행으로 구분한다.
작성자가 제공한 결과와 리뷰어가 직접 실행한 결과를 구분한다. 결함을 찾지 못했다는 결과를
실행 검증 통과나 PR 승인으로 표현하지 않는다. 승인 여부는 사람이 판단한다.
