import { LogoIcon } from '@gdg/wowds'
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
          <div className="flex gap-1 items-center tracking-[-0.015em]">
            <span className="flex h-3.5 items-center font-title font-bold text-[20px] xs:h-[13px] xs:text-[18px] leading-none">
              GDG
            </span>
            <span className="font-title font-semibold text-[14px] xs:text-[12px] leading-none">
              Hongik Univ.
            </span>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Header
