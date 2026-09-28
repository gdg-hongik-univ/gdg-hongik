import { palette } from '@gdg/wowds'
import { Typography } from '../../../../../packages/wowds/ui/components/Typography'

const TopBanner = () => {
  return (
    <section
      className="relative isolate flex min-h-64 w-full items-center overflow-hidden px-6 py-12 m:min-h-72 m:px-14 l:px-20 xl:px-28"
      style={{
        color: palette.white,
        background: `linear-gradient(83deg, ${palette.blue[700]} 12%, #C6EBC8 150%)`,
      }}
    >
      <img
        src="/banner/top-banner-left.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 h-full w-auto max-w-none select-none"
      />
      <img
        src="/banner/top-banner-right.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-0 -z-10 hidden h-[115%] w-auto select-none m:block l:right-0"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 m:flex-row m:items-center m:justify-between m:gap-12">
        <Typography variant="display2.2" as="h2" isEn className="shrink-0">
          Choose Your Path!
        </Typography>
        <Typography variant="body1.3" as="p" className="max-w-150">
          GDG Hongik에는 하나의 정해진 코스가 없어요.
          <br />
          정규스터디에서 다양한 분야를 경험하고, 프로젝트 트랙에서 직접 서비스를 만들어 보며,
          <br className="hidden l:block" /> 파트에서 관심 분야를 더욱 깊이 학습해 보세요. 이후
          코어팀과 개발팀으로 구성된
          <br className="hidden l:block" /> 와우디벨로퍼스를 통해 커뮤니티와 서비스에 직접 기여할 수
          있어요.
        </Typography>
      </div>
    </section>
  )
}

export default TopBanner
