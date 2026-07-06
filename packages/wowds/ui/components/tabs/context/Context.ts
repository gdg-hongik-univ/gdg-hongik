import { createContext } from 'react'

export interface TabsContextType {
  activeTab: string
  setActiveTab: (value: string) => void
  baseId: string
}

export const TabsContext = createContext<TabsContextType | null>(null)
