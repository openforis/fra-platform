export interface CycledPropsObject<Props = void> {
  id?: number
  props: { cycles: Array<string> } & Props
  uuid?: string
}

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
  dateEditing: string
  datePublished: string
  status: CycleStatus
}

export interface Cycle {
  cycleUuidSource?: CycleUuid
  id: number
  name: CycleName
  props: CycleProps
  uuid: CycleUuid
}
