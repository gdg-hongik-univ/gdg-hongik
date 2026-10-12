import { CountUp } from '../hooks/CountUp'
import CTAButton from '../components/common/CTAButton'
import { GoogleColorText } from '../components/common/GoogleColorText'
import { ChevronIcon, palette, Tabs, Typography } from '@gdg/wowds'
import { useEffect, useState } from 'react'
import MarkUp from '../components/ActivityInfo'
import LandingOrbits from '../components/LandingOrbits'
import { Faq } from '../components/Faq'
import TopBanner from '../components/TopBanner'

const ACTIVITY_TABS = [
  { value: 'regularStudy', label: '정규 스터디' },
  { value: 'projectTrack', label: '프로젝트 트랙' },
  { value: 'partStudy', label: '파트' },
] as const

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
  const [activeActivity, setActiveActivity] = useState<string>(ACTIVITY_TABS[0].value)

  return (
    <div className="w-full flex flex-col items-center">
      <section className="relative w-full pt-61 xs:pt-50 px-5 xs:px-0 min-h-[100dvh] flex items-center justify-between flex-col">
        <div
          aria-hidden="true"
          className="landing-background absolute inset-0 z-0
    bg-cover bg-top bg-no-repeat opacity-90
    pointer-events-none select-none"
        />
        <section className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center pb-58.5 m:pb-53.5 xs:pb-46">
          <Typography
            as="p"
            variant="subtitle2.2"
            isEn={true}
            className="text-blue-500 pb-6 m:text-[22px]! s:text-[22px]! xs:text-subtitle4! xs:text-[18px]! xs-pb-5"
          >
            <GoogleColorText /> Developer Groups{' '}
            <br className="block m:hidden l:hidden xl:hidden" /> on Campus Hongik University
          </Typography>

          <section className="pb-18 xs:pb-16">
            <Typography
              as="h1"
              variant="display1.2"
              className="animate-[fadeInUp_0.8s_ease-out_forwards] m:text-[44px]! s:text-[44px]! xs:text-title2! xs:text-[26px]!"
            >
              부담 없는{' '}
              <Typography
                as="span"
                variant="display1.1"
                className="text-blue-600 m:text-[44px]! s:text-[44px]! xs:text-title2! xs:text-[26px]!"
              >
                시작
              </Typography>
              , 이어지는{' '}
              <Typography
                as="span"
                variant="display1.1"
                className="text-blue-600 m:text-[44px]! s:text-[44px]! xs:text-title2! xs:text-[26px]!"
              >
                성장
              </Typography>
            </Typography>
            <Typography
              as="h1"
              variant="display1.2"
              className="animate-[fadeInUp_0.8s_ease-out_forwards] m:text-[44px]! s:text-[44px]! xs:text-title2! xs:text-[26px]!"
            >
              혼자 공부하지 않아도 되는 <br className="block l:hidden xl:hidden" /> 개발 커뮤니티
            </Typography>
          </section>
          <CTAButton property="main">GDG 가입하러 가기</CTAButton>
        </section>

        <section className="pb-30">
          <Typography
            as="p"
            variant="caption1.3"
            className="text-[rgba(8,8,8,0.5)] xs:text-[12px]! s:text-[12px]! m:text-[12px]!"
          >
            스크롤해서 더 살펴보세요
          </Typography>

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
        <section className="pb-15 s:pb-11 xs:pb-11">
          <h1 className="font-title xs:text-[48px] s:text-[56px] m:text-[80px] l:text-[100px] xl:text-[120px] font-medium bg-gradient-to-r from-blue-700/70 via-blue-400/70 to-blue-700/70 to-[96.29%] bg-clip-text text-transparent leading-[1.2] tracking-[-1.44px] [text-shadow:_0_0_30px_rgb(255_255_255_/_0.1)]">
            GDG <br className="hidden xs:block" />
            Hongik Univ.
          </h1>
        </section>

        <section className="pb-10">
          <Typography
            as="p"
            variant="body1.2"
            className="l:text-body2! l:text-[16px]! m:text-body2! m:text-[14px]!"
          >
            GDG Hongik은 홍익대학교 학생이라면
          </Typography>
          <Typography
            as="p"
            variant="body1.2"
            className="l:text-body2! l:text-[16px]! m:text-body2! m:text-[14px]!"
          >
            누구나 참여할 수 있는 <br className="hidden xs:block" /> Google Developer Groups 개발
            커뮤니티예요.
          </Typography>
          <Typography
            as="p"
            variant="body1.2"
            className="l:text-body2! l:text-[16px]! m:text-body2! m:text-[14px]!"
          >
            스터디와 프로젝트, 세미나까지.
            <br className="hidden xs:block s:block" />
            배우고, 만들고, 나누는 경험을 통해 혼자서는 얻기 어려운
            <br className="hidden xs:block" />
            성장을 함께 만들어가고 있어요.
          </Typography>
        </section>
        <section className="pt-7 border-t border-[#4285f4]/30 pb-35 l:w-124.5">
          <ol className="flex flex-row w-full text-gray-600 text-[14px] font-medium l:gap-18 l:text-body-2 xl:text-body2">
            <li className="flex flex-col items-center w-27 l:w-29.5 gap-3">
              <Typography
                as="p"
                variant="body2.3"
                className="xs:text-[14px]! s:text-[14px]! m:text-[14px]!"
              >
                누적 회원
              </Typography>
              <Typography
                as="p"
                variant="display1.2"
                isEn
                className="text-blue-700 xs:text-[36px]! s:text-[44px]! m:text-[44px]!"
              >
                <CountUp end={532} />
              </Typography>
            </li>
            <li className="flex flex-col items-center w-27 l:w-29.5 gap-3">
              <Typography
                as="p"
                variant="body2.3"
                className="xs:text-[14px]! s:text-[14px]! m:text-[14px]!"
              >
                진행한 프로젝트 수
              </Typography>
              <Typography
                as="p"
                variant="display1.2"
                isEn
                className="text-blue-700 xs:text-[36px]! s:text-[44px]! m:text-[44px]!"
              >
                <CountUp end={38} />
              </Typography>
            </li>
            <li className="flex flex-col items-center w-27 l:w-29.5 gap-3">
              <Typography
                as="p"
                variant="body2.3"
                className="xs:text-[14px]! s:text-[14px]! m:text-[14px]!"
              >
                진행한 세미나 수
              </Typography>
              <Typography
                as="p"
                variant="display1.2"
                isEn
                className="text-blue-700 xs:text-[36px]! s:text-[44px]! m:text-[44px]!"
              >
                <CountUp end={57} />
              </Typography>
            </li>
          </ol>
        </section>
      </section>

      <TopBanner />

      <section
        className="flex flex-col gap-4 w-[95%] px-4 pt-18 pb-8 s:pt-30 s:pb-15 m:pt-30 m:pb-15 l:pt-35 l:pb-20 xl:pt-35 xl:pb-20"
        aria-label="스터디 소개"
      >
        <Typography as="h2" variant="display3.1" isEn={true}>
          Learn & Build
        </Typography>
        <Tabs value={activeActivity} onValueChange={setActiveActivity}>
          <Tabs.List aria-label="스터디 종류">
            {ACTIVITY_TABS.map((tab) => (
              <Tabs.Trigger key={tab.value} value={tab.value}>
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {ACTIVITY_TABS.map((tab) => (
            <Tabs.Content key={tab.value} value={tab.value}>
              <MarkUp activityType={tab.value} />
            </Tabs.Content>
          ))}
        </Tabs>
      </section>
      <section
        className="flex flex-col gap-12 w-[95%] px-4 pt-10 pb-18 s:pt-20 s:pb-45 m:pt-20 m:pb-45 l:pt-25 l:pb-50 xl:pt-25 xl:pb-50"
        aria-label="지난 학기 활동 소개"
      >
        <Typography as="h2" variant="display3.1" isEn={true}>
          Meet & Connect
        </Typography>
        <MarkUp activityType="meetNConnect" />
      </section>
      <LandingOrbits />
      <Faq />
    </div>
  )
}
