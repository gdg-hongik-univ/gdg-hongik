import { Typography } from '@gdg/wowds'
import { RecruitmentCTA } from './common/RecruitmentCTA'
import { Skeleton } from './common/Skeleton'
import { BottomBannerBg } from './banner/BottomBannerBg'

interface RecruitmentStatusProps {
  isRecruiting: boolean | null
  onRecruitmentClick: () => void
}

const BottomBanner = ({ isRecruiting, onRecruitmentClick }: RecruitmentStatusProps) => {
  const isLoading = isRecruiting === null

  return (
    <section className="relative w-full overflow-hidden xs:h-73 s:h-75 m:h-75 h-87">
      <BottomBannerBg />
      <div className="absolute inset-0 z-10 flex flex-col justify-center xs:items-start xs:text-left xs:pl-8 items-center text-center gap-8 text-white">
        <div
          className={`flex flex-col xs:gap-2 s:gap-2 gap-3 ${isLoading ? 'w-70 max-w-[85vw] s:w-90 m:w-105 l:w-120 xl:w-[699px] xl:gap-3.5' : ''}`}
        >
          <Typography
            variant="display2.1"
            isEn={isRecruiting === true}
            className="xs:text-[30px]! s:text-[40px]! m:text-[40px]!"
          >
            {isLoading ? (
              <Skeleton className="h-[1lh] w-full xs:h-[2lh] xl:h-[62px]" />
            ) : isRecruiting ? (
              'Join Us!'
            ) : (
              <>
                지금은 모집기간이 <br className="hidden xs:block" /> 아니에요
              </>
            )}
          </Typography>

          <Typography
            variant="subtitle4.3"
            className="xs:text-[14px]! s:text-[18px]! m:text-[18px]! break-keep"
          >
            {isLoading ? (
              <Skeleton className="h-[1lh] w-full xs:h-[2lh] s:h-[2lh] xl:h-[30px]" />
            ) : isRecruiting ? (
              <>
                GDG Hongik Univ.에서 함께 배우고 만들며
                <br className="hidden xs:block s:block" /> 다양한 경험을 시작해보세요.
              </>
            ) : (
              <>
                GDG Hongik Univ.는 2026년 08월 12일
                <br className="hidden xs:block s:block" /> 2학기 모집을 시작할 예정이에요.
              </>
            )}
          </Typography>
        </div>

        <RecruitmentCTA
          property="sub"
          className={
            isLoading
              ? 'motion-safe:animate-recruitment-loading [--loading-background:color-mix(in_srgb,var(--color-white)_90%,transparent)] [--loading-background-dim:color-mix(in_srgb,var(--color-disabled-light)_80%,transparent)]'
              : undefined
          }
          isRecruiting={isRecruiting}
          closedLabel="GDG 채널 둘러보기"
          onClick={onRecruitmentClick}
        />
      </div>
    </section>
  )
}

export default BottomBanner
