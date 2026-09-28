import { useContext, type ComponentPropsWithRef, type ReactNode } from 'react'
import { TabsContext } from './context/Context'
import { cn } from '../../utils/cn'

export interface TabsDetailProps extends Omit<ComponentPropsWithRef<'button'>, 'onClick'> {
  endIcon?: ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, activeTab: string) => void
}

export const TabsDetail = ({
  children = '자세히 보기',
  endIcon,
  className,
  ref,
  onClick,
  type = 'button',
  ...props
}: TabsDetailProps) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tabs.Detail은 Tabs 내부에서만 사용되어야 합니다.')

  const { activeTab } = context

  return (
    <button
      ref={ref}
      type={type}
      data-active-value={activeTab}
      onClick={(e) => onClick?.(e, activeTab)}
      className={cn(
        'm-0 ml-auto flex items-center justify-center gap-1 bg-transparent border-0 appearance-none cursor-pointer whitespace-nowrap',
        'px-4 py-3.5 border-gray-100 font-semibold text-gray-300 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
        className,
      )}
      {...props}
    >
      {children}
      {endIcon != null && (
        <span aria-hidden="true" className="inline-flex shrink-0 items-center">
          {endIcon}
        </span>
      )}
    </button>
  )
}
