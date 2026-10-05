import { KakaotalkIcon, InstagramIcon } from '@gdg/wowds/icon'
import { Typography } from '@gdg/wowds'
import { CalendarGraphic } from './CalendarGraphic'
import { CalendarGraphicMobile } from './CalendarGraphicMobile'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export const RecruitmentNoticeModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative rounded-[20px] bg-white pt-22 px-18 pb-16 xs:pt-16 xs:px-8 xs:pb-11 s:px-14"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-8 right-8 xs:top-5 xs:right-5"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M8.53366 25.3307L6.66699 23.4641L14.1337 15.9974L6.66699 8.53073L8.53366 6.66406L16.0003 14.1307L23.467 6.66406L25.3337 8.53073L17.867 15.9974L25.3337 23.4641L23.467 25.3307L16.0003 17.8641L8.53366 25.3307Z"
              fill="#8A949E"
            />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-4 xs:gap-2">
            <Typography
              variant="title2.1"
              className="xs:text-[22px]! s:text-[28px]! m:text-[28px]!"
            >
              지금은 모집 기간이 아니에요
            </Typography>

            <Typography
              variant="subtitle4.3"
              className="text-gray-600 xs:text-[14px]! s:text-[18px]! m:text-[18px]!"
            >
              가입 기간이 아니어도 다음 채널에서 모집 일정과
              <br />
              GDG 소식을 확인할 수 있어요.
            </Typography>
          </div>

          <div className="flex justify-center mt-11 xs:mt-7">
            <div className="hidden xs:block">
              <CalendarGraphicMobile />
            </div>
            <div className="xs:hidden">
              <CalendarGraphic />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-16 xs:gap-3 xs:mt-8">
            <InstagramIcon className="xs:hidden" size="xl" />
            <InstagramIcon className="hidden xs:block" size="xs" />
            <KakaotalkIcon className="xs:hidden" size="xl" />
            <KakaotalkIcon className="hidden xs:block" size="xs" />
          </div>
        </div>
      </div>
    </div>
  )
}
