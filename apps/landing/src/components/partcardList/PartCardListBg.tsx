import { useId } from 'react'

const BACKGROUNDS = {
  frontend: {
    color: 'blue',
    image: 'fe-card.png',
    imageClassName: 'left-0 top-0 h-102 w-102 xs:-top-15 s:-top-17.5',
    transform: 'translate(471.5 487) rotate(-132.064) scale(862.742 811.228)',
    stops: [
      [0, 'var(--color-core-blue-500)'],
      [0.623801, 'var(--color-core-blue-25)'],
      [0.892449, 'white'],
    ],
  },
  backend: {
    color: 'green',
    image: 'be-card.png',
    imageClassName:
      'left-0 top-36 h-auto w-85 m:top-34 s:-left-1.5 s:top-34 s:w-78.75 xs:-left-1.25 xs:top-34 xs:w-76.75',
    transform: 'translate(450.416 594.327) rotate(-126.37) scale(706.756 860.594)',
    stops: [
      [0.0294374, 'var(--color-core-green-500)'],
      [0.845832, 'var(--color-core-green-25)'],
      [1, 'white'],
    ],
  },
  ai: {
    color: 'red',
    image: 'ai-card.png',
    imageClassName: 'left-0 top-14 h-auto w-102 s:top-1.5 xs:-left-5.25 xs:top-6.75',
    transform: 'translate(184.307 537.267) rotate(-117.372) scale(561.22 492.533)',
    stops: [
      [0, 'var(--color-core-red-500)'],
      [0.923077, 'var(--color-status-danger-5, #fdefec)'],
      [1, 'white'],
    ],
  },
} as const

export default function PartCardBg({ part }: { part: keyof typeof BACKGROUNDS }) {
  const gradientId = useId()
  const background = BACKGROUNDS[part]

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[inherit]">
      <svg
        viewBox="0 0 408 408"
        fill="none"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <rect width="408" height="408" fill={`var(--color-core-${background.color}-50)`} />
        <rect width="408" height="408" fill={`url(#${gradientId})`} fillOpacity="0.3" />
        <defs>
          <radialGradient
            id={gradientId}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform={background.transform}
          >
            {background.stops.map(([offset, color]) => (
              <stop key={offset} offset={offset} stopColor={color} />
            ))}
          </radialGradient>
        </defs>
      </svg>
      <img
        src={`${import.meta.env.BASE_URL}partcard/${background.image}`}
        alt=""
        draggable={false}
        className={`absolute max-w-none ${background.imageClassName}`}
      />
      <div
        className="absolute inset-0 rounded-[inherit] border"
        style={{ borderColor: `var(--color-core-${background.color}-25)` }}
      />
    </div>
  )
}
