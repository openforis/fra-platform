import { CycledPropsObject, CycleUuid } from './cycle'
import { Descriptions } from './description'
import { Label } from './label'

export type SectionName = string

export enum SectionNames {
  'contactPersons' = 'contactPersons',
  'contacts' = 'contacts',
  'originalDataPoints' = 'originalDataPoints',
}

export interface SectionProps {
  anchors: Record<CycleUuid, string> // anchor by cycle uuid
  index: number
  labels: Record<CycleUuid, Label>
}

export type SubSectionHints = {
  definitions?: boolean
  faqs?: boolean
  notes?: boolean
}

export interface SubSectionProps extends SectionProps {
  dataExport?: boolean
  descriptions: Descriptions
  hidden?: Record<CycleUuid, boolean>
  hints?: Record<CycleUuid, SubSectionHints>
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
