export type DiffDOMProps = {
  current: string
  prev: string
}

export enum DiffType {
  added = 'added',
  removed = 'removed',
}

export type DiffElement = { nodeName: string }

export type DiffElementNode = DiffElement & {
  attributes?: Record<string, string>
  checked?: boolean
  childNodes?: DiffElement[]
  selected?: boolean
  value?: string | number
}

export type DiffElementText = DiffElement & {
  data: string
}

export enum DiffAction {
  addElement = 'addElement',
  removeElement = 'removeElement',
  replaceElement = 'replaceElement',
}

type Diff<Action extends DiffAction, Props> = {
  action: Action
  route: Array<number>
} & Props

export type DiffInfo<
  Action extends DiffAction = DiffAction,
  Props extends Record<string, unknown> | void | unknown = void
> = {
  diff: Diff<Action, Props>
  node: HTMLElement
}

export type DiffInfoAddElement = DiffInfo<DiffAction.addElement, { element: DiffElement }>
export type DiffInfoRemoveElement = DiffInfo<DiffAction.removeElement, { element: DiffElement }>
export type DiffInfoReplaceElement = DiffInfo<
  DiffAction.replaceElement,
  { newValue: DiffElement; oldValue: DiffElement }
>
