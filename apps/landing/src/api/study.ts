import type { regularStudyType } from '../types/study'
import { api } from './client'

// 실제 API 연결 시 요청 주소와 응답 변환을 이 파일에서 변경합니다.
const STUDIES_URL = 'studies.json'

export async function getStudies(signal?: AbortSignal): Promise<regularStudyType> {
  const data = await api.get<regularStudyType>(STUDIES_URL, { signal })
  if (!data) throw new Error('스터디 응답이 비어 있습니다.')

  const responseUrl = new URL(`${import.meta.env.BASE_URL}${STUDIES_URL}`, window.location.href)
  return {
    ...data,
    items: data.items.map((study) => ({
      ...study,
      thumbnail: study.thumbnail ? new URL(study.thumbnail, responseUrl).href : null,
    })),
  }
}
