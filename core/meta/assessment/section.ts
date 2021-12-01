import { CycledPropsObject } from '@core/meta/assessment/cycle'
import { Descriptions } from '@core/meta/assessment/description'
// import { AssessmentSectionItem } from '@core/assessment/assessment'
import { TableSection } from '@core/meta/assessment/tableSection'

export interface SectionProps {
  anchor: string
  descriptions: Descriptions
  index: number
  labelKey: string
  name: string
  showTitle: boolean
}

export interface Section extends CycledPropsObject<SectionProps> {
  assessmentId: number
  // children?: Record<string, AssessmentSectionItem>
  tableSections?: Array<TableSection>
  // dataExport: boolean // if it's included in data export
}
