import { Typography } from '@gdg/wowds'
import { StarIcon } from '@gdg/wowds/icon'
import type { PartStudyWeek } from '../../types/partStudy'
import partStudyPhoto from '../../../public/img/part-study.jpg'

export type PartName = 'FRONTEND' | 'BACKEND' | 'AI'

interface PartCardContentProps {
  part: PartName
  selectedPart: PartName
  onSelectPart: (part: PartName) => void
  semester: string
  activities: PartStudyWeek[]
}

const PARTS: PartName[] = ['FRONTEND', 'BACKEND', 'AI']

const PART_COLORS: Record<
  PartName,
  { title: string; background: string; number: string; week: string }
> = {
  FRONTEND: {
    title: 'text-core-blue-500',
    background: 'bg-core-blue-25',
    number: 'text-core-blue-100',
    week: 'text-blue-400',
  },
  BACKEND: {
    title: 'text-core-green-500',
    background: 'bg-core-green-25',
    number: 'text-core-green-100',
    week: 'text-green-400',
  },
  AI: {
    title: 'text-core-red-500',
    background: 'bg-core-red-25',
    number: 'text-core-red-100',
    week: 'text-red-400',
  },
}

const PART_CONTENT: Record<PartName, { introductions: string[]; recommendations: string[] }> = {
  FRONTEND: {
    introductions: [
      '시험 기간을 제외한 매주 화요일 18시 1회 2시간 분량의 오프라인 모임',
      '자바스크립트 DeepDive, 우아한 타입스크립트 With 리액트, 자바스크립트 + 리액트 디자인패턴 책 스터디 진행',
      '분량이 많은 책, 문서를 스터디하는 공간',
    ],
    recommendations: ['기술 부채를 해소하고, 스터디·세미나를 통해 성장하고 싶으신 분'],
  },
  BACKEND: {
    introductions: [
      '시험기간을 제외한 매주 화요일 18시 1회 2시간 분량의 오프라인 모임',
      'Spring 공식 문서 스터디와 대규모 시스템 설계 책 스터디 진행',
    ],
    recommendations: [
      'Spring의 기본적인 내부 동장 원리를 함께 이해하고 싶으신 분',
      '문제점과 해결책을 탐구하는 것을 즐기시는 분',
      '본인의 경험을 나누며 성장하고 싶으신 분',
    ],
  },
  AI: {
    introductions: [
      '시험기간을 제외한 매주 수요일 18시 1회 2시간 분량의 오프라인 모임',
      '매주 AI 최신 연구 논문 1편 읽고 발표와 논문 리뷰를 통해 내용을 정리하는\n방식으로 스터디 진행',
    ],
    recommendations: [
      '머신러닝, 딥러닝 개념을 학습한 경험이 있으신 분',
      'LLM, 멀티모달, RAG Agent 등 최근 AI연구 흐름을 따라가고 싶은 분',
      '논문을 깊이 이해하고 싶은 분',
    ],
  },
}

function PartIntroductionCard({
  part,
  selectedPart,
  onSelectPart,
}: Pick<PartCardContentProps, 'part' | 'selectedPart' | 'onSelectPart'>) {
  const { introductions, recommendations } = PART_CONTENT[part]
  const colors = PART_COLORS[part]

  return (
    <section className="flex flex-col gap-5">
      <div
        className="flex w-full xl:w-262 items-center justify-between
      xs:gap-3 xs:flex-col
      "
      >
        <Typography as="h2" variant="title2.2" isEn className={`${colors.title} xs:text-[20px]!`}>
          {part}
        </Typography>

        <div className="flex items-center rounded-full border border-gray-200 p-1.5">
          {PARTS.map((partName) => {
            const isSelected = selectedPart === partName

            return (
              <button
                key={partName}
                type="button"
                onClick={() => onSelectPart(partName)}
                aria-pressed={isSelected}
                className={`rounded-full px-3 py-1.5 border-gray-200 ${
                  isSelected ? 'bg-primary text-white' : 'text-grayscale-500'
                }`}
              >
                <Typography
                  as="span"
                  variant="body2.3"
                  className={isSelected ? 'text-white' : 'text-grayscale-500'}
                >
                  {partName}
                </Typography>
              </button>
            )
          })}
        </div>
      </div>

      <div
        className={`flex flex-col gap-8 rounded-xl p-8 w-full
          xl:flex-row xl:w-262 xl:h-94 
          l:px-9 l:pb-10 l:pt-9 l:h-210
          m:px-7 m:pb-8 m:pt-7 m:h-173 m:gap-6
          s:px-5 s:pb-6 s:pt-5 s:h-165 s:gap-6
          xs:px-4 xs:pb-5 xs:pt-4 xs:h-134 xs:gap-5.5
          ${colors.background}`}
      >
        <div
          className="w-full xl:h-78 xl:w-95 l:h-110 m:h-86 s:h-83 xs:h-49.5
          shrink-0 overflow-hidden rounded-lg"
        >
          <img src={partStudyPhoto} alt="Part introduction" className="size-full object-cover" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-7 m:gap-6 xl:py-2.5 l:px-2.5 m:px-2">
          <div className="flex flex-col gap-3">
            <Typography as="h3" variant="body1.2" className={`${colors.title} xs:text-[14px]!`}>
              파트 소개
            </Typography>

            <div className="flex flex-col gap-2">
              {introductions.map((text, index) => (
                <div key={text} className="flex items-start gap-2">
                  <Typography as="span" variant="caption1.2" className={`py-0.5 ${colors.number}`}>
                    {`0${index + 1}`}
                  </Typography>
                  <Typography as="p" variant="body1.3" className="xs:text-[14px]!">
                    {text}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Typography as="h3" variant="body1.2" className={`${colors.title} xs:text-[14px]!`}>
              이런 사람에게 추천해요
            </Typography>

            {recommendations.map((text, index) => (
              <div key={text} className="flex items-start gap-2">
                <Typography as="span" variant="caption1.2" className={`py-0.5 ${colors.number}`}>
                  {`0${index + 1}`}
                </Typography>
                <Typography as="p" variant="body1.3" className="xs:text-[14px]!">
                  {text}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SemesterActivityCard({
  part,
  semester,
  activities,
}: Pick<PartCardContentProps, 'part' | 'semester' | 'activities'>) {
  const colors = PART_COLORS[part]

  return (
    <section
      className="
        w-full rounded-xl border border-gray-100 bg-white
        xs:px-3 xs:py-5
        s:px-5 s:pt-8 s:pb-40
        m:px-5 m:pt-8 m:pb-10
        l:px-7 l:pt-10 l:pb-11
        xl:px-8 xl:pt-10 xl:pb-13
      "
    >
      <div
        className="
          flex flex-col rounded-xl
          xs:gap-5
          s:gap-7
          m:gap-7
          l:gap-7
          xl:gap-8
        "
      >
        <Typography
          as="div"
          variant="body1.3"
          className="
            flex items-center gap-1 
            xs:pl-2
            s:pl-2.5
            m:px-2.5
            l:pl-3 l:pr-2
            xl:px-3
          "
        >
          <span className="text-sub">{semester} 파트장</span>
          <span className="text-grayscale-400">|</span>
          <span className="text-black xs:pl-0.5">김지디</span>
        </Typography>

        <div className="flex w-full flex-col">
          {activities.map((activity, index) => (
            <div key={activity.week}>
              <div
                className="
                  flex flex-col gap-3.5 
                  xs:px-2.5
                  s:px-3
                  m:px-3
                  l:px-3.5
                  xl:px-3.5
                "
              >
                <Typography as="h3" variant="body1.2" className={`${colors.week} xs:text-[14px]!`}>
                  {activity.week}
                </Typography>

                <div className="flex flex-col gap-3">
                  {activity.items.map((item) => (
                    <div key={item.title} className="flex flex-col">
                      <div className="flex items-center gap-1">
                        {item.featured && <StarIcon className="shrink-0 size-4 s:size-5" />}
                        <Typography
                          as="h4"
                          variant="body1.2"
                          className="text-black xs:text-[14px]!"
                        >
                          {item.title}
                        </Typography>
                      </div>

                      <Typography as="p" variant="body2.3" className="text-sub">
                        {item.description}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>

              {index !== activities.length - 1 && (
                <div
                  className="h-px w-full bg-gray-100 
                xs:my-5
                s:my-8
                m:my-8
                l:my-8
                xl:my-8
                "
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function PartCardContent({
  part,
  selectedPart,
  onSelectPart,
  semester,
  activities,
}: PartCardContentProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-7">
      <PartIntroductionCard part={part} selectedPart={selectedPart} onSelectPart={onSelectPart} />

      <SemesterActivityCard part={part} semester={semester} activities={activities} />
    </div>
  )
}
