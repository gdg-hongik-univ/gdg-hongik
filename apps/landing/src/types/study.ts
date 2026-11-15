export interface regularStudyType {
  semester: string
  items: studyItem[]
}

export interface studyItem {
  id: string
  name: string
  mentors: string[]
  thumbnail: string | null
}

export type StudyFormat = 'offline' | 'online' | 'assignment'

export interface StudyDetail {
  id: string
  name: string
  mentors: string[]
  format: StudyFormat
  introductionUrl: string | null
}

export interface StudySemester {
  semester: string
  studies: StudyDetail[]
}

export interface StudyDetailResponse {
  items: StudySemester[]
}
