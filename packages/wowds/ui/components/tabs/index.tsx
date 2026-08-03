import { TabsRoot } from './TabsRoot'
import { TabsList } from './TabsList'
import { TabsTrigger } from './TabsTrigger'
import { TabsContent } from './TabsContent'
import { TabsDetail } from './TabsDetail'

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
  Detail: TabsDetail,
})

export type { TabsProps } from './TabsRoot'
export type { TabsListProps } from './TabsList'
export type { TabsTriggerProps } from './TabsTrigger'
export type { TabsContentProps } from './TabsContent'
export type { TabsDetailProps } from './TabsDetail'
