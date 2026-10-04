import { useState, type ComponentType } from 'react'
import { Typography } from '@gdg/wowds'
import { Tag, type TagVariant } from '../common/Tag'
import { FrontendCardBg, BackendCardBg, AiCardBg } from './PartCardListBg'

type Breakpoint = 'xs' | 's' | 'm' | 'l' | 'xl'
type Responsive = Record<Breakpoint, string>

const rt = (base: string, override: Partial<Responsive> = {}): Responsive => ({
  xs: base,
  s: base,
  m: base,
  l: base,
  xl: base,
  ...override,
})

const BP_VISIBILITY: Record<Breakpoint, string> = {
  xs: 'block s:hidden m:hidden l:hidden xl:hidden',
  s: 'hidden s:block',
  m: 'hidden m:block',
  l: 'hidden l:block',
  xl: 'hidden xl:block',
}

function ResponsiveText({ text }: { text: Responsive }) {
  return (
    <>
      {(Object.keys(BP_VISIBILITY) as Breakpoint[]).map((bp) => (
        <span key={bp} className={`${BP_VISIBILITY[bp]} whitespace-pre`}>
          {text[bp]}
        </span>
      ))}
    </>
  )
}

interface PartInfo {
  id: string
  name: string
  description: Responsive
  detailDescription: Responsive
  recommendations: Responsive[]
  titleColor: string
  descriptionColor: string
  activeBg: string
  tagVariant: TagVariant
  numColor: string
  Background: ComponentType
}

const PART_ITEMS: PartInfo[] = [
  {
    id: 'frontend',
    name: 'FRONTEND',
    description: rt('사용자와 가장 먼저 만나는 화면을,\n오래 쓰이는 코드로 만들어요.'),
    detailDescription: rt(
      '자바스크립트와 타입스크립트의 핵심 원리부터\n디자인 패턴까지 파고들며, 더 나은 코드로 개선\n하는 경험을 함께 쌓아요.',
      {
        s: '자바스크립트와 타입스크립트의 핵심 원리\n부터 디자인 패턴까지 파고들며, 더 나은\n코드로 개선하는 경험을 함께 쌓아요.',
      },
    ),
    recommendations: [
      rt('사용자 경험과 코드의 완성도까지 고민하고 싶은 분', {
        xs: '사용자 경험과 코드의 완성도까지 고민하고\n싶은 분',
        s: '사용자 경험과 코드의 완성도까지 고민하고\n싶은 분',
      }),
      rt('유지보수가 쉬운 프론트엔드를 함께 만들어가고\n싶은 분', {
        s: '유지보수가 쉬운 프론트엔드를 함께 만들어\n가고 싶은 분',
      }),
    ],
    titleColor: 'text-core-blue-500',
    descriptionColor: 'text-gray-700',
    activeBg: 'bg-core-blue-25',
    tagVariant: 'blue',
    numColor: 'text-core-blue-100',
    Background: FrontendCardBg,
  },
  {
    id: 'backend',
    name: 'BACKEND',
    description: rt('눈에 보이지 않는 곳에서\n서비스를 떠받치는 구조를 설계해요.', {
      s: '눈에 보이지 않는 곳에서 서비스를\n떠받치는 구조를 설계해요.',
    }),
    detailDescription: rt(
      'Spring의 내부 원리부터 대규모 시스템 설계\n까지, 문제를 함께 탐구해요. 깊이 있는 학습과\n경험 나눔으로 함께 성장해봐요.',
      {
        m: 'Spring의 내부 원리부터 대규모 시스템 설계까지,\n문제를 함께 탐구해요. 깊이 있는 학습과 경험 나눔\n으로 함께 성장해봐요.',
        s: 'Spring의 내부 원리부터 대규모 시스템\n설계까지, 문제를 함께 탐구해요. 깊이 있는\n학습과 경험 나눔으로 함께 성장해봐요.',
      },
    ),
    recommendations: [
      rt('Spring의 동작 방식과 대규모 서비스 설계를 깊게\n공부해보고 싶은 분', {
        m: 'Spring의 동작 방식과 대규모 서비스 설계를 깊게 공\n부해보고 싶은 분',
        s: 'Spring의 동작 방식과 대규모 서비스 설계\n를 깊게 공부해보고 싶은 분',
        xs: 'Spring의 동작 방식과 대규모 서비스 설계를 깊\n게 공부해보고 싶은 분',
      }),
      rt('문제를 파고든 경험을 함께 나누고 싶은 분'),
    ],
    titleColor: 'text-core-green-500',
    descriptionColor: 'text-gray-700',
    activeBg: 'bg-core-green-25',
    tagVariant: 'green',
    numColor: 'text-core-green-100',
    Background: BackendCardBg,
  },
  {
    id: 'ai',
    name: 'AI',
    description: rt('데이터로 배우는 모델을 직접 만들고,\n실험으로 결과를 확인해요.', {
      s: '데이터로 배우는 모델을 직접\n만들고, 실험으로 결과를 확인해요.',
    }),
    detailDescription: rt(
      'AI를 더 깊이 공부하고 싶은 사람들이 함께 모여\n최신 AI 연구와 논문을 바탕으로 다양한 주제를\n탐구하고, 발표와 토론을 통해 서로의 지식과\n경험을 공유해요.',
      {
        m: 'AI를 더 깊이 공부하고 싶은 사람들이 함께 모여\n최신 AI 연구와 논문을 바탕으로 다양한 주제를\n탐구하고, 발표와 토론을 통해 서로의 지식과 경험을\n공유해요.',
        s: 'AI를 더 깊이 공부하고 싶은 사람들이 함께\n모여 최신 AI 연구와 논문을 바탕으로\n다양한 주제를 탐구하고, 발표와 토론을\n통해 서로의 지식과 경험을 공유해요.',
      },
    ),
    recommendations: [
      rt('머신러닝을 직접 구현하고 실험해보고 싶은 분', {
        s: '머신러닝을 직접 구현하고 실험해보고\n싶은 분',
      }),
      rt('함께 토론하며 더 나은 결과를 만들어가고 싶은 분', {
        s: '함께 토론하며 더 나은 결과를 만들어\n가고 싶은 분',
      }),
    ],
    titleColor: 'text-core-red-500',
    descriptionColor: 'text-gray-700',
    activeBg: 'bg-core-red-25',
    tagVariant: 'red',
    numColor: 'text-core-red-100',
    Background: AiCardBg,
  },
]

export default function PartCardList() {
  const [activeCard, setActiveCard] = useState<string | null>(null)

  return (
    <div className="flex xs:flex-col flex-row w-full xs:pt-7 s:pt-9 xs:gap-4 s:gap-3.5 gap-4.5 xl:justify-between overflow-x-auto [scrollbar:none] [&::-webkit-scrollbar]:hidden">
      {PART_ITEMS.map((part) => {
        const BgComponent = part.Background
        const isActive = activeCard === part.id

        return (
          <div
            key={part.id}
            onMouseEnter={() => setActiveCard(part.id)}
            onMouseLeave={() => setActiveCard(null)}
            onClick={() => setActiveCard(isActive ? null : part.id)}
            className="relative overflow-hidden flex flex-col rounded-xl xs:w-82 xs:h-82 s:w-75 s:h-85 m:w-90 m:h-90 w-102 h-102 shrink-0 cursor-pointer"
          >
            <div
              className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ${
                isActive ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <BgComponent />
            </div>

            <div
              className={`pointer-events-none absolute inset-0 z-0 rounded-xl transition-opacity duration-300 ${
                part.activeBg
              } ${isActive ? 'opacity-100' : 'opacity-0'}`}
            />

            <div
              className={`relative z-10 flex flex-col gap-2 p-7 transition-all duration-300 ${
                isActive
                  ? 'opacity-0 -translate-y-2 pointer-events-none'
                  : 'opacity-100 translate-y-0'
              }`}
            >
              <Typography variant="subtitle4.1" isEn className={`${part.titleColor}`}>
                {part.name}
              </Typography>

              <Typography
                variant="body1.3"
                className={`${part.descriptionColor} whitespace-pre-line leading-relaxed`}
              >
                <ResponsiveText text={part.description} />
              </Typography>
            </div>

            <div
              className={`absolute inset-0 z-10 xs:p-5.5 s:p-6 m:p-7 p-9 transition-all duration-300 ${
                isActive
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              <Typography
                variant="subtitle4.1"
                className={`${part.titleColor} xs:text-[14px]! s:text-[14px]! m:text-[14px]! l:text-[16px]!`}
              >
                파트 소개
              </Typography>

              <div className="mt-2.5 flex items-start gap-2">
                <Typography
                  variant="caption2.2"
                  className={`${part.numColor} xs:text-[10px]! s:text-[10px]! m:text-[10px]! l:text-[12px]!`}
                >
                  01
                </Typography>

                <Typography
                  variant="body2.3"
                  className="leading-relaxed xs:text-[14px]! s:text-[14px]! m:text-[14px]! l:text-[16px]!"
                >
                  <ResponsiveText text={part.detailDescription} />
                </Typography>
              </div>

              <div className="xs:mt-5 s:mt-7 mt-8">
                <Tag
                  size="md"
                  variant={part.tagVariant}
                  className="xs:text-[14px]! s:text-[14px]! m:text-[14px]! l:text-[16px]!"
                >
                  이런 사람에게 추천해요
                </Tag>

                <div className="xs:mt-2.5 mt-3 flex flex-col xs:gap-2 gap-2.5">
                  {part.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Typography
                        variant="caption2.2"
                        className={`${part.numColor} xs:text-[10px]! s:text-[10px]! m:text-[10px]! l:text-[12px]!`}
                      >
                        0{index + 1}
                      </Typography>

                      <Typography
                        variant="body2.3"
                        className="leading-relaxed xs:text-[14px]! s:text-[14px]! m:text-[14px]! l:text-[16px]!"
                      >
                        <ResponsiveText text={recommendation} />
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
