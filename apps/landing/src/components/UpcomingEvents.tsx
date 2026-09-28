import { useEffect, useMemo, useRef, useState } from 'react'
import { cn, Typography } from '@gdg/wowds'
import UpcomingEventCard, {
  type UpcomingEventsSize,
  type UpcomingEventsState,
} from './common/UpcomingEvents'
import backgroundDecoration from '../assets/upcoming-events/background-decoration.svg'
import timelineLine from '../assets/upcoming-events/timeline-line.svg'

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
  const query = '(min-width: 768px)'
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
      className="relative min-h-175 w-full overflow-hidden px-4 l:min-h-250"
      style={{
        background:
          'linear-gradient(90deg, rgb(175 205 255 / 66%) 30%, rgb(255 249 214 / 49%) 100%)',
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-134px] left-[-160px] flex h-[675px] w-[1757px] items-center justify-center">
          <img className="rotate-[-6.56deg]" src={backgroundDecoration} alt="" />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 100% at 50% 0%, rgb(255 255 255 / 0%) 35%, #fff 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center pt-40 text-center">
        <Typography variant="subtitle3.2" as="p" className="text-black">
          곧 열릴 GDG의 다음 활동을 확인해 보세요
        </Typography>
        <Typography
          id="upcoming-events-title"
          variant="display3.1"
          as="h2"
          isEn
          className="mt-3 text-black"
        >
          Upcoming Events
        </Typography>
      </div>

      <div className="relative z-10 mt-13 flex w-full flex-col items-center gap-7">
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
            <div className="w-full max-w-7xl">
              <Typography as="h3" variant="subtitle3.2" className="text-gray-700">
                {semesterLabel}
              </Typography>
            </div>

            <div
              ref={scrollContainerRef}
              className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div ref={timelineRef} className="relative mx-auto w-[1280px] py-15">
                <img
                  src={timelineLine}
                  alt=""
                  aria-hidden="true"
                  className={cn(
                    'absolute top-20 left-0 origin-left',
                    hasTimelineEntered
                      ? 'animate-[timelineLineDraw_1.2s_linear_forwards]'
                      : 'scale-x-0',
                  )}
                />

                <ol className="relative z-10 flex h-[268px] w-full items-start justify-center m:h-[308px]">
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
                        ref={isHighlighted ? highlightedEventRef : undefined}
                        className={cn(
                          'flex h-[268px] w-[209px] shrink-0 justify-center m:h-[308px] m:w-[247px]',
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

            <Typography
              as="p"
              variant="body1.3"
              aria-hidden={hasInteracted}
              className={cn(
                'text-center text-gray-400 transition-opacity duration-300',
                hasInteracted ? 'opacity-0' : 'opacity-100',
              )}
            >
              마우스를 올려 일정을 자세히 확인해보세요
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
