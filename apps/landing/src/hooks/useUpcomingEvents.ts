import { useEffect, useState } from 'react'
import type { EventItem, EventsLoadState, EventsResponse } from '../types/upcomingEvents'
import { getStartOfToday } from '../utils/eventDate'
import { getSemesterLabel, selectTimelineEvents } from '../utils/upcomingEvents'

export const useUpcomingEvents = () => {
  const [events, setEvents] = useState<EventItem[]>([])
  const [eventsLoadState, setEventsLoadState] = useState<EventsLoadState>('loading')
  const [today] = useState(getStartOfToday)

  useEffect(() => {
    const controller = new AbortController()

    const loadEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}events.json`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to load events: ${response.status}`)
        }

        const eventsResponse = (await response.json()) as EventsResponse
        setEvents(eventsResponse.items)
        setEventsLoadState('success')
      } catch {
        if (controller.signal.aborted) return
        setEventsLoadState('error')
      }
    }

    void loadEvents()
    return () => controller.abort()
  }, [])

  const { nextEventId, timelineEvents } = selectTimelineEvents(events, today)
  const semesterLabel = getSemesterLabel(timelineEvents, nextEventId, today)

  return { eventsLoadState, nextEventId, semesterLabel, timelineEvents, today }
}
