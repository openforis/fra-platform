import { UUID } from 'meta/uuid/uuid'

export type CycleName = string
export type CycleUuid = string

export enum CycleStatus {
  draft = 'draft',
  editing = 'editing',
  published = 'published',
}

export type CycleNDPProps = {
  dataSources: {
    version: 1 | 2 // 1: vertical layout - 2: horizontal layout (same as table sections)
  }
}

export type CycleProps = {
  dashboard?: { region?: boolean }
  dateCreated: string
  dateDraft: string
  dateEditing?: string
  datePublished?: string
  disabledReviewerEmailReminders?: boolean
  status: CycleStatus
  ndp?: CycleNDPProps
}

export interface Cycle {
  readonly assessmentUuid: UUID
  cycleUuidSource?: CycleUuid
  id: number
  name: CycleName
  props: CycleProps
  uuid: CycleUuid
}
