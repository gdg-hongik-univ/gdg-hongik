import { type PointerEvent, useEffect, useRef, useState } from 'react'

type UseUpcomingEventTimelineParams = {
  nextEventId: string | null
}

const scrollEventToCenter = (
  container: HTMLDivElement,
  eventElement: HTMLLIElement,
  behavior: ScrollBehavior,
) => {
  container.scrollTo({
    left: eventElement.offsetLeft - container.clientWidth / 2 + eventElement.offsetWidth / 2,
    behavior,
  })
}

export const useUpcomingEventTimeline = ({ nextEventId }: UseUpcomingEventTimelineParams) => {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null)
  const [hasViewedEventDetails, setHasViewedEventDetails] = useState(false)
  const [hasTimelineEnteredViewport, setHasTimelineEnteredViewport] = useState(false)
  const [isTimelineAnimationComplete, setIsTimelineAnimationComplete] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const eventElementsRef = useRef(new Map<string, HTMLLIElement>())
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    const nextEventElement = nextEventId ? eventElementsRef.current.get(nextEventId) : null

    if (!container || !nextEventElement) return

    const centerNextEvent = () => scrollEventToCenter(container, nextEventElement, 'auto')

    centerNextEvent()

    const resizeObserver = new ResizeObserver(centerNextEvent)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [nextEventId])

  useEffect(() => {
    const container = scrollContainerRef.current
    const expandedEventElement = expandedEventId
      ? eventElementsRef.current.get(expandedEventId)
      : null

    if (!container || !expandedEventElement) return

    const containerBounds = container.getBoundingClientRect()
    const expandedEventBounds =
      expandedEventElement.firstElementChild?.getBoundingClientRect() ??
      expandedEventElement.getBoundingClientRect()

    if (
      expandedEventBounds.left >= containerBounds.left &&
      expandedEventBounds.right <= containerBounds.right
    ) {
      return
    }

    scrollEventToCenter(container, expandedEventElement, 'smooth')
  }, [expandedEventId])

  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setHasTimelineEnteredViewport(true)
        observer.disconnect()
      },
      { threshold: 0.2 },
    )

    observer.observe(timeline)
    return () => observer.disconnect()
  }, [])

  const getEventInteractionProps = (eventId: string, isPast: boolean) => {
    const showEventDetails = () => {
      if (isPast) return
      setExpandedEventId(eventId)
      setHasViewedEventDetails(true)
    }

    return {
      tabIndex: isPast ? -1 : 0,
      onPointerEnter: (pointerEvent: PointerEvent<HTMLDivElement>) => {
        if (pointerEvent.pointerType === 'mouse') showEventDetails()
      },
      onPointerLeave: (pointerEvent: PointerEvent<HTMLDivElement>) => {
        if (pointerEvent.pointerType === 'mouse') setExpandedEventId(null)
      },
      onPointerUp: (pointerEvent: PointerEvent<HTMLDivElement>) => {
        if (pointerEvent.pointerType !== 'mouse') showEventDetails()
      },
      onFocus: showEventDetails,
      onBlur: () => setExpandedEventId(null),
    } as const
  }

  const registerEventElement = (eventId: string, element: HTMLLIElement | null) => {
    if (element) eventElementsRef.current.set(eventId, element)
    else eventElementsRef.current.delete(eventId)
  }

  return {
    markTimelineAnimationComplete: () => setIsTimelineAnimationComplete(true),
    expandedEventId,
    getEventInteractionProps,
    hasTimelineEnteredViewport,
    isInteractionHintHidden: hasViewedEventDetails && isTimelineAnimationComplete,
    registerEventElement,
    scrollContainerRef,
    timelineRef,
  }
}
