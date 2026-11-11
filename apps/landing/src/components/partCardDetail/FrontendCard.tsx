import PartCardContent from './PartCardContent'
import type { PartName } from './PartCardContent'
import type { PartStudyWeek } from '../../types/partStudy'

interface PartCardProps {
  selectedPart: PartName
  onSelectPart: (part: PartName) => void
  semester: string
  activities: PartStudyWeek[]
}

export default function FrontendCard(props: PartCardProps) {
  return <PartCardContent {...props} part="FRONTEND" />
}
