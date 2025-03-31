export interface CycledPropsObject<Props = void> {
  id?: number
  props: { cycles: Array<string> } & Props
  uuid?: string
}
