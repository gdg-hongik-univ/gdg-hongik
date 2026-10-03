import TopBannerArtwork from './banner/TopBannerArtwork'
import TopBannerContent from './banner/TopBannerContent'

const TopBanner = () => {
  return (
    <section className="relative isolate flex min-h-200 w-full items-start bg-[linear-gradient(var(--top-banner-angle),var(--color-blue-700)_15.755%,#C6EBC8_145.42%)] px-4 py-70 text-white [--top-banner-angle:89.28deg] s:min-h-68.5 s:items-center s:px-5 s:py-16 s:[--top-banner-angle:86.5deg] m:min-h-68.5 m:items-center m:px-6 m:py-16 m:[--top-banner-angle:85.53deg] l:min-h-80 l:items-center l:px-0 l:py-25 l:[--top-banner-angle:84.9deg] xl:min-h-77 xl:items-center xl:px-0 xl:py-25 xl:[--top-banner-angle:82.57deg]">
      <TopBannerArtwork />
      <TopBannerContent />
    </section>
  )
}

export default TopBanner
