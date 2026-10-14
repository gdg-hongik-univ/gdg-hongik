import type { EventItem } from '../types/upcomingEvents'
import { parseEventDate } from './eventDate'

const TIMELINE_EVENT_COUNT = 5
const TIMELINE_CENTER_INDEX = 2

export const selectTimelineEvents = (events: EventItem[], today: Date) => {
  const scheduledEvents = events
    .filter((event) => event.image === null)
    .sort((a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime())

  const nextEventIndex = scheduledEvents.findIndex((event) => parseEventDate(event.date) >= today)

  if (nextEventIndex === -1) {
    return {
      nextEventId: null,
      timelineEvents: scheduledEvents.slice(-TIMELINE_EVENT_COUNT),
    }
  }

  const maxStartIndex = Math.max(0, scheduledEvents.length - TIMELINE_EVENT_COUNT)
  const startIndex = Math.min(Math.max(0, nextEventIndex - TIMELINE_CENTER_INDEX), maxStartIndex)

  return {
    nextEventId: scheduledEvents[nextEventIndex].id,
    timelineEvents: scheduledEvents.slice(startIndex, startIndex + TIMELINE_EVENT_COUNT),
  }
}

export const getSemesterLabel = (
  timelineEvents: EventItem[],
  nextEventId: string | null,
  today: Date,
) => {
  const nextEvent = timelineEvents.find((event) => event.id === nextEventId)
  const date = nextEvent ? parseEventDate(nextEvent.date) : today
  const semester = date.getMonth() < 6 ? 1 : 2

  return `${date.getFullYear()}년 ${semester}학기 예정 일정`
}
