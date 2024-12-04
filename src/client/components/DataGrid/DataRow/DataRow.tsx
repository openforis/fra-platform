import React, { PropsWithChildren, ReactElement } from 'react'

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

  return (
    <>
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return null

        const firstCol = idx === 0
        const lastCol = idx === React.Children.count(children) - 1

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
