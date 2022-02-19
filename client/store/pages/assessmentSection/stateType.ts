import { TableSection } from '@meta/assessment'
import { TableData } from '@meta/data'

export type AssessmentSectionState = {
  data?: Record<string, TableData>
  tableSections?: Array<TableSection>
}
