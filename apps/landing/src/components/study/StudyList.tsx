import { LinkIcon, Typography } from '@gdg/wowds'
import { Tag } from '../common/Tag'
import type { StudyDetail } from '../../types/study'

const STUDY_FORMATS = {
  offline: { label: '오프라인', variant: 'yellow' },
  online: { label: '온라인', variant: 'green' },
  assignment: { label: '과제', variant: 'blue' },
} as const

export default function StudyList({ studies }: { studies: StudyDetail[] }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white px-4 py-6 min-[600px]:px-6 min-[600px]:py-8 xl:px-9 xl:py-10">
      {studies.length === 0 ? (
        <Typography as="p" variant="body2.3" className="py-6 text-center text-gray-500">
          등록된 스터디가 없어요.
        </Typography>
      ) : (
        <ul className="flex flex-col gap-5">
          {studies.map((study) => {
            const format = STUDY_FORMATS[study.format]
            const introduction = (
              <>
                <LinkIcon size="md" aria-hidden="true" className="shrink-0" />
                <Typography variant="body2.3" className="underline max-[599px]:text-[14px]!">
                  스터디 소개 페이지
                </Typography>
              </>
            )

            return (
              <li
                key={study.id}
                className="flex min-w-0 flex-col gap-3 border-b border-gray-100 pb-5 last:border-b-0 last:pb-0 min-[600px]:grid min-[600px]:grid-cols-2 min-[1024px]:flex min-[1024px]:flex-row min-[1024px]:items-start min-[1024px]:justify-between min-[1024px]:gap-4 xl:px-6"
              >
                <div className="flex min-w-0 flex-wrap items-center gap-2 min-[600px]:col-span-2 min-[1024px]:w-70 min-[1024px]:shrink-0 xl:w-80">
                  <Typography
                    as="h3"
                    variant="body1.2"
                    className="break-keep text-gray-800 max-[599px]:text-[16px]!"
                  >
                    {study.name}
                  </Typography>
                  <Tag size="sm" variant={format.variant}>
                    {format.label}
                  </Tag>
                </div>

                <dl className="flex min-w-0 items-start gap-1.5">
                  <Typography
                    as="dt"
                    variant="body2.3"
                    className="shrink-0 text-sub max-[599px]:text-[14px]!"
                  >
                    멘토{' '}
                    <span className="text-gray-400" aria-hidden="true">
                      |
                    </span>
                  </Typography>
                  <Typography
                    as="dd"
                    variant="body2.3"
                    className="break-keep text-text-black max-[599px]:text-[14px]!"
                  >
                    {study.mentors.join(', ') || '미정'}
                  </Typography>
                </dl>

                {study.introductionUrl ? (
                  <a
                    href={study.introductionUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${study.name} 소개 페이지 (새 탭)`}
                    className="flex w-fit shrink-0 items-center gap-2 rounded-sm text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 min-[600px]:justify-self-end"
                  >
                    {introduction}
                  </a>
                ) : (
                  <span
                    title="소개 페이지 준비 중"
                    className="flex w-fit shrink-0 items-center gap-2 text-gray-500 min-[600px]:justify-self-end"
                  >
                    {introduction}
                    <span className="sr-only"> (준비 중)</span>
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
