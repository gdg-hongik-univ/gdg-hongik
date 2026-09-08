import LandingBackground from '../assets/LandingBackground.webp'
import { CountUp } from '../hooks/CountUp'
import CTAButton from '../components/common/CTAButton'
import { GoogleColorText } from '../components/common/GoogleColorText'
import { ChevronIcon, palette } from '@gdg/wowds'
import { useEffect, useState } from 'react'

function useIsMedium() {
  const query = '(min-width: 768px)'

  const [isMedium, setIsMedium] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)

    const onChange = (event: MediaQueryListEvent) => {
      setIsMedium(event.matches)
    }

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return isMedium
}

export default function LandingPage() {
  const isM = useIsMedium()

  return (
    <div className="w-full flex flex-col items-center">
      <section className="relative w-full pt-50 s:pt-61 min-h-[100dvh] flex items-center justify-between  px-4 flex-col">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <img
            src={LandingBackground}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-top opacity-90 "
          />
        </div>

        <section className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center pb-58.5">
          <p className="font-medium text-subtitle4 l:text-subtitle2 text-blue-500 pb-6">
            <GoogleColorText /> Developer Groups <br className="block l:hidden" /> on Campus Hongik
            University
          </p>

          <section className="pb-18">
            <h1 className="text-[26px] leading-1.4 l:text-display1 font-bold text-black animate-[fadeInUp_0.8s_ease-out_forwards]">
              부담 없는 <span className="text-blue-600">시작</span>, 이어지는{' '}
              <span className="text-blue-600">성장</span>
            </h1>
            <h1 className="text-[26px] leading-1.4 l:text-display1 font-semibold text-black animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
              혼자 공부하지 않아도 되는 <br className="block l:hidden" /> 개발 커뮤니티
            </h1>
          </section>
          <CTAButton property="main">GDG 가입하러 가기</CTAButton>
        </section>
        <section className="pb-30">
          <p className="text-[12px] leading-[1.5] tracking-[-0.18px] l:text-caption1">
            스크롤해서 더 살펴보세요
          </p>
          <div className="flex flex-col items-center animate-[bounceDown_1.5s_ease-in-out_infinite]">
            <ChevronIcon size={isM ? 'lg' : 'sm'} direction="down" color={palette.gray[200]} />
          </div>
          <div className="flex flex-col items-center animate-[bounceDown_1.5s_ease-in-out_infinite]">
            <ChevronIcon
              size={isM ? 'lg' : 'sm'}
              direction="down"
              color={palette.gray[200]}
              style={{ marginTop: isM ? -14 : -12 }}
            />
          </div>
        </section>
      </section>
      <section className="relative w-full flex items-center justify-center overflow-hidden px-4 flex-col mx-auto text-center">
        <section className="pb-11">
          <h1 className="text-[48px] s:text-[56px] m:text-[80px] l:text-[100px] xl:text-[120px] font-medium bg-gradient-to-r from-blue-700/70 via-blue-400/70 to-blue-700/70 to-[96.29%] bg-clip-text text-transparent leading-[1.2] tracking-[-1.44px] [text-shadow:_0_0_30px_rgb(255_255_255_/_0.1)]">
            GDG <br className="block s:hidden" />
            Hongik Univ.
          </h1>
        </section>

        <section className="text-[14px] font-semibold leading-[150%] tracking-[-0.21px] l:text-body2 xl:text-body1 pb-10">
          <p>GDG Hongik은 홍익대학교 학생이라면</p>
          <p>
            누구나 참여할 수 있는 <br className="block s:hidden xl:hidden" /> Google Developer
            Groups 개발 커뮤니티예요.
          </p>
          <p>
            스터디와 프로젝트, 세미나까지.
            <br className="block m:hidden xl:hidden" />
            배우고, 만들고, 나누는 경험을 통해 혼자서는 얻기 어려운
            <br className="block m:hidden xl:hidden" />
            성장을 함께 만들어가고 있어요.
          </p>
        </section>
        <section className="pt-7 border-t border-[#4285f4]/30 pb-35 l:w-124.5">
          <ol className="flex flex-row w-full text-gray-600 text-[14px] font-medium l:gap-18 l:text-body-2 xl:text-body2">
            <li className="flex flex-col items-center w-27 l:w-29.5 gap-3">
              <h3>누적 회원</h3>
              <p className="text-blue-700 text-[36px] leading-[1.4] tracking-[-0.58px] l:text-display1">
                <CountUp end={532} />
              </p>
            </li>
            <li className="flex flex-col items-center w-27 l:w-29.5 gap-3">
              <h3>진행한 프로젝트 수</h3>
              <p className="text-blue-700 text-[36px] leading-[1.4] tracking-[-0.58px] l:text-display1">
                <CountUp end={38} />
              </p>
            </li>
            <li className="flex flex-col items-center w-27 l:w-29.5 gap-3">
              <h3>진행한 세미나 수</h3>
              <p className="text-blue-700 text-[36px] leading-[1.4] tracking-[-0.58px] l:text-display1">
                <CountUp end={57} />
              </p>
            </li>
          </ol>
        </section>
      </section>
    </div>
  )
}
