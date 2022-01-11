import { CycledPropsObject, Descriptions } from './index'

export interface SectionProps {
  index: number
  labelKey: string
}

export interface SubSectionProps extends SectionProps {
  anchor: string
  descriptions: Descriptions
  name: string
  showTitle: boolean
}

export interface Section extends CycledPropsObject<SectionProps> {
  subSections?: Array<SubSection>
}

export type SubSection = CycledPropsObject<SubSectionProps>
// assessmentId: number
// children?: Record<string, AssessmentSectionItem>
// tableSections?: Array<TableSection>
// dataExport: boolean // if it's included in data export
