import { Typography } from '@gdg/wowds'
import { Link } from 'react-router-dom'

interface OrbitProfileProps {
  imageSrc: string
  label: string
  to: string
  orbitSize: number
  angle: number
  imageAlt?: string
}

const OrbitProfile = ({
  imageSrc,
  label,
  to,
  orbitSize,
  angle,
  imageAlt = '',
}: OrbitProfileProps) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ width: orbitSize, height: orbitSize }}
    >
      <div className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
        <Link
          className="group pointer-events-auto absolute top-0 left-1/2 cursor-pointer text-inherit no-underline outline-none"
          style={{ rotate: `${-angle}deg` }}
          to={to}
          aria-label={label}
        >
          <figure className="m-0">
            <img
              className="absolute top-0 left-0 size-25 max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full object-cover transition-[width,height,box-shadow] duration-300 ease-out group-hover:size-45 group-focus-visible:size-45 group-focus-visible:ring-4 group-focus-visible:ring-blue-200"
              src={imageSrc}
              alt={imageAlt}
              width={100}
              height={100}
            />
            <Typography
              as="figcaption"
              variant="subtitle2.2"
              isEn
              className="absolute top-14.5 left-0 -translate-x-1/2 whitespace-nowrap text-center text-black transition-[top,color,font-size,line-height] duration-300 ease-out group-hover:top-24.5 group-hover:!text-title2 group-hover:text-blue-700 group-focus-visible:top-24.5 group-focus-visible:!text-title2 group-focus-visible:text-blue-700"
            >
              {label}
            </Typography>
          </figure>
        </Link>
      </div>
    </div>
  )
}

export default OrbitProfile
