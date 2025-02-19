import { DiffInfo, DiffInfoAction, DiffType } from 'client/components/DiffDOM/types'

import { applyDiffClassToElement } from './utils'

export const addElement = (info: DiffInfo<DiffInfoAction.addElement>) => {
  // eslint-disable-next-line no-param-reassign
  info.diff.element = {
    nodeName: 'div',
    attributes: { class: 'diff-text' },
    childNodes: info.diff.element ? [applyDiffClassToElement(info.diff.element, DiffType.added)] : [],
  }
}
