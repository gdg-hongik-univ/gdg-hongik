import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronIcon, Tabs, Typography } from '@gdg/wowds'
import ActivityInfo from '../components/ActivityInfo'
import SemesterSelector from '../components/projectTrack/SemesterSelector'
import StudyList from '../components/study/StudyList'
import { useStudyDetail } from '../hooks/useStudyDetail'

const ACTIVITY_PAGES = [
  { value: 'study', label: '정규 스터디' },
  { value: 'project-track', label: '프로젝트 트랙' },
  { value: 'part', label: '파트' },
]

export default function StudyPage() {
  const navigate = useNavigate()
  const listRef = useRef<HTMLDivElement>(null)
  const [selectedSemester, setSelectedSemester] = useState('')
  const { state, retry } = useStudyDetail()
  const semesters = state.status === 'success' ? state.items : []
  const semester = semesters.find((item) => item.semester === selectedSemester) ?? semesters[0]

  const focusStudyList = () => {
    const list = listRef.current
    if (!list) return
    list.focus({ preventScroll: true })
    list.scrollIntoView({
      block: 'start',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    })
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4 pt-22 pb-30 s:gap-13 s:px-5 s:pt-26 s:pb-80 min-[768px]:gap-13 min-[768px]:pt-38 min-[768px]:pb-80 m:px-6 l:px-7 xl:max-w-320 xl:px-0">
      <Link
        to="/"
        className="flex w-fit items-center py-1 text-gray-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
      >
        <ChevronIcon direction="left" size="lg" aria-hidden="true" />
        <Typography variant="body1.2" className="max-[599px]:text-[14px]!">
          뒤로 가기
        </Typography>
      </Link>

      <Tabs value="study" onValueChange={(value) => navigate(`/${value}`)}>
        <Typography
          as="h1"
          variant="display3.1"
          isEn
          className="mb-3 text-[24px]! leading-[1.5]! tracking-[-0.015em]! min-[600px]:mb-4 min-[600px]:text-[36px]! min-[600px]:leading-[1.4]! min-[1024px]:text-[44px]!"
        >
          Learn &amp; Build
        </Typography>
        <div className="flex items-center border-b-2 border-gray-100">
          <Tabs.List aria-label="학습 활동 종류" className="min-w-0 flex-1 border-b-0">
            {ACTIVITY_PAGES.map((page) => (
              <Tabs.Trigger
                key={page.value}
                value={page.value}
                className="px-3 py-2 font-primary text-[14px] leading-[1.5] tracking-[-0.015em] whitespace-nowrap min-[600px]:px-4 min-[600px]:py-3.5 min-[600px]:text-[18px] min-[1024px]:text-[20px] aria-selected:font-bold"
              >
                {page.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <Tabs.Detail
            onClick={focusStudyList}
            disabled={!semester}
            endIcon={<ChevronIcon direction="right" size="lg" />}
            className="hidden shrink-0 px-0 py-1 text-body1 text-gray-400 disabled:cursor-default disabled:opacity-50 min-[600px]:flex"
          />
        </div>

        <Tabs.Content
          value="study"
          className="flex flex-col gap-7 pt-7 min-[600px]:gap-8 min-[600px]:pt-9 min-[768px]:gap-13"
        >
          <ActivityInfo activityType="regularStudy" titleAs="p" />
          {state.status === 'loading' ? (
            <Typography as="p" variant="body2.3" role="status" aria-busy="true">
              스터디 정보를 불러오는 중이에요.
            </Typography>
          ) : state.status === 'error' ? (
            <div className="flex flex-col items-start gap-3">
              <Typography as="p" variant="body2.3" role="alert">
                스터디 정보를 불러오지 못했어요.
              </Typography>
              <button
                type="button"
                onClick={retry}
                className="rounded-lg border border-outline px-4 py-2 text-body2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                다시 시도
              </button>
            </div>
          ) : !semester ? (
            <Typography as="p" variant="body2.3">
              등록된 스터디가 없어요.
            </Typography>
          ) : (
            <div className="flex flex-col gap-6 min-[768px]:flex-row min-[768px]:gap-10 min-[1024px]:gap-18">
              <SemesterSelector
                semesters={semesters.map((item) => item.semester)}
                value={semester.semester}
                onChange={setSelectedSemester}
              />
              <div
                ref={listRef}
                tabIndex={-1}
                className="min-w-0 flex-1 scroll-mt-24 outline-none"
                role="region"
                aria-labelledby="study-list-title"
              >
                <h2 id="study-list-title" className="sr-only">
                  {semester.semester}학기 정규 스터디 목록
                </h2>
                <p className="sr-only" role="status">
                  {semester.semester}학기 스터디 {semester.studies.length}개
                </p>
                <StudyList studies={semester.studies} />
              </div>
            </div>
          )}
        </Tabs.Content>
      </Tabs>
    </div>
  )
}
