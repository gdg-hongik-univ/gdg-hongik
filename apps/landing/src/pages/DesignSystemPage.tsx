import { breakpoint, color, grid, palette, type BreakpointName } from '@gdg/wowds/tokens'
import { useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'

const { disabled, hover, pressed, status, ...defaultColors } = color
const colorGroups: { name: string; prefix: string; tokens: Record<string, string> }[] = [
  ...Object.entries(palette.core).map(([name, tokens]) => ({
    name: `Core / ${name}`,
    prefix: `palette.core.${name}`,
    tokens,
  })),
  { name: 'Blue', prefix: 'palette.blue', tokens: palette.blue },
  { name: 'Gray', prefix: 'palette.gray', tokens: palette.gray },
  { name: 'Neutral', prefix: 'palette', tokens: { white: palette.white, black: palette.black } },
  { name: 'Status', prefix: 'color.status', tokens: status },
  { name: 'Default', prefix: 'color', tokens: defaultColors },
  { name: 'Disabled', prefix: 'color.disabled', tokens: disabled },
  { name: 'Hover', prefix: 'color.hover', tokens: hover },
  { name: 'Pressed', prefix: 'color.pressed', tokens: pressed },
]
const breakpoints = Object.entries(breakpoint) as [
  BreakpointName,
  { min: number; max: number | null },
][]
const container = 'mx-auto w-full max-w-7xl px-5 min-[600px]:px-8'
const sectionTitle = 'text-[28px] font-semibold tracking-tight min-[600px]:text-[36px]'
const focus =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600'

function subscribeToViewport(onChange: () => void) {
  window.addEventListener('resize', onChange)
  return () => window.removeEventListener('resize', onChange)
}

function getViewportWidth() {
  return window.innerWidth
}

export default function DesignSystemPage() {
  const width = useSyncExternalStore(subscribeToViewport, getViewportWidth)
  const active = breakpoints.find(
    ([, { min, max }]) => width >= min && (max === null || width < max),
  )?.[0]
  const activeGrid = grid[active ?? 'xs']
  const theme = getComputedStyle(document.documentElement)
  const valueOf = (token: string) => theme.getPropertyValue(token.slice(4, -1)).trim()
  const columns = Number(valueOf(activeGrid.columns))

  return (
    <div className="bg-gray-50 text-black pb-20">
      <header className={`${container} pt-32 pb-10 min-[600px]:pt-40`}>
        <Link to="/" className={`text-[14px] text-gray-600 underline underline-offset-4 ${focus}`}>
          ← 홈으로
        </Link>
        <p className="mt-8 text-[12px] font-semibold tracking-[0.15em] text-blue-700">
          WOW DESIGN SYSTEM / FOUNDATIONS
        </p>
        <h1 className="mt-3 font-title text-[40px] font-semibold leading-tight tracking-tight min-[600px]:text-[64px]">
          Design system
        </h1>
        <p className="mt-4 max-w-2xl break-keep text-[16px] leading-relaxed text-gray-600">
          GDG Hongik의 화면을 만드는 기본 규칙입니다. 색상과 반응형 구간, 레이아웃 그리드를 한곳에서
          확인하세요.
        </p>
      </header>

      <nav
        aria-label="디자인 시스템 섹션"
        className="sticky top-24 z-20 border-y border-outline bg-white/95 backdrop-blur"
      >
        <div
          className={`${container} flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4`}
        >
          <div className="flex gap-5 text-[14px] font-semibold">
            <a href="#colors" className={`hover:text-blue-700 ${focus}`}>
              Color
            </a>
            <a href="#breakpoints" className={`hover:text-blue-700 ${focus}`}>
              Breakpoint
            </a>
            <a href="#grid" className={`hover:text-blue-700 ${focus}`}>
              Grid
            </a>
          </div>
          <p className="rounded-full bg-blue-100 px-3 py-1 text-[12px] font-semibold text-blue-700">
            {width}px · {active ? active.toUpperCase() : '기본 구간 (< 360px)'}
          </p>
        </div>
      </nav>

      <section
        id="colors"
        aria-labelledby="colors-title"
        className={`${container} scroll-mt-48 pt-14`}
      >
        <p className="text-[12px] font-semibold text-blue-700">01 / COLOR</p>
        <h2 id="colors-title" className={`mt-2 ${sectionTitle}`}>
          색상
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-gray-600">
          기본 팔레트와 용도별 의미 색상입니다. 견본과 값은 현재 테마의 CSS 변수를 그대로
          사용합니다.
        </p>
        <div className="mt-8 space-y-8">
          {colorGroups.map(({ name, prefix, tokens }) => (
            <section key={prefix} aria-label={`${name} 색상`}>
              <h3 className="mb-3 text-[16px] font-semibold">{name}</h3>
              <div className="grid grid-cols-2 gap-3 min-[600px]:grid-cols-3 min-[1024px]:grid-cols-4 min-[1440px]:grid-cols-6">
                {Object.entries(tokens).map(([name, token]) => (
                  <div
                    key={name}
                    className="min-w-0 overflow-hidden rounded-xl border border-outline bg-white"
                  >
                    <div
                      aria-hidden="true"
                      className="h-20 border-b border-outline"
                      style={{ backgroundColor: token }}
                    />
                    <div className="p-3">
                      <p className="break-words text-[13px] font-semibold">
                        {prefix}.{name}
                      </p>
                      <p className="mt-1 font-code text-[12px] text-gray-600">
                        {valueOf(token).toUpperCase()}
                      </p>
                      <code className="mt-2 block break-all text-[10px] leading-relaxed text-gray-500">
                        {token.slice(4, -1)}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section
        id="breakpoints"
        aria-labelledby="breakpoints-title"
        className={`${container} scroll-mt-48 pt-20`}
      >
        <p className="text-[12px] font-semibold text-blue-700">02 / BREAKPOINT</p>
        <h2 id="breakpoints-title" className={`mt-2 ${sectionTitle}`}>
          화면의 기준
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-gray-600">
          창 너비를 바꾸면 현재 구간이 강조됩니다. 시작 너비는 포함하고, 다음 구간의 시작 너비는
          포함하지 않습니다.
        </p>
        <div className="mt-6 grid gap-3 min-[600px]:grid-cols-2 min-[1024px]:grid-cols-5">
          {breakpoints.map(([name, { min, max }]) => (
            <div
              key={name}
              className={`rounded-xl border p-5 ${active === name ? 'border-blue-600 bg-blue-100' : 'border-outline bg-white'}`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-title text-[24px] font-semibold">{name.toUpperCase()}</h3>
                {active === name && (
                  <span className="text-[12px] font-semibold text-blue-700">현재</span>
                )}
              </div>
              <p className="mt-3 font-code text-[12px] text-gray-600">
                {min}px {max === null ? '이상' : `– ${max}px 미만`}
              </p>
              <code className="mt-4 block text-[12px] text-gray-500">{name}:</code>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-gray-600">360px 미만에서는 기본 스타일을 사용합니다.</p>
      </section>

      <section id="grid" aria-labelledby="grid-title" className="scroll-mt-48 pt-20">
        <div className={container}>
          <p className="text-[12px] font-semibold text-blue-700">03 / GRID</p>
          <h2 id="grid-title" className={`mt-2 ${sectionTitle}`}>
            레이아웃의 리듬
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-gray-600">
            현재 화면 너비에 실제 그리드 값을 적용한 미리보기입니다. XL에서는 1280px 컨테이너가
            중앙에 놓입니다.
          </p>
          <div className="mt-6 mb-5 flex flex-wrap gap-2 text-[13px]">
            <span className="rounded-full border border-outline bg-white px-3 py-1.5">
              {active?.toUpperCase() ?? '기본 · XS 그리드'}
            </span>
            <span className="rounded-full border border-outline bg-white px-3 py-1.5">
              {columns} columns
            </span>
            <span className="rounded-full border border-outline bg-white px-3 py-1.5">
              Gutter {valueOf(activeGrid.gutter)}
            </span>
            <span className="rounded-full border border-outline bg-white px-3 py-1.5">
              {'margin' in activeGrid
                ? `Margin ${valueOf(activeGrid.margin)}`
                : `Container ${valueOf(activeGrid.containerWidth)}`}
            </span>
          </div>
        </div>
        <div className="border-y border-outline bg-blue-100/40 py-5">
          <div
            className="mx-auto w-full"
            style={{
              maxWidth: 'containerWidth' in activeGrid ? activeGrid.containerWidth : undefined,
              paddingInline: 'margin' in activeGrid ? activeGrid.margin : undefined,
            }}
          >
            <div
              className="grid h-44"
              style={{
                gridTemplateColumns: `repeat(${activeGrid.columns}, minmax(0, 1fr))`,
                gap: activeGrid.gutter,
              }}
            >
              {Array.from({ length: columns }, (_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center rounded-sm border border-blue-300 bg-blue-200/70 font-code text-[12px] text-blue-700"
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${container} mt-6`}>
          <div
            role="region"
            aria-label="구간별 그리드 규격, 좁은 화면에서는 가로 스크롤"
            tabIndex={0}
            className={`overflow-x-auto rounded-xl border border-outline bg-white ${focus}`}
          >
            <table className="w-full min-w-[520px] text-left text-[14px]">
              <caption className="sr-only">구간별 그리드 컬럼, 여백, 간격</caption>
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  {['구간', '컬럼', '좌우 여백 / 컨테이너', 'Gutter'].map((label) => (
                    <th key={label} scope="col" className="px-5 py-4 font-medium">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {breakpoints.map(([name]) => {
                  const spec = grid[name]
                  return (
                    <tr
                      key={name}
                      className={`border-t border-outline ${active === name ? 'bg-blue-100/50' : ''}`}
                    >
                      <th scope="row" className="px-5 py-4 font-semibold">
                        {name.toUpperCase()}
                      </th>
                      <td className="px-5 py-4">{valueOf(spec.columns)}</td>
                      <td className="px-5 py-4">
                        {'margin' in spec
                          ? `좌우 ${valueOf(spec.margin)}`
                          : `중앙 ${valueOf(spec.containerWidth)}`}
                      </td>
                      <td className="px-5 py-4">{valueOf(spec.gutter)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-[20px] font-semibold">XL Admin</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-gray-600">
            사이드바 {valueOf(grid.xl.admin.sidebarWidth)} · 콘텐츠 {valueOf(grid.xl.admin.columns)}
            컬럼 · 좌우 패딩 {valueOf(grid.xl.admin.contentPadding)} · Gutter{' '}
            {valueOf(grid.xl.admin.gutter)}
          </p>
          <div
            role="region"
            aria-label="XL Admin 그리드 미리보기, 좁은 화면에서는 가로 스크롤"
            tabIndex={0}
            className={`mt-4 overflow-x-auto rounded-xl border border-outline bg-white ${focus}`}
          >
            <div className="flex min-w-[1000px]">
              <aside
                className="flex shrink-0 items-center justify-center border-r border-outline bg-gray-100 py-10 text-[14px] text-gray-600"
                style={{ width: grid.xl.admin.sidebarWidth }}
              >
                Sidebar
              </aside>
              <div
                className="min-w-0 flex-1 py-6"
                style={{ paddingInline: grid.xl.admin.contentPadding }}
              >
                <div
                  className="grid h-32"
                  style={{
                    gridTemplateColumns: `repeat(${grid.xl.admin.columns}, minmax(0, 1fr))`,
                    gap: grid.xl.admin.gutter,
                  }}
                >
                  {Array.from({ length: Number(valueOf(grid.xl.admin.columns)) }, (_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded-sm border border-blue-300 bg-blue-100 font-code text-[11px] text-blue-700"
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
