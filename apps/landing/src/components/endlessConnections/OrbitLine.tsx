interface OrbitLineProps {
  size?: string
  animation?: string
  className?: string
  children?: React.ReactNode
}

const OrbitLine = ({ size, animation, className, children }: OrbitLineProps) => {
  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#57ABFF] opacity-70 pointer-events-none ${animation ?? 'animate-[spin-reverse_15.0s_linear_infinite]'} ${className ?? ''}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {children}
    </div>
  )
}

export default OrbitLine
