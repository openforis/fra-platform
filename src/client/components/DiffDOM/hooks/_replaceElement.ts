import { DiffElementNode, DiffInfoReplaceElement, DiffType } from 'client/components/DiffDOM/types'

import { applyDiffClassToElement } from './utils'

export const replaceElement = (info: DiffInfoReplaceElement) => {
  const { oldValue } = info.diff
  const { newValue } = info.diff

  const newValueUpdated: DiffElementNode = {
    nodeName: 'div',
    attributes: { class: 'diff-text' },
    childNodes: [
      applyDiffClassToElement(oldValue, DiffType.removed),
      applyDiffClassToElement(newValue, DiffType.added),
    ],
  }
  // eslint-disable-next-line no-param-reassign
  info.diff.newValue = newValueUpdated
}
