import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { Typography } from '@gdg/wowds'

export type TagSize = 'sm' | 'md' | 'lg'
export type TagVariant = 'blue' | 'green' | 'red' | 'yellow' | 'brand100' | 'brand500'

const SIZE_MAP: Record<TagSize, string> = {
  sm: 'px-2 py-0.5 rounded-sm',
  md: 'px-3 py-1.5 rounded-lg',
  lg: 'px-4 py-1.5 rounded-xl',
} as const

const SIZE_TYPO_MAP = {
  sm: 'caption2.2',
  md: 'body2.2',
  lg: 'subtitle4.1',
} as const

const TAG_THEME_MAP: Record<TagSize, Partial<Record<TagVariant, string>>> = {
  sm: {
    blue: 'bg-gray-50 text-core-blue-500',
    green: 'bg-gray-50 text-core-green-500',
    red: 'bg-gray-50 text-core-red-500',
    yellow: 'bg-gray-50 text-core-yellow-500',
  },
  md: {
    brand100: 'bg-blue-100 text-blue-600',
    blue: 'bg-core-blue-50 text-core-blue-500',
    green: 'bg-core-green-50 text-core-green-500',
    red: 'bg-core-red-50 text-core-red-500',
    yellow: 'bg-core-yellow-50 text-core-yellow-500',
  },
  lg: {
    brand100: 'bg-blue-100 text-blue-600',
    brand500: 'bg-core-blue-500 text-white',
  },
} as const

export interface TagProps extends ComponentPropsWithoutRef<'span'> {
  children: ReactNode
  size?: TagSize
  variant?: TagVariant
  isEn?: boolean
  className?: string
}

export const Tag = ({
  children,
  size = 'sm',
  variant = 'blue',
  isEn = false,
  className = '',
  ...props
}: TagProps) => {
  const layoutStyle = SIZE_MAP[size]
  const colorStyle = TAG_THEME_MAP[size]?.[variant] ?? ''
  const typoStyle = SIZE_TYPO_MAP[size]

  return (
    <span
      className={`inline-flex items-center justify-center whitespace-nowrap transition-colors ${layoutStyle} ${colorStyle} ${className}`}
      {...props}
    >
      <Typography variant={typoStyle} isEn={isEn}>
        {children}
      </Typography>
    </span>
  )
}
