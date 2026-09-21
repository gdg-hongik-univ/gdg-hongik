import { Typography } from '@gdg/wowds'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'

interface OrbitProfileProps {
  imageSrc: string
  label: string
  description: string
  to: string
  orbitSize: number
  xsOrbitSize?: number
  angle: number
  xsAngle?: number
  imageAlt?: string
}

const OrbitProfile = ({
  imageSrc,
  label,
  description,
  to,
  orbitSize,
  xsOrbitSize = orbitSize,
  angle,
  xsAngle = angle,
  imageAlt = '',
}: OrbitProfileProps) => {
  const orbitStyle = {
    '--orbit-profile-size': `${orbitSize}px`,
    '--orbit-profile-xs-size': `${xsOrbitSize}px`,
    '--orbit-profile-angle': `${angle}deg`,
    '--orbit-profile-counter-angle': `${-angle}deg`,
    '--orbit-profile-xs-angle': `${xsAngle}deg`,
    '--orbit-profile-xs-counter-angle': `${-xsAngle}deg`,
  } as CSSProperties

  return (
    <div
      className="orbit-profile-size absolute top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none hover:z-50 focus-within:z-50"
      style={orbitStyle}
    >
      <div className="orbit-profile-angle-layer absolute inset-0">
        <Link
          className="orbit-profile-content group pointer-events-auto absolute top-0 left-1/2 cursor-pointer text-inherit no-underline outline-none"
          to={to}
          aria-label={label}
        >
          <figure className="m-0">
            <div className="invisible absolute bottom-[99px] left-0 z-50 flex w-max max-w-90 -translate-x-1/2 translate-y-1 flex-col items-center opacity-0 transition-[opacity,transform,visibility] duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:visible group-focus-visible:translate-y-0 group-focus-visible:opacity-100 s:bottom-[85px] m:bottom-[85px]">
              <div className="rounded-[12px] bg-blue-100 px-5 py-3.5 text-center">
                <Typography variant="body2.2" className="text-black">
                  {description}
                </Typography>
              </div>
              <span className="relative h-3 w-6 overflow-hidden" aria-hidden="true">
                <span className="absolute top-0 left-1/2 size-[16.97px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-br-[3px] bg-blue-100" />
              </span>
            </div>

            <img
              className="absolute top-0 left-0 size-25 max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full object-cover transition-[width,height,box-shadow] duration-300 ease-out group-hover:size-45 group-focus-visible:size-45 group-focus-visible:ring-4 group-focus-visible:ring-blue-200 xs:size-16 s:size-21 s:group-hover:size-38 s:group-focus-visible:size-38 m:size-21 m:group-hover:size-38 m:group-focus-visible:size-38"
              src={imageSrc}
              alt={imageAlt}
              width={100}
              height={100}
            />
            <Typography
              as="figcaption"
              variant="subtitle2.2"
              isEn
              className="absolute top-14.5 left-0 -translate-x-1/2 whitespace-nowrap text-center text-black transition-[top,color,font-size,line-height] duration-300 ease-out group-hover:top-24.5 group-hover:!text-title2 group-hover:text-blue-700 group-focus-visible:top-24.5 group-focus-visible:!text-title2 group-focus-visible:text-blue-700 xs:top-10 xs:!text-subtitle6 xs:group-hover:!text-subtitle3 xs:group-focus-visible:!text-subtitle3 s:top-12.5 s:!text-subtitle4 s:group-hover:top-21 s:group-hover:!text-title1 s:group-focus-visible:top-21 s:group-focus-visible:!text-title1 m:top-12.5 m:!text-subtitle4 m:group-hover:top-21 m:group-hover:!text-subtitle1 m:group-focus-visible:top-21 m:group-focus-visible:!text-subtitle1"
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
