export type CycleName = string
export type CycleUuid = string

export enum CycleStatus {
  draft = 'draft',
  editing = 'editing',
  published = 'published',
}

export type CycleProps = {
  dateCreated: string
  dateDraft: string
  dateEditing?: string
  datePublished?: string
  disabledReviewerEmailReminders?: boolean
  status: CycleStatus
}

export interface Cycle {
  readonly assessmentId: number
  cycleUuidSource?: CycleUuid
  id: number
  name: CycleName
  props: CycleProps
  uuid: CycleUuid
}
