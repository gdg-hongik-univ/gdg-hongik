import { cn, Typography } from '@gdg/wowds'
import { useUpcomingEventTimeline } from '../../hooks/useUpcomingEventTimeline'
import type { EventItem, UpcomingEventCardState } from '../../types/upcomingEvents'
import {
  formatCountdown,
  formatMonthDay,
  getDaysUntil,
  parseEventDate,
} from '../../utils/eventDate'
import UpcomingEventCard from './UpcomingEventCard'

type UpcomingEventTimelineProps = {
  events: EventItem[]
  nextEventId: string | null
  semesterLabel: string
  today: Date
}

const UpcomingEventTimeline = ({
  events,
  nextEventId,
  semesterLabel,
  today,
}: UpcomingEventTimelineProps) => {
  const {
    markTimelineAnimationComplete,
    expandedEventId,
    getEventInteractionProps,
    hasTimelineEnteredViewport,
    isInteractionHintHidden,
    registerEventElement,
    scrollContainerRef,
    timelineRef,
  } = useUpcomingEventTimeline({ nextEventId })

  return (
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
          className="-mt-2 w-full overflow-x-auto pt-2 [scrollbar-width:none] s:mt-0 s:pt-0 m:mt-0 m:pt-0 l:mt-0 l:overflow-visible l:pt-0 xl:mt-0 xl:overflow-visible xl:pt-0 [&::-webkit-scrollbar]:hidden"
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
              {events.map((event, index) => {
                const daysUntil = getDaysUntil(parseEventDate(event.date), today)
                const isPast = daysUntil < 0
                const isNextEvent = event.id === nextEventId
                const isStrong = isNextEvent && !isPast
                const cardState: UpcomingEventCardState = isPast
                  ? 'disabled'
                  : expandedEventId === event.id
                    ? 'active'
                    : 'default'

                return (
                  <li
                    key={event.id}
                    ref={(element) => registerEventElement(event.id, element)}
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
                      index === events.length - 1 ? markTimelineAnimationComplete : undefined
                    }
                  >
                    <UpcomingEventCard
                      dateLabel={formatMonthDay(event.date)}
                      name={event.name}
                      description={event.description}
                      countdownLabel={formatCountdown(daysUntil)}
                      emphasis={isStrong ? 'strong' : 'default'}
                      state={cardState}
                      {...getEventInteractionProps(event.id, isPast)}
                    />
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
        <span className="hidden [@media(hover:hover)_and_(pointer:fine)]:inline">
          일정을 마우스로 호버하여 자세히 확인해보세요
        </span>
        <span className="[@media(hover:hover)_and_(pointer:fine)]:hidden">
          일정을 탭하여 자세히 확인해보세요
        </span>
      </Typography>
    </>
  )
}

export default UpcomingEventTimeline
