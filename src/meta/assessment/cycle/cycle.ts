import { UUID } from 'meta/uuid'

export type CycleName = string
export type CycleUuid = string

export enum CycleStatus {
  draft = 'draft',
  editing = 'editing',
  published = 'published',
}

export type CycleProps = {
  dashboard?: { region?: boolean }
  dateCreated: string
  dateDraft: string
  dateEditing?: string
  datePublished?: string
  disabledReviewerEmailReminders?: boolean
  status: CycleStatus
}

export interface Cycle {
  readonly assessmentUuid: UUID
  cycleUuidSource?: CycleUuid
  id: number
  name: CycleName
  props: CycleProps
  uuid: CycleUuid
}
