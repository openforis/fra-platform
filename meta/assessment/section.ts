import { CycledPropsObject, Descriptions, TableSection } from './index'

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
