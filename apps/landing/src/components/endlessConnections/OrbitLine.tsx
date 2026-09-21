import type { CSSProperties } from 'react'

interface OrbitLineProps {
  size?: string
  xsSize?: string
  animation?: string
  className?: string
  children?: React.ReactNode
}

const OrbitLine = ({ size, xsSize = size, animation, className, children }: OrbitLineProps) => {
  const orbitStyle = {
    '--orbit-line-size': size,
    '--orbit-line-xs-size': xsSize,
  } as CSSProperties

  return (
    <div
      className={`orbit-line-size absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#57ABFF] opacity-70 pointer-events-none ${animation ?? 'animate-[spin-reverse_15.0s_linear_infinite]'} ${className ?? ''}`}
      style={orbitStyle}
    >
      {children}
    </div>
  )
}

export default OrbitLine
