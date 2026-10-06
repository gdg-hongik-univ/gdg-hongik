export type EventItem = {
  id: string
  name: string
  date: string
  description: string
  image: string | null
  emphasis: boolean
}

export type EventsResponse = {
  items: EventItem[]
}

export type EventsLoadState = 'loading' | 'success' | 'error'
export type UpcomingEventCardEmphasis = 'default' | 'strong'
export type UpcomingEventCardState = 'default' | 'active' | 'disabled'
