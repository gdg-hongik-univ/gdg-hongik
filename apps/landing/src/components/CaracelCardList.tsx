import { Typography } from '@gdg/wowds'
import type { regularStudyType } from '../types/study'
import type { eventItems } from '../types/event'

type CaracelCardListProps =
  | { type: 'study'; studies: regularStudyType }
  | { type: 'event'; events: eventItems }

export default function CaracelCardList(props: CaracelCardListProps) {
  const cards =
    props.type === 'study'
      ? props.studies.items.map((study) => ({
          id: study.id,
          title: `${props.studies.semester.replace(/^\d{2}(\d{2}-[12])$/, '$1')} ${study.name}`,
          image: study.thumbnail,
          details: (
            <div className="flex flex-row gap-1">
              <Typography
                as="p"
                variant="body2.2"
                className="text-gray-100 xs:text-[12px]! s:text-[14px]! m:text-[14px]!"
              >
                멘토
              </Typography>
              <Typography
                as="span"
                variant="body2.2"
                className="text-gray-200 xs:text-[12px]! s:text-[14px]! m:text-[14px]!"
              >
                |
              </Typography>
              <Typography
                as="p"
                variant="body2.3"
                className="xs:text-[12px]! s:text-[14px]! m:text-[14px]!"
              >
                {study.mentors.join(', ')}
              </Typography>
            </div>
          ),
        }))
      : props.events.items.map((event) => ({
          id: event.id,
          title: event.name,
          image: event.image,
          details: (
            <Typography
              as="p"
              variant="body2.3"
              className="text-gray-100 xs:text-[12px]! s:text-[14px]! m:text-[14px]!"
            >
              <time dateTime={event.date}>
                {event.date.replace(/^\d{2}(\d{2})-(\d{2})-(\d{2})$/, '$1. $2. $3.')}
              </time>
            </Typography>
          ),
        }))

  return (
    <div className="min-w-0 w-full mt-9">
      <ul
        aria-label={props.type === 'study' ? '정규 스터디 활동 카드' : '이벤트 활동 카드'}
        tabIndex={0}
        className="flex w-full gap-4 overflow-x-auto overscroll-x-contain snap-x snap-proximity pb-4 focus-visible:outline-2 focus-visible:outline-blue-600"
      >
        {cards.map((card) => (
          <li
            key={card.id}
            className="relative isolate flex xl:w-100 xl:h-100 l:w-100 l:h-100 m:w-90 m:h-90 s:w-75 s:h-75 min-w-70 min-h-70 shrink-0 snap-start items-end overflow-hidden rounded-2xl bg-gray-950"
          >
            {card.image && (
              <img
                src={card.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 -z-20 h-full w-full object-cover"
              />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 -z-10 h-1/2"
              style={{
                background:
                  'linear-gradient(0deg, rgba(8, 8, 8, 0.60) 60%, rgba(8, 8, 8, 0.00) 100%)',
              }}
            />
            <div className="w-full p-6 text-white">
              <Typography
                as="h4"
                variant="subtitle3.2"
                className="xs:text-[16px]! s:text-[20px]! m:text-[20px]!"
              >
                {card.title}
              </Typography>
              {card.details}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
