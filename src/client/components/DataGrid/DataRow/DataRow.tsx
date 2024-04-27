import React, { ReactElement } from 'react'

import { DataRowAction } from 'client/components/DataGrid'
import Actions from 'client/components/DataGrid/DataRow/Actions'

import { useHighlighted } from './hooks/useHighlighted'

type DataRowProps = {
  actions?: Array<DataRowAction>
  children: ReactElement | Array<ReactElement>
}

const DataRow: React.FC<DataRowProps> = (props) => {
  const { actions, children } = props

  const highlighted = useHighlighted({ actions })

  return (
    <>
      {React.Children.map(children, (child, idx) => {
        if (!child) return null
        const firstCol = idx === 0
        const lastCol = idx === React.Children.count(children) - 1
        return React.cloneElement(child, { firstCol, highlighted, lastCol })
      })}
      <Actions actions={actions} />
    </>
  )
}

DataRow.defaultProps = {
  actions: [],
}

export default DataRow
