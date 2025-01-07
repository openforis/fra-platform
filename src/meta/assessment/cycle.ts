export interface CycledPropsObject<Props = void> {
  props: {
    cycles: Array<string>
  } & Props
  uuid?: string
  id?: number
}

export type CycleName = string
export type CycleUuid = string

export enum CycleStatus {
  draft = 'draft',
  editing = 'editing',
  published = 'published',
}

export type CycleProps = {
  status: CycleStatus
  dateCreated: string
  dateDraft: string
  dateEditing: string
  datePublished: string
}

export interface Cycle {
  id: number
  name: CycleName
  uuid: CycleUuid
  props: CycleProps
}
