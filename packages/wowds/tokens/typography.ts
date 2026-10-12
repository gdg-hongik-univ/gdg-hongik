// 타이포그래피 토큰 (Figma 5.0 Renewal, 반응형 스케일). 사용법은 README 참고.

/** 폰트 패밀리. family 이름은 fonts.css 의 @font-face 와 일치. */
export const fontFamily = {
  /** 한글·UI 전역 기본 서체 */
  primary: "'SUIT Variable', 'Apple SD Gothic Neo', system-ui, sans-serif",
  /** 영문·타이틀 서체 */
  title: "'Google Sans Flex Variable', 'Google Sans', 'Roboto', system-ui, sans-serif",
  /** 코드 서체 */
  code: "'Google Sans Code Variable', ui-monospace, 'SFMono-Regular', monospace",
} as const

/** 폰트 굵기. 굵기는 스케일과 독립된 축이므로 typography 와 조합해 쓴다. */
export const fontWeight = {
  bold: 700,
  semibold: 600,
  medium: 500,
} as const

/**
 * 반응형 타이포그래피. 크기는 theme.css의 CSS 변수로 화면 너비에 따라 자동 전환된다.
 * Small: XS, Medium: S·M, Large: L·XL. 자간은 일괄 -0.015em.
 * 굵기(fontWeight)는 포함하지 않는다 — fontWeight 토큰과 조합한다.
 */
export const typography = {
  display1: { fontSize: 'var(--text-display1)', lineHeight: '140%', letterSpacing: '-0.015em' },
  display2: { fontSize: 'var(--text-display2)', lineHeight: '140%', letterSpacing: '-0.015em' },
  display3: { fontSize: 'var(--text-display3)', lineHeight: '140%', letterSpacing: '-0.015em' },

  title1: { fontSize: 'var(--text-title1)', lineHeight: '140%', letterSpacing: '-0.015em' },
  title2: { fontSize: 'var(--text-title2)', lineHeight: '140%', letterSpacing: '-0.015em' },

  subtitle1: { fontSize: 'var(--text-subtitle1)', lineHeight: '150%', letterSpacing: '-0.015em' },
  subtitle2: { fontSize: 'var(--text-subtitle2)', lineHeight: '150%', letterSpacing: '-0.015em' },
  subtitle3: { fontSize: 'var(--text-subtitle3)', lineHeight: '150%', letterSpacing: '-0.015em' },
  subtitle4: { fontSize: 'var(--text-subtitle4)', lineHeight: '150%', letterSpacing: '-0.015em' },

  body1: { fontSize: 'var(--text-body1)', lineHeight: '150%', letterSpacing: '-0.015em' },
  body2: { fontSize: 'var(--text-body2)', lineHeight: '150%', letterSpacing: '-0.015em' },

  caption1: { fontSize: 'var(--text-caption1)', lineHeight: '150%', letterSpacing: '-0.015em' },
  caption2: { fontSize: 'var(--text-caption2)', lineHeight: '150%', letterSpacing: '-0.015em' },
} as const
