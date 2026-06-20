import type { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

const baseStyle: React.CSSProperties = {
  borderRadius: 8,
  border: 'none',
  padding: '10px 18px',
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
}

const variants: Record<NonNullable<ButtonProps['variant']>, React.CSSProperties> = {
  primary: { background: '#4285f4', color: '#fff' },
  secondary: { background: '#f1f3f4', color: '#202124' },
}

export function Button({ variant = 'primary', style, ...props }: ButtonProps) {
  return <button style={{ ...baseStyle, ...variants[variant], ...style }} {...props} />
}
