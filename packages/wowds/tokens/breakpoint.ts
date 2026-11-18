// min은 포함하고 max는 포함하지 않는다. XL은 상한이 없다.
export const breakpoint = {
  xs: { min: 360, max: 600 },
  s: { min: 600, max: 768 },
  m: { min: 768, max: 1024 },
  l: { min: 1024, max: 1440 },
  xl: { min: 1440, max: null },
} as const

export type BreakpointName = keyof typeof breakpoint
