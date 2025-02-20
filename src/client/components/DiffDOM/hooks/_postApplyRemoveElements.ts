import { MutableRefObject } from 'react'

import { DiffDOM } from 'diff-dom'
import { objToNode } from 'diff-dom/src/diffDOM/dom/fromVirtual'

import { applyDiffClassToElement } from 'client/components/DiffDOM/hooks/utils'
import { DiffInfoRemoveElement, DiffType } from 'client/components/DiffDOM/types'

type Props = {
  diffDOM: DiffDOM
  diffs: Array<DiffInfoRemoveElement>
  ref: MutableRefObject<HTMLDivElement>
}

export const postApplyRemoveElements = (props: Props): void => {
  const { diffDOM, diffs, ref } = props
  // record of deleted nodes count by parent route
  const removedCounts: Record<string, number> = {}

  diffs.forEach((diffInfo) => {
    const { diff } = diffInfo
    const { element, route } = diff

    // 1. add 'removed' class and convert removed element to node
    const obj = applyDiffClassToElement(element, DiffType.removed)
    const node = objToNode(obj, false, diffDOM.options)

    // 2. get parent node from route
    const parentRoute = route.slice(0, -1)
    let parentNode: ChildNode = ref.current
    parentRoute.forEach((routeIndex, iterationIndex) => {
      const _parentRoute = route.slice(0, iterationIndex)
      const _removedKey = JSON.stringify(_parentRoute)
      const _removedCount = removedCounts[_removedKey] ?? 0
      parentNode = parentNode?.childNodes?.[routeIndex + _removedCount]
    })

    // 3. insert removed node at new index
    const removedKey = JSON.stringify(parentRoute)
    const removedCount = removedCounts[removedKey] ?? 0
    if (parentNode) {
      const childIndex = route.slice(-1)?.at(0)
      parentNode.insertBefore(node, parentNode.childNodes[childIndex + removedCount])
    }

    // 4. update parent route removed counts
    removedCounts[removedKey] = removedCount + 1
  })
}
