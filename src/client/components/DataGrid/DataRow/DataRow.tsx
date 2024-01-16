import React, { ReactElement } from 'react'

import Actions from 'client/components/DataGrid/DataRow/Actions'
import { Action } from 'client/components/DataGrid/DataRow/types'

type DataRowProps = {
  actions?: Array<Action>
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
