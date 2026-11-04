import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronIcon, Tabs, Typography } from '@gdg/wowds'
import ActivityInfo from '../components/ActivityInfo'
import CourseTimeline from '../components/projectTrack/CourseTimeline'
import ProjectCard from '../components/projectTrack/ProjectCard'
import SemesterSelector from '../components/projectTrack/SemesterSelector'
import { useProjectTracks } from '../hooks/useProjectTracks'

const ACTIVITY_PAGES = [
  { value: 'study', label: '정규 스터디' },
  { value: 'project-track', label: '프로젝트 트랙' },
  { value: 'part', label: '파트' },
]

export default function ProjectTrackPage() {
  const navigate = useNavigate()
  const [selectedSemester, setSelectedSemester] = useState('')
  const { state, retry } = useProjectTracks()
  const tracks = state.status === 'success' ? state.items : []
  const track = tracks.find((item) => item.semester === selectedSemester) ?? tracks[0]

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
      <Tabs value="project-track" onValueChange={(value) => navigate(`/${value}`)}>
        <Typography
          as="h1"
          variant="display3.1"
          isEn
          className="mb-3 text-[24px]! leading-[1.5]! min-[600px]:mb-4 min-[600px]:text-[36px]! min-[600px]:leading-[1.4]! min-[1024px]:text-[44px]!"
        >
          Learn &amp; Build
        </Typography>
        <Tabs.List aria-label="학습 활동 종류">
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
        <Tabs.Content
          value="project-track"
          className="flex flex-col gap-7 pt-7 min-[600px]:gap-8 min-[600px]:pt-9 min-[768px]:gap-13"
        >
          <ActivityInfo activityType="projectTrack" titleAs="p" />
          {state.status === 'loading' ? (
            <Typography as="p" variant="body2.3" role="status" aria-busy="true">
              프로젝트 트랙 정보를 불러오는 중이에요.
            </Typography>
          ) : state.status === 'error' ? (
            <div className="flex flex-col items-start gap-3">
              <Typography as="p" variant="body2.3" role="alert">
                프로젝트 트랙 정보를 불러오지 못했어요.
              </Typography>
              <button
                type="button"
                onClick={retry}
                className="rounded-lg border border-outline px-4 py-2 text-body2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                다시 시도
              </button>
            </div>
          ) : !track ? (
            <Typography as="p" variant="body2.3" role="status">
              등록된 프로젝트 트랙 활동이 없어요.
            </Typography>
          ) : (
            <div className="flex flex-col gap-6 min-[768px]:flex-row min-[768px]:gap-10 min-[1024px]:gap-18">
              <SemesterSelector
                semesters={tracks.map((item) => item.semester)}
                value={track.semester}
                onChange={setSelectedSemester}
              />
              <div className="flex min-w-0 flex-1 flex-col gap-6 s:gap-7 min-[768px]:gap-9 xl:gap-11">
                <section
                  aria-labelledby="project-track-projects-title"
                  className="flex flex-col gap-5 s:gap-6 min-[768px]:gap-9"
                >
                  <h2 id="project-track-projects-title" className="sr-only">
                    {track.semester}학기 프로젝트 목록
                  </h2>
                  <dl className="flex flex-col gap-1 pl-2.5 min-[768px]:pl-0" aria-live="polite">
                    {[
                      { label: '총괄', value: track.coordinator },
                      { label: '멘토', value: track.mentors.join(' ') },
                    ].map(({ label, value }) => (
                      <Typography key={label} as="div" variant="body2.3" className="text-sub">
                        <dt className="inline">
                          {track.semester}학기 {label}{' '}
                          <span className="px-1 text-gray-400" aria-hidden="true">
                            |
                          </span>
                        </dt>{' '}
                        <dd className="inline text-text-black">{value}</dd>
                      </Typography>
                    ))}
                  </dl>
                  {track.projects.length > 0 ? (
                    <ul
                      aria-label={`${track.semester}학기 프로젝트`}
                      className="grid gap-3 min-[600px]:gap-5 xl:grid-cols-2 xl:gap-6"
                    >
                      {track.projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center justify-center rounded-xl border border-gray-100 px-6 py-15">
                      <Typography
                        as="p"
                        variant="caption1.3"
                        role="status"
                        className="text-center text-gray-300"
                      >
                        완성된 프로젝트는 {track.semester}학기 활동 종료 후 공개돼요.
                      </Typography>
                    </div>
                  )}
                </section>
                <CourseTimeline courses={track.courses} />
              </div>
            </div>
          )}
        </Tabs.Content>
      </Tabs>
    </div>
  )
}
