import { Typography } from '@gdg/wowds'
import type { regularStudyType } from '../types/study'

interface CaracelCardListProps {
  studies: regularStudyType
}

export default function CaracelCardList({ studies }: CaracelCardListProps) {
  const semesterLabel = studies.semester.replace(/^\d{2}(\d{2}-[12])$/, '$1')

  return (
    <div className="min-w-0 w-full mt-9">
      <ul
        aria-label="정규 스터디 활동 카드"
        tabIndex={0}
        className="flex w-full gap-4 overflow-x-auto overscroll-x-contain snap-x snap-proximity pb-4 focus-visible:outline-2 focus-visible:outline-blue-600"
      >
        {studies.items.map((card) => (
          <li
            key={card.id}
            className="relative isolate flex xl:w-100 xl:h-100 l:w-100 l:h-100 m:w-90 m:h-90 s:w-75 s:h-75 min-w-70 min-h-70 shrink-0 snap-start items-end overflow-hidden rounded-2xl bg-gray-950"
          >
            <img
              src={card.thumbnail}
              alt=""
              loading="lazy"
              className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 -z-10 h-1/2"
              style={{
                background:
                  'linear-gradient(0deg, rgba(8, 8, 8, 0.60) 60%, rgba(8, 8, 8, 0.00) 100%)',
              }}
            />
            <div className="w-full p-6 text-white">
              <Typography as="h4" variant="subtitle3.2">
                {semesterLabel} {card.name}
              </Typography>
              <div className="flex flex-row gap-1">
                <Typography as="p" variant="body2.2" className="text-gray-100">
                  멘토
                </Typography>
                <Typography as="span" variant="body2.2" className="text-gray-200">
                  |
                </Typography>
                <Typography as="p" variant="body2.3">
                  {card.mentors.join(', ')}
                </Typography>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
