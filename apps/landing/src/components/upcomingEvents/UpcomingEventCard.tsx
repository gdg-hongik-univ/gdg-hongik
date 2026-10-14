import type { HTMLAttributes } from 'react'
import { cn } from '@gdg/wowds'
import type { UpcomingEventCardEmphasis, UpcomingEventCardState } from '../../types/upcomingEvents'
import UpcomingEventDetails from './UpcomingEventDetails'
import UpcomingEventMarker from './UpcomingEventMarker'

type UpcomingEventCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  dateLabel: string
  name: string
  description: string
  countdownLabel: string
  emphasis: UpcomingEventCardEmphasis
  state: UpcomingEventCardState
}

const UpcomingEventCard = ({
  className,
  dateLabel,
  name,
  description,
  countdownLabel,
  emphasis,
  state,
  ...restProps
}: UpcomingEventCardProps) => {
  const isActive = state === 'active'
  const isDisabled = state === 'disabled'

  return (
    <div
      className={cn(
        'relative flex flex-col items-center gap-3 font-primary l:gap-6 xl:gap-6',
        isActive ? 'w-[209px] l:w-[247px] xl:w-[247px]' : 'w-32 l:w-[152px] xl:w-[152px]',
        isDisabled ? 'cursor-default' : 'cursor-pointer',
        className,
      )}
      aria-disabled={isDisabled || undefined}
      role={isDisabled ? undefined : 'button'}
      aria-expanded={isDisabled ? undefined : isActive}
      {...restProps}
    >
      <UpcomingEventMarker countdownLabel={countdownLabel} emphasis={emphasis} state={state} />

      <div
        className={cn(
          'relative flex w-full flex-col items-center',
          isActive && 'gap-2 l:gap-5 xl:gap-5',
        )}
      >
        <div
          className={cn(
            'flex w-full flex-col items-center gap-1 text-center',
            isActive
              ? 'text-body1 font-bold s:text-[16px] m:text-[16px] l:text-subtitle3 xl:text-subtitle3'
              : 'text-body2 font-semibold s:text-[14px] m:text-[14px] l:text-body1 xl:text-body1',
          )}
        >
          <p className={cn('whitespace-nowrap', isDisabled ? 'text-gray-200' : 'text-gray-400')}>
            {dateLabel}
          </p>
          <p
            className={cn(
              'break-words',
              isActive ? 'w-[148px] l:w-[180px] xl:w-[180px]' : 'w-full',
              isDisabled ? 'text-gray-300' : isActive ? 'text-blue-700' : 'text-black',
            )}
          >
            {name}
          </p>
        </div>

        {isActive && <UpcomingEventDetails description={description} emphasis={emphasis} />}
      </div>
    </div>
  )
}

export default UpcomingEventCard
