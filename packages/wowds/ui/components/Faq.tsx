import { useState } from 'react'
import { Typography } from '../components/Typography'
import { ChevronIcon } from '../../icon/index'
import { FAQ_DATA } from './faqData'
import { KakaotalkBarIcon } from '../../icon/index'

export const Faq = () => {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="mx-auto flex w-full max-w-360 flex-col pt-18 pb-30 px-4 xl:flex-row xl:pt-35 xl:pb-40 xl:px-20 xl:gap-13 xl:max-w-7xl">
      <div className="flex flex-row justify-between items-center mb-6 xl:flex-col xl:gap-6 xl:justify-start xl:items-start">
        <Typography variant="subtitle2.1" isEn className="text-black xl:text-[44px]!">
          FAQ
        </Typography>
        <a
          href="http://pf.kakao.com/_dWxmen"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="hover:text-gray-900 transition-colors"
        >
          <KakaotalkBarIcon size="xs" />
        </a>
      </div>

      <div className="flex w-full flex-col">
        {FAQ_DATA.map((faq) => {
          const isOpen = openId === faq.id

          return (
            <div
              key={faq.id}
              className="w-full border-t border-blue-500/30 transition-all duration-200 p-3 xl:px-6 xl:py-8"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                className="flex w-full items-center justify-between text-left focus:outline-none"
              >
                <div className="items-start">
                  <Typography variant="caption1.2" as="span" className="text-black xl:text-[20px]!">
                    Q.
                  </Typography>

                  <Typography
                    variant="caption1.2"
                    as="span"
                    className="pl-1 text-black xl:text-[20px]!"
                  >
                    {faq.question}
                  </Typography>
                </div>

                <ChevronIcon
                  direction={isOpen ? 'up' : 'down'}
                  size="lg"
                  className="h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-300"
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="mt-2.5 text-left">
                    <Typography
                      variant="caption1.2"
                      as="p"
                      className="leading-relaxed text-neutral-400 whitespace-pre-line xl:text-[20px]!"
                    >
                      {faq.answer}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div className="border-b border-blue-500/30" />
      </div>
    </section>
  )
}
