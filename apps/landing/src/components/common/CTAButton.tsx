import React, { forwardRef } from 'react'
import { Typography } from '@gdg/wowds'

export type CTAButtonProperty = 'main' | 'sub'
export type CTAButtonSize = 'auto' | 'sm' | 'md' | 'lg'

export interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  property: CTAButtonProperty
  size?: CTAButtonSize
}

const PROPERTY_BASE_STYLES: Record<CTAButtonProperty, { border: string; inner: string }> = {
  main: {
    border:
      'bg-[conic-gradient(from_0deg,#CCDFFF_0%_20%,#0D5FE7_25%_25%,#CCDFFF_30%_70%,#0D5FE7_75%_75%,#CCDFFF_80%_100%)]',
    inner: 'bg-gradient-to-r from-blue-700/90 to-[#5897ff]/90 text-white',
  },
  sub: {
    border:
      'bg-[conic-gradient(from_0deg,#E8F7FC_0%_20%,#C1D8FF_25%_25%,#E8F7FC_30%_70%,#C1D8FF_75%_75%,#E8F7FC_80%_100%)]',
    inner: 'text-blue-500 bg-white',
  },
}

const PROPERTY_SIZE_STYLES: Record<CTAButtonProperty, Record<CTAButtonSize, string>> = {
  main: {
    auto: 'px-[26.5px] py-[12.5px] s:px-[34.5px] s:py-[16.5px] m:px-[34.5px] m:py-[16.5px] l:px-[52.5px] l:py-[22.5px] xl:px-[52.5px] xl:py-[22.5px]',
    sm: 'px-[26.5px] py-[12.5px]',
    md: 'px-[34.5px] py-[16.5px]',
    lg: 'px-[52.5px] py-[22.5px]',
  },
  sub: {
    auto: 'px-[26.5px] py-[10.5px] l:px-[34.5px] l:py-[18.5px] xl:px-[34.5px] xl:py-[18.5px]',
    sm: 'px-[26.5px] py-[10.5px]', // s사이즈는 정의X, 오류 방지용 md로 대체
    md: 'px-[26.5px] py-[10.5px]',
    lg: 'px-[34.5px] py-[18.5px]',
  },
}

const PROPERTY_TYPOGRAPHY: Record<
  CTAButtonProperty,
  Record<
    CTAButtonSize,
    { variant: React.ComponentProps<typeof Typography>['variant']; className?: string }
  >
> = {
  main: {
    auto: {
      variant: 'subtitle4.1',
      className: 'max-[600px]:text-[14px]! min-[600px]:max-[1024px]:text-[16px]!',
    },
    sm: { variant: 'body2.1', className: 'text-[14px]!' },
    md: { variant: 'body1.1' },
    lg: { variant: 'subtitle4.1' },
  },
  sub: {
    auto: { variant: 'body2.1', className: 'max-[1024px]:text-[14px]!' },
    sm: { variant: 'caption1.1' },
    md: { variant: 'caption1.1' },
    lg: { variant: 'body2.1' },
  },
}

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    {
      property = 'main',
      size = 'auto',
      type = 'button',
      disabled = false,
      className = '',
      children,
      ...restProps
    },
    ref,
  ) => {
    const buttonBaseStyle =
      'inline-flex p-[1.5px] rounded-full transition-all select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'

    const innerBaseStyle =
      'w-full h-full rounded-full inline-flex items-center justify-center gap-2.5 [text-shadow:_0_0_12px_rgb(33_112_242_/_0.15)]'

    const { border: borderStyle, inner: innerStyle } = PROPERTY_BASE_STYLES[property]
    const sizeStyle = PROPERTY_SIZE_STYLES[property][size]
    const { variant, className: typographyClassName = '' } = PROPERTY_TYPOGRAPHY[property][size]

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={` font-primary ${buttonBaseStyle} ${borderStyle} ${className}`}
        {...restProps}
      >
        <Typography
          as="span"
          variant={variant}
          className={`${innerBaseStyle} ${innerStyle} ${sizeStyle} ${typographyClassName}`}
        >
          {children}
        </Typography>
      </button>
    )
  },
)

CTAButton.displayName = 'CTAButton'

export default CTAButton
