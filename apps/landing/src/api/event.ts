import type { eventItems } from '../types/event'
import { fetcher } from '@gdg/utils'

// 실제 API 연결 시 요청 주소와 응답 변환을 이 파일에서 변경합니다.
const EVENTS_URL = '/events.json'

export function getEvents(signal?: AbortSignal): Promise<eventItems | null> {
  return fetcher<eventItems>(
    EVENTS_URL,
    '이벤트 정보를 불러오지 못했습니다.',
    signal,
    (data, url) => ({
      ...data,
      items: data.items.map((event) => ({
        ...event,
        image: event.image ? new URL(event.image, url).href : null,
      })),
    }),
  )
}
