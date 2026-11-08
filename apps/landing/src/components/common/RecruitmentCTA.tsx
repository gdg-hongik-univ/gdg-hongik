import CTAButton, { type CTAButtonProps } from './CTAButton'

interface RecruitmentCTAProps extends Pick<CTAButtonProps, 'property' | 'className' | 'onClick'> {
  isRecruiting: boolean | null
  closedLabel: string
}

export function RecruitmentCTA({ isRecruiting, closedLabel, ...buttonProps }: RecruitmentCTAProps) {
  const isLoading = isRecruiting === null

  return (
    <CTAButton {...buttonProps} disabled={isLoading} aria-busy={isLoading}>
      {isLoading ? '모집 정보 확인 중' : isRecruiting ? 'GDG 가입하러 가기' : closedLabel}
    </CTAButton>
  )
}
