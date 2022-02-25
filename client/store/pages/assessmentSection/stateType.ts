import { TableSection } from '@meta/assessment'
import { TableData } from '@meta/data'

export type AssessmentSectionState = {
  data?: TableData
  tableSections?: Array<TableSection>
}
