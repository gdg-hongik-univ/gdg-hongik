import { Typography } from '@gdg/wowds'
import { useRef, useState, type PointerEvent } from 'react'
import type { regularStudyType } from '../types/study'
import type { eventItems } from '../types/event'

type CarouselCardListProps =
  | { type: 'study'; studies: regularStudyType }
  | { type: 'event'; events: eventItems }

export default function CarouselCardList(props: CarouselCardListProps) {
  const dragStart = useRef<{ pointerId: number; x: number; scrollLeft: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  function handlePointerDown(event: PointerEvent<HTMLUListElement>) {
    if (event.pointerType !== 'mouse' || event.button !== 0) return

    dragStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsDragging(true)
  }

  function handlePointerMove(event: PointerEvent<HTMLUListElement>) {
    const start = dragStart.current
    if (!start || start.pointerId !== event.pointerId) return

    event.currentTarget.scrollLeft = start.scrollLeft + start.x - event.clientX
  }

  function endDrag() {
    dragStart.current = null
    setIsDragging(false)
  }

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
    <div className="min-w-0 w-full">
      <ul
        aria-label={props.type === 'study' ? '정규 스터디 활동 카드' : '이벤트 활동 카드'}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        className={`flex w-full gap-4 overflow-x-auto overscroll-x-contain px-4 scroll-px-4 s:px-5 s:scroll-px-5 m:px-6 m:scroll-px-6 l:px-7 l:scroll-px-7 xl:px-[calc((100%-1280px)/2)] xl:scroll-px-[calc((100%-1280px)/2)] select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4 focus-visible:outline-2 focus-visible:outline-blue-600 ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-proximity'}`}
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
                draggable={false}
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
