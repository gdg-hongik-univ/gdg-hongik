import { type ComponentPropsWithRef } from 'react'

export type PortfolioSize = 'sm' | 'md'

const SIZE_MAP: Record<PortfolioSize, number> = {
  sm: 20,
  md: 24,
} as const

export interface PortfolioIconProps extends ComponentPropsWithRef<'svg'> {
  size?: PortfolioSize
}

export const PortfolioIcon = ({ size = 'md', className = '', ...props }: PortfolioIconProps) => {
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
      <path
        d="M21.2998 7V20C21.2998 20.1657 21.1657 20.2998 21 20.2998H3C2.83432 20.2998 2.7002 20.1657 2.7002 20V4C2.7002 3.83431 2.83432 3.7002 3 3.7002H10.5312C10.6201 3.7002 10.7047 3.73945 10.7617 3.80762L12.6621 6.08789C12.9851 6.47548 13.4642 6.7002 13.9688 6.7002H21C21.1657 6.7002 21.2998 6.83431 21.2998 7Z"
        fill="#B1B8BE"
        stroke="#B1B8BE"
        strokeWidth="1.4"
      />
      <path
        d="M10 15C10 16.1046 9.10457 17 8 17C6.89543 17 6 16.1046 6 15C6 13.8954 6.89543 13 8 13C9.10457 13 10 13.8954 10 15Z"
        stroke="white"
        strokeWidth="1.4"
      />
    </svg>
  )
}
