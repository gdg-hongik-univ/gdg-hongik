const ARTWORK_SRC = '/banner/top-banner.png'
const ARTWORK_DIMENSIONS = { width: 5025, height: 1666 } as const

interface ArtworkImageProps {
  className: string
}

const ArtworkImage = ({ className }: ArtworkImageProps) => (
  <img src={ARTWORK_SRC} alt="" {...ARTWORK_DIMENSIONS} className={className} />
)

const TopBannerArtwork = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
  >
    <ArtworkImage className="absolute -left-24 top-12.25 h-auto w-282.75 max-w-none mix-blend-luminosity opacity-40 s:-left-19 s:-top-11 s:w-314 m:-left-24 m:-top-8.5 m:w-314 l:-left-19 l:top-4 l:w-314 xl:-left-19 xl:top-4 xl:w-314" />
    <ArtworkImage className="absolute -right-56.5 top-129.5 h-auto w-282.75 max-w-none rotate-180 mix-blend-luminosity opacity-50 s:hidden m:hidden l:hidden xl:hidden" />
    <div className="absolute right-13.75 top-147.75 h-5 w-5 overflow-hidden s:hidden m:hidden l:hidden xl:hidden">
      <ArtworkImage className="absolute -left-122.75 -top-30.75 h-auto w-141.25 max-w-none mix-blend-luminosity opacity-50" />
    </div>
    <div className="absolute -right-29 -top-13.75 hidden h-79.5 w-94 items-center justify-center xl:flex">
      <div className="h-43 w-83.75 rotate-[149.58deg] rounded-full border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.4),rgba(66,133,244,0.12))] opacity-50 shadow-[inset_0_0_10px_rgba(255,255,255,0.35)]" />
    </div>
  </div>
)

export default TopBannerArtwork
