import type { regularStudyType } from '../types/study'
import { fetcher } from '@gdg/utils'

// 실제 API 연결 시 요청 주소와 응답 변환을 이 파일에서 변경합니다.
const STUDIES_URL = '/studies.json'

export function getStudies(signal?: AbortSignal): Promise<regularStudyType | null> {
  return fetcher<regularStudyType>(
    STUDIES_URL,
    '스터디 정보를 불러오지 못했습니다.',
    signal,
    (data, url) => ({
      ...data,
      items: data.items.map((study) => ({
        ...study,
        thumbnail: study.thumbnail ? new URL(study.thumbnail, url).href : null,
      })),
    }),
  )
}
