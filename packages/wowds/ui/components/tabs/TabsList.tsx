import { type ComponentPropsWithRef } from 'react'
import { cn } from '../../utils/cn'

export interface TabsListProps extends ComponentPropsWithRef<'div'> {
  children: React.ReactNode
  className?: string
  ref?: React.RefObject<HTMLDivElement>
}

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
