# 팀 공용 AI 스킬

이 저장소의 PR 준비·리뷰·릴리스 점검에 사용하는 스킬입니다. 스킬별 상세 절차는 아래 원본을 참고합니다.

| 스킬                                                                | 하는 일                                                                                   |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [gdg-refactor](../.agents/skills/gdg-refactor/SKILL.md)             | 브랜치 변경에서 외부 동작을 유지하며 중복과 불필요한 복잡성을 줄입니다.                   |
| [gdg-changeset](../.agents/skills/gdg-changeset/SKILL.md)           | 실제 변경에 맞는 패키지·증가 종류·설명을 changeset으로 작성하거나 생략 사유를 정리합니다. |
| [gdg-verify](../.agents/skills/gdg-verify/SKILL.md)                 | 브랜치나 PR을 직접 실행하고 검증 대상·명령·재현 절차·결과를 남깁니다.                     |
| [gdg-code-review](../.agents/skills/gdg-code-review/SKILL.md)       | 브랜치 자체 리뷰와 제출된 PR에서 새로 생긴 결함을 읽기 전용으로 검토합니다.               |
| [gdg-pr-description](../.agents/skills/gdg-pr-description/SKILL.md) | 실제 diff와 저장소 PR 템플릿을 바탕으로 PR 제목과 해요체 본문을 작성합니다.               |
| [gdg-release-check](../.agents/skills/gdg-release-check/SKILL.md)   | develop → main 준비 상태와 병합 후 태그·Release·역병합을 읽기 전용으로 점검합니다.        |

## 작성자의 PR 준비

구현·관련 문서 갱신 → 브랜치 범위 리팩토링 → changeset 작성 → 실행 검증 → 자체 코드 리뷰 → 필요한 수정·재검증 →
최종 변경 기준 PR 제목·본문 작성 순서로 진행합니다. 정리할 코드가 없으면 리팩토링은 생략합니다.
코드가 바뀌면 영향받는 검증과 리뷰를 다시 확인하고, PR 본문에는 최종 대상과 맞는 결과를 적습니다.

```text
$gdg-refactor 현재 브랜치를 develop 기준으로 확인하고 PR 전에 리팩토링해줘.
$gdg-changeset 현재 브랜치를 develop 기준으로 확인하고 changeset을 작성해줘.
$gdg-verify 현재 브랜치를 직접 실행해 검증하고 재현 절차와 결과를 남겨줘.
$gdg-code-review 현재 브랜치를 develop 기준으로 자체 리뷰해줘.
$gdg-pr-description 최종 변경과 실제 검증 결과를 바탕으로 PR 제목과 본문을 작성해줘.
```

각 명령은 해당 단계만 요청합니다. 리팩토링·changeset 작성·자체 리뷰·실행 검증은 미커밋 변경도 기본 포함하고,
PR 제목·본문 작성은 커밋된 변경을 기본으로 합니다. PR 작성에 작업 중인 파일도 포함하려면
`미커밋 변경 포함`을, 앞 단계에서 제외하려면 `커밋된 변경만`을 덧붙이세요.
작성 전 최종 코드가 커밋되어 있는지와 검증 결과가 그 코드에 해당하는지 확인합니다.

## 리뷰어의 PR 검토

제출된 PR의 base/head SHA 확인 → 해당 head 직접 실행·검증 → 코드 리뷰 → 사람의 승인 또는
수정 요청 순서입니다. 실행 검증에는 `gdg-verify`, 코드 검토에는 `gdg-code-review`를 사용합니다.
PR 링크나 번호를 함께 전달하고, 둘 다 요청하려면 `이 PR을 직접 실행해 검증한 뒤 코드 리뷰해줘`라고
요청합니다. 코드 리뷰만 요청한 결과는 직접 실행까지 완료했다는 뜻이 아닙니다.

PR 검토에는 리뷰어의 로컬 변경을 섞지 않습니다. 실행 대상이 현재 작업 트리와 다르면
별도 worktree를 사용하며, 준비·정리와 기록 방법은 실행 검증 스킬을 따릅니다.
새 커밋이 올라오면 영향받는 검증과 리뷰를 다시 확인합니다. 결함을 찾지 못한 결과나 빌드 통과만으로
승인을 대신하지 않으며, 최종 승인은 사람이 판단합니다.

검증 결과는 [PR 템플릿](../.github/pull_request_template.md)에 대상 커밋, 실행 명령과 결과,
화면 재현 절차, 미확인 항목을 남깁니다. 상세 검증·지침 갱신 규칙은 [AGENTS.md](../AGENTS.md)를 따릅니다.

## 릴리스 담당자의 점검

버전 PR → develop 병합 → develop → main 릴리스 PR → main CI·태그·Release 확인 →
main → develop 역병합 순서입니다. 자동 검사 결과와 실제 대상 커밋을 함께 확인합니다.

```text
$gdg-release-check develop에서 main으로 릴리스할 준비 상태와 남은 TODO를 확인해줘.
$gdg-release-check 이번 main 릴리스의 태그·GitHub Release와 develop 역병합 상태를 확인해줘.
```

점검은 커밋된 릴리스 대상을 읽기 전용으로 확인합니다. 상세 절차와 역할별 TODO,
자동화 활성화에 필요한 저장소 설정은 [릴리스 워크플로](release-workflow.md)를 따릅니다.

## 스킬 관리와 호출

공유 본문은 `.agents/skills/`에서 관리하고, `.claude/skills/`에는 해당 본문을 읽도록 하는
짧은 연결 파일을 둡니다. 동작을 수정할 때는 공유 본문을 고치고, 이름·설명을 바꿀 때는
Claude 연결 파일과 Codex용 `agents/openai.yaml`도 맞춥니다. 변경은 저장소의 공유 본문을 기준으로 관리합니다.

팀에 배포하려면 `.agents/skills/`, `.claude/skills/`와 참조하는 `AGENTS.md`·문서를 함께
커밋해 공유합니다. Changesets 관련 스크립트·설정·의존성도 함께 반영하고 지정된 pnpm으로 설치합니다.
팀원은 해당 변경을 받은 뒤 이 저장소 루트를 작업 폴더로 열면 됩니다.
패키지마다 같은 스킬을 복사할 필요는 없습니다.

| 도구        | 호출 방법                                                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | 위 예시처럼 `$gdg-refactor`, `$gdg-changeset`, `$gdg-verify`, `$gdg-code-review`, `$gdg-pr-description`, `$gdg-release-check` 사용 |
| Claude Code | `/gdg-refactor`, `/gdg-changeset`, `/gdg-verify`, `/gdg-code-review`, `/gdg-pr-description`, `/gdg-release-check` 사용             |
| Antigravity | `gdg-verify 스킬로 현재 브랜치를 직접 실행해 검증해줘`처럼 스킬 이름을 포함해 요청                                                 |

코드 리뷰는 원본의 명시 호출 설정을 유지합니다. Codex에서는 `$gdg-code-review`,
Claude Code에서는 `/gdg-code-review`로 호출하세요. Antigravity에서는 스킬 이름을 포함해
리뷰를 요청하세요. 다른 스킬은 해당 작업 설명에 따라 자동 선택될 수도 있습니다.
스킬 호출만으로 커밋·push, 리뷰 댓글·승인, PR 제목·본문의 원격 게시를 수행하지 않습니다.
