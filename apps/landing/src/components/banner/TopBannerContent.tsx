import { Fragment } from 'react'
import { Typography } from '@gdg/wowds'

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

const TopBannerContent = () => (
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
      className="w-full break-keep text-[14px]! tracking-[-0.21px]! [text-shadow:0_0_8px_rgba(8,8,8,0.12)] s:w-full s:max-w-full s:text-center s:whitespace-normal m:w-117.75 m:max-w-full m:text-center m:whitespace-normal m:tracking-normal! l:w-115.5 l:shrink-0 l:whitespace-nowrap l:text-[16px]! l:tracking-normal! xl:w-150.75 xl:shrink-0 xl:whitespace-nowrap xl:text-[18px]! xl:tracking-normal!"
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
)

export default TopBannerContent
