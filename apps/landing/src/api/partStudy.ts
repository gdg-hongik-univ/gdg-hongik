import type { PartStudyData } from '../types/partStudy'
import { api } from './client'

const PART_STUDY_URL = 'part-study.json'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isPartStudyData = (data: unknown): data is PartStudyData => {
  if (
    !isRecord(data) ||
    !Array.isArray(data.semesters) ||
    !data.semesters.every((semester) => typeof semester === 'string') ||
    !Array.isArray(data.curriculum)
  ) {
    return false
  }

  return data.curriculum.every(
    (week) =>
      isRecord(week) &&
      typeof week.week === 'string' &&
      Array.isArray(week.items) &&
      week.items.every(
        (item) =>
          isRecord(item) &&
          typeof item.title === 'string' &&
          typeof item.description === 'string' &&
          (item.featured === undefined || typeof item.featured === 'boolean'),
      ),
  )
}

export async function getPartStudy(signal?: AbortSignal): Promise<PartStudyData> {
  const data = await api.get<unknown>(PART_STUDY_URL, { signal })
  if (!isPartStudyData(data)) {
    throw new Error('파트 스터디 응답 형식이 올바르지 않습니다.')
  }

  return data
}
