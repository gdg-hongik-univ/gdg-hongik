import { useContext, type ComponentPropsWithRef } from 'react'
import { TabsContext } from './context/Context'
import { cn } from '../../utils/cn'

export interface TabsDetailProps extends Omit<ComponentPropsWithRef<'button'>, 'onClick'> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, activeTab: string) => void
}

export const TabsDetail = ({
  children = '자세히 보기',
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
        'ml-auto m-0 flex items-center justify-center bg-transparent border-0 appearance-none cursor-pointer outline-none whitespace-nowrap',
        'px-4 py-3.5 border-solid border-b-2 border-gray-100 font-semibold text-gray-300 hover:text-black transition-all',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
