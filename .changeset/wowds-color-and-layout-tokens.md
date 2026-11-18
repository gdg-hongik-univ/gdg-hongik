---
'@gdg/wowds': major
---

색상 토큰 `palette`와 `color`를 HEX 문자열에서 `var(--color-…)` 참조로 전환했어요. 소비 앱에서 `@gdg/wowds/theme.css`를 불러오고 SVG나 인라인 스타일에 토큰을 전달하세요. 실제 색상 값이 필요한 브라우저 코드에서는 `getComputedStyle`로 CSS 변수 값을 읽으세요.

각 `breakpoint` 구간은 `min` 이상, `max` 미만이에요. 너비를 직접 비교하는 코드는 `width <= max`를 `width < max`로 바꾸고 `max: null`은 상한이 없는 경우로 처리하세요. 공유 Tailwind variant도 같은 경계를 사용해요. 구간별 `grid` 토큰과 상태 색상 단계를 추가했어요.
