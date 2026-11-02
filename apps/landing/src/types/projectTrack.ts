export interface ProjectTrackProject {
  id: string
  name: string
  description: string
  team: string
  members: string[]
  repositories: string[]
}

export interface ProjectTrackCourse {
  name: string
  activities: {
    name: string
    online: boolean
    description: string
  }[]
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
