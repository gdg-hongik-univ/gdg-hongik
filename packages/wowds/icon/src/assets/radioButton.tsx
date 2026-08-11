import { type ComponentPropsWithRef } from 'react'
import { palette } from '../../../tokens'

export type RadioStatus = 'default' | 'selected'

export interface RadioIconProps extends ComponentPropsWithRef<'svg'> {
  size?: number | string
  status?: RadioStatus
}

export const RadioIcon = ({
  ref,
  size = 24,
  status = 'default',
  className,
  ...props
}: RadioIconProps) => {
  const isSelected = status === 'selected'
  const strokeColor = isSelected ? palette.blue[500] : palette.gray[300]

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21C14.3869 21 16.6761 20.0518 18.364 18.364C20.0518 16.6761 21 14.3869 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585Z"
        stroke={strokeColor}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {isSelected && (
        <path
          d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
          fill={strokeColor}
        />
      )}
    </svg>
  )
}
