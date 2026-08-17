import { type ComponentPropsWithRef } from 'react'
import { palette } from '../../../tokens'

export type BlogSize = 'sm' | 'md'

const SIZE_MAP: Record<BlogSize, number> = {
  sm: 20,
  md: 24,
} as const

export interface BlogIconProps extends ComponentPropsWithRef<'svg'> {
  size?: BlogSize
  color?: string
}

export const BlogIcon = ({
  size = 'md',
  color = palette.gray[300],
  className = '',
  ...props
}: BlogIconProps) => {
  const pixelSize = SIZE_MAP[size]

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="1" fill={color} />
      <path d="M7 8L15 8" stroke={palette.white} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M7 12L13 12" stroke={palette.white} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M7 16L15 16" stroke={palette.white} strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}
