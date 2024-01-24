import React, { ReactElement } from 'react'

import { DataRowAction } from 'client/components/DataGrid'
import Actions from 'client/components/DataGrid/DataRow/Actions'

type DataRowProps = {
  actions?: Array<DataRowAction>
  children: ReactElement | Array<ReactElement>
}

const DataRow: React.FC<DataRowProps> = (props) => {
  const { actions, children } = props

  return (
    <>
      {React.Children.map(children, (child) => (child ? React.cloneElement(child) : null))}
      <Actions actions={actions} />
    </>
  )
}

DataRow.defaultProps = {
  actions: [],
}

export default DataRow
