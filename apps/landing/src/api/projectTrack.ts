import type {
  ProjectTrackActivity,
  ProjectTrackCourse,
  ProjectTrackProject,
  ProjectTrackRepository,
  ProjectTrackSemester,
  ProjectTracksResponse,
} from '../types/projectTrack'
import { api } from './client'

const PROJECT_TRACKS_URL = 'project-tracks.json'

const COURSE_NAMES = {
  MISSION: '미션 코스',
  PLANNING: '기획 코스',
  DEVELOPMENT: '개발 코스',
}

interface CourseEntry extends ProjectTrackActivity {
  type: keyof typeof COURSE_NAMES
  displayOrder: number
}

interface SemesterEntry extends Omit<ProjectTrackSemester, 'courses'> {
  courses: CourseEntry[]
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

function isHttpUrl(value: unknown, base?: URL): value is string {
  if (typeof value !== 'string' || value.trim() === '') return false

  try {
    const { protocol } = new URL(value, base)
    return protocol === 'https:' || protocol === 'http:'
  } catch {
    return false
  }
}

function isRepository(value: unknown): value is ProjectTrackRepository {
  return (
    isRecord(value) &&
    (value.type === 'FE' || value.type === 'BE' || value.type === 'AI') &&
    (value.url === null || isHttpUrl(value.url))
  )
}

function isProjectTrackProject(value: unknown, responseUrl: URL): value is ProjectTrackProject {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.description === 'string' &&
    typeof value.team === 'string' &&
    isStringArray(value.members) &&
    (value.imageUrl === null || isHttpUrl(value.imageUrl, responseUrl)) &&
    Array.isArray(value.repositories) &&
    value.repositories.every(isRepository) &&
    new Set(value.repositories.map(({ type, url }) => `${type}:${url ?? ''}`)).size ===
      value.repositories.length
  )
}

function isCourseEntry(value: unknown): value is CourseEntry {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.online === 'boolean' &&
    typeof value.description === 'string' &&
    typeof value.type === 'string' &&
    Object.hasOwn(COURSE_NAMES, value.type) &&
    typeof value.displayOrder === 'number' &&
    Number.isSafeInteger(value.displayOrder) &&
    value.displayOrder >= 0
  )
}

function isSemesterEntry(value: unknown, responseUrl: URL): value is SemesterEntry {
  return (
    isRecord(value) &&
    typeof value.semester === 'string' &&
    /^\d{4}-[12]$/.test(value.semester) &&
    typeof value.coordinator === 'string' &&
    isStringArray(value.mentors) &&
    Array.isArray(value.projects) &&
    value.projects.every((project) => isProjectTrackProject(project, responseUrl)) &&
    new Set(value.projects.map((project) => project.id)).size === value.projects.length &&
    Array.isArray(value.courses) &&
    value.courses.every(isCourseEntry) &&
    new Set(value.courses.map((course) => course.id)).size === value.courses.length
  )
}

function groupCourses(entries: CourseEntry[]): ProjectTrackCourse[] {
  return Object.entries(COURSE_NAMES).flatMap(([type, name]) => {
    const activities = entries
      .filter((entry) => entry.type === type)
      .sort((a, b) => a.displayOrder - b.displayOrder)

    return activities.length ? [{ name, activities }] : []
  })
}

export async function getProjectTracks(signal?: AbortSignal): Promise<ProjectTracksResponse> {
  const data = await api.get<unknown>(PROJECT_TRACKS_URL, { signal })
  const responseUrl = new URL(
    `${import.meta.env.BASE_URL}${PROJECT_TRACKS_URL}`,
    window.location.href,
  )
  if (
    !isRecord(data) ||
    !Array.isArray(data.items) ||
    !data.items.every((item) => isSemesterEntry(item, responseUrl)) ||
    new Set(data.items.map((item) => item.semester)).size !== data.items.length
  ) {
    throw new Error('프로젝트 트랙 응답 형식이 올바르지 않습니다.')
  }
  const items = data.items
    .map((item) => ({
      ...item,
      projects: item.projects.map((project) => ({
        ...project,
        imageUrl: project.imageUrl ? new URL(project.imageUrl, responseUrl).href : null,
      })),
      courses: groupCourses(item.courses),
    }))
    .sort((a, b) => b.semester.localeCompare(a.semester))

  return { items }
}
