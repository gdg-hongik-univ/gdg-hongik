import { Typography } from '@gdg/wowds'
import { useUpcomingEvents } from '../../hooks/useUpcomingEvents'
import UpcomingEventTimeline from './UpcomingEventTimeline'

const BackgroundDecoration = ({ className }: { className: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    preserveAspectRatio="none"
    viewBox="0 0 780 219.557"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.5" fill="white" fillOpacity="0.2">
      <ellipse
        cx="78.9171"
        cy="151.973"
        rx="32.3911"
        ry="76.4507"
        transform="rotate(94.8534 78.9171 151.973)"
      />
      <ellipse
        cx="221.836"
        cy="152.827"
        rx="21.8515"
        ry="70.114"
        transform="rotate(41.9938 221.836 152.827)"
      />
      <ellipse
        cx="366.662"
        cy="78.9682"
        rx="57.8413"
        ry="46.273"
        transform="rotate(10 366.662 78.9682)"
      />
      <ellipse
        cx="544.102"
        cy="45.0283"
        rx="72.3544"
        ry="26.0037"
        transform="rotate(-5 544.102 45.0283)"
      />
      <circle cx="715.03" cy="64.9699" r="64.9699" />
    </g>
  </svg>
)

const UpcomingEvents = () => {
  const { eventsLoadState, nextEventId, semesterLabel, timelineEvents, today } = useUpcomingEvents()

  return (
    <section
      aria-labelledby="upcoming-events-title"
      className="relative flex min-h-[581.75px] w-full flex-col items-center gap-10 overflow-hidden pt-[140px] pb-[60px] text-center s:min-h-[810.75px] s:gap-[52px] s:pb-[120px] m:min-h-[810.75px] m:gap-[52px] m:pb-[120px] l:min-h-[914.75px] l:gap-[52px] l:pt-[160px] l:pb-[120px] xl:min-h-[914.75px] xl:gap-[52px] xl:pt-[160px] xl:pb-[120px]"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 100% 100% at 50% 0%, rgb(255 255 255 / 0%) 35.313%, #fff 100%), linear-gradient(90deg, rgb(175 205 255 / 52.8%) 29.724%, rgb(255 249 214 / 39.2%) 100%), linear-gradient(90deg, #f4f8ff 0%, #f4f8ff 100%)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-10.26px] left-[-180.71px] flex h-[307.186px] w-[799.968px] items-center justify-center s:hidden m:hidden l:hidden xl:hidden"
      >
        <BackgroundDecoration className="h-[219.557px] w-[780px] rotate-[-6.56deg]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-134.01px] left-[-270.17px] hidden h-[674.692px] w-[1757.08px] items-center justify-center s:flex m:flex l:left-[-160.17px] l:flex xl:left-[-160.17px] xl:flex"
      >
        <BackgroundDecoration className="h-[482.22px] w-[1713.22px] rotate-[-6.56deg]" />
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
        ) : timelineEvents.length > 0 ? (
          <UpcomingEventTimeline
            events={timelineEvents}
            nextEventId={nextEventId}
            semesterLabel={semesterLabel}
            today={today}
          />
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
