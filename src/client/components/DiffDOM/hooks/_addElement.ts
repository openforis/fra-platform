import { DiffInfoAddElement, DiffType } from 'client/components/DiffDOM/types'

import { applyDiffClassToElement } from './utils'

export const addElement = (info: DiffInfoAddElement) => {
  // eslint-disable-next-line no-param-reassign
  info.diff.element = applyDiffClassToElement(info.diff.element, DiffType.added)
}
