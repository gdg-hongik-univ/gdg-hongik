export const breakpoint = {
  xs: { min: 360, max: 599 },
  s: { min: 600, max: 767 },
  m: { min: 768, max: 1023 },
  l: { min: 1024, max: 1439 },
  xl: { min: 1440, max: null },
} as const

export type BreakpointName = keyof typeof breakpoint
