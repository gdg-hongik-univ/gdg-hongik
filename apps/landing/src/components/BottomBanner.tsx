import { Typography } from '@gdg/wowds'
import CTAButton from './common/CTAButton'
import { BottomBannerBg } from './banner/BottomBannerBg'

interface RecruitmentStatusProps {
  isRecruiting: boolean
}

const BottomBanner = ({ isRecruiting }: RecruitmentStatusProps) => {
  return (
    <section className="relative w-full overflow-hidden xs:h-73 s:h-75 m:h-75 h-87">
      <BottomBannerBg />
      <div className="absolute inset-0 z-10 flex flex-col justify-center xs:items-start xs:text-left pl-8 items-center text-center gap-8 text-white">
        <div className="flex flex-col xs:gap-2 s:gap-2 gap-3">
          <Typography
            variant="display2.1"
            isEn={isRecruiting}
            className="xs:text-[30px]! s:text-[40px]! m:text-[40px]!"
          >
            {isRecruiting ? (
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
            {isRecruiting ? (
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

        <CTAButton property="sub" size="auto">
          {isRecruiting ? 'GDG 가입하러 가기' : 'GDG 채널 둘러보기'}
        </CTAButton>
      </div>
    </section>
  )
}

export default BottomBanner
