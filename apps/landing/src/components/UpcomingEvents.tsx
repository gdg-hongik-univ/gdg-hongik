import { type PointerEvent, useEffect, useMemo, useRef, useState } from 'react'
import { cn, Typography } from '@gdg/wowds'
import UpcomingEventCard, {
  type UpcomingEventsSize,
  type UpcomingEventsState,
} from './common/UpcomingEvents'
import backgroundDecoration from '../assets/upcoming-events/background-decoration.svg'
import backgroundDecorationMobile from '../assets/upcoming-events/background-decoration-mobile.svg'

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

const parseEventDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const formatMonthDay = (date: string) => {
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

const useUpcomingEventCardSize = (): UpcomingEventsSize => {
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

const useCanHover = () => {
  const query = '(hover: hover) and (pointer: fine)'
  const [canHover, setCanHover] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = (event: MediaQueryListEvent) => setCanHover(event.matches)

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return canHover
}

const UpcomingEvents = () => {
  const [events, setEvents] = useState<EventItem[]>([])
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null)
  const [hasViewedEventDetails, setHasViewedEventDetails] = useState(false)
  const [hasTimelineEnteredViewport, setHasTimelineEnteredViewport] = useState(false)
  const [isTimelineAnimationComplete, setIsTimelineAnimationComplete] = useState(false)
  const [eventsLoadState, setEventsLoadState] = useState<'loading' | 'success' | 'error'>('loading')
  const [today] = useState(getToday)
  const size = useUpcomingEventCardSize()
  const canHover = useCanHover()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const nextEventItemRef = useRef<HTMLLIElement>(null)
  const eventItemRefs = useRef(new Map<string, HTMLLIElement>())
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
        setEventsLoadState('success')
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setEventsLoadState('error')
      }
    }

    void loadEvents()
    return () => controller.abort()
  }, [])

  const { nextEventId, visibleEvents } = useMemo(() => {
    const scheduledEvents = events
      .filter((event) => event.image === null)
      .sort((a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime())

    const nextEventIndex = scheduledEvents.findIndex((event) => parseEventDate(event.date) >= today)

    if (nextEventIndex === -1) {
      return {
        nextEventId: null,
        visibleEvents: scheduledEvents.slice(-VISIBLE_EVENT_COUNT),
      }
    }

    const maxStartIndex = Math.max(0, scheduledEvents.length - VISIBLE_EVENT_COUNT)
    const startIndex = Math.min(Math.max(0, nextEventIndex - CENTER_EVENT_INDEX), maxStartIndex)

    return {
      nextEventId: scheduledEvents[nextEventIndex].id,
      visibleEvents: scheduledEvents.slice(startIndex, startIndex + VISIBLE_EVENT_COUNT),
    }
  }, [events, today])

  useEffect(() => {
    const container = scrollContainerRef.current
    const nextEventItem = nextEventItemRef.current

    if (!container || !nextEventItem) return

    container.scrollTo({
      left: nextEventItem.offsetLeft - container.clientWidth / 2 + nextEventItem.offsetWidth / 2,
      behavior: 'auto',
    })
  }, [nextEventId, size])

  useEffect(() => {
    const container = scrollContainerRef.current
    const expandedEventElement = expandedEventId ? eventItemRefs.current.get(expandedEventId) : null

    if (!container || !expandedEventElement) return

    const containerBounds = container.getBoundingClientRect()
    const expandedEventBounds =
      expandedEventElement.firstElementChild?.getBoundingClientRect() ??
      expandedEventElement.getBoundingClientRect()

    if (
      expandedEventBounds.left >= containerBounds.left &&
      expandedEventBounds.right <= containerBounds.right
    ) {
      return
    }

    container.scrollTo({
      left:
        expandedEventElement.offsetLeft -
        container.clientWidth / 2 +
        expandedEventElement.offsetWidth / 2,
      behavior: 'smooth',
    })
  }, [expandedEventId])

  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setHasTimelineEnteredViewport(true)
        observer.disconnect()
      },
      { threshold: 0.2 },
    )

    observer.observe(timeline)
    return () => observer.disconnect()
  }, [eventsLoadState])

  const semesterLabel = useMemo(() => {
    const nextEvent = visibleEvents.find((event) => event.id === nextEventId)
    const date = nextEvent ? parseEventDate(nextEvent.date) : today
    const semester = date.getMonth() < 6 ? 1 : 2

    return `${date.getFullYear()}년 ${semester}학기 예정 일정`
  }, [nextEventId, today, visibleEvents])

  const isInteractionHintHidden = hasViewedEventDetails && isTimelineAnimationComplete

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
        {eventsLoadState === 'error' ? (
          <Typography as="p" variant="body2.2" className="text-center text-gray-500">
            일정을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
          </Typography>
        ) : eventsLoadState === 'loading' ? (
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
                className="-mt-2 w-full overflow-x-auto pt-2 [scrollbar-width:none] s:mt-0 s:pt-0 l:overflow-visible xl:overflow-visible [&::-webkit-scrollbar]:hidden"
              >
                <div
                  ref={timelineRef}
                  className="relative mx-auto w-max min-w-full s:py-15 m:py-15 l:py-15 xl:py-15"
                >
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 s:top-20 m:top-20 l:top-20 xl:top-20">
                    <div
                      aria-hidden="true"
                      className={cn(
                        'h-0.5 w-[328px] origin-left bg-linear-to-r from-blue-500/10 via-blue-500 to-blue-500/10 s:w-[560px] m:w-[710.86px] l:w-[968px] xl:w-[1280px]',
                        hasTimelineEnteredViewport
                          ? 'animate-[timelineLineDraw_1.2s_linear_forwards]'
                          : 'scale-x-0',
                      )}
                    />
                  </div>

                  <ol className="relative z-10 flex min-h-[150px] w-max min-w-full items-start justify-center s:min-h-[164px] m:min-h-[164px] l:min-h-[220px] l:gap-5 xl:min-h-[220px] xl:gap-20">
                    {visibleEvents.map((event, index) => {
                      const eventDate = parseEventDate(event.date)
                      const daysUntil = getDaysUntil(eventDate, today)
                      const isPast = daysUntil < 0
                      const isNextEvent = event.id === nextEventId
                      const cardState: UpcomingEventsState = isPast
                        ? 'disabled'
                        : expandedEventId === event.id
                          ? 'active'
                          : 'default'

                      const showEventDetails = () => {
                        if (isPast) return
                        setExpandedEventId(event.id)
                        setHasViewedEventDetails(true)
                      }

                      const eventCardProps = {
                        dateText: formatMonthDay(event.date),
                        labelText: event.name,
                        descriptionText: event.description,
                        dDayText: getDdayText(daysUntil),
                        size,
                        tabIndex: isPast ? -1 : 0,
                        onMouseEnter: () => {
                          if (!canHover) return
                          showEventDetails()
                        },
                        onMouseLeave: () => {
                          if (canHover) setExpandedEventId(null)
                        },
                        onPointerUp: (pointerEvent: PointerEvent<HTMLDivElement>) => {
                          if (pointerEvent.pointerType !== 'mouse') showEventDetails()
                        },
                        onFocus: showEventDetails,
                        onBlur: () => setExpandedEventId(null),
                      } as const

                      return (
                        <li
                          key={event.id}
                          ref={(node) => {
                            if (node) eventItemRefs.current.set(event.id, node)
                            else eventItemRefs.current.delete(event.id)

                            if (isNextEvent) nextEventItemRef.current = node
                          }}
                          className={cn(
                            'relative flex w-32 shrink-0 justify-center l:w-[152px] xl:w-[152px]',
                            expandedEventId === event.id && 'z-20',
                            hasTimelineEnteredViewport
                              ? 'animate-[timelineEventReveal_0.4s_ease-out_forwards] opacity-0'
                              : 'translate-y-3 opacity-0',
                          )}
                          style={
                            hasTimelineEnteredViewport
                              ? { animationDelay: `${1.2 + index * 0.15}s` }
                              : undefined
                          }
                          onAnimationEnd={
                            index === visibleEvents.length - 1
                              ? () => setIsTimelineAnimationComplete(true)
                              : undefined
                          }
                        >
                          {isNextEvent && !isPast ? (
                            <UpcomingEventCard
                              {...eventCardProps}
                              emphasis="strong"
                              state={cardState === 'active' ? 'active' : 'default'}
                            />
                          ) : (
                            <UpcomingEventCard
                              {...eventCardProps}
                              emphasis="default"
                              state={cardState}
                            />
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
              aria-hidden={isInteractionHintHidden}
              className={cn(
                'text-center text-gray-400 transition-opacity duration-300 s:!text-[16px] m:!text-[16px] l:!text-[18px] xl:!text-[18px]',
                isInteractionHintHidden ? 'opacity-0' : 'opacity-100',
              )}
            >
              {canHover
                ? '일정을 마우스로 호버하여 자세히 확인해보세요'
                : '일정을 탭하여 자세히 확인해보세요'}
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
