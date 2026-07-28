import { type ComponentPropsWithRef } from 'react'
import { cn } from '../../utils/cn'

export type TabsListProps = ComponentPropsWithRef<'div'>

export const TabsList = ({ children, className, ref, ...props }: TabsListProps) => {
  return (
    <div
      ref={ref}
      role="tablist"
      aria-orientation="horizontal"
      className={cn('flex m-0 border-b-2 border-gray-100 w-full', className)}
      {...props}
    >
      {children}
    </div>
  )
}
