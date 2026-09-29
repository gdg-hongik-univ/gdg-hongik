import type { HTMLAttributes } from 'react'
import { cn } from '@gdg/wowds'
import defaultLargeMarker from '../../assets/upcoming-events/default-large.svg'
import defaultSmallMarker from '../../assets/upcoming-events/default-small.svg'
import disabledLargeMarker from '../../assets/upcoming-events/disabled-large.svg'
import disabledSmallMarker from '../../assets/upcoming-events/disabled-small.svg'
import hoverLargeMarker from '../../assets/upcoming-events/hover-large.svg'
import hoverSmallMarker from '../../assets/upcoming-events/hover-small.svg'
import tooltipLarge from '../../assets/upcoming-events/tooltip-large.svg'
import tooltipSmall from '../../assets/upcoming-events/tooltip-small.svg'
import tooltipStrongLarge from '../../assets/upcoming-events/tooltip-strong-large.svg'

export type UpcomingEventsEmphasis = 'default' | 'strong'
export type UpcomingEventsSize = 'large' | 'small'
export type UpcomingEventsState = 'default' | 'hover' | 'disabled'

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

const VARIANT_NODE_IDS = {
  'default-default-large': '1354:22155',
  'default-default-small': '1354:22207',
  'default-hover-large': '1354:22161',
  'default-hover-small': '1354:22213',
  'default-disabled-large': '1354:22185',
  'default-disabled-small': '1354:22262',
  'strong-default-large': '1354:22191',
  'strong-default-small': '1354:22268',
  'strong-hover-large': '1354:22196',
  'strong-hover-small': '1354:22275',
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
  const isHovered = state === 'hover'
  const isDisabled = state === 'disabled'

  const variantKey = `${emphasis}-${state}-${size}` as keyof typeof VARIANT_NODE_IDS

  const marker = isHovered
    ? isSmall
      ? hoverSmallMarker
      : hoverLargeMarker
    : isDisabled
      ? isSmall
        ? disabledSmallMarker
        : disabledLargeMarker
      : isSmall
        ? defaultSmallMarker
        : defaultLargeMarker

  return (
    <div
      className={cn(
        'relative flex flex-col items-center font-primary',
        isSmall ? 'gap-3' : 'gap-6',
        isHovered ? (isSmall ? 'w-[209px]' : 'w-[247px]') : isSmall ? 'w-32' : 'w-[152px]',
        isDisabled ? 'cursor-default' : 'cursor-pointer',
        className,
      )}
      aria-disabled={isDisabled || undefined}
      data-emphasis={emphasis}
      data-node-id={VARIANT_NODE_IDS[variantKey]}
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
              isHovered && (isSmall ? 'ring-[7px] ring-blue-500/20' : 'ring-8 ring-blue-500/20'),
            )}
          >
            <span className="whitespace-nowrap">{dDayText}</span>
          </div>
        ) : (
          <img src={marker} alt="" aria-hidden="true" />
        )}
      </div>

      <div
        className={cn(
          'relative flex w-full flex-col items-center',
          isHovered && (isSmall ? 'gap-2' : 'gap-5'),
        )}
      >
        <div
          className={cn(
            'flex w-full flex-col items-center gap-1 text-center',
            isHovered
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
              isHovered ? (isSmall ? 'w-[148px]' : 'w-[180px]') : 'w-full',
              isDisabled ? 'text-gray-300' : isHovered ? 'text-blue-700' : 'text-black',
            )}
          >
            {labelText}
          </p>
        </div>

        {isHovered && (
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
                src={tooltipStrongLarge}
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
