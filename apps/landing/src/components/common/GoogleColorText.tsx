const GOOGLE_COLORS = [
  'text-core-blue-500',
  'text-core-red-500',
  'text-core-yellow-500',
  'text-core-blue-500',
  'text-core-green-500',
  'text-core-red-500',
] as const

export function GoogleColorText() {
  return (
    <span className="font-medium inline-block">
      {'Google'.split('').map((char, index) => (
        <span key={index} className={GOOGLE_COLORS[index]}>
          {char}
        </span>
      ))}
    </span>
  )
}
