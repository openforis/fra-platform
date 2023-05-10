export interface CycledPropsObject<Props = void> {
  props: {
    cycles: Array<string>
  } & Props
  uuid?: string
  id?: number
}

export type CycleUuid = string
export type CycleName = string

export interface Cycle {
  id: number
  name: CycleName
  uuid: CycleUuid
  published: boolean
}
