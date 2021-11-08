export interface CycledPropsObject<Props = void> {
  props: {
    cycles: Array<string>
  } & Props
  uuid: string
}

export interface Cycle {
  name: string // 2020 or 2025
  uuid: string
}
