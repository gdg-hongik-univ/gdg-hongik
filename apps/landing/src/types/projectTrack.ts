export interface ProjectTrackRepository {
  type: 'FE' | 'BE' | 'AI'
  url: string | null
}

export interface ProjectTrackProject {
  id: string
  name: string
  description: string
  team: string
  members: string[]
  imageUrl: string | null
  repositories: ProjectTrackRepository[]
}

export interface ProjectTrackActivity {
  id: string
  name: string
  online: boolean
  description: string
}

export interface ProjectTrackCourse {
  name: string
  activities: ProjectTrackActivity[]
}

export interface ProjectTrackSemester {
  semester: string
  coordinator: string
  mentors: string[]
  projects: ProjectTrackProject[]
  courses: ProjectTrackCourse[]
}

export interface ProjectTracksResponse {
  items: ProjectTrackSemester[]
}
