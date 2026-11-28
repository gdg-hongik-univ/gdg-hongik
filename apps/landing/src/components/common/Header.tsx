import { fontWeight, LogoIcon, Typography } from '@gdg/wowds'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex flex-row bg-white/30 backdrop-blur-[5px] py-7 px-6 xs:px-4 xs:py-5 l:px-7 xl:px-0 items-center justify-center">
      <div className="flex flex-1 h-4 xl:mx-0 xl:flex-none xl:w-[1280px] items-center justify-start">
        <Link
          to="/"
          aria-label="GDG Hongik Univ. 홈으로 이동"
          className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        >
          <LogoIcon className="flex h-4 w-8 xs:h-3.5 xs:w-7" />
          <div className="flex gap-1 items-center">
            <Typography
              variant="subtitle4.1"
              isEn
              className="flex h-3.5 items-center leading-wordmark! xs:h-[13px] s:text-(length:--text-subtitle3)! m:text-(length:--text-subtitle3)!"
              style={{ fontWeight: fontWeight.bold }}
            >
              GDG
            </Typography>
            <Typography
              variant="caption1.2"
              isEn
              className="leading-wordmark! s:text-(length:--text-body2)! m:text-(length:--text-body2)!"
            >
              Hongik Univ.
            </Typography>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Header
