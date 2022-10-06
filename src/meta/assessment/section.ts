import { CycledPropsObject, Descriptions, Label } from './index'

export interface SectionProps {
  index: number
  labelKey?: string
  labels: Record<string, Label>
}

export interface SubSectionProps extends SectionProps {
  anchors: Record<string, string> // anchor by cycle uuid
  descriptions: Descriptions
  name: string
  showTitle: boolean
  dataExport?: boolean
}

export interface Section extends CycledPropsObject<SectionProps> {
  subSections?: Array<SubSection>
}

export type SubSection = CycledPropsObject<SubSectionProps>
