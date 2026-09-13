const Header = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-50 flex flex-row bg-white/30 backdrop-blur-[5px] px-4 py-5 s:p-7 xl:px-0 items-center justify-center">
      <div className="mx-4 flex flex-1 xl:mx-0 xl:flex-none xl:w-[1280px] items-center justify-start gap-2.5">
        <p className="flex h-4 items-center">나 이미지</p>
        <div className="flex gap-1 items-center">
          <h1 className="flex h-3.5 items-center font-title font-bold text-[18px] s:text-[20px] leading-none">
            GDG
          </h1>
          <h1 className="font-title font-semibold text-caption1 text-[12px] s:text-[14px] leading-none">
            Hongik Univ.
          </h1>
        </div>
      </div>
    </header>
  )
}

export default Header
