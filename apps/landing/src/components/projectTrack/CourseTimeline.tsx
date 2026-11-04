import { TrackIndicator, Typography } from '@gdg/wowds'
import type { ProjectTrackCourse } from '../../types/projectTrack'
import { Tag } from '../common/Tag'

export default function CourseTimeline({ courses }: { courses: ProjectTrackCourse[] }) {
  return (
    <section
      aria-labelledby="project-track-courses-title"
      className="rounded-xl border border-gray-100 bg-white pt-6 pr-5 pb-4 pl-4 min-[600px]:px-8 min-[600px]:pt-9 min-[600px]:pb-6 xl:px-9 xl:pt-10 xl:pb-7"
    >
      <h2 id="project-track-courses-title" className="sr-only">
        코스별 활동
      </h2>
      {courses.length === 0 ? (
        <Typography as="p" variant="body2.3" role="status" className="text-sub">
          등록된 코스별 활동이 없어요.
        </Typography>
      ) : (
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-3 bottom-0 left-[11.25px] w-[1.5px] bg-linear-to-b from-blue-200 from-[81.7308%] to-blue-200/0 min-[600px]:top-3.5 min-[600px]:left-[13.25px] min-[1024px]:top-4 min-[1024px]:left-[15.25px]"
          />
          <ol className="flex flex-col gap-4 min-[600px]:gap-6">
            {courses.map((course) => (
              <li key={course.name} className="relative">
                <div className="flex items-center gap-4 min-[1024px]:gap-5">
                  <TrackIndicator
                    size="sm"
                    className="shrink-0 min-[600px]:size-7 min-[1024px]:size-8"
                    aria-hidden="true"
                  />
                  <Typography
                    as="h3"
                    variant="body1.1"
                    className="text-blue-700 max-[599px]:text-[14px]!"
                  >
                    {course.name}
                  </Typography>
                </div>
                <ol className="mt-4.5 flex flex-col pl-10 min-[600px]:mt-6 min-[600px]:gap-6 min-[600px]:pl-11 min-[1024px]:pl-13">
                  {course.activities.map((activity) => (
                    <li key={activity.name} className="flex min-w-0 flex-col gap-2 pb-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Typography as="h4" variant="body1.2" className="max-[599px]:text-[14px]!">
                          {activity.name}
                        </Typography>
                        <Tag size="sm" variant={activity.online ? 'green' : 'yellow'}>
                          {activity.online ? '온라인' : '오프라인'}
                        </Tag>
                      </div>
                      <Typography as="p" variant="body2.3" className="text-sub">
                        {activity.description}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  )
}
