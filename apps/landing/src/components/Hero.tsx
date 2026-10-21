import { ChevronIcon, palette, Typography } from '@gdg/wowds'
import { useEffect, useRef, useState } from 'react'
import { CountUp } from '../hooks/CountUp'
import CTAButton from './common/CTAButton'
import { GoogleColorText } from './common/GoogleColorText'

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

interface HeroProps {
  isRecruiting: boolean
  onRecruitmentClick: () => void
}

export default function Hero({ isRecruiting, onRecruitmentClick }: HeroProps) {
  const isM = useIsMedium()
  const introductionRef = useRef<HTMLElement>(null)
  const scrollFrameRef = useRef(0)

  useEffect(() => () => cancelAnimationFrame(scrollFrameRef.current), [])

  const scrollToIntroduction = () => {
    const introduction = introductionRef.current
    if (!introduction) return

    cancelAnimationFrame(scrollFrameRef.current)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      introduction.scrollIntoView({ behavior: 'instant', block: 'start' })
      return
    }

    const startY = window.scrollY
    const distance = introduction.getBoundingClientRect().top
    const startTime = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / 650, 1)
      const eased = (1 - Math.cos(Math.PI * progress)) / 2
      window.scrollTo({ top: startY + distance * eased, behavior: 'instant' })

      if (progress < 1) scrollFrameRef.current = requestAnimationFrame(step)
    }

    scrollFrameRef.current = requestAnimationFrame(step)
  }

  return (
    <>
      <section className="relative w-full pt-50 min-[600px]:pt-61 s:px-5 m:px-6 flex items-center flex-col">
        <div
          aria-hidden="true"
          className="landing-background absolute inset-0 z-0
    bg-cover max-[600px]:[background-size:100%_auto] bg-top bg-no-repeat opacity-90
    [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]
    min-[600px]:[mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]
    pointer-events-none select-none"
        />
        <section className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center pb-46 s:pb-58.5 m:pb-53.5 l:pb-58.5 xl:pb-58.5">
          <Typography
            as="p"
            variant="subtitle2.2"
            isEn={true}
            className="text-blue-500 pb-5 min-[600px]:pb-6 text-[18px]! s:text-[22px]! m:text-[22px]! l:text-[24px]! xl:text-[24px]!"
          >
            <GoogleColorText /> Developer Groups <br className="block min-[768px]:hidden" /> on
            Campus Hongik University
          </Typography>

          <section className="pb-16 min-[600px]:pb-18">
            <Typography
              as="h1"
              variant="display1.2"
              className="whitespace-nowrap animate-[fadeInUp_0.8s_ease-out_forwards] text-[26px]! leading-[36px]! min-[600px]:text-[44px]! min-[600px]:leading-[62px]! min-[1024px]:text-[52px]! min-[1024px]:leading-[73px]! l:font-bold! xl:font-bold!"
            >
              부담 없는{' '}
              <Typography
                as="span"
                variant="display1.1"
                className="text-blue-600 xs:ml-1 [font-size:inherit]! leading-[inherit]!"
              >
                시작
              </Typography>
              , 이어지는{' '}
              <Typography
                as="span"
                variant="display1.1"
                className="text-blue-600 xs:ml-1 [font-size:inherit]! leading-[inherit]!"
              >
                성장
              </Typography>
            </Typography>
            <Typography
              as="h1"
              variant="display1.2"
              className="animate-[fadeInUp_0.8s_ease-out_0.2s_both] text-[26px]! leading-[36px]! min-[600px]:text-[44px]! min-[600px]:leading-[62px]! min-[1024px]:text-[52px]! min-[1024px]:leading-[73px]!"
            >
              혼자 공부하지 않아도 되는 <br className="block min-[1024px]:hidden" /> 개발 커뮤니티
            </Typography>
          </section>
          <CTAButton
            property="main"
            className="min-w-42 min-[600px]:min-w-50 min-[1024px]:min-w-67"
            onClick={onRecruitmentClick}
          >
            {isRecruiting ? 'GDG 가입하러 가기' : '가입 전 GDG 채널 둘러보기'}
          </CTAButton>
        </section>

        <button
          type="button"
          onClick={scrollToIntroduction}
          className="relative z-10 cursor-pointer text-center [&>p]:mb-3 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        >
          <Typography
            as="p"
            variant="caption1.3"
            className="whitespace-nowrap text-[rgba(8,8,8,0.5)] text-[12px]! min-[1024px]:text-[14px]!"
          >
            스크롤해서 더 살펴보세요
          </Typography>

          <div className="flex flex-col items-center animate-[bounceDown_1.5s_ease-in-out_infinite]">
            <ChevronIcon size={isM ? 'lg' : 'md'} direction="down" color={palette.gray[200]} />
          </div>
          <div className="flex flex-col items-center animate-[bounceDown_1.5s_ease-in-out_infinite]">
            <ChevronIcon
              size={isM ? 'lg' : 'md'}
              direction="down"
              color={palette.gray[200]}
              style={{ marginTop: isM ? -14 : -12 }}
            />
          </div>
        </button>
      </section>

      <section
        ref={introductionRef}
        className="relative w-full flex items-center justify-center overflow-hidden px-4 s:px-5 m:px-6 flex-col mx-auto text-center pt-30"
      >
        <section className="pb-11 min-[768px]:pb-15">
          <h1 className="font-title text-[48px] s:text-[56px] m:text-[80px] l:text-[100px] xl:text-[120px] font-medium bg-gradient-to-r from-blue-700/70 via-blue-400/70 to-blue-700/70 to-[96.29%] bg-clip-text text-transparent leading-[58px] s:leading-[70px] m:leading-[100px] l:leading-[125px] xl:leading-[150px] tracking-[-0.03em] [text-shadow:_0_0_30px_rgb(255_255_255_/_0.1)]">
            GDG <br className="block min-[600px]:hidden" />
            Hongik Univ.
          </h1>
        </section>

        <section className="w-full pb-10 min-[600px]:pb-15 text-gray-800 s:text-black [&>p]:text-[14px]! l:[&>p]:text-[16px]! xl:[&>p]:text-[18px]!">
          <Typography as="p" variant="body1.2">
            GDG Hongik은 홍익대학교 학생이라면
          </Typography>
          <Typography as="p" variant="body1.2">
            누구나 참여할 수 있는 <br className="block min-[600px]:hidden" /> Google Developer
            Groups 개발 커뮤니티예요.
          </Typography>
          <Typography as="p" variant="body1.2">
            스터디와 프로젝트, 세미나까지. <br className="block min-[768px]:hidden" />
            배우고, 만들고, 나누는 경험을 통해 혼자서는 얻기 어려운{' '}
            <br className="block min-[600px]:hidden" />
            성장을 함께 만들어가고 있어요.
          </Typography>
        </section>
        <section className="w-full max-w-124.5 pt-[27px] min-[600px]:pt-[31px] border-t border-[#4285f4]/30 pb-35 min-[1024px]:pb-40">
          <ol className="flex flex-row justify-center w-full gap-0.5 min-[600px]:gap-18 text-gray-600">
            <li className="flex min-w-0 flex-1 flex-col items-center min-[600px]:w-29.5 min-[600px]:flex-none gap-3">
              <Typography
                as="p"
                variant="body2.3"
                className="whitespace-nowrap text-[14px]! min-[1024px]:text-[16px]!"
              >
                누적 회원
              </Typography>
              <Typography
                as="p"
                variant="display1.2"
                isEn
                className="text-blue-700 text-[36px]! leading-[50px]! min-[600px]:text-[44px]! min-[600px]:leading-[62px]! min-[1024px]:text-[52px]! min-[1024px]:leading-[73px]!"
              >
                <CountUp end={532} />
              </Typography>
            </li>
            <li className="flex min-w-0 flex-1 flex-col items-center min-[600px]:w-29.5 min-[600px]:flex-none gap-3">
              <Typography
                as="p"
                variant="body2.3"
                className="whitespace-nowrap text-[14px]! min-[1024px]:text-[16px]!"
              >
                진행한 프로젝트 수
              </Typography>
              <Typography
                as="p"
                variant="display1.2"
                isEn
                className="text-blue-700 text-[36px]! leading-[50px]! min-[600px]:text-[44px]! min-[600px]:leading-[62px]! min-[1024px]:text-[52px]! min-[1024px]:leading-[73px]!"
              >
                <CountUp end={38} />
              </Typography>
            </li>
            <li className="flex min-w-0 flex-1 flex-col items-center min-[600px]:w-29.5 min-[600px]:flex-none gap-3">
              <Typography
                as="p"
                variant="body2.3"
                className="whitespace-nowrap text-[14px]! min-[1024px]:text-[16px]!"
              >
                진행한 세미나 수
              </Typography>
              <Typography
                as="p"
                variant="display1.2"
                isEn
                className="text-blue-700 text-[36px]! leading-[50px]! min-[600px]:text-[44px]! min-[600px]:leading-[62px]! min-[1024px]:text-[52px]! min-[1024px]:leading-[73px]!"
              >
                <CountUp end={57} />
              </Typography>
            </li>
          </ol>
        </section>
      </section>
    </>
  )
}
