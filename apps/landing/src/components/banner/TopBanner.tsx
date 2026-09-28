import { Fragment } from 'react'
import { Typography } from '@gdg/wowds'
import TopBannerArtwork from './TopBannerArtwork'

const DESCRIPTION_LINES = {
  mobile: [
    'GDG Hongik에는 하나의 정해진 코스가 없어요.',
    '정규스터디에서 다양한 분야를 경험하고,',
    '프로젝트 트랙에서 직접 서비스를 만들어 보며,',
    '파트에서 관심 분야를 더욱 깊이 학습해 보세요.',
    '이후 코어팀과 개발팀으로 구성된 와우디벨로퍼스를',
    '통해 커뮤니티와 서비스에 직접 기여할 수 있어요.',
  ],
  standard: [
    'GDG Hongik에는 하나의 정해진 코스가 없어요.',
    '정규스터디에서 다양한 분야를 경험하고, 프로젝트 트랙에서 직접 서비스를 만들어 보며,',
    '파트에서 관심 분야를 더욱 깊이 학습해 보세요. 이후 코어팀과 개발팀으로 구성된',
    '와우디벨로퍼스를 통해 커뮤니티와 서비스에 직접 기여할 수 있어요.',
  ],
  large: [
    'GDG Hongik에는 하나의 정해진 코스가 없어요.',
    '정규스터디에서 다양한 분야를 경험하고, 프로젝트 트랙에서 직접 서비스를',
    '만들어 보며, 파트에서 관심 분야를 더욱 깊이 학습해 보세요.',
    '이후 코어팀과 개발팀으로 구성된 와우디벨로퍼스를 통해 커뮤니티와',
    '서비스에 직접 기여할 수 있어요.',
  ],
} as const

interface DescriptionLinesProps {
  lines: readonly string[]
}

const DescriptionLines = ({ lines }: DescriptionLinesProps) =>
  lines.map((line, index) => (
    <Fragment key={line}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ))

const TopBanner = () => {
  return (
    <section className="relative isolate flex h-200 min-h-200 w-full items-start overflow-hidden bg-[linear-gradient(var(--top-banner-angle),var(--color-blue-700)_15.755%,#C6EBC8_145.42%)] px-4 py-70 text-white [--top-banner-angle:89.28deg] s:h-68.5 s:min-h-68.5 s:items-center s:px-5 s:py-16 s:[--top-banner-angle:86.5deg] m:h-68.5 m:min-h-68.5 m:items-center m:px-6 m:py-16 m:[--top-banner-angle:85.53deg] l:h-80 l:min-h-80 l:items-center l:px-0 l:py-25 l:[--top-banner-angle:84.9deg] xl:h-77 xl:min-h-77 xl:items-center xl:px-0 xl:py-25 xl:[--top-banner-angle:82.57deg]">
      <TopBannerArtwork />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 s:items-center s:gap-3 s:px-0 m:w-auto m:items-center m:justify-center m:gap-3 m:px-0 l:flex-row l:items-center l:justify-center l:gap-13 xl:w-auto xl:max-w-none xl:flex-row xl:items-center xl:justify-center xl:gap-32">
        <Typography
          variant="title1.2"
          as="h2"
          isEn
          className="shrink-0 tracking-[-0.54px]! s:whitespace-nowrap m:whitespace-nowrap m:tracking-normal! l:w-90.5 l:whitespace-nowrap l:text-[44px]! l:tracking-normal! xl:w-98.5 xl:whitespace-nowrap xl:text-[48px]! xl:tracking-normal!"
        >
          <span className="block s:inline m:inline l:inline xl:inline">Choose </span>
          <span className="block s:inline m:inline l:inline xl:inline">Your Path!</span>
        </Typography>
        <Typography
          variant="caption1.3"
          as="p"
          className="w-full text-[14px]! tracking-[-0.21px]! [text-shadow:0_0_8px_rgba(8,8,8,0.12)] s:w-auto s:text-center s:whitespace-nowrap m:w-117.75 m:max-w-full m:text-center m:tracking-normal! l:w-115.5 l:shrink-0 l:text-[16px]! l:tracking-normal! xl:w-150.75 xl:shrink-0 xl:text-[18px]! xl:tracking-normal!"
        >
          <span className="s:hidden m:hidden l:hidden xl:hidden">
            <DescriptionLines lines={DESCRIPTION_LINES.mobile} />
          </span>
          <span className="hidden s:inline m:inline xl:inline">
            <DescriptionLines lines={DESCRIPTION_LINES.standard} />
          </span>
          <span className="hidden l:inline">
            <DescriptionLines lines={DESCRIPTION_LINES.large} />
          </span>
        </Typography>
      </div>
    </section>
  )
}

export default TopBanner
