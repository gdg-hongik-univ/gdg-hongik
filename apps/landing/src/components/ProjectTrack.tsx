import { cn, TrackIndicator } from '@gdg/wowds'
import { type CSSProperties, useEffect, useRef, useState } from 'react'
import projectTrackPhoto from '../assets/ProjectTrack.png'

const COURSES = [
  {
    id: 'mission',
    title: '미션 코스',
    description:
      '주어진 미션을 하나씩 해결하며 프로젝트에 필요한 감각을 함께 익혀요. 직접 만들어보고 시도하는 과정 속에서, 본격적인 기획과 개발로 넘어갈 준비를 해요.',
    offset: 119,
  },
  {
    id: 'planning',
    title: '기획 코스',
    description:
      '미션에서 얻은 경험을 바탕으로 우리 팀이 해결하고 싶은 현실 세계의 문제를 찾아봐요. 서비스 대상과 핵심 기능을 함께 고민하며 아이디어를 구체화해요.',
    offset: 59,
  },
  {
    id: 'development',
    title: '개발 코스',
    description:
      '기획한 내용을 실제로 구현하며 하나의 결과물로 완성해요. 팀원들과 역할을 나누고 피드백을 주고받으며, 협업 속에서 프로젝트 경험을 쌓아가요.',
    offset: 0,
  },
] as const

export default function ProjectTrack() {
  const listRef = useRef<HTMLOListElement>(null)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(list)
    return () => observer.disconnect()
  }, [])

  const revealClass = cn(
    'relative z-10 transition-[opacity,translate] duration-500 delay-(--reveal-delay) motion-reduce:transition-none',
    hasEntered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
  )

  return (
    <ol
      ref={listRef}
      aria-label="프로젝트 트랙 진행 과정"
      className={cn(
        'grid gap-(--course-gap) font-primary leading-[1.5] tracking-[-0.015em] [--course-gap:20px] [--marker-x:14px] [--marker-y:14px] [--content-delay:1100ms]',
        'min-[600px]:[--course-gap:24px] min-[600px]:[--image-width:210px] min-[600px]:[--image-gap:20px] min-[600px]:[--marker-x:calc(var(--image-width)+var(--image-gap)+14px)] min-[600px]:[--marker-y:26px]',
        'm:[--image-width:230px] m:[--image-gap:24px]',
        'min-[1024px]:grid-cols-3 min-[1024px]:[--course-gap:12px] min-[1024px]:[--marker-x:18px] min-[1024px]:[--marker-y:18px] min-[1024px]:[--content-delay:1400ms]',
        'xl:px-6 xl:[--course-gap:16px]',
      )}
    >
      {COURSES.map((course, index) => {
        const nextCourse = COURSES[index + 1]
        const isLast = !nextCourse
        const rise = course.offset - (nextCourse?.offset ?? course.offset)

        return (
          <li
            key={course.id}
            style={
              {
                '--course-offset': `${course.offset}px`,
                '--course-rise': `${rise}px`,
                '--reveal-delay': `calc(var(--content-delay) + ${index * 150}ms)`,
              } as CSSProperties
            }
            className={cn(
              'relative grid min-w-0 grid-cols-[28px_minmax(0,1fr)] grid-rows-[auto_auto_auto] gap-x-3 gap-y-3 pr-3',
              'min-[600px]:min-h-[140px] min-[600px]:grid-cols-[calc(var(--image-width)+var(--image-gap)-12px)_28px_minmax(0,1fr)] min-[600px]:grid-rows-[auto_1fr] min-[600px]:gap-y-2 min-[600px]:pr-0',
              'min-[1024px]:mt-(--course-offset) min-[1024px]:grid-cols-[36px_minmax(0,1fr)] min-[1024px]:grid-rows-[auto_1fr_140px]',
            )}
          >
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute top-(--marker-y) left-(--marker-x) w-0.5 origin-top transition-transform delay-300 duration-700 motion-reduce:transition-none',
                'min-[1024px]:h-0.5 min-[1024px]:origin-left',
                isLast
                  ? 'h-[calc(100%-var(--marker-y))] bg-linear-to-b from-blue-200 to-blue-200/0 min-[1024px]:w-[calc(100%-var(--marker-x))] min-[1024px]:bg-linear-to-r'
                  : 'h-[calc(100%+var(--course-gap))] bg-blue-200 min-[1024px]:w-[calc(100%+var(--course-gap))]',
                hasEntered
                  ? 'scale-100'
                  : 'scale-y-0 min-[1024px]:scale-x-0 min-[1024px]:scale-y-100',
              )}
            >
              {!isLast && (
                <div
                  className={cn(
                    'absolute top-[calc(0px-var(--course-rise))] right-0 hidden h-(--course-rise) w-0.5 origin-bottom bg-blue-200 transition-transform delay-1000 duration-300 motion-reduce:transition-none min-[1024px]:block',
                    hasEntered ? 'scale-y-100' : 'scale-y-0',
                  )}
                />
              )}
            </div>

            <TrackIndicator
              size="sm"
              aria-hidden="true"
              className={cn(
                revealClass,
                'delay-0 duration-300',
                'col-start-1 row-start-1 mt-0.5 justify-self-center',
                'min-[600px]:col-start-2 min-[600px]:mt-3 min-[600px]:size-7',
                'min-[1024px]:col-start-1 min-[1024px]:mt-0.5 min-[1024px]:size-8',
              )}
            />
            <h3
              className={cn(
                revealClass,
                'col-start-2 row-start-1 w-fit bg-white pl-1 text-[16px] font-bold text-blue-700',
                'min-[600px]:col-start-3 min-[600px]:mt-3 min-[600px]:px-2 min-[600px]:text-[20px]',
                'min-[1024px]:col-start-2 min-[1024px]:mt-0 min-[1024px]:text-[22px]',
              )}
            >
              {course.title}
            </h3>
            <img
              src={projectTrackPhoto}
              alt="강의실에서 노트북으로 함께 활동하는 GDG Hongik 멤버들"
              width={2000}
              height={917}
              loading="lazy"
              className={cn(
                revealClass,
                'col-start-2 row-start-2 aspect-[3/2] w-full rounded-lg object-cover',
                'min-[600px]:col-start-1 min-[600px]:row-span-2 min-[600px]:row-start-1 min-[600px]:h-[140px] min-[600px]:w-(--image-width)',
                'min-[1024px]:col-start-2 min-[1024px]:row-span-1 min-[1024px]:row-start-3 min-[1024px]:mx-2 min-[1024px]:w-[calc(100%-16px)]',
              )}
            />
            <p
              className={cn(
                revealClass,
                'col-start-2 row-start-3 min-w-0 text-[12px] font-medium text-gray-600',
                'min-[600px]:col-start-3 min-[600px]:row-start-2 min-[600px]:pl-2 min-[600px]:text-[14px] min-[600px]:text-gray-900',
                'min-[1024px]:col-start-2 min-[1024px]:pb-7 min-[1024px]:pr-2 min-[1024px]:text-[16px]',
              )}
            >
              {course.description}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
