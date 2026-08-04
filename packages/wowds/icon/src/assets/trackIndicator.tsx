import { type ComponentPropsWithRef, type ReactNode } from 'react'

export type StatusIndicatorSize = 'sm' | 'md' | 'lg'

const SIZE_MAP: Record<StatusIndicatorSize, number> = {
  sm: 24,
  md: 28,
  lg: 32,
} as const

export interface StatusIndicatorProps extends ComponentPropsWithRef<'svg'> {
  size?: StatusIndicatorSize
}

const STATUS_VARIANTS: Record<StatusIndicatorSize, { viewBox: string; elements: ReactNode }> = {
  sm: {
    viewBox: '0 0 24 24',
    elements: (
      <>
        <rect width="24" height="24" rx="12" fill="#4285F4" fillOpacity="0.2" />
        <circle cx="12" cy="12" r="6" fill="#659BF6" />
      </>
    ),
  },
  md: {
    viewBox: '0 0 28 28',
    elements: (
      <>
        <rect width="28" height="28" rx="14" fill="#4285F4" fillOpacity="0.2" />
        <circle cx="14" cy="14" r="7" fill="#659BF6" />
      </>
    ),
  },
  lg: {
    viewBox: '0 0 32 32',
    elements: (
      <>
        <rect width="32" height="32" rx="16" fill="#4285F4" fillOpacity="0.2" />
        <circle cx="16" cy="16" r="8" fill="#659BF6" />
      </>
    ),
  },
}

export const StatusIndicator = ({
  ref,
  size = 'md',
  className,
  ...props
}: StatusIndicatorProps) => {
  const pixelSize = SIZE_MAP[size]
  const variant = STATUS_VARIANTS[size]

  return (
    <svg
      ref={ref}
      width={pixelSize}
      height={pixelSize}
      viewBox={variant.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {variant.elements}
    </svg>
  )
}
