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

## 테마와 폰트 로드

각 앱에서 Tailwind v4 빌드 설정을 활성화하고, 전역 스타일(`global.css`) 맨 위에서 테마와 폰트를 import 한다. (Vite 가 woff2 를 번들에 포함)

```css
/* apps/*/src/global.css */
@import 'tailwindcss';
@import '@gdg/wowds/fonts.css';
@import '@gdg/wowds/theme.css';

@source '../../../packages/wowds/ui';

@layer base {
  body {
    font-family: var(--font-primary);
  }
}
```

> `@font-face` 는 한 번만 등록되면 되므로, 컴포넌트가 아니라 전역 CSS 에서 로드한다.
> `body` 기본 폰트도 여기서 함께 깔아 두면 Typography 로 감싸지 않은 텍스트(input 등)도 커버된다.
> `@source` 경로는 전역 CSS 파일 기준으로 지정한다. wowds 컴포넌트의 Tailwind 클래스를 수집하는 데 사용한다.

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
  grid,
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

- 실제 색상 값과 의미 토큰의 연결은 **`theme.css`에서만 관리한다.** 컬러의 `@theme static` 선언은 TS·SVG에서만 참조하는 변수도 최종 CSS에 포함한다.
- `palette` : 원시 색상의 CSS 변수 참조. `palette.core.green[500]`, `palette.blue[500]`, `palette.gray[200]`, `palette.status.danger` …
- `color` : 용도별(의미) 토큰. **컴포넌트에서는 가급적 이쪽을 사용.**

```ts
palette.blue[500] // 'var(--color-blue-500)'
color.primary // 'var(--color-primary)'
color.sub // 'var(--color-sub)'
color.outline // 'var(--color-outline)'
color.textBlack // 'var(--color-text-black)'
color.disabled.light // 'var(--color-disabled-light)'
color.hover.blue // 'var(--color-hover-blue)'
color.pressed.blue // 'var(--color-pressed-blue)'
color.status.danger // 'var(--color-status-danger)'
```

```tsx
// Tailwind, SVG, 인라인 스타일은 같은 CSS 변수를 참조한다.
<button className="bg-primary text-text-white border border-outline">확인</button>
<circle fill={palette.blue[500]} />
<span style={{ color: color.primary }}>텍스트</span>
```

기존 `palette`·`color`의 키와 import 경로는 유지하지만, 반환값은 HEX 대신 CSS 변수 참조다.
앱에서 `theme.css`를 반드시 로드해야 하며, HEX가 필요한 색상 계산이나 외부 API에 그대로 전달할 수는 없다.
색상 변경은 `theme.css`만 수정한다. 새 토큰을 TS에서도 사용하려면 `tokens/color.ts`에 변수 참조를 추가한다.

Status 색상은 [Figma 컬러 가이드](https://www.figma.com/design/TCjm78i5DE0mf8lAVdFRVN/5.0-Renewal?node-id=168-1001)의 실제 도형 채움 색상과 변수 값을 따른다.
가이드의 HEX 텍스트는 단계마다 같은 값이 적혀 있지만, 실제 값은 아래처럼 다르며 모두 불투명한 색상이다. 단계 번호는 투명도 비율이 아니다.

| 계열        | 밝은 단계    | 중간 단계     | 기본 단계     |
| ----------- | ------------ | ------------- | ------------- |
| Danger      | 5: `#FDEFEC` | 10: `#FCDFD9` | 50: `#DE3412` |
| Warning     | 5: `#FFF3DB` | 10: `#FFE0A3` | 30: `#FFB114` |
| Success     | 5: `#EAF6EC` | 20: `#A9DAB4` | 50: `#228738` |
| Information | 5: `#E7F4FE` | 20: `#9ED2FA` | 60: `#096AB3` |

```tsx
// 단계별 색상은 palette.status와 color.status 양쪽에서 제공한다.
<div className="bg-status-danger-5 border border-status-danger-10 text-status-danger-50">
  오류가 발생했어요.
</div>
<span style={{ backgroundColor: color.status.success5, color: color.status.success50 }}>완료</span>
```

기존 `palette.status.danger`, `color.status.danger`, `bg-status-danger` 등의 이름은 기본 단계의 별칭으로 유지한다.
기본 단계는 Danger 50, Warning 30, Success 50, Information 60이다.

### breakpoint — 반응형 화면 크기

| 이름 | 범위                     | Tailwind variant |
| ---- | ------------------------ | ---------------- |
| XS   | 360px 이상, 600px 미만   | `xs:`            |
| S    | 600px 이상, 768px 미만   | `s:`             |
| M    | 768px 이상, 1024px 미만  | `m:`             |
| L    | 1024px 이상, 1440px 미만 | `l:`             |
| XL   | 1440px 이상, 상한 없음   | `xl:`            |

```ts
breakpoint.xs // { min: 360, max: 600 }
breakpoint.xl // { min: 1440, max: null }
```

`min`은 포함하고 `max`는 포함하지 않는 상한이다. 기존 정수 상한(599/767/1023/1439)을
다음 구간의 시작값(600/768/1024/1440)으로 변경해 소수점 너비에서도 구간이 끊기지 않도록 했다.
JS에서 구간을 비교할 때는 `width >= min && (max === null || width < max)`를 사용한다.

각 variant는 해당 구간에서만 적용된다. 예를 들어 `l:flex`는
1024px 이상 1440px 미만에서만 활성화되며 XL에는 이어지지 않는다.
일반 CSS에서도 `@variant m { ... }`처럼 같은 구간을 재사용할 수 있다.
360px 미만은 이름 있는 variant 없이 기본 스타일로 대응한다.

### grid — 반응형 레이아웃

[Figma 그리드 가이드](https://www.figma.com/design/TCjm78i5DE0mf8lAVdFRVN/5.0-Renewal?node-id=168-738)의 설명을 기준으로 정리했다.
S 여백은 설명의 20px을, M 여백은 실제 그리드·변수와 일치하는 24px을 사용한다.
XL은 1920px을 초과해도 같은 규칙을 유지한다.

| 구간 | 컬럼 수 | 좌우 여백 / 컨테이너 너비 | Gutter |
| ---- | ------- | ------------------------- | ------ |
| XS   | 4       | 여백 16px                 | 16px   |
| S    | 8       | 여백 20px                 | 16px   |
| M    | 8       | 여백 24px                 | 20px   |
| L    | 12      | 여백 28px                 | 20px   |
| XL   | 12      | 중앙 컨테이너 1280px      | 24px   |

XL Admin은 사이드바 250px, 콘텐츠 12컬럼, 콘텐츠 좌우 패딩 48px, Gutter 24px이다.
콘텐츠 너비는 화면 너비에서 사이드바를 뺀 나머지로, 고정값 토큰을 두지 않는다.

값은 `theme.css`의 `--grid-*` 변수가 원본이며, TS `grid`는 CSS 변수 참조를 제공한다.
`columns`는 단위 없는 컬럼 수이고 나머지 길이는 px 단위다. 토큰 자체가 레이아웃을 자동 적용하지는 않는다.

```tsx
import { grid } from '@gdg/wowds/tokens'

// M 그리드의 스타일을 직접 적용하는 예시
<div
  style={{
    display: 'grid',
    gridTemplateColumns: `repeat(${grid.m.columns}, minmax(0, 1fr))`,
    columnGap: grid.m.gutter,
    paddingInline: grid.m.margin,
  }}
/>

// XL Admin 사이드바 너비
<aside style={{ width: grid.xl.admin.sidebarWidth }} />
```

Tailwind에서는 같은 CSS 변수와 구간 variant를 조합한다. 예를 들어 반응형 콘텐츠 컨테이너는:

```tsx
<div
  className="mx-auto w-full px-(--grid-xs-margin) s:px-(--grid-s-margin)
    m:px-(--grid-m-margin) l:px-(--grid-l-margin)
    xl:max-w-(--grid-xl-container-width) xl:px-0"
>
  콘텐츠
</div>
```

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
├── theme.css              # 컬러·그리드 값과 Tailwind 테마
├── fonts.css              # @font-face (앱 전역 import)
├── fonts/                 # 벤들된 woff2 + OFL 라이선스
│   ├── *.woff2
│   └── licenses/
├── tokens/                # 디자인 토큰
│   ├── color.ts
│   ├── breakpoint.ts
│   ├── grid.ts
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

import 경로: `@gdg/wowds`(전체) · `@gdg/wowds/tokens` · `@gdg/wowds/ui` · `@gdg/wowds/icon` · `@gdg/wowds/theme.css` · `@gdg/wowds/fonts.css`
