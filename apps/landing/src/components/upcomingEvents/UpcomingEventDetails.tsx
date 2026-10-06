import { cn } from '@gdg/wowds'
import type { UpcomingEventCardEmphasis } from '../../types/upcomingEvents'

type UpcomingEventDetailsProps = {
  description: string
  emphasis: UpcomingEventCardEmphasis
}

const MobileTooltipPointer = () => (
  <svg
    aria-hidden="true"
    className="block h-[15.75px] w-[21.6506px]"
    preserveAspectRatio="none"
    viewBox="0 0 21.6506 15.75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.22724 1.5C9.38194 -0.5 12.2687 -0.5 13.4234 1.5L21.6506 15.75H0L8.22724 1.5Z"
      className="fill-blue-200"
    />
  </svg>
)

const DesktopTooltipPointer = ({ className }: { className: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    preserveAspectRatio="none"
    viewBox="0 0 17.2673 15.75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.03556 1.5C7.19027 -0.5 10.077 -0.5 11.2317 1.5L16.8609 11.25C18.0156 13.25 16.5722 15.75 14.2628 15.75H3.00447C0.695074 15.75 -0.748301 13.25 0.4064 11.25L6.03556 1.5Z"
      className="fill-blue-200"
    />
  </svg>
)

const UpcomingEventDetails = ({ description, emphasis }: UpcomingEventDetailsProps) => {
  const isStrong = emphasis === 'strong'

  return (
    <div className="relative flex shrink-0 flex-col items-center">
      <div className="-mb-1.5 h-[18.75px] shrink-0 pt-[3px] l:hidden xl:hidden">
        <MobileTooltipPointer />
      </div>

      <DesktopTooltipPointer
        className={cn(
          'hidden h-[15.75px] w-[17.2673px] l:block xl:block',
          isStrong ? 'absolute top-[-12px] left-1/2 -translate-x-1/2' : '-mb-1 shrink-0',
        )}
      />

      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-xl bg-blue-200',
          isStrong
            ? 'px-3.5 py-2 l:px-5 l:py-3 xl:px-5 xl:py-3'
            : 'px-3.5 py-2.5 l:px-5 l:py-3.5 xl:px-5 xl:py-3.5',
        )}
      >
        <p className="w-[181px] break-keep text-center text-caption1 font-semibold text-black s:text-[12px] m:text-[12px] l:w-[207px] l:text-body2 xl:w-[207px] xl:text-body2">
          {description}
        </p>
      </div>
    </div>
  )
}

export default UpcomingEventDetails
