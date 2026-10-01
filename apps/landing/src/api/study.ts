import type { regularStudyType } from '../types/study'

// 실제 API 연결 시 요청 주소와 응답 변환을 이 파일에서 변경합니다.
const STUDIES_URL = '/studies.json'

export async function getStudies(signal?: AbortSignal): Promise<regularStudyType> {
  const response = await fetch(STUDIES_URL, { signal })

  if (!response.ok) {
    throw new Error(`스터디 정보를 불러오지 못했습니다. (${response.status})`)
  }

  const data: regularStudyType = await response.json()

  return {
    ...data,
    items: data.items.map((study) => ({
      ...study,
      thumbnail: new URL(study.thumbnail, response.url).href,
    })),
  }
}
