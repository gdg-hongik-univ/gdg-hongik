import { cn } from '@gdg/wowds'
import type { UpcomingEventCardEmphasis, UpcomingEventCardState } from '../../types/upcomingEvents'

type UpcomingEventMarkerProps = {
  countdownLabel: string
  emphasis: UpcomingEventCardEmphasis
  state: UpcomingEventCardState
}

const UpcomingEventMarker = ({ countdownLabel, emphasis, state }: UpcomingEventMarkerProps) => {
  const isStrong = emphasis === 'strong'
  const isActive = state === 'active'
  const isDisabled = state === 'disabled'

  return (
    <div className="flex h-[42px] shrink-0 items-center justify-center">
      {isStrong ? (
        <div
          className={cn(
            'flex h-[35px] shrink-0 items-center justify-center rounded-lg bg-blue-500 px-2.5 py-1 text-[18px] leading-[1.5] font-bold tracking-[-0.015em] text-white s:text-[16px] m:text-[16px] l:h-auto l:min-w-[63px] l:px-3 l:py-1.5 l:text-subtitle4 xl:h-auto xl:min-w-[63px] xl:px-3 xl:py-1.5 xl:text-subtitle4',
            isActive && 'ring-[7px] ring-blue-500/20 l:ring-8 xl:ring-8',
          )}
        >
          <span className="whitespace-nowrap">{countdownLabel}</span>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            'flex items-center justify-center rounded-full',
            isActive ? 'size-8 bg-blue-500/20 l:size-10 xl:size-10' : 'size-3 l:size-4 xl:size-4',
            !isActive && (isDisabled ? 'bg-blue-300' : 'bg-blue-500'),
          )}
        >
          {isActive && <span className="size-4 rounded-full bg-[#2a73ee] l:size-5 xl:size-5" />}
        </div>
      )}
    </div>
  )
}

export default UpcomingEventMarker
