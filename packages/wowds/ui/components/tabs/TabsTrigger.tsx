import { useContext, type ComponentPropsWithRef, type KeyboardEvent, type MouseEvent } from 'react'
import { TabsContext } from './context/Context'
import { cn } from '../../utils/cn'

export interface TabsTriggerProps extends ComponentPropsWithRef<'button'> {
  value: string
}

export const TabsTrigger = ({
  value,
  children,
  className,
  ref,
  onClick,
  onKeyDown,
  ...props
}: TabsTriggerProps) => {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tabs.Trigger는 Tabs 내부에서만 사용되어야 합니다.')

  const { activeTab, setActiveTab, baseId } = context
  const isActive = activeTab === value
  const isDisabled = props.disabled

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (!event.defaultPrevented) {
      setActiveTab(value)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return

    const keyDirection = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    }[event.key]
    const isHomeKey = event.key === 'Home'
    const isEndKey = event.key === 'End'

    if (keyDirection === undefined && !isHomeKey && !isEndKey) return

    const tabList = event.currentTarget.closest('[role="tablist"]')
    const triggers = Array.from(
      tabList?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') ?? [],
    )
    if (triggers.length === 0) return

    event.preventDefault()

    const currentIndex = triggers.indexOf(event.currentTarget)
    const nextIndex =
      keyDirection === undefined
        ? isHomeKey
          ? 0
          : triggers.length - 1
        : (currentIndex + keyDirection + triggers.length) % triggers.length
    const nextTrigger = triggers[nextIndex]
    const nextValue = nextTrigger?.dataset.value

    if (!nextTrigger || !nextValue) return

    setActiveTab(nextValue)
    nextTrigger.focus()
  }

  return (
    <button
      ref={ref}
      {...props}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${value}`}
      id={`${baseId}-tab-${value}`}
      tabIndex={isActive && !isDisabled ? 0 : -1}
      data-value={value}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'm-0 -mb-[2px] px-4 py-3.5 bg-transparent border-t-0 border-x-0 border-solid rounded-none appearance-none cursor-pointer outline-none',
        'border-b-2 border-gray-100 font-semibold text-gray-300 transition-all',
        isActive && 'border-black text-black',
        isDisabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      {children}
    </button>
  )
}
