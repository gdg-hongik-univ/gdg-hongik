// 컬러 값과 의미 연결은 theme.css에서 관리한다. TS 토큰은 CSS 변수 참조만 제공한다.

/** 원시 색상 팔레트. 컴포넌트에서는 가급적 의미 토큰(color)을 사용. */
export const palette = {
  // Core colors — 브랜드 핵심 4색 (Google 계열). status 와는 별개 값·의미.
  core: {
    blue: {
      25: 'var(--color-core-blue-25)',
      50: 'var(--color-core-blue-50)',
      100: 'var(--color-core-blue-100)',
      500: 'var(--color-core-blue-500)',
    },
    green: {
      25: 'var(--color-core-green-25)',
      50: 'var(--color-core-green-50)',
      100: 'var(--color-core-green-100)',
      500: 'var(--color-core-green-500)',
    },
    yellow: {
      25: 'var(--color-core-yellow-25)',
      50: 'var(--color-core-yellow-50)',
      100: 'var(--color-core-yellow-100)',
      500: 'var(--color-core-yellow-500)',
    },
    red: {
      25: 'var(--color-core-red-25)',
      50: 'var(--color-core-red-50)',
      100: 'var(--color-core-red-100)',
      500: 'var(--color-core-red-500)',
    },
  },

  // Main Bluescale — Core Blue(500) 확장 스케일. 주 브랜드 컬러.
  blue: {
    100: 'var(--color-blue-100)',
    200: 'var(--color-blue-200)',
    300: 'var(--color-blue-300)',
    400: 'var(--color-blue-400)',
    500: 'var(--color-blue-500)',
    600: 'var(--color-blue-600)',
    700: 'var(--color-blue-700)',
  },

  // Grayscale
  gray: {
    50: 'var(--color-gray-50)',
    100: 'var(--color-gray-100)',
    200: 'var(--color-gray-200)',
    300: 'var(--color-gray-300)',
    400: 'var(--color-gray-400)',
    500: 'var(--color-gray-500)',
    600: 'var(--color-gray-600)',
    700: 'var(--color-gray-700)',
    800: 'var(--color-gray-800)',
    900: 'var(--color-gray-900)',
    950: 'var(--color-gray-950)',
  },

  white: 'var(--color-white)',
  black: 'var(--color-black)',

  // System(Status) — 시스템 알림 전용. 단계 번호는 Figma 변수 이름을 따른다.
  status: {
    // 기존 키는 기본 단계의 별칭을 유지한다.
    danger: 'var(--color-status-danger)',
    warning: 'var(--color-status-warning)',
    success: 'var(--color-status-success)',
    information: 'var(--color-status-information)',

    danger5: 'var(--color-status-danger-5)',
    danger10: 'var(--color-status-danger-10)',
    danger50: 'var(--color-status-danger-50)',
    warning5: 'var(--color-status-warning-5)',
    warning10: 'var(--color-status-warning-10)',
    warning30: 'var(--color-status-warning-30)',
    success5: 'var(--color-status-success-5)',
    success20: 'var(--color-status-success-20)',
    success50: 'var(--color-status-success-50)',
    information5: 'var(--color-status-information-5)',
    information20: 'var(--color-status-information-20)',
    information60: 'var(--color-status-information-60)',
  },
} as const

/** 용도별(의미) 컬러 토큰. default/disabled/hover/pressed 역할 색상. */
export const color = {
  // 기본 상태
  background: 'var(--color-background)',
  primary: 'var(--color-primary)',
  sub: 'var(--color-sub)',
  outline: 'var(--color-outline)',
  textBlack: 'var(--color-text-black)',
  textWhite: 'var(--color-text-white)',

  // 비활성(Disabled)
  disabled: {
    dark: 'var(--color-disabled-dark)',
    light: 'var(--color-disabled-light)',
    textBlue: 'var(--color-disabled-text-blue)',
    blue: 'var(--color-disabled-blue)',
  },

  // 호버(Hover)
  hover: {
    blue: 'var(--color-hover-blue)',
    mono: 'var(--color-hover-mono)',
    elevated: 'var(--color-hover-elevated)', // Elevated(Shadow)
  },

  // 눌림(Pressed)
  pressed: {
    blue: 'var(--color-pressed-blue)',
    blueBackground: 'var(--color-pressed-blue-background)',
    monoBackground: 'var(--color-pressed-mono-background)',
  },

  // 상태(Status) 알림 색상
  status: palette.status,
} as const
