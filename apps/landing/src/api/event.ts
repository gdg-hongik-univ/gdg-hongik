import type { eventItems } from '../types/event'
import { api } from './client'

// 실제 API 연결 시 요청 주소와 응답 변환을 이 파일에서 변경합니다.
const EVENTS_URL = 'events.json'

export async function getEvents(signal?: AbortSignal): Promise<eventItems> {
  const data = await api.get<eventItems>(EVENTS_URL, { signal })
  if (!data) throw new Error('이벤트 응답이 비어 있습니다.')

  const responseUrl = new URL(`${import.meta.env.BASE_URL}${EVENTS_URL}`, window.location.href)
  return {
    ...data,
    items: data.items.map((event) => ({
      ...event,
      image: event.image ? new URL(event.image, responseUrl).href : null,
    })),
  }
}
