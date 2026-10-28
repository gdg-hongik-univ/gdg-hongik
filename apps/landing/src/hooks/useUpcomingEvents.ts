import { useEffect, useState } from 'react'
import type { EventItem, EventsLoadState, EventsResponse } from '../types/upcomingEvents'
import { getStartOfToday } from '../utils/eventDate'
import { getSemesterLabel, selectTimelineEvents } from '../utils/upcomingEvents'
import { api } from '../api/client'

export const useUpcomingEvents = () => {
  const [events, setEvents] = useState<EventItem[]>([])
  const [eventsLoadState, setEventsLoadState] = useState<EventsLoadState>('loading')
  const [today] = useState(getStartOfToday)

  useEffect(() => {
    const controller = new AbortController()

    const loadEvents = async () => {
      try {
        const eventsResponse = await api.get<EventsResponse>('events.json', {
          signal: controller.signal,
        })
        if (controller.signal.aborted) return
        if (!eventsResponse) throw new Error('이벤트 응답이 비어 있습니다.')
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
