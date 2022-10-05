import { CycledPropsObject, Descriptions } from './index'

export interface SectionProps {
  index: number
  labelKey: string
}

export interface SubSectionProps extends SectionProps {
  anchor?: string
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
