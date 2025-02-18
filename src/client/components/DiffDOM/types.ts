export type DiffDOMProps = {
  current: string
  prev: string
}

export type DiffInfo = {
  diff: {
    action: 'replaceElement' | 'addElement'
    [key: string]: any
  }
  [key: string]: any
}
