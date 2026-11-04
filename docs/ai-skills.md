# 팀 공용 AI 스킬

저장소에는 changeset 작성, 릴리스 점검, PR 제목·본문 작성에 사용하는 세 스킬만 공유합니다.
리팩토링, 실행 검증, 코드 리뷰 등에 쓸 스킬은 각자 만들어 사용하고 커밋하지 않습니다.
스킬 선택과 구성은 개인이 정하며, 공통 작업·검증 기준은 [AGENTS.md](../AGENTS.md)를 따릅니다.

changeset 작성과 PR 제목·본문 작성은 비교 기준을 따로 지정하지 않으면 확인 가능한 PR 대상을 우선하고,
없으면 `develop`을 사용합니다.
스택 PR도 해당 PR의 실제 대상 브랜치를 기준으로 확인하며, 사용자가 지정한 비교 기준이 있으면 우선합니다.

| 스킬                                                                | 하는 일                                                                                   |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [gdg-changeset](../.agents/skills/gdg-changeset/SKILL.md)           | 실제 변경에 맞는 패키지·증가 종류·설명을 changeset으로 작성하거나 생략 사유를 정리합니다. |
| [gdg-release-check](../.agents/skills/gdg-release-check/SKILL.md)   | develop → main 준비 상태와 병합 후 태그·Release·역병합을 읽기 전용으로 점검합니다.        |
| [gdg-pr-description](../.agents/skills/gdg-pr-description/SKILL.md) | 실제 diff와 PR 템플릿을 바탕으로 PR 제목과 짧고 명확한 한국어 해요체 본문을 작성합니다.   |

## Changeset 작성

리뷰와 수정·재검증을 마친 최종 변경을 기준으로 요청합니다.
기본적으로 관련 미커밋·미추적 변경도 포함하며, HEAD까지만 확인하려면 `커밋된 변경만`을 덧붙입니다.

```text
$gdg-changeset 현재 브랜치의 PR 대상과 비교 기준을 확인하고 changeset을 작성해줘.
```

릴리스 대상·버전 증가 기준, CLI 사용법과 생략 사유는 [릴리스 워크플로](release-workflow.md#changeset-작성)를 따릅니다.

## 릴리스 점검

```text
$gdg-release-check develop에서 main으로 릴리스할 준비 상태와 남은 TODO를 확인해줘.
$gdg-release-check 이번 main 릴리스의 태그·GitHub Release와 develop 역병합 상태를 확인해줘.
```

점검은 커밋된 릴리스 대상을 읽기 전용으로 확인하며, 로컬 미커밋 변경은 제외합니다.
상세 절차와 역할별 TODO, 저장소 설정은 [릴리스 워크플로](release-workflow.md)를 따릅니다.

## PR 제목과 본문 작성

```text
$gdg-pr-description 현재 브랜치의 PR 대상과 비교 기준을 확인하고 PR 제목과 본문을 작성해줘.
```

기본 범위는 커밋된 변경입니다. 작업 중인 파일도 포함하려면 `미커밋 변경 포함`을 덧붙입니다.
최종 diff와 실제 검증 결과를 기준으로 작성하며, 원격 PR에 게시하지 않습니다.
사용자가 지정한 제목이 PR 대상의 제목 규칙과 충돌하면, 지정 제목과 규칙에 맞춘 후보를 함께 제공합니다.

## 스킬 관리와 호출

공유 본문은 `.agents/skills/` 아래 세 공유 스킬 디렉터리에서 관리합니다.
`.claude/skills/`에는 같은 이름의 공유 본문을 읽는 연결 파일을 둡니다.
이 세 스킬과 연결 파일, 참조하는 `AGENTS.md`·문서만 커밋합니다.
스킬 이름·설명을 바꾸면 Claude 연결 파일과 Codex용 `agents/openai.yaml`도 맞춥니다.

그 밖의 개인 스킬은 저장소 밖에서 관리하거나 로컬에만 둡니다.
저장소의 `.agents/skills/`, `.claude/skills/`에서는 세 공유 스킬 외의 디렉터리를
`.gitignore`로 제외하며, 강제 추가하지 않습니다.

| 도구        | 호출 방법                                                                          |
| ----------- | ---------------------------------------------------------------------------------- |
| Codex       | `$gdg-changeset`, `$gdg-release-check`, `$gdg-pr-description`                      |
| Claude Code | `/gdg-changeset`, `/gdg-release-check`, `/gdg-pr-description`                      |
| Antigravity | `gdg-release-check 스킬로 릴리스 준비 상태를 확인해줘`처럼 스킬 이름을 포함해 요청 |

스킬 호출만으로 커밋·push·PR 게시·병합·태그 게시를 수행하지 않습니다.
