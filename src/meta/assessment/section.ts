import { CycledPropsObject, CycleUuid } from './cycle'
import { Descriptions } from './description'
import { Label } from './label'

export interface SectionProps {
  anchors: Record<CycleUuid, string> // anchor by cycle uuid
  index: number
  labels: Record<CycleUuid, Label>
}

export interface SubSectionProps extends SectionProps {
  descriptions: Descriptions
  name: string
  showTitle: boolean
  dataExport?: boolean
}

export interface Section extends CycledPropsObject<SectionProps> {
  subSections?: Array<SubSection>
  parentId?: null
}

export interface SubSection extends CycledPropsObject<SubSectionProps> {
  parentId?: number
}
