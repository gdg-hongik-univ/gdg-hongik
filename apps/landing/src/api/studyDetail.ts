import type { StudyDetail, StudySemester, StudyDetailResponse } from '../types/study'
import { api } from './client'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

function isIntroductionUrl(value: unknown): value is string | null {
  if (value === null) return true
  if (typeof value !== 'string') return false

  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function isStudyDetail(value: unknown): value is StudyDetail {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    Array.isArray(value.mentors) &&
    value.mentors.every((mentor) => typeof mentor === 'string') &&
    (value.format === 'offline' || value.format === 'online' || value.format === 'assignment') &&
    isIntroductionUrl(value.introductionUrl)
  )
}

function isStudySemester(value: unknown): value is StudySemester {
  return (
    isRecord(value) &&
    typeof value.semester === 'string' &&
    /^\d{4}-[12]$/.test(value.semester) &&
    Array.isArray(value.studies) &&
    value.studies.every(isStudyDetail) &&
    new Set(value.studies.map((study) => study.id)).size === value.studies.length
  )
}

// 실제 API 연결 시 이 요청 주소와 응답 변환을 변경합니다.
export async function getStudyDetail(signal?: AbortSignal): Promise<StudyDetailResponse> {
  const data = await api.get<unknown>('study-detail.json', { signal })

  if (
    !isRecord(data) ||
    !Array.isArray(data.items) ||
    !data.items.every(isStudySemester) ||
    new Set(data.items.map((item) => item.semester)).size !== data.items.length
  ) {
    throw new Error('학기별 스터디 응답 형식이 올바르지 않습니다.')
  }

  return { items: data.items }
}
