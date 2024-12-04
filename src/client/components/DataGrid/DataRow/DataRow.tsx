import React, { PropsWithChildren, ReactElement, useMemo } from 'react'

import { Objects } from 'utils/objects'

import { DataRowAction } from 'client/components/DataGrid'
import Actions from 'client/components/DataGrid/DataRow/Actions'

import { useHighlighted } from './hooks/useHighlighted'
import { DataRowHighlightRange } from './types'

type DataRowProps = PropsWithChildren<{
  actions?: Array<DataRowAction>
  highlightRange?: DataRowHighlightRange
}>

const DataRow: React.FC<DataRowProps> = (props) => {
  const { actions, children, highlightRange } = props

  const highlighted = useHighlighted({ actions })
  const highlightRangeExists = !Objects.isEmpty(highlightRange)

  const validChildren = useMemo<React.ReactElement[]>(
    () =>
      React.Children.toArray(children).reduce<Array<React.ReactElement>>((acc, child) => {
        if (React.isValidElement(child)) {
          acc.push(child)
        }
        return acc
      }, []),
    [children]
  )

  return (
    <>
      {validChildren.map((child, idx) => {
        const firstCol = idx === 0
        const lastCol = idx === validChildren.length - 1

        const cellInHighlightRange = highlightRangeExists && idx >= highlightRange.start && idx <= highlightRange.end

        const firstHighlightCol = cellInHighlightRange ? idx === highlightRange.start : firstCol
        const lastHighlightCol = cellInHighlightRange ? idx === highlightRange.end : lastCol

        const shouldHighlightCell = highlighted && (cellInHighlightRange || !highlightRangeExists)

        return React.cloneElement(child as ReactElement, {
          firstCol,
          firstHighlightCol,
          highlighted: shouldHighlightCell,
          lastCol,
          lastHighlightCol,
        })
      })}
      <Actions actions={actions} />
    </>
  )
}

DataRow.defaultProps = {
  actions: [],
  highlightRange: undefined,
}

export default DataRow
