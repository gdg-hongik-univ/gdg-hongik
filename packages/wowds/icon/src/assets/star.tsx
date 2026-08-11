import { type ComponentPropsWithRef, type ReactNode } from 'react'

export type StarIconSize = 'sm' | 'md'

const SIZE_MAP: Record<StarIconSize, number> = {
  sm: 20,
  md: 24,
} as const

export interface StarIconProps extends ComponentPropsWithRef<'svg'> {
  size?: StarIconSize
  color?: string
}

const STAR_VARIANTS: Record<StarIconSize, { viewBox: string; path: (color: string) => ReactNode }> =
  {
    sm: {
      viewBox: '0 0 20 20',
      path: (color) => (
        <path
          d="M9.20745 2.43921C9.45691 1.67145 10.5431 1.67145 10.7925 2.43921L12.058 6.33401C12.1696 6.67736 12.4896 6.90983 12.8506 6.90983H16.9458C17.7531 6.90983 18.0887 7.94284 17.4356 8.41734L14.1225 10.8245C13.8305 11.0367 13.7082 11.4128 13.8198 11.7562L15.0853 15.651C15.3348 16.4187 14.456 17.0572 13.8029 16.5827L10.4898 14.1755C10.1977 13.9633 9.80225 13.9633 9.51018 14.1755L6.19706 16.5827C5.54397 17.0572 4.66523 16.4187 4.91469 15.651L6.18019 11.7562C6.29175 11.4128 6.16954 11.0367 5.87747 10.8245L2.56435 8.41734C1.91125 7.94284 2.2469 6.90983 3.05417 6.90983H7.14941C7.51043 6.90983 7.83039 6.67736 7.94196 6.33401L9.20745 2.43921Z"
          fill={color}
        />
      ),
    },
    md: {
      viewBox: '0 0 24 24',
      path: (color) => (
        <path
          d="M11.0489 2.92705C11.3483 2.00574 12.6517 2.00574 12.9511 2.92705L14.4697 7.60081C14.6035 8.01284 14.9875 8.2918 15.4207 8.2918H20.335C21.3037 8.2918 21.7065 9.53141 20.9228 10.1008L16.947 12.9894C16.5966 13.244 16.4499 13.6954 16.5838 14.1074L18.1024 18.7812C18.4017 19.7025 17.3472 20.4686 16.5635 19.8992L12.5878 17.0106C12.2373 16.756 11.7627 16.756 11.4122 17.0106L7.43648 19.8992C6.65276 20.4686 5.59828 19.7025 5.89763 18.7812L7.41623 14.1074C7.55011 13.6954 7.40345 13.244 7.05296 12.9894L3.07722 10.1008C2.29351 9.53141 2.69628 8.2918 3.66501 8.2918H8.57929C9.01252 8.2918 9.39647 8.01284 9.53035 7.60081L11.0489 2.92705Z"
          fill={color}
        />
      ),
    },
  }

export const StarIcon = ({
  ref,
  size = 'md',
  color = '#F9AB00',
  className,
  ...props
}: StarIconProps) => {
  const pixelSize = SIZE_MAP[size]
  const variant = STAR_VARIANTS[size]

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
