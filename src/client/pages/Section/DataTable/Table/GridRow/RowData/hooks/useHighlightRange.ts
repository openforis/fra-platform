import { useMemo } from 'react'

import { Col, Cols } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { DataRowHighlightRange } from 'client/components/DataGrid/DataRow/types'

type Props = {
  cols: Array<Col>
}

type Returned = DataRowHighlightRange | undefined

export const useHighlightRange = (props: Props): Returned => {
  const { cols } = props

  const cycle = useCycle()

  return useMemo<Returned>(() => {
    const rowSpans = cols.map((col) => Cols.getStyle({ col, cycle }).rowSpan ?? 1)
    if (rowSpans.length === 0) {
      return undefined
    }

    const end = rowSpans.length - 1
    const targetValue = rowSpans[end]

    // returns the range of consecutive equal row spans, starting from the last column.
    // e.g. if rowSpans = [2, 1, 1, 1], returns { start: 1, end: 3 }
    let start = end
    for (let i = end - 1; i >= 0; i -= 1) {
      if (rowSpans[i] === targetValue) {
        start = i
      } else {
        break
      }
    }

    return { end, start }
  }, [cols, cycle])
}
