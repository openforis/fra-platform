import { CycledPropsObject, CycleUuid } from './cycle'
import { Descriptions } from './description'
import { Label } from './label'

export type SectionName = string

export enum SectionNames {
  'contacts' = 'contacts',
  'contactPersons' = 'contactPersons',
}

export interface SectionProps {
  anchors: Record<CycleUuid, string> // anchor by cycle uuid
  index: number
  labels: Record<CycleUuid, Label>
}

export interface SubSectionProps extends SectionProps {
  dataExport?: boolean
  descriptions: Descriptions
  hidden?: boolean
  hints?: {
    definitions?: Record<CycleUuid, boolean>
    faqs?: Record<CycleUuid, boolean>
    notes?: Record<CycleUuid, boolean>
  }
  name: SectionName
  showTitle: boolean
}

export interface Section extends CycledPropsObject<SectionProps> {
  subSections?: Array<SubSection>
  parentId?: null
}

export interface SubSection extends CycledPropsObject<SubSectionProps> {
  parentId?: number
}
