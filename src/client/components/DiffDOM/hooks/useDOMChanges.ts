import { useLayoutEffect } from 'react'

import { DiffDOM, stringToObj } from 'diff-dom'

import { DiffDOMProps, DiffInfo, DiffInfoAction } from 'client/components/DiffDOM/types'

import { addElement } from './_addElement'
import { getTextDiffNode } from './_getTextDiffNode'
import { replaceElement } from './_replaceElement'
import { normalizeDiffDOM } from './utils'

type Props = DiffDOMProps & {
  ref: React.MutableRefObject<HTMLDivElement>
}

export const useDOMChanges = (props: Props) => {
  const { current, prev, ref } = props

  useLayoutEffect(() => {
    const diffDOM = new DiffDOM({
      caseSensitive: true,
      preDiffApply(info: DiffInfo<DiffInfoAction>): boolean {
        switch (info.diff.action) {
          case DiffInfoAction.replaceElement:
            replaceElement(info as DiffInfo<DiffInfoAction.replaceElement>)
            return false
          case DiffInfoAction.addElement:
            addElement(info as DiffInfo<DiffInfoAction.addElement>)
            return false
          default:
            return false
        }
      },
      textDiff(node, currentValue, _expectedValue, newValue) {
        if (currentValue === newValue) return
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
  }, [current, prev, ref])
}
