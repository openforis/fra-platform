export type DiffDOMProps = {
  current: string
  prev: string
}

export enum DiffType {
  added = 'added',
  removed = 'removed',
}

export type DiffElementNode = {
  attributes?: { [key: string]: string }
  checked?: boolean
  childNodes?: DiffElement[] // eslint-disable-line no-use-before-define
  nodeName: string
  selected?: boolean
  value?: string | number
}

export enum DiffTextNodeName {
  comment = '#comment',
  text = '#text',
}

export type DiffTextNode = {
  data: string
  nodeName: DiffTextNodeName
}

export type DiffElement = DiffElementNode | DiffTextNode

export enum DiffInfoAction {
  addElement = 'addElement',
  replaceElement = 'replaceElement',
}

export type Diff =
  | { route: Array<number> } & (
      | {
          action: DiffInfoAction.addElement
          element: DiffElement
        }
      | {
          action: DiffInfoAction.replaceElement
          newValue: DiffElement
          oldValue: DiffElement
        }
    )

type DiffByAction<T extends DiffInfoAction> = Extract<Diff, { action: T }>

export type DiffInfo<T extends DiffInfoAction = DiffInfoAction> = {
  diff: DiffByAction<T>
  node: HTMLElement
}
