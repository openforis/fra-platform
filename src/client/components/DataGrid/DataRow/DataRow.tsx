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
      {React.Children.map(children, (child, idx) =>
        child ? React.cloneElement(child, { firstCol: idx === 0, highlighted }) : null
      )}
      <Actions actions={actions} />
    </>
  )
}

DataRow.defaultProps = {
  actions: [],
}

export default DataRow
