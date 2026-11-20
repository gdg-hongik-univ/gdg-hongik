import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronIcon, Tabs, Typography } from '@gdg/wowds'
import ActivityInfo from '../components/ActivityInfo'
import SemesterSelector from '../components/projectTrack/SemesterSelector'
import FrontendCard from '../components/partCardDetail/FrontendCard'
import BackendCard from '../components/partCardDetail/BackendCard'
import AiCard from '../components/partCardDetail/AiCard'
import type { PartName } from '../components/partCardDetail/PartCardContent'
import { getPartStudy } from '../api/partStudy'
import type { PartStudyData } from '../types/partStudy'

const ACTIVITY_PAGES = [
  { value: 'study', label: '정규 스터디' },
  { value: 'project-track', label: '프로젝트 트랙' },
  { value: 'part', label: '파트' },
]

type PartStudyState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; data: PartStudyData }

export default function PartPage() {
  const navigate = useNavigate()
  const [partStudyState, setPartStudyState] = useState<PartStudyState>({ status: 'loading' })
  const [retryCount, setRetryCount] = useState(0)
  const [selectedSemester, setSelectedSemester] = useState('')
  const [selectedPart, setSelectedPart] = useState<PartName>('FRONTEND')
  const [showFloatingButton, setShowFloatingButton] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    getPartStudy(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setPartStudyState({ status: 'success', data })
        }
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        console.error('파트 스터디 정보를 불러오지 못했습니다.', error)
        setPartStudyState({ status: 'error' })
      })

    return () => controller.abort()
  }, [retryCount])

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY >= 1136)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const data = partStudyState.status === 'success' ? partStudyState.data : null
  const semesters = data?.semesters ?? []
  const activeSemester = semesters.includes(selectedSemester)
    ? selectedSemester
    : (semesters[0] ?? '')

  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4 pt-22 pb-30 s:gap-13 s:px-5 s:pt-26 s:pb-80 min-[768px]:gap-13 min-[768px]:pt-38 min-[768px]:pb-80 m:px-6 l:px-7 xl:max-w-7xl xl:px-0">
      <Link
        to="/"
        className="flex w-fit items-center py-1 text-gray-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
      >
        <ChevronIcon direction="left" size="lg" aria-hidden="true" />
        <Typography variant="body1.2" className="max-[599px]:text-[14px]!">
          뒤로 가기
        </Typography>
      </Link>

      <Tabs value="part" onValueChange={(value) => navigate(`/${value}`)}>
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
              className="px-3 py-2 font-primary text-[14px] leading-[1.5] whitespace-nowrap min-[600px]:px-4 min-[600px]:py-3.5 min-[600px]:text-[18px] min-[1024px]:text-[20px] aria-selected:font-bold"
            >
              {page.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content
          value="part"
          className="flex flex-col gap-7 pt-7 min-[600px]:gap-8 min-[600px]:pt-9 min-[768px]:gap-13"
        >
          <ActivityInfo activityType="partStudy" />
          {partStudyState.status === 'loading' ? (
            <Typography as="p" variant="body2.3" role="status" aria-busy="true">
              파트 스터디 정보를 불러오는 중이에요.
            </Typography>
          ) : partStudyState.status === 'error' ? (
            <div className="flex flex-col items-start gap-3">
              <Typography as="p" variant="body2.3" role="alert">
                파트 스터디 정보를 불러오지 못했어요.
              </Typography>
              <button
                type="button"
                onClick={() => {
                  setPartStudyState({ status: 'loading' })
                  setRetryCount((count) => count + 1)
                }}
                className="rounded-lg border border-outline px-4 py-2 text-body2 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                다시 시도
              </button>
            </div>
          ) : !data || semesters.length === 0 || data.curriculum.length === 0 ? (
            <Typography as="p" variant="body2.3" role="status">
              등록된 파트 스터디 활동이 없어요.
            </Typography>
          ) : (
            <div className="flex flex-row xs:flex-col s:flex-col xs:gap-6 s:gap-6 m:gap-10 l:gap-18 xl:gap-18">
              <SemesterSelector
                semesters={semesters}
                value={activeSemester}
                onChange={setSelectedSemester}
              />

              {selectedPart === 'FRONTEND' ? (
                <FrontendCard
                  selectedPart={selectedPart}
                  onSelectPart={setSelectedPart}
                  semester={activeSemester}
                  activities={data.curriculum}
                />
              ) : selectedPart === 'BACKEND' ? (
                <BackendCard
                  selectedPart={selectedPart}
                  onSelectPart={setSelectedPart}
                  semester={activeSemester}
                  activities={data.curriculum}
                />
              ) : (
                <AiCard
                  selectedPart={selectedPart}
                  onSelectPart={setSelectedPart}
                  semester={activeSemester}
                  activities={data.curriculum}
                />
              )}
            </div>
          )}
        </Tabs.Content>
      </Tabs>
      {showFloatingButton && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="맨 위로 이동"
          className="
            fixed bottom-28 right-4 z-50
            flex size-12 items-center justify-center
            rounded-full
            bg-white
            shadow-lg
            s:hidden m:hidden l:hidden xl:hidden
          "
        >
          <ChevronIcon direction="up" size="lg" aria-hidden="true" className="text-gray-400" />
        </button>
      )}
    </div>
  )
}
