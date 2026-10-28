# @gdg/wowds

WOW Design System — 모노레포 전역 공유 디자인 시스템. 도메인(랜딩/온보딩/스터디) 무관한 순수 UI·토큰을 둔다.

## 설치

워크스페이스 패키지이므로 앱의 `package.json` 에 추가한다.

```jsonc
{
  "dependencies": {
    "@gdg/wowds": "workspace:*",
  },
}
```

## 폰트 로드

각 앱의 전역 스타일(`global.css`) 맨 위에서 **항상** import 한다. (Vite 가 woff2 를 번들에 포함)

```css
/* apps/*/src/global.css */
@import '@gdg/wowds/fonts.css';

body {
  font-family: 'SUIT Variable', 'Apple SD Gothic Neo', system-ui, sans-serif;
}
```

> `@font-face` 는 한 번만 등록되면 되므로, 컴포넌트가 아니라 전역 CSS 에서 로드한다.
> `body` 기본 폰트도 여기서 함께 깔아 두면 Typography 로 감싸지 않은 텍스트(input 등)도 커버된다.

번들된 폰트 (모두 가변폰트 / SIL Open Font License):

| family 토큰          | @font-face family             | 용도        |
| -------------------- | ----------------------------- | ----------- |
| `fontFamily.primary` | `'SUIT Variable'`             | 한글·UI     |
| `fontFamily.title`   | `'Google Sans Flex Variable'` | 영문·타이틀 |
| `fontFamily.code`    | `'Google Sans Code Variable'` | 코드        |

> 한글은 SUIT 가 커버한다. Google Sans Flex/Code 는 영문용.
> 라이선스 원문: [`fonts/licenses/`](./fonts/licenses)

## 토큰

```ts
import {
  breakpoint,
  color,
  palette,
  typography,
  fontFamily,
  fontWeight,
  space,
} from '@gdg/wowds/tokens'
// 또는: import { color, ... } from '@gdg/wowds'
```

### color — 2계층

- `palette` : 원시 색상 (SSOT). `palette.core.green[500]`, `palette.blue[500]`, `palette.gray[200]`, `palette.status.danger` …
- `color` : 용도별(의미) 토큰. **컴포넌트에서는 가급적 이쪽을 사용.**

```ts
color.primary // #4285F4 (palette.blue[500])
color.sub // #58616A
color.outline // #CDD1D5
color.textBlack // #080808
color.disabled.light // #F4F5F6
color.hover.blue // #2170F2
color.pressed.blue // #659BF6
color.status.danger // #DE3412
```

> Status(danger/warning/success/information)는 베이스 색만 정의. Figma 의 농도 단계(50/10/5)는 동일 색 변형이라 생략했다.

### breakpoint — 반응형 화면 크기

| 이름 | 범위        | Tailwind variant |
| ---- | ----------- | ---------------- |
| XS   | 360–599px   | `xs:`            |
| S    | 600–767px   | `s:`             |
| M    | 768–1023px  | `m:`             |
| L    | 1024–1439px | `l:`             |
| XL   | 1440px 이상 | `xl:`            |

```ts
breakpoint.xs // { min: 360, max: 599 }
breakpoint.xl // { min: 1440, max: null }
```

각 variant는 최소 너비 방식이 아니라 해당 구간에서만 적용된다. 예를 들어 `l:flex`는
1024–1439px에서만 활성화되며 XL에는 이어지지 않는다.

### typography — 반응형 스케일

스케일: `display1~3`, `title1~2`, `subtitle1~4`, `body1~2`, `caption1~2`.
각 스타일은 크기·모양만 정의한다 — `fontSize / lineHeight / letterSpacing` (letter-spacing 은 전 스타일 `-0.015em`).

전역 CSS에서 Tailwind와 함께 테마를 import 한다. TS 토큰은 테마의 CSS 변수를 참조하므로
`Typography`, 인라인 `typography` 스타일, Tailwind `text-*` 클래스 모두 화면 너비에 따라 자동 전환된다.

```css
@import 'tailwindcss';
@import '@gdg/wowds/theme.css';
```

| 타이포                 | Large (L·XL, 1024px 이상) | Medium (S·M, 600–1023px) | Small (XS, 599px 이하) |
| ---------------------- | ------------------------- | ------------------------ | ---------------------- |
| Display 1 / 2 / 3      | 52 / 48 / 44              | 44 / 40 / 36             | 36 / 32 / 30           |
| Title 1 / 2            | 36 / 32                   | 32 / 28                  | 28 / 26                |
| Subtitle 1 / 2 / 3 / 4 | 28 / 24 / 22 / 20         | 24 / 22 / 20 / 18        | 24 / 22 / 20 / 18      |
| Body 1 / 2             | 18 / 16                   | 16 / 14                  | 16 / 14                |
| Caption 1 / 2          | 14 / 12                   | 12 / 10                  | 12 / 10                |

크기 단위는 px. 360px 미만에서도 Small을 유지한다.
Display·Title의 행간은 140%, 나머지는 150%다.
명시적인 `style.fontSize`나 `text-[…]!` 등 크기 재정의는 자동 스케일보다 우선한다.

**굵기(fontWeight)는 스케일과 독립된 축**이라 따로 조합한다. (`bold` 700 / `semibold` 600 / `medium` 500)
`fontFamily`와 `fontWeight` 토큰은 `theme.css`의 CSS 변수를 참조하는 문자열이며, 값은 테마에서 관리한다.
Figma 의 `body2.2`(body2 + SemiBold) 같은 변형은 이렇게 표현된다:

```tsx
// body2 + semibold
<span style={{ fontFamily: fontFamily.primary, ...typography.body2, fontWeight: fontWeight.semibold }}>
  텍스트
</span>

// 제목 (영문 family + semibold)
<h1 style={{ fontFamily: fontFamily.title, ...typography.display1, fontWeight: fontWeight.semibold }}>
  제목
</h1>
```

조합이 번거로우면 Typography 컴포넌트로 감싼다:

```tsx
<Typography variant="body2.2">텍스트</Typography>
```

스타일별 사용 가능 굵기 (Figma `.1/.2/.3`):

| 스케일                    | bold(.1) | semibold(.2) | medium(.3) |
| ------------------------- | :------: | :----------: | :--------: |
| Display / Title           |    ✓     |      ✓       |     —      |
| Subtitle / Body / Caption |    ✓     |      ✓       |     ✓      |

> 위 굵기 표는 한글 기준이다. 영문(`isEn`)은 `.1`이 600, `.2`가 500이며, 피그마의 Caption은 1만 정의되어 있다.
> KO/EN의 크기·행간은 동일하게 통합하고, 폰트 family와 굵기로 구분한다.

## 구조

```
packages/wowds/
├── fonts.css              # @font-face (앱 전역 import)
├── fonts/                 # 벤들된 woff2 + OFL 라이선스
│   ├── *.woff2
│   └── licenses/
├── tokens/                # 디자인 토큰
│   ├── color.ts
│   ├── typography.ts
│   ├── space.ts
│   └── index.ts
├── ui/                    # 컴포넌트
│   ├── components/        # Typography …
│   ├── hooks/
│   ├── utils/
│   └── index.ts
├── icon/                  # 아이콘 (예정)
├── docs/
└── index.ts               # 전체 barrel
```

import 경로: `@gdg/wowds`(전체) · `@gdg/wowds/tokens` · `@gdg/wowds/ui` · `@gdg/wowds/icon` · `@gdg/wowds/fonts.css` · `@gdg/wowds/theme.css`
