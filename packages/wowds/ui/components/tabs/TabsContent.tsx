import { useContext, type ComponentPropsWithRef } from 'react'
import { TabsContext } from './context/Context'
import { cn } from '../../utils/cn'

export interface TabsContentProps extends ComponentPropsWithRef<'div'> {
  value: string
}

export const TabsContent = ({ value, children, className, ref, ...props }: TabsContentProps) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tabs.Content는 Tabs 내부에서만 사용되어야 합니다.')

  const { activeTab, baseId } = context
  const isActive = activeTab === value

  if (!isActive) return null

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={cn('w-full flex flex-start pt-9 outline-none', className)}
      {...props}
    >
      {children}
    </div>
  )
}
