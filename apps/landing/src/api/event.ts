import type { eventItems } from '../types/event'

// 실제 API 연결 시 요청 주소와 응답 변환을 이 파일에서 변경합니다.
const EVENTS_URL = '/events.json'

export async function getEvents(signal?: AbortSignal): Promise<eventItems> {
  const response = await fetch(EVENTS_URL, { signal })

  if (!response.ok) {
    throw new Error(`이벤트 정보를 불러오지 못했습니다. (${response.status})`)
  }

  const data: eventItems = await response.json()

  return {
    ...data,
    items: data.items.map((event) => ({
      ...event,
      image: event.image ? new URL(event.image, response.url).href : null,
    })),
  }
}
