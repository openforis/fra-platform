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

    let start = -1
    let end = -1

    // Get the first and last index with rowSpan = 1
    for (let i = 0; i < rowSpans.length; i += 1) {
      if (rowSpans[i] === 1) {
        if (start === -1) {
          start = i
        }
        end = i
      }
    }

    if (start === -1 || end === -1) {
      return undefined
    }

    return { end, start }
  }, [cols, cycle])
}
