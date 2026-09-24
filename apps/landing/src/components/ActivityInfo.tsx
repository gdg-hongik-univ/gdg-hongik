import { Typography } from '@gdg/wowds'

type ActivityType = 'regularStudy' | 'projectTrack' | 'partStudy' | 'meetNConnect'

interface ActivityInfoProps {
  activityType: ActivityType
}

const ACTIVITY_CONTENT: Record<ActivityType, { title: string; description: string }> = {
  regularStudy: {
    title: '어떤 개발 분야가 나에게 맞을지 아직 모르겠다면?',
    description:
      '아직 어떤 분야가 나에게 맞는지 몰라도 괜찮아요.\n정규스터디에서 다양한 분야를 함께 경험하며, 나만의 관심과 방향을 찾아가요.',
  },
  projectTrack: {
    title: '포트폴리오에 담을 실전 경험을 해보고 싶다면?',
    description:
      '기초를 익히는 중이라면 이제 실제 프로젝트를 통해 문제를 해결하고 결과물을 만들어볼 수 있어요.',
  },
  partStudy: {
    title: '특정 분야를 더 깊게 공부하고 싶다면?',
    description: '파트별로 관심 있는 주제를 깊이 공부하고 지식을 나눠요.',
  },
  meetNConnect: {
    title: '지난 학기의 기록',
    description:
      '멤버 모두가 함께 쌓아온 활동이에요.\n실제로 부딪히며 성장해온 과정을, 사진 속 순간들에 담아뒀어요.',
  },
}

export default function ActivityInfo({ activityType }: ActivityInfoProps) {
  const { title, description } = ACTIVITY_CONTENT[activityType]

  return (
    <div className="flex flex-col gap-4">
      <Typography
        as="h3"
        variant="body2.3"
        className="text-blue-600 bg-blue-100 w-fit px-4 py-1.5 rounded-[8px]"
      >
        {title}
      </Typography>

      <Typography
        as="p"
        variant="body1.3"
        className="whitespace-pre-line pl-4 border-l-2 border-blue-500 text-gray-950"
      >
        {description}
      </Typography>
    </div>
  )
}
