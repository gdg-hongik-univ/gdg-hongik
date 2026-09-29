import { useEffect, useMemo, useRef, useState } from 'react'
import { cn, Typography } from '@gdg/wowds'
import UpcomingEventCard, {
  type UpcomingEventsSize,
  type UpcomingEventsState,
} from './common/UpcomingEvents'
import backgroundDecoration from '../assets/upcoming-events/background-decoration.svg'
import backgroundDecorationMobile from '../assets/upcoming-events/background-decoration-mobile.svg'
import timelineLine from '../assets/upcoming-events/timeline-line.svg'
import timelineLineLarge from '../assets/upcoming-events/timeline-line-large.svg'
import timelineLineMedium from '../assets/upcoming-events/timeline-line-medium.svg'
import timelineLineSmall from '../assets/upcoming-events/timeline-line-small.svg'
import timelineLineExtraSmall from '../assets/upcoming-events/timeline-line-extra-small.svg'

type EventItem = {
  id: string
  name: string
  date: string
  description: string
  image: string | null
  emphasis: boolean
}

type EventsResponse = {
  items: EventItem[]
}

const DAY_IN_MS = 1000 * 60 * 60 * 24
const VISIBLE_EVENT_COUNT = 5
const CENTER_EVENT_INDEX = 2

const parseDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const formatDate = (date: string) => {
  const [, month, day] = date.split('-')
  return `${month}.${day}`
}

const getDaysUntil = (eventDate: Date, today: Date) =>
  Math.round((eventDate.getTime() - today.getTime()) / DAY_IN_MS)

const getDdayText = (daysUntil: number) => (daysUntil === 0 ? 'D-Day' : `D-${daysUntil}`)

const getToday = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

const useUpcomingEventSize = (): UpcomingEventsSize => {
  const query = '(min-width: 1024px)'
  const [size, setSize] = useState<UpcomingEventsSize>(() =>
    window.matchMedia(query).matches ? 'large' : 'small',
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = (event: MediaQueryListEvent) => setSize(event.matches ? 'large' : 'small')

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return size
}

const UpcomingEvents = () => {
  const [events, setEvents] = useState<EventItem[]>([])
  const [activeEventId, setActiveEventId] = useState<string | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [hasTimelineEntered, setHasTimelineEntered] = useState(false)
  const [isTimelineAnimationComplete, setIsTimelineAnimationComplete] = useState(false)
  const [loadState, setLoadState] = useState<'loading' | 'success' | 'error'>('loading')
  const [today] = useState(getToday)
  const size = useUpcomingEventSize()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const highlightedEventRef = useRef<HTMLLIElement>(null)
  const eventRefs = useRef(new Map<string, HTMLLIElement>())
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}events.json`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to load events: ${response.status}`)
        }

        const data = (await response.json()) as EventsResponse
        setEvents(data.items)
        setLoadState('success')
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setLoadState('error')
      }
    }

    void loadEvents()
    return () => controller.abort()
  }, [])

  const { highlightedEventId, visibleEvents } = useMemo(() => {
    const scheduledEvents = events
      .filter((event) => event.image === null)
      .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime())

    const nextEventIndex = scheduledEvents.findIndex((event) => parseDate(event.date) >= today)

    if (nextEventIndex === -1) {
      return {
        highlightedEventId: null,
        visibleEvents: scheduledEvents.slice(-VISIBLE_EVENT_COUNT),
      }
    }

    const maxStartIndex = Math.max(0, scheduledEvents.length - VISIBLE_EVENT_COUNT)
    const startIndex = Math.min(Math.max(0, nextEventIndex - CENTER_EVENT_INDEX), maxStartIndex)

    return {
      highlightedEventId: scheduledEvents[nextEventIndex].id,
      visibleEvents: scheduledEvents.slice(startIndex, startIndex + VISIBLE_EVENT_COUNT),
    }
  }, [events, today])

  useEffect(() => {
    const container = scrollContainerRef.current
    const highlightedEvent = highlightedEventRef.current

    if (!container || !highlightedEvent) return

    container.scrollTo({
      left:
        highlightedEvent.offsetLeft - container.clientWidth / 2 + highlightedEvent.offsetWidth / 2,
      behavior: 'auto',
    })
  }, [highlightedEventId, size])

  useEffect(() => {
    const container = scrollContainerRef.current
    const activeEvent = activeEventId ? eventRefs.current.get(activeEventId) : null

    if (!container || !activeEvent) return

    const containerBounds = container.getBoundingClientRect()
    const activeEventBounds = activeEvent.getBoundingClientRect()

    if (
      activeEventBounds.left >= containerBounds.left &&
      activeEventBounds.right <= containerBounds.right
    ) {
      return
    }

    container.scrollTo({
      left: activeEvent.offsetLeft - container.clientWidth / 2 + activeEvent.offsetWidth / 2,
      behavior: 'smooth',
    })
  }, [activeEventId])

  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setHasTimelineEntered(true)
        observer.disconnect()
      },
      { threshold: 0.2 },
    )

    observer.observe(timeline)
    return () => observer.disconnect()
  }, [loadState])

  const semesterLabel = useMemo(() => {
    const highlightedEvent = visibleEvents.find((event) => event.id === highlightedEventId)
    const date = highlightedEvent ? parseDate(highlightedEvent.date) : today
    const semester = date.getMonth() < 6 ? 1 : 2

    return `${date.getFullYear()}년 ${semester}학기 예정 일정`
  }, [highlightedEventId, today, visibleEvents])

  return (
    <section
      aria-labelledby="upcoming-events-title"
      className="relative flex h-[581.75px] w-full flex-col items-center gap-10 overflow-hidden pt-[140px] pb-[60px] text-center s:h-[810.75px] s:gap-[52px] s:pb-[120px] m:h-[810.75px] m:gap-[52px] m:pb-[120px] l:h-[914.75px] l:gap-[52px] l:pt-[160px] l:pb-[120px] xl:h-[914.75px] xl:gap-[52px] xl:pt-[160px] xl:pb-[120px]"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 100% 100% at 50% 0%, rgb(255 255 255 / 0%) 35.313%, #fff 100%), linear-gradient(90deg, rgb(175 205 255 / 52.8%) 29.724%, rgb(255 249 214 / 39.2%) 100%), linear-gradient(90deg, #f4f8ff 0%, #f4f8ff 100%)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-10.26px] left-[-180.71px] flex h-[307.186px] w-[799.968px] items-center justify-center s:hidden m:hidden l:hidden xl:hidden"
      >
        <img className="rotate-[-6.56deg]" src={backgroundDecorationMobile} alt="" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-134.01px] left-[-270.17px] hidden h-[674.692px] w-[1757.08px] items-center justify-center s:flex m:flex l:left-[-160.17px] l:flex xl:left-[-160.17px] xl:flex"
      >
        <img className="rotate-[-6.56deg]" src={backgroundDecoration} alt="" />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center gap-2 s:gap-3 m:gap-3 l:gap-3 xl:gap-3">
        <Typography
          variant="caption1.2"
          as="p"
          className="text-black s:!text-[20px] m:!text-[20px] l:!text-[22px] xl:!text-[22px]"
        >
          곧 열릴 GDG의 다음 활동을 확인해 보세요
        </Typography>
        <Typography
          id="upcoming-events-title"
          variant="subtitle1.1"
          as="h2"
          isEn
          className="text-black s:!text-[36px] s:!leading-[1.4] m:!text-[36px] m:!leading-[1.4] l:!text-[44px] l:!leading-[1.4] xl:!text-[44px] xl:!leading-[1.4]"
        >
          Upcoming Events
        </Typography>
      </div>

      <div className="relative z-10 flex w-full flex-col items-center gap-9 s:gap-5 m:gap-5 l:gap-7 xl:gap-7">
        {loadState === 'error' ? (
          <Typography as="p" variant="body2.2" className="text-center text-gray-500">
            일정을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
          </Typography>
        ) : loadState === 'loading' ? (
          <Typography as="p" variant="body2.2" className="text-center text-gray-400">
            일정을 불러오는 중이에요.
          </Typography>
        ) : visibleEvents.length > 0 ? (
          <>
            <div className="flex w-full flex-col items-center gap-10 px-4 s:gap-12 s:px-5 m:gap-12 m:px-6 l:w-[935px] l:items-start l:gap-12 l:px-0 xl:w-[1280px] xl:items-start xl:gap-12 xl:px-0">
              <Typography
                as="h3"
                variant="body2.2"
                className="text-gray-700 s:!text-[20px] m:!text-[20px] l:!text-left l:!text-[22px] xl:!text-left xl:!text-[22px]"
              >
                {semesterLabel}
              </Typography>

              <div
                ref={scrollContainerRef}
                className="w-full overflow-x-auto [scrollbar-width:none] l:overflow-visible xl:overflow-visible [&::-webkit-scrollbar]:hidden"
              >
                <div
                  ref={timelineRef}
                  className="relative mx-auto w-max min-w-full s:py-15 m:py-15 l:py-15 xl:py-15"
                >
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 s:top-20 m:top-20 l:top-20 xl:top-20">
                    <picture>
                      <source media="(min-width: 1440px)" srcSet={timelineLine} />
                      <source media="(min-width: 1024px)" srcSet={timelineLineLarge} />
                      <source media="(min-width: 768px)" srcSet={timelineLineMedium} />
                      <source media="(min-width: 600px)" srcSet={timelineLineSmall} />
                      <img
                        src={timelineLineExtraSmall}
                        alt=""
                        aria-hidden="true"
                        className={cn(
                          'block max-w-none origin-left',
                          hasTimelineEntered
                            ? 'animate-[timelineLineDraw_1.2s_linear_forwards]'
                            : 'scale-x-0',
                        )}
                      />
                    </picture>
                  </div>

                  <ol className="relative z-10 flex min-h-[150px] w-max min-w-full items-start justify-center s:min-h-[164px] m:min-h-[164px] l:min-h-[220px] l:gap-5 xl:min-h-[220px] xl:gap-20">
                    {visibleEvents.map((event, index) => {
                      const eventDate = parseDate(event.date)
                      const daysUntil = getDaysUntil(eventDate, today)
                      const isPast = daysUntil < 0
                      const isHighlighted = event.id === highlightedEventId
                      const state: UpcomingEventsState = isPast
                        ? 'disabled'
                        : activeEventId === event.id
                          ? 'hover'
                          : 'default'

                      const cardProps = {
                        dateText: formatDate(event.date),
                        labelText: event.name,
                        descriptionText: event.description,
                        dDayText: getDdayText(daysUntil),
                        size,
                        tabIndex: isPast ? -1 : 0,
                        onMouseEnter: () => {
                          if (isPast) return
                          setActiveEventId(event.id)
                          if (isTimelineAnimationComplete) setHasInteracted(true)
                        },
                        onMouseLeave: () => setActiveEventId(null),
                        onFocus: () => {
                          if (isPast) return
                          setActiveEventId(event.id)
                          if (isTimelineAnimationComplete) setHasInteracted(true)
                        },
                        onBlur: () => setActiveEventId(null),
                      } as const

                      return (
                        <li
                          key={event.id}
                          ref={(node) => {
                            if (node) eventRefs.current.set(event.id, node)
                            else eventRefs.current.delete(event.id)

                            if (isHighlighted) highlightedEventRef.current = node
                          }}
                          className={cn(
                            'flex shrink-0 justify-center',
                            hasTimelineEntered
                              ? 'animate-[timelineEventReveal_0.4s_ease-out_forwards] opacity-0'
                              : 'translate-y-3 opacity-0',
                          )}
                          style={
                            hasTimelineEntered
                              ? { animationDelay: `${1.2 + index * 0.15}s` }
                              : undefined
                          }
                          onAnimationEnd={
                            index === visibleEvents.length - 1
                              ? () => setIsTimelineAnimationComplete(true)
                              : undefined
                          }
                        >
                          {isHighlighted && !isPast ? (
                            <UpcomingEventCard
                              {...cardProps}
                              emphasis="strong"
                              state={state === 'hover' ? 'hover' : 'default'}
                            />
                          ) : (
                            <UpcomingEventCard {...cardProps} emphasis="default" state={state} />
                          )}
                        </li>
                      )
                    })}
                  </ol>
                </div>
              </div>
            </div>

            <Typography
              as="p"
              variant="caption1.3"
              aria-hidden={hasInteracted}
              className={cn(
                'text-center text-gray-400 transition-opacity duration-300 s:!text-[16px] m:!text-[16px] l:!text-[18px] xl:!text-[18px]',
                hasInteracted ? 'opacity-0' : 'opacity-100',
              )}
            >
              {size === 'large'
                ? '일정을 마우스로 호버하여 자세히 확인해보세요'
                : '일정을 클릭하여 자세히 확인해보세요'}
            </Typography>
          </>
        ) : (
          <Typography as="p" variant="body2.2" className="text-center text-gray-500">
            예정된 일정이 없습니다.
          </Typography>
        )}
      </div>
    </section>
  )
}

export default UpcomingEvents
