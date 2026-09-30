import type { ElementType, HTMLAttributes } from 'react'
import { typography, fontWeight, fontFamily } from '@gdg/wowds/tokens'

type TypographyScale = keyof typeof typography

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant: `${TypographyScale}.${1 | 2 | 3}`
  as?: ElementType
  isEn?: boolean
  isCode?: boolean
}

export const Typography = ({
  variant,
  as: Component = 'span',
  isEn = false,
  isCode = false,
  style,
  children,
  ...rest
}: TypographyProps) => {
  const [scale, weightKey] = variant.split('.') as [TypographyScale, '1' | '2' | '3']
  const baseStyle = typography[scale]

  const weight = isEn
    ? weightKey === '1'
      ? fontWeight.semibold
      : fontWeight.medium
    : weightKey === '1'
      ? fontWeight.bold
      : weightKey === '2'
        ? fontWeight.semibold
        : fontWeight.medium

  const family = isCode ? fontFamily.code : isEn ? fontFamily.title : fontFamily.primary

  return (
    <Component
      style={{
        ...baseStyle,
        fontWeight: weight,
        fontFamily: family,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}
