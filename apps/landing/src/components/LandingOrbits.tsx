import { palette, Typography } from '@gdg/wowds'
import OrbitStar from './endlessConnections/OrbitStar'
import OrbitLine from './endlessConnections/OrbitLine'
import OrbitProfile from './endlessConnections/OrbitProfile'

const orbitProfiles = [
  {
    imageSrc: '/img/crew.jpg',
    label: 'Community Member',
    description: '부담 없이 원하는 세션에 참여하면서 개발과 커뮤니티를 처음 경험해가요.',
    to: '/community-member',
    orbitSize: 1053,
    angle: -42,
    xsAngle: -8,
    sAngle: -18,
    mAngle: -28,
    lAngle: -42,
  },
  {
    imageSrc: '/img/frontend.jpg',
    label: 'Part Member',
    description: '관심 있는 파트에 들어가 같은 방향을 보는 멤버들과 꾸준히 함께 공부해가요.',
    to: '/part-member',
    orbitSize: 810,
    xsOrbitSize: 870,
    angle: 0,
    xsAngle: 8,
    sAngle: 8,
    mAngle: 0,
    lAngle: 0,
  },
  {
    imageSrc: '/img/alumni.jpg',
    label: 'Alumni',
    description: '활동을 마친 뒤에도 다시 돌아와 경험과 이야기를 후배들과 나눠요.',
    to: '/alumni',
    orbitSize: 1247,
    angle: 27,
    xsAngle: 8,
    sAngle: 12,
    mAngle: 20,
    lAngle: 27,
  },
] as const

const LandingOrbits = () => {
  return (
    <div className="relative flex justify-center w-full h-205.75 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-137 rounded-full z-20 border border-[#57ABFF] opacity-70 pointer-events-none bg-orbit-core" />
        {/* 1번 궤도 (가장 안쪽: 810px, 15초) */}
        <OrbitLine size="810px" xsSize="870px" animation="animate-orbit-1">
          <OrbitStar color={palette.core.green[100]} angle={18} />
          <OrbitStar color={palette.core.blue[100]} angle={-68} />
        </OrbitLine>

        {/* 2번 궤도 (중간: 1053px, 20초) */}
        <OrbitLine size="1053px" animation="animate-orbit-2">
          <OrbitStar color="#FFE27C" angle={50} />
        </OrbitLine>

        {/* 3번 궤도 (가장 바깥쪽: 1247px, 25초) */}
        <OrbitLine size="1247px" animation="animate-orbit-3">
          <OrbitStar color={palette.core.red[50]} angle={-7} />
          <OrbitStar color={palette.core.green[100]} angle={-62} />
          <OrbitStar color={palette.core.blue[100]} angle={58} />
          <OrbitStar color="#FFE27C" angle={86} />
        </OrbitLine>

        {/* 회전하는 궤도와 분리해 사진과 텍스트는 제자리에 고정한다. */}
        {orbitProfiles.map((profile) => (
          <OrbitProfile
            key={profile.label}
            imageSrc={profile.imageSrc}
            imageAlt={`${profile.label} profile`}
            label={profile.label}
            description={profile.description}
            to={profile.to}
            orbitSize={profile.orbitSize}
            xsOrbitSize={'xsOrbitSize' in profile ? profile.xsOrbitSize : undefined}
            angle={profile.angle}
            xsAngle={profile.xsAngle}
            sAngle={profile.sAngle}
            mAngle={profile.mAngle}
            lAngle={profile.lAngle}
          />
        ))}
      </div>

      {/* 궤도보다 높은 z-index의 하단 페이드 그라데이션 (높이 300px, 100% 지점 white) */}
      <div className="absolute bottom-0 left-0 right-0 h-75 z-30 pointer-events-none bg-linear-to-b from-transparent to-white flex flex-col items-center justify-center">
        <Typography
          variant="display1.1"
          isEn
          className="xs:text-subtitle1! s:text-display3! m:text-display3! l:text-display3!"
        >
          Endless Connections
        </Typography>
        <Typography variant="subtitle3.2" className="xs:text-caption1!">
          함께 배우고 다시 연결되는 멤버들
        </Typography>
      </div>
    </div>
  )
}

export default LandingOrbits
