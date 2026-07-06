import { useState, useId, type ComponentPropsWithRef } from 'react'
import { TabsContext } from './context/Context'
import { cn } from '../../utils/cn'

export interface TabsProps extends ComponentPropsWithRef<'div'> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

export const TabsRoot = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
  ref,
  ...props
}: TabsProps) => {
  const baseId = useId()
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '')
  const isControlled = controlledValue !== undefined
  const activeTab = isControlled ? controlledValue : uncontrolledValue

  const handleTabChange = (newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange, baseId }}>
      <div ref={ref} className={cn('w-full flex flex-col', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}
