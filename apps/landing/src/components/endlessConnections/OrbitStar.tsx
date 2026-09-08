interface OrbitStarProps {
  color?: string
  angle?: number
  size?: number
  className?: string
}

const OrbitStar = ({ color, angle = 0, size = 14, className }: OrbitStarProps) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <div
        className={`absolute left-1/2 -translate-x-1/2 rounded-full z-20 transition-transform duration-300 hover:scale-125 cursor-pointer ${className ?? ''}`}
        style={{
          width: size,
          height: size,
          top: -size / 2,
          backgroundColor: color,
        }}
      />
    </div>
  )
}

export default OrbitStar
