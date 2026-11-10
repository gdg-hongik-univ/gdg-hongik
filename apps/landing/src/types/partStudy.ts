export interface PartStudyItem {
  title: string
  description: string
  featured?: boolean
}

export interface PartStudyWeek {
  week: string
  items: PartStudyItem[]
}

export interface PartStudyData {
  semesters: string[]
  curriculum: PartStudyWeek[]
}
