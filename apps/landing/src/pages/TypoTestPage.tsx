import { Typography, typography } from '@gdg/wowds'
import { useState } from 'react'
import { Link } from 'react-router-dom'

type Scale = keyof typeof typography

const samples: { scale: Scale; label: string; description: string; sizes: number[] }[] = [
  {
    scale: 'display1',
    label: 'Display 1',
    description: '가장 큰 페이지 대표 문구',
    sizes: [36, 44, 52],
  },
  {
    scale: 'display2',
    label: 'Display 2',
    description: '주요 페이지 대표 문구',
    sizes: [32, 40, 48],
  },
  {
    scale: 'display3',
    label: 'Display 3',
    description: '섹션을 여는 대표 문구',
    sizes: [30, 36, 44],
  },
  {
    scale: 'title1',
    label: 'Title 1',
    description: '페이지와 모듈의 큰 제목',
    sizes: [28, 32, 36],
  },
  { scale: 'title2', label: 'Title 2', description: '모듈과 콘텐츠 제목', sizes: [26, 28, 32] },
  { scale: 'subtitle1', label: 'Subtitle 1', description: '큰 소제목', sizes: [24, 24, 28] },
  { scale: 'subtitle2', label: 'Subtitle 2', description: '주요 소제목', sizes: [22, 22, 24] },
  { scale: 'subtitle3', label: 'Subtitle 3', description: '콘텐츠 소제목', sizes: [20, 20, 22] },
  {
    scale: 'subtitle4',
    label: 'Subtitle 4',
    description: '작은 소제목과 강조 문구',
    sizes: [18, 18, 20],
  },
  { scale: 'body1', label: 'Body 1', description: '주요 본문과 설명', sizes: [16, 16, 18] },
  { scale: 'body2', label: 'Body 2', description: '일반 본문과 UI 텍스트', sizes: [14, 14, 16] },
  { scale: 'caption1', label: 'Caption 1', description: '보조 설명과 안내', sizes: [12, 12, 14] },
  {
    scale: 'caption2',
    label: 'Caption 2',
    description: '짧고 작은 보조 정보 · 한글 전용',
    sizes: [10, 10, 12],
  },
]

export default function TypoTestPage() {
  const [isEn, setIsEn] = useState(false)

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pt-32 pb-16">
      <Link to="/" className="text-body2 font-medium text-blue-700 underline underline-offset-4">
        ← 홈으로
      </Link>
      <Typography as="h1" variant="title1.1" className="mt-6 text-black">
        타이포그래피
      </Typography>
      <Typography as="p" variant="body2.3" className="mt-3 text-gray-600">
        Figma 5.0 Renewal 기준의 타이포 샘플입니다. 창 너비를 바꾸면 크기가 자동으로 전환돼요.
      </Typography>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-blue-100 p-4">
        <div className="text-body2 text-blue-700">
          <p className="font-semibold">
            현재 스케일: <span className="min-[600px]:hidden">Small · XS</span>
            <span className="hidden min-[600px]:inline min-[1024px]:hidden">Medium · S·M</span>
            <span className="hidden min-[1024px]:inline">Large · L·XL</span>
          </p>
          <p className="mt-1">Small &lt; 600px · Medium 600–1023px · Large ≥ 1024px</p>
        </div>
        <label className="flex items-center gap-2 text-body2 font-medium text-black">
          서체
          <select
            value={isEn ? 'en' : 'ko'}
            onChange={(event) => setIsEn(event.target.value === 'en')}
            className="rounded-lg border border-outline bg-white px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <option value="ko">한글 · SUIT</option>
            <option value="en">영문 · Google Sans Flex</option>
          </select>
        </label>
      </div>
      <p className="mt-4 text-body2 text-gray-600">
        자간 −0.015em · Display/Title 행간 140% · Subtitle/Body/Caption 행간 150%
      </p>

      <div className="mt-8 space-y-4">
        {samples
          .filter(({ scale }) => !isEn || scale !== 'caption2')
          .map(({ scale, label, description, sizes }) => {
            const weights =
              isEn || scale.startsWith('display') || scale.startsWith('title')
                ? ([1, 2] as const)
                : ([1, 2, 3] as const)

            return (
              <section
                key={scale}
                aria-label={label}
                className="rounded-xl border border-outline bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h2 className="text-body1 font-semibold text-black">{label}</h2>
                    <p className="mt-1 text-body2 text-gray-600">{description}</p>
                  </div>
                  <p className="text-body2 text-gray-500">
                    <span className="max-[599px]:font-semibold max-[599px]:text-blue-700">
                      Small {sizes[0]}
                    </span>
                    {' / '}
                    <span className="min-[600px]:max-[1023px]:font-semibold min-[600px]:max-[1023px]:text-blue-700">
                      Medium {sizes[1]}
                    </span>
                    {' / '}
                    <span className="min-[1024px]:font-semibold min-[1024px]:text-blue-700">
                      Large {sizes[2]}
                    </span>
                    {' px'}
                  </p>
                </div>
                <div className="mt-5 space-y-4">
                  {weights.map((weight) => (
                    <div key={weight}>
                      <p className="mb-1 text-caption1 text-gray-500">
                        {scale}.{weight} · {isEn ? (weight === 1 ? 600 : 500) : 800 - weight * 100}
                      </p>
                      <Typography
                        as="p"
                        variant={`${scale}.${weight}`}
                        isEn={isEn}
                        className="break-words text-black"
                      >
                        {isEn ? 'Build together, grow together.' : '함께 배우고, 함께 성장해요.'}
                      </Typography>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
      </div>

      <section aria-label="Google Sans Code" className="mt-8 rounded-xl bg-gray-50 p-5">
        <h2 className="text-body1 font-semibold text-black">Google Sans Code · Regular 400</h2>
        <p className="mt-1 text-body2 text-gray-600">
          영문 포인트 텍스트에 사용하는 보조 서체예요. 긴 문장에는 사용하지 않습니다.
        </p>
        <Typography
          as="p"
          variant="subtitle2.2"
          isCode
          style={{ fontWeight: 400 }}
          className="mt-4"
        >
          GDG Hongik
        </Typography>
      </section>
    </div>
  )
}
