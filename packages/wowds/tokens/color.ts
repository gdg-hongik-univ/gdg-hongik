// 컬러 토큰 (Figma 5.0 Renewal). palette(원시) → color(의미). 사용법은 README 참고.

/** 원시 색상 팔레트. 컴포넌트에서는 가급적 의미 토큰(color)을 사용. */
export const palette = {
  // Core colors — 브랜드 핵심 4색 (Google 계열). status 와는 별개 값·의미.
  core: {
    blue: { 25: '#E3F2FD', 50: '#BBDEFB', 500: '#4285F4' },
    green: { 25: '#E8F5E9', 50: '#C8E6C9', 500: '#34A853' },
    yellow: { 25: '#FFF8E1', 50: '#FFECB3', 500: '#F9AB00' },
    red: { 25: '#FFEBEE', 50: '#FFCDD2', 500: '#EA4335' },
  },

  // Main Bluescale — Core Blue(500) 확장 스케일. 주 브랜드 컬러.
  blue: {
    100: '#E2ECFD',
    200: '#BCD3FB',
    300: '#90B7F9',
    400: '#659BF6',
    500: '#4285F4',
    600: '#2170F2',
    700: '#0D5FE7',
  },

  // Grayscale
  gray: {
    50: '#F4F5F6',
    100: '#E6E8EA',
    200: '#CDD1D5',
    300: '#B1B8BE',
    400: '#8A949E',
    500: '#6D7882',
    600: '#58616A',
    700: '#464C53',
    800: '#33363D',
    900: '#1E2124',
    950: '#131416',
  },

  white: '#FFFFFF',
  black: '#080808',

  // System(Status) — 시스템 알림 전용. 베이스 색만 정의(농도 단계 50/10/5 생략).
  status: {
    danger: '#DE3412',
    warning: '#FFB114',
    success: '#228738',
    information: '#096AB3',
  },
} as const

/** 용도별(의미) 컬러 토큰. default/disabled/hover/pressed 역할 색상. */
export const color = {
  // 기본 상태
  background: palette.white,
  primary: palette.blue[500],
  sub: palette.gray[600],
  outline: palette.gray[200],
  textBlack: palette.black,
  textWhite: palette.white,

  // 비활성(Disabled)
  disabled: {
    dark: palette.gray[200],
    light: palette.gray[50],
    textBlue: palette.blue[300],
    blue: palette.blue[100],
  },

  // 호버(Hover)
  hover: {
    blue: palette.blue[600],
    mono: palette.gray[800],
    elevated: palette.gray[100], // Elevated(Shadow)
  },

  // 눌림(Pressed)
  pressed: {
    blue: palette.blue[400],
    blueBackground: palette.blue[100],
    monoBackground: palette.gray[50],
  },

  // 상태(Status) 알림 색상
  status: palette.status,
} as const
