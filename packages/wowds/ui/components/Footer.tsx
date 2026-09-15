import type { HTMLAttributes } from 'react'
import { cn } from '../utils/cn'
import { GithubIcon, InstagramIcon, LogoIcon } from '../../icon/index'
import { Typography } from './Typography'
import { palette } from '../../tokens'

export type FooterProps = HTMLAttributes<HTMLElement>

export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer
      className={cn(
        'flex w-full self-stretch flex-col items-start gap-5 py-20 px-7 bg-gray-50',
        'xl:mx-auto xl:max-w-360 xl:self-auto xl:items-center xl:justify-center xl:px-20',
        className,
      )}
      {...props}
    >
      <div className="flex w-full max-w-7xl flex-col items-start gap-10 xl:flex-row xl:items-start xl:gap-30">
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

          <div className="flex flex-col items-start">
            <Typography variant="caption1.3" className="text-black md:text-[16px]!">
              <a href="" className="underline">
                학회소개
              </a>
            </Typography>
            <Typography variant="caption1.3" className="text-black md:text-[16px]!">
              <a href="" className="underline">
                GDG 홍익대학교 회칙
              </a>
            </Typography>
            <Typography variant="caption1.3" className="text-black md:text-[16px]!">
              <a href="" className="underline">
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
              className="hover:text-gray-900 transition-colors"
            >
              <GithubIcon size="lg" />
            </a>
            <a
              href="https://www.instagram.com/gdg.hongikuniv/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-gray-900 transition-colors"
            >
              <InstagramIcon size="lg" />
            </a>
          </div>

          <div className="flex w-full flex-col xl:max-w-7xl">
            <div className="flex flex-col items-start text-start">
              <Typography variant="caption2.3" className="text-black xl:text-[14px]!">
                와우디벨로퍼스 | 서울특별시 동작구 상도로53길 8, 325동 606호
              </Typography>
              <Typography variant="caption2.3" className="text-black xl:text-[14px]!">
                대표 박유빈 | 전화 010-5938-0188 | 사업자등록번호 <br className="md:hidden" />
                311-82-77953
              </Typography>
              <Typography variant="caption2.3" className="text-black xl:text-[14px]!">
                <div className="flex flex-wrap items-center gap-1">
                  <a href="" className="transition-colors">
                    개인정보처리방침
                  </a>
                  <p> | </p>
                  <a href="" className="transition-colors">
                    이용약관
                  </a>
                  <p> | </p>
                  <a href="" className="transition-colors">
                    규제정책
                  </a>
                </div>
              </Typography>
              <Typography variant="caption2.3" className="text-black xl:text-[14px]!">
                © 2026. 와우디벨로퍼스 all Rights Reserved.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
