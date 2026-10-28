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
 * 크기·행간·자간은 theme.css의 CSS 변수를 참조하며, 크기는 화면 너비에 따라 자동 전환된다.
 * Small: XS, Medium: S·M, Large: L·XL. 자간은 일괄 -0.015em.
 * 굵기(fontWeight)는 포함하지 않는다 — fontWeight 토큰과 조합한다.
 */
export const typography = {
  display1: {
    fontSize: 'var(--text-display1)',
    lineHeight: 'var(--text-display1--line-height)',
    letterSpacing: 'var(--text-display1--letter-spacing)',
  },
  display2: {
    fontSize: 'var(--text-display2)',
    lineHeight: 'var(--text-display2--line-height)',
    letterSpacing: 'var(--text-display2--letter-spacing)',
  },
  display3: {
    fontSize: 'var(--text-display3)',
    lineHeight: 'var(--text-display3--line-height)',
    letterSpacing: 'var(--text-display3--letter-spacing)',
  },

  title1: {
    fontSize: 'var(--text-title1)',
    lineHeight: 'var(--text-title1--line-height)',
    letterSpacing: 'var(--text-title1--letter-spacing)',
  },
  title2: {
    fontSize: 'var(--text-title2)',
    lineHeight: 'var(--text-title2--line-height)',
    letterSpacing: 'var(--text-title2--letter-spacing)',
  },

  subtitle1: {
    fontSize: 'var(--text-subtitle1)',
    lineHeight: 'var(--text-subtitle1--line-height)',
    letterSpacing: 'var(--text-subtitle1--letter-spacing)',
  },
  subtitle2: {
    fontSize: 'var(--text-subtitle2)',
    lineHeight: 'var(--text-subtitle2--line-height)',
    letterSpacing: 'var(--text-subtitle2--letter-spacing)',
  },
  subtitle3: {
    fontSize: 'var(--text-subtitle3)',
    lineHeight: 'var(--text-subtitle3--line-height)',
    letterSpacing: 'var(--text-subtitle3--letter-spacing)',
  },
  subtitle4: {
    fontSize: 'var(--text-subtitle4)',
    lineHeight: 'var(--text-subtitle4--line-height)',
    letterSpacing: 'var(--text-subtitle4--letter-spacing)',
  },

  body1: {
    fontSize: 'var(--text-body1)',
    lineHeight: 'var(--text-body1--line-height)',
    letterSpacing: 'var(--text-body1--letter-spacing)',
  },
  body2: {
    fontSize: 'var(--text-body2)',
    lineHeight: 'var(--text-body2--line-height)',
    letterSpacing: 'var(--text-body2--letter-spacing)',
  },

  caption1: {
    fontSize: 'var(--text-caption1)',
    lineHeight: 'var(--text-caption1--line-height)',
    letterSpacing: 'var(--text-caption1--letter-spacing)',
  },
  caption2: {
    fontSize: 'var(--text-caption2)',
    lineHeight: 'var(--text-caption2--line-height)',
    letterSpacing: 'var(--text-caption2--letter-spacing)',
  },
} as const
