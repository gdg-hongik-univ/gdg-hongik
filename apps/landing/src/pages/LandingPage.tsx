import Hero from '../components/Hero'
import { Tabs, Typography } from '@gdg/wowds'
import { useEffect, useState } from 'react'
import MarkUp from '../components/ActivityInfo'
import UpcomingEvents from '../components/upcomingEvents/UpcomingEvents'
import LandingOrbits from '../components/LandingOrbits'
import { Faq } from '../components/Faq'
import PartCardList from '../components/partcardList/PartCardList'
import TopBanner from '../components/TopBanner'
import ProjectTrack from '../components/ProjectTrack'
import CaracelCardList from '../components/CaracelCardList'
import { getStudies } from '../api/study'
import type { regularStudyType } from '../types/study'
import { getEvents } from '../api/event'
import type { eventItems } from '../types/event'
import BottomBanner from '../components/BottomBanner'
import { fetcher } from '../api/fetcher'
import { RecruitmentNoticeModal } from '../components/modal/RecruitmentNoticeModal'

const ACTIVITY_TABS = [
  { value: 'regularStudy', label: '정규 스터디' },
  { value: 'projectTrack', label: '프로젝트 트랙' },
  { value: 'partStudy', label: '파트' },
] as const

export default function LandingPage() {
  const [activeActivity, setActiveActivity] = useState<string>(ACTIVITY_TABS[0].value)

  const [studies, setStudies] = useState<regularStudyType | null>(null)
  const [studiesError, setStudiesError] = useState(false)

  const [events, setEvents] = useState<eventItems | null>(null)
  const [eventsError, setEventsError] = useState(false)
  const [isRecruiting, setIsRecruiting] = useState<boolean | null>(null)
  const [isNoticeOpen, setIsNoticeOpen] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    getEvents(controller.signal).then((data) => {
      if (!controller.signal.aborted) {
        setEvents(data)
        setEventsError(data === null)
      }
    })

    return () => controller.abort()
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    getStudies(controller.signal).then((data) => {
      if (!controller.signal.aborted) {
        setStudies(data)
        setStudiesError(data === null)
      }
    })

    return () => controller.abort()
  }, [])

  const studyCards = studiesError ? (
    <p role="alert" className="mt-9">
      스터디 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
    </p>
  ) : studies === null ? (
    <p role="status" className="mt-9">
      스터디 정보를 불러오는 중이에요.
    </p>
  ) : studies.items.length === 0 ? (
    <p className="mt-9">등록된 스터디가 없어요.</p>
  ) : (
    <CaracelCardList type="study" studies={studies} />
  )

  const eventCards = eventsError ? (
    <p role="alert" className="mt-9">
      이벤트 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
    </p>
  ) : events === null ? (
    <p role="status" className="mt-9">
      이벤트 정보를 불러오는 중이에요.
    </p>
  ) : events.items.length === 0 ? (
    <p className="mt-9">등록된 이벤트가 없어요.</p>
  ) : (
    <CaracelCardList type="event" events={events} />
  )

  useEffect(() => {
    const controller = new AbortController()

    fetcher<{ is_recruitment?: boolean }>(
      `${import.meta.env.BASE_URL}config.json`,
      '모집 설정을 불러오지 못했습니다.',
      controller.signal,
    ).then((config) => {
      if (!controller.signal.aborted) {
        setIsRecruiting(config?.is_recruitment === true)
      }
    })

    return () => controller.abort()
  }, [])

  const handleRecruitmentClick = () => {
    if (isRecruiting === null) return

    if (isRecruiting) {
      window.location.assign('https://onboarding.wawoo.dev/')
      return
    }

    setIsNoticeOpen(true)
  }

  return (
    <div className="w-full flex flex-col items-center">
      <Hero isRecruiting={isRecruiting} onRecruitmentClick={handleRecruitmentClick} />
      <TopBanner />
      <section
        className="mx-auto flex w-[95%] flex-col gap-3 px-4 pt-18 pb-8 s:pt-30 s:pb-15 m:pt-30 m:pb-15 l:pt-35 l:pb-20 xl:pt-35 xl:pb-20 min-[600px]:gap-4"
        aria-label="스터디 소개"
      >
        <Typography
          as="h2"
          variant="display3.1"
          isEn={true}
          className="text-[24px]! leading-[1.5]! tracking-[-0.015em]! min-[600px]:text-[36px]! min-[600px]:leading-[1.4]! min-[1024px]:text-[44px]!"
        >
          Learn & Build
        </Typography>
        <Tabs value={activeActivity} onValueChange={setActiveActivity}>
          <Tabs.List aria-label="스터디 종류">
            {ACTIVITY_TABS.map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                className="px-3 py-2 font-primary text-[14px] leading-[1.5] tracking-[-0.015em] min-[600px]:px-4 min-[600px]:py-3.5 min-[600px]:text-[18px] min-[1024px]:text-[20px] aria-selected:font-bold"
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {ACTIVITY_TABS.map((tab) => (
            <Tabs.Content
              key={tab.value}
              value={tab.value}
              className="flex flex-col gap-7 pt-7 min-[600px]:gap-9 min-[600px]:pt-9"
            >
              <MarkUp activityType={tab.value} />
              {tab.value === 'partStudy' && <PartCardList />}
              {tab.value === 'projectTrack' && <ProjectTrack />}
              {tab.value === 'regularStudy' && studyCards}
            </Tabs.Content>
          ))}
        </Tabs>
      </section>
      <section
        className="flex flex-col gap-12 w-[95%] px-4 pt-10 pb-18 s:pt-20 s:pb-45 m:pt-20 m:pb-45 l:pt-25 l:pb-50 xl:pt-25 xl:pb-50"
        aria-label="지난 학기 활동 소개"
      >
        <Typography
          as="h2"
          variant="display3.1"
          isEn={true}
          className="text-[24px]! leading-[1.5]! tracking-[-0.015em]! min-[600px]:text-[36px]! min-[600px]:leading-[1.4]! min-[1024px]:text-[44px]!"
        >
          Meet & Connect
        </Typography>
        <MarkUp activityType="meetNConnect" />
        {eventCards}
      </section>
      <UpcomingEvents />
      <LandingOrbits />
      <BottomBanner isRecruiting={isRecruiting} onRecruitmentClick={handleRecruitmentClick} />
      <Faq />
      <RecruitmentNoticeModal isOpen={isNoticeOpen} onClose={() => setIsNoticeOpen(false)} />
    </div>
  )
}
