import { type ComponentPropsWithRef } from 'react'

export type ChevronSize = 'sm' | 'md' | 'lg'
export type ChevronDirection = 'up' | 'down' | 'left' | 'right'

const SIZE_MAP: Record<ChevronSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
} as const

const ROTATION_DEGREE: Record<ChevronDirection, number> = {
  right: 0,
  down: 90,
  left: 180,
  up: 270,
}

export interface ChevronIconProps extends ComponentPropsWithRef<'svg'> {
  size?: ChevronSize
  direction?: ChevronDirection
  color?: string
}

export const ChevronIcon = ({
  size = 'md',
  direction = 'right',
  color = 'currentColor',
  className = '',
  style,
  ...props
}: ChevronIconProps) => {
  const pixelSize = SIZE_MAP[size]

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 24 24"
      fill="none"
      style={{
        transform: `rotate(${ROTATION_DEGREE[direction]}deg)`,
        ...style,
      }}
      className={`transition-transform duration-200 ${className}`}
      {...props}
    >
      <path
        d="M8.6628 3.9961L15.3295 11.9961L8.6628 19.9961"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
