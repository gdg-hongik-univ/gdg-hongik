import PartCardContent from './PartCardContent'
import type { PartName } from './PartCardContent'
import type { PartStudyWeek } from '../../types/partStudy'

interface PartCardProps {
  selectedPart: PartName
  onSelectPart: (part: PartName) => void
  semester: string
  activities: PartStudyWeek[]
}

export default function BackendCard(props: PartCardProps) {
  return <PartCardContent {...props} part="BACKEND" />
}
