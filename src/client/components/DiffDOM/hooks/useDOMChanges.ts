import { useLayoutEffect } from 'react'
import { DiffDOM, stringToObj } from 'diff-dom'

import {
  DiffAction,
  DiffDOMProps,
  DiffInfo,
  DiffInfoAddElement,
  DiffInfoRemoveElement,
  DiffInfoReplaceElement,
} from 'client/components/DiffDOM/types'

import { addElement } from './_addElement'
import { getTextDiffNode } from './_getTextDiffNode'
import { postApplyRemoveElements } from './_postApplyRemoveElements'
import { replaceElement } from './_replaceElement'
import { normalizeDiffDOM } from './utils'

type Props = DiffDOMProps & {
  ref: React.MutableRefObject<HTMLDivElement>
}

export const useDOMChanges = (props: Props): void => {
  const { current, prev, ref } = props

  useLayoutEffect(() => {
    const removedDiffs: Array<DiffInfoRemoveElement> = []

    const diffDOM = new DiffDOM({
      caseSensitive: true,
      preDiffApply: (info: DiffInfo<DiffAction, unknown>): boolean => {
        switch (info.diff.action) {
          case DiffAction.replaceElement:
            replaceElement(info as DiffInfoReplaceElement)
            return false
          case DiffAction.addElement:
            addElement(info as DiffInfoAddElement)
            return false
          case DiffAction.removeElement:
            removedDiffs.push(info as DiffInfoRemoveElement)
            return false
          default:
            return false
        }
      },
      textDiff(node, currentValue, _expectedValue, newValue): void {
        if (node instanceof Text) {
          node.replaceWith(getTextDiffNode(currentValue, newValue))
        }
      },
    })

    const normalizedPrev = normalizeDiffDOM(prev)
    const normalizedCurrent = normalizeDiffDOM(current)

    const objDiffPrev = stringToObj(normalizedPrev)
    const objDiffCurrent = stringToObj(normalizedCurrent)
    const diff = diffDOM.diff(objDiffPrev, objDiffCurrent)
    diffDOM.apply(ref.current, diff)

    // add removed nodes to dom
    postApplyRemoveElements({ diffDOM, diffs: removedDiffs, ref })
  }, [current, prev, ref])
}
