import type { HTMLAttributes } from 'react'
import { cn } from '@gdg/wowds/ui'
import { GithubIcon, InstagramIcon, LogoIcon } from '@gdg/wowds/icon'
import { Typography } from '@gdg/wowds/ui'
import { palette } from '@gdg/wowds/tokens'

export type FooterProps = HTMLAttributes<HTMLElement>

export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer
      className={cn('w-full py-20 px-7 bg-gray-50', 's:px-5', 'm:px-6', 'xl:px-20', className)}
      {...props}
    >
      <div className="flex w-full flex-row items-start gap-30 xs:flex-col xs:gap-15 s:flex-col s:gap-14 m:gap-25">
        <div className="flex flex-col w-49.25 h-31 items-start justify-between shrink-0">
          <div className="flex w-full h-8 items-center gap-2 shrink-0 self-stretch">
            <LogoIcon />
            <div className="flex items-center gap-1">
              <Typography
                variant="subtitle3.1"
                isEn
                style={{
                  color: palette.black,
                  fontWeight: 700,
                  lineHeight: '130%',
                  letterSpacing: '-0.33px',
                }}
              >
                GDG
              </Typography>
              <Typography
                variant="body2.3"
                isEn
                style={{
                  color: palette.black,
                  fontWeight: 500,
                  lineHeight: '130%',
                  letterSpacing: '-0.24px',
                }}
              >
                Hongik Univ.
              </Typography>
            </div>
          </div>

          {/* 이후 링크 연결 필요 */}
          <div className="flex flex-col items-start">
            <Typography variant="body2.3" className="xs:text-[14px]! s:text-[14px]! m:text-[14px]!">
              <a href="https://docs.gdghongik.com/onboarding" className="underline">
                학회소개
              </a>
            </Typography>
            <Typography variant="body2.3" className="xs:text-[14px]! s:text-[14px]! m:text-[14px]!">
              <a
                href="https://docs.gdghongik.com/onboard-guide/community-rule"
                className="underline"
              >
                GDG 홍익대학교 회칙
              </a>
            </Typography>
            <Typography variant="body2.3" className="xs:text-[14px]! s:text-[14px]! m:text-[14px]!">
              <a
                href="https://docs.gdghongik.com/onboard-guide/community-guideline"
                className="underline"
              >
                GDG 홍익대학교 가이드라인
              </a>
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-5 items-start self-stretch">
          <div className="flex flex-row items-center gap-2">
            <a
              href="https://github.com/gdg-hongik-univ"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GithubIcon size="lg" />
            </a>
            <a
              href="https://www.instagram.com/gdg.hongikuniv/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon size="lg" />
            </a>
          </div>

          <div className="flex w-full flex-col">
            <div className="flex flex-col items-start text-start">
              <Typography
                variant="caption1.3"
                className="xs:text-[12px]! s:text-[12px]! m:text-[12px]!"
              >
                와우디벨로퍼스 | 서울특별시 동작구 상도로53길 8, 325동 606호
              </Typography>
              <Typography
                variant="caption1.3"
                className="xs:text-[12px]! s:text-[12px]! m:text-[12px]!"
              >
                대표 박유빈 | 전화 010-5938-0188 | 사업자등록번호 <br className="hidden xs:block" />
                311-82-77953
              </Typography>
              <Typography
                variant="caption1.3"
                className="xs:text-[12px]! s:text-[12px]! m:text-[12px]!"
              >
                <div className="flex flex-wrap items-center gap-1">
                  <a
                    href="https://docs.gdghongik.com/wowdevelopers/privacy-policy"
                    className="transition-colors"
                  >
                    개인정보처리방침
                  </a>
                  <p> | </p>
                  <a
                    href="https://docs.gdghongik.com/wowdevelopers/term-of-use"
                    className="transition-colors"
                  >
                    이용약관
                  </a>
                  <p> | </p>
                  <a
                    href="https://docs.gdghongik.com/wowdevelopers/refund"
                    className="transition-colors"
                  >
                    환불정책
                  </a>
                </div>
              </Typography>
              <Typography
                variant="caption1.3"
                className="xs:text-[12px]! s:text-[12px]! m:text-[12px]!"
              >
                © 2026. 와우디벨로퍼스 all Rights Reserved.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
