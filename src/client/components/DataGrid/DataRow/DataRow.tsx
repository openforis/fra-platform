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

  return (
    <>
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return null

        let firstCol = idx === 0
        let lastCol = idx === React.Children.count(children) - 1
        let shouldHighlightCell = highlighted
        if (!Objects.isEmpty(highlightRange)) {
          shouldHighlightCell &&= idx >= highlightRange.start && idx <= highlightRange.end
          if (shouldHighlightCell) {
            firstCol = idx === highlightRange.start
            lastCol = idx === highlightRange.end
          }
        }

        return React.cloneElement(child as ReactElement, { firstCol, highlighted: shouldHighlightCell, lastCol })
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
