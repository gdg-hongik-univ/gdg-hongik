import { type ComponentPropsWithRef, type ReactNode } from 'react'

export type IconSize = 'sm' | 'md'

const SIZE_MAP: Record<IconSize, number> = {
  sm: 20,
  md: 24,
} as const

export interface IconProps extends ComponentPropsWithRef<'svg'> {
  size?: IconSize
  color?: string
}

const LINK_VARIANTS: Record<IconSize, { viewBox: string; path: (color: string) => ReactNode }> = {
  md: {
    viewBox: '0 0 24 24',
    path: (color) => (
      <>
        <path
          d="M9.39997 16H6.75159C4.54245 16 2.75159 14.2091 2.75159 12C2.75159 9.79086 4.54245 8 6.75159 8H9.39997M14.6 16H17.2496C19.4588 16 21.2496 14.2091 21.2496 12C21.2496 9.79086 19.4588 8 17.2496 8H14.6"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path d="M17 12L7 12" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      </>
    ),
  },
  sm: {
    viewBox: '0 0 16 16',
    path: (color) => (
      <>
        <path
          d="M8.03173 13H6C4.34315 13 3 11.6569 3 10C3 8.34315 4.34315 7 6 7H8.03173M11.9673 13H14C15.6569 13 17 11.6569 17 10C17 8.34315 15.6569 7 14 7H11.9673"
          stroke={color}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path d="M13 10L7 10" stroke={color} strokeWidth="1.25" strokeLinecap="round" />
      </>
    ),
  },
}

export const LinkIcon = ({
  ref,
  size = 'md',
  color = '#6D7882',
  className,
  ...props
}: IconProps) => {
  const pixelSize = SIZE_MAP[size]
  const variant = LINK_VARIANTS[size]

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
      {variant.path(color)}
    </svg>
  )
}
