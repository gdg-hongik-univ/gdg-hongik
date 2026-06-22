// 타이포그래피 토큰 (Figma 5.0 Renewal, Large 스케일 기준). 사용법은 README 참고.

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
 * 타이포그래피 스케일 (Large 기준, letter-spacing 일괄 -1.5%).
 * 굵기(fontWeight)는 포함하지 않는다 — fontWeight 토큰과 조합한다.
 */
export const typography = {
  display1: { fontSize: '52px', lineHeight: '140%', letterSpacing: '-1.5%' },
  display2: { fontSize: '48px', lineHeight: '140%', letterSpacing: '-1.5%' },
  display3: { fontSize: '44px', lineHeight: '140%', letterSpacing: '-1.5%' },

  title1: { fontSize: '36px', lineHeight: '140%', letterSpacing: '-1.5%' },
  title2: { fontSize: '32px', lineHeight: '140%', letterSpacing: '-1.5%' },

  subtitle1: { fontSize: '28px', lineHeight: '150%', letterSpacing: '-1.5%' },
  subtitle2: { fontSize: '24px', lineHeight: '150%', letterSpacing: '-1.5%' },
  subtitle3: { fontSize: '22px', lineHeight: '150%', letterSpacing: '-1.5%' },
  subtitle4: { fontSize: '20px', lineHeight: '150%', letterSpacing: '-1.5%' },

  body1: { fontSize: '18px', lineHeight: '150%', letterSpacing: '-1.5%' },
  body2: { fontSize: '16px', lineHeight: '150%', letterSpacing: '-1.5%' },

  caption1: { fontSize: '14px', lineHeight: '150%', letterSpacing: '-1.5%' },
  caption2: { fontSize: '12px', lineHeight: '150%', letterSpacing: '-1.5%' },
} as const
