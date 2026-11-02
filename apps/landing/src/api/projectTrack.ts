import type { ProjectTrackSemester, ProjectTracksResponse } from '../types/projectTrack'
import { api } from './client'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

function isProjectTrackSemester(value: unknown): value is ProjectTrackSemester {
  return (
    isRecord(value) &&
    typeof value.semester === 'string' &&
    /^\d{4}-[12]$/.test(value.semester) &&
    typeof value.coordinator === 'string' &&
    isStringArray(value.mentors) &&
    Array.isArray(value.projects) &&
    value.projects.every(
      (project) =>
        isRecord(project) &&
        typeof project.id === 'string' &&
        typeof project.name === 'string' &&
        typeof project.description === 'string' &&
        typeof project.team === 'string' &&
        isStringArray(project.members) &&
        isStringArray(project.repositories),
    ) &&
    new Set(value.projects.map((project) => project.id)).size === value.projects.length &&
    Array.isArray(value.courses) &&
    value.courses.every(
      (course) =>
        isRecord(course) &&
        typeof course.name === 'string' &&
        Array.isArray(course.activities) &&
        course.activities.every(
          (activity) =>
            isRecord(activity) &&
            typeof activity.name === 'string' &&
            typeof activity.online === 'boolean' &&
            typeof activity.description === 'string',
        ),
    )
  )
}

export async function getProjectTracks(signal?: AbortSignal): Promise<ProjectTracksResponse> {
  const data = await api.get<unknown>('project-tracks.json', { signal })
  if (
    !isRecord(data) ||
    !Array.isArray(data.items) ||
    !data.items.every(isProjectTrackSemester) ||
    new Set(data.items.map((item) => item.semester)).size !== data.items.length
  ) {
    throw new Error('프로젝트 트랙 응답 형식이 올바르지 않습니다.')
  }
  return { items: data.items }
}
