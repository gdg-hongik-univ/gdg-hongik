import { cn, LinkIcon, Typography } from '@gdg/wowds'
import { Tag } from '../common/Tag'
import type { StudyDetail } from '../../types/study'

const STUDY_FORMATS = {
  offline: { label: '오프라인', variant: 'yellow' },
  online: { label: '온라인', variant: 'green' },
  assignment: { label: '과제', variant: 'blue' },
} as const

interface StudyListProps {
  study: StudyDetail
  underline?: boolean
}

export default function StudyList({ study, underline = true }: StudyListProps) {
  const format = STUDY_FORMATS[study.format]
  const introduction = (
    <>
      <LinkIcon size="sm" aria-hidden="true" className="shrink-0 min-[600px]:hidden" />
      <LinkIcon size="md" aria-hidden="true" className="hidden shrink-0 min-[600px]:block" />
      <Typography variant="body2.3" className="sr-only underline min-[1024px]:not-sr-only">
        스터디 소개 페이지
      </Typography>
    </>
  )

  return (
    <li
      className={cn(
        'grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 px-2 min-[600px]:flex min-[600px]:items-start min-[600px]:gap-4 min-[600px]:px-4 m:px-5 min-[1024px]:justify-between min-[1024px]:px-6',
        underline && 'pb-4.5 shadow-[inset_0_-1px_var(--color-gray-100)] min-[600px]:pb-5',
      )}
    >
      <div className="col-span-2 flex min-w-0 items-center gap-2 min-[600px]:flex-1 min-[1024px]:w-80 min-[1024px]:flex-none">
        <Typography
          as="h3"
          variant="body1.2"
          title={study.name}
          className="min-w-0 truncate text-gray-800 max-[600px]:max-w-[221px] max-[600px]:text-[14px]!"
        >
          {study.name}
        </Typography>
        <Tag size="sm" variant={format.variant} className="shrink-0">
          {format.label}
        </Tag>
      </div>

      <dl className="flex min-w-0 items-center gap-1.5 min-[600px]:max-w-1/2">
        <Typography as="dt" variant="body2.3" className="flex shrink-0 items-center gap-1 text-sub">
          <span>멘토</span>
          <span className="text-gray-400" aria-hidden="true">
            |
          </span>
        </Typography>
        <Typography
          as="dd"
          variant="body2.3"
          className="min-w-0 break-keep text-text-black [overflow-wrap:anywhere]"
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
          className="flex w-fit shrink-0 items-center justify-self-end gap-2 self-start rounded-sm text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600
          "
        >
          {introduction}
        </a>
      ) : (
        <span
          title="소개 페이지 준비 중"
          className="flex w-fit shrink-0 items-center justify-self-end gap-2 self-start text-gray-500"
        >
          {introduction}
          <span className="sr-only"> (준비 중)</span>
        </span>
      )}
    </li>
  )
}
