import { palette } from '@gdg/wowds'
import OrbitStar from './endlessConnections/OrbitStar'
import OrbitLine from './endlessConnections/OrbitLine'

const LandingOrbits = () => {
  return (
    <div className="relative flex justify-center w-full h-[650px] overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-137 rounded-full z-20 border border-[#57ABFF] opacity-70 pointer-events-none bg-orbit-core" />
        {/* 1번 궤도 (가장 안쪽: 810px, 15초) */}
        <OrbitLine size="810px" animation="animate-orbit-1">
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
      </div>

      {/* 궤도보다 높은 z-index의 하단 페이드 그라데이션 (높이 300px, 100% 지점 white) */}
      <div className="absolute bottom-0 left-0 right-0 h-75 z-30 pointer-events-none bg-gradient-to-b from-transparent to-white" />
    </div>
  )
}

export default LandingOrbits
