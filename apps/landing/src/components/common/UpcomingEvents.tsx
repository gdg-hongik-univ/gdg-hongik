import type { HTMLAttributes } from 'react'
import { cn } from '@gdg/wowds'
import tooltipLarge from '../../assets/upcoming-events/tooltip-large.svg'
import tooltipSmall from '../../assets/upcoming-events/tooltip-small.svg'

export type UpcomingEventsEmphasis = 'default' | 'strong'
export type UpcomingEventsSize = 'large' | 'small'
export type UpcomingEventsState = 'default' | 'active' | 'disabled'

type UpcomingEventsBaseProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  dateText?: string
  labelText?: string
  descriptionText?: string
  dDayText?: string
  size?: UpcomingEventsSize
}

export type UpcomingEventsProps = UpcomingEventsBaseProps &
  (
    | {
        emphasis?: 'default'
        state?: UpcomingEventsState
      }
    | {
        emphasis: 'strong'
        state?: Exclude<UpcomingEventsState, 'disabled'>
      }
  )

const FIGMA_VARIANT_NODE_IDS = {
  'default-default-large': '1354:22155',
  'default-default-small': '1354:22207',
  'default-active-large': '1354:22161',
  'default-active-small': '1354:22213',
  'default-disabled-large': '1354:22185',
  'default-disabled-small': '1354:22262',
  'strong-default-large': '1354:22191',
  'strong-default-small': '1354:22268',
  'strong-active-large': '1354:22196',
  'strong-active-small': '1354:22275',
} as const

export const UpcomingEvents = ({
  className,
  dateText = '09.11',
  labelText = '스터디 신청 시작',
  descriptionText = '개강을 맞이하여 만나는 새 얼굴들',
  dDayText = 'D-3',
  emphasis = 'default',
  size = 'large',
  state = 'default',
  ...restProps
}: UpcomingEventsProps) => {
  const isSmall = size === 'small'
  const isStrong = emphasis === 'strong'
  const isActive = state === 'active'
  const isDisabled = state === 'disabled'

  const variantKey = `${emphasis}-${state}-${size}` as keyof typeof FIGMA_VARIANT_NODE_IDS

  return (
    <div
      className={cn(
        'relative flex flex-col items-center font-primary',
        isSmall ? 'gap-3' : 'gap-6',
        isActive ? (isSmall ? 'w-[209px]' : 'w-[247px]') : isSmall ? 'w-32' : 'w-[152px]',
        isDisabled ? 'cursor-default' : 'cursor-pointer',
        className,
      )}
      aria-disabled={isDisabled || undefined}
      data-emphasis={emphasis}
      data-node-id={FIGMA_VARIANT_NODE_IDS[variantKey]}
      data-size={size}
      data-state={state}
      {...restProps}
    >
      <div className="flex h-[42px] shrink-0 items-center justify-center">
        {isStrong ? (
          <div
            className={cn(
              'flex shrink-0 items-center justify-center rounded-lg bg-blue-500 font-bold [color:var(--color-white)]',
              isSmall
                ? 'h-[35px] px-2.5 py-1 text-[18px] leading-[1.5] tracking-[-0.015em] s:text-[16px] m:text-[16px] l:text-[16px]'
                : 'min-w-[63px] px-3 py-1.5 text-subtitle4',
              isActive && (isSmall ? 'ring-[7px] ring-blue-500/20' : 'ring-8 ring-blue-500/20'),
            )}
          >
            <span className="whitespace-nowrap">{dDayText}</span>
          </div>
        ) : (
          <div
            aria-hidden="true"
            className={cn(
              'flex items-center justify-center rounded-full',
              isActive
                ? isSmall
                  ? 'size-8 bg-blue-500/20'
                  : 'size-10 bg-blue-500/20'
                : isSmall
                  ? 'size-3'
                  : 'size-4',
              !isActive && (isDisabled ? 'bg-blue-300' : 'bg-blue-500'),
            )}
          >
            {isActive && (
              <span className={cn('rounded-full bg-[#2a73ee]', isSmall ? 'size-4' : 'size-5')} />
            )}
          </div>
        )}
      </div>

      <div
        className={cn(
          'relative flex w-full flex-col items-center',
          isActive && (isSmall ? 'gap-2' : 'gap-5'),
        )}
      >
        <div
          className={cn(
            'flex w-full flex-col items-center gap-1 text-center',
            isActive
              ? isSmall
                ? 'text-body1 font-bold s:text-[16px] m:text-[16px] l:text-[16px]'
                : 'text-subtitle3 font-bold'
              : isSmall
                ? 'text-body2 font-semibold s:text-[14px] m:text-[14px] l:text-[14px]'
                : 'text-body1 font-semibold',
          )}
        >
          <p className={cn('whitespace-nowrap', isDisabled ? 'text-gray-200' : 'text-gray-400')}>
            {dateText}
          </p>
          <p
            className={cn(
              'break-words',
              isActive ? (isSmall ? 'w-[148px]' : 'w-[180px]') : 'w-full',
              isDisabled ? 'text-gray-300' : isActive ? 'text-blue-700' : 'text-black',
            )}
          >
            {labelText}
          </p>
        </div>

        {isActive && (
          <div className="relative flex shrink-0 flex-col items-center">
            {isSmall && (
              <div className="-mb-1.5 h-[18.75px] shrink-0 pt-[3px]">
                <img src={tooltipSmall} alt="" aria-hidden="true" />
              </div>
            )}

            {!isSmall && !isStrong && (
              <img className="-mb-1 shrink-0" src={tooltipLarge} alt="" aria-hidden="true" />
            )}

            {!isSmall && isStrong && (
              <img
                className="absolute top-[-12px] left-1/2 -translate-x-1/2"
                src={tooltipLarge}
                alt=""
                aria-hidden="true"
              />
            )}

            <div
              className={cn(
                'flex shrink-0 items-center justify-center rounded-xl bg-blue-200',
                isSmall
                  ? isStrong
                    ? 'px-3.5 py-2'
                    : 'px-3.5 py-2.5'
                  : isStrong
                    ? 'px-5 py-3'
                    : 'px-5 py-3.5',
              )}
            >
              <p
                className={cn(
                  'break-keep text-center font-semibold text-black',
                  isSmall
                    ? 'w-[181px] text-caption1 s:text-[12px] m:text-[12px] l:text-[12px]'
                    : 'w-[207px] text-body2',
                )}
              >
                {descriptionText}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UpcomingEvents
