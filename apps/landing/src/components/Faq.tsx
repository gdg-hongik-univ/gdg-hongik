import { useState } from 'react'
import { Typography } from '@gdg/wowds/ui'
import { ChevronIcon, KakaotalkBarIcon } from '@gdg/wowds/icon'
import { FAQ_DATA } from '../constants/faqData'

export const Faq = () => {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      className="mx-auto flex w-full flex-row pt-30 pb-40 gap-13
                        xs:flex-col xs:px-4 xs:pt-18 xs:pb-30 xs:gap-6 s:flex-col s:px-5 s:pt-23 s:pb-30 s:gap-10
                        m:px-6 l:px-7 xl:px-20 xl:pt-35"
    >
      <div
        className="flex flex-col justify-start items-start gap-6
                      xs:flex-row xs:justify-between xs:items-center
                      s:flex-row s:justify-between s:items-center"
      >
        <Typography
          variant="display3.1"
          isEn
          className="xs:text-[24px]! s:text-[36px]! m:text-[36px]!"
        >
          FAQ
        </Typography>
        <a
          href="https://pf.kakao.com/_dWxmen"
          target="_blank"
          rel="noreferrer"
          aria-label="KakaoTalk"
        >
          <KakaotalkBarIcon size="xs" className="hidden xs:block" />
          <KakaotalkBarIcon size="xl" className="block xs:hidden" />
        </a>
      </div>

      <div className="flex w-full flex-col">
        {FAQ_DATA.map((faq) => {
          const isOpen = openId === faq.id
          const triggerId = `faq-trigger-${faq.id}`
          const panelId = `faq-panel-${faq.id}`

          return (
            <div
              key={faq.id}
              className="w-full border-t border-blue-500/30 transition-all duration-200 px-6 py-8 xs:p-3 s:pl-5 s:py-5 s:pr-4"
            >
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleAccordion(faq.id)}
                className="flex w-full items-center justify-between text-left focus:outline-none"
              >
                <div className="items-start">
                  <Typography
                    variant="subtitle4.2"
                    as="span"
                    className="xs:text-[14px]! s:text-[18px]! m:text-[18px]!"
                  >
                    Q.
                  </Typography>

                  <Typography
                    variant="subtitle4.2"
                    as="span"
                    className="pl-1 xs:text-[14px]! s:text-[18px]! m:text-[18px]!"
                  >
                    {faq.question}
                  </Typography>
                </div>

                <ChevronIcon
                  direction={isOpen ? 'up' : 'down'}
                  size="lg"
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300"
                />
              </button>

              <div
                id={panelId}
                aria-labelledby={triggerId}
                aria-hidden={!isOpen}
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="mt-2.5 text-left">
                    <Typography
                      variant="subtitle4.2"
                      as="p"
                      className="leading-relaxed text-gray-400 whitespace-pre-line xs:text-[14px]! s:text-[18px]! m:text-[18px]!"
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
