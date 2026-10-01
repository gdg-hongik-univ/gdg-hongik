export interface regularStudyType {
  semester: string
  items: studyItem[]
}

export interface studyItem {
  id: string
  name: string
  mentors: string[]
  thumbnail: string
}
