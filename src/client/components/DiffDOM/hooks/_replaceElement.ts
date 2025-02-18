import { DiffInfo, DiffInfoAction, DiffType } from 'client/components/DiffDOM/types'

import { applyDiffClassToElement } from './utils'

export const replaceElement = (info: DiffInfo<DiffInfoAction.replaceElement>) => {
  const { oldValue } = info.diff
  const { newValue } = info.diff

  // eslint-disable-next-line no-param-reassign
  info.diff.newValue = {
    nodeName: 'div',
    attributes: { class: 'diff-text' },
    childNodes: [
      applyDiffClassToElement(oldValue, DiffType.removed),
      applyDiffClassToElement(newValue, DiffType.added),
    ],
  }
}
