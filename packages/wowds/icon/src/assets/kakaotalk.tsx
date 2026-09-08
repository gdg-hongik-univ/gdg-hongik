import { type ComponentPropsWithRef } from 'react'

export type KakaotalkSize = 'xs' | 'xl'

const SIZE_MAP: Record<KakaotalkSize, number> = {
  xs: 44,
  xl: 56,
} as const

export interface KakaotalkIconProps extends ComponentPropsWithRef<'svg'> {
  size?: KakaotalkSize
}

export const KakaotalkIcon = ({ size = 'xl', className = '', ...props }: KakaotalkIconProps) => {
  const pixelSize = SIZE_MAP[size]

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 56 56"
      fill="none"
      className={className}
      {...props}
    >
      <rect width="56" height="56" rx="28" fill="#FEE500" />
      <path
        d="M28.0204 12.6207C36.7209 12.6207 43.767 18.4989 43.767 25.7748C43.767 25.8514 43.767 25.9471 43.767 26.0237C43.767 26.1003 43.767 26.1769 43.767 26.2535C43.767 32.3231 38.559 37.2057 31.7579 38.546C30.5529 38.7949 29.3071 38.9289 28 38.9289C27.2443 38.9289 26.4886 38.8906 25.7534 38.7949L19.5854 43.1987C19.2586 43.4285 18.8502 43.4668 18.4825 43.2945C18.1149 43.1221 17.8903 42.7775 17.8903 42.3946V35.942C17.2163 35.4824 16.5831 34.9846 16.0113 34.4485C14.0506 32.8018 12.7435 30.8871 12.3555 27.7853C12.2738 27.2683 12.2329 26.7513 12.2329 26.2343C12.2329 26.1578 12.2329 26.1003 12.2329 26.0237C12.2329 25.928 12.2329 25.8514 12.2329 25.7557C12.2329 18.4989 19.2791 12.6016 27.9795 12.6016L28.0204 12.6207Z"
        fill="#080808"
      />
    </svg>
  )
}
