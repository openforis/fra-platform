import { CycleUuid } from 'meta/assessment/cycle'
import { CycledPropsObject } from 'meta/assessment/cycledObject'
import { Descriptions } from 'meta/assessment/description'
import { Label } from 'meta/assessment/label'
import { UUID } from 'meta/uuid/uuid'

export type SectionName = string

export enum SectionNames {
  // == Custom section names
  chat = 'chat', // 1 to 1 messages
  contactPersons = 'contactPersons',
  contacts = 'contacts',
  extentOfForest = 'extentOfForest',
  forestCharacteristics = 'forestCharacteristics',
  messageBoard = 'messageBoard', // country message board
  nationalDataPoint = 'nationalDataPoint',
  originalDataPoints = 'originalDataPoints',
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
  parentUuid?: null
}

export interface SubSection extends CycledPropsObject<SubSectionProps> {
  parentUuid?: UUID
}
