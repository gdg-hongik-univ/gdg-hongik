import { useContext, type ComponentPropsWithRef } from 'react'
import { TabsContext } from './context/Context'
import { cn } from '../../utils/cn'

export interface TabsTriggerProps extends ComponentPropsWithRef<'button'> {
  value: string
}

export const TabsTrigger = ({ value, children, className, ref, ...props }: TabsTriggerProps) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tabs.Trigger는 Tabs 내부에서만 사용되어야 합니다.')

  const { activeTab, setActiveTab, baseId } = context
  const isActive = activeTab === value

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${value}`}
      id={`${baseId}-tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActiveTab(value)}
      className={cn(
        'm-0 -mb-[2px] px-4 py-3.5 bg-transparent border-t-0 border-x-0 border-solid rounded-none appearance-none cursor-pointer outline-none',
        'border-b-2 border-gray-100 font-semibold text-gray-300 transition-all',
        isActive && 'border-black text-black',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
