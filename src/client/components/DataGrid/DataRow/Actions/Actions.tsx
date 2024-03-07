import React from 'react'

import ButtonDelete from 'client/components/Buttons/ButtonDelete'
import ButtonEdit from 'client/components/Buttons/ButtonEdit'
import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'
import DataCell from 'client/components/DataGrid/DataCell'
import ReviewIndicator from 'client/components/ReviewIndicator'

const Components: Record<DataRowActionType, React.FC<any>> = {
  editLink: ButtonEdit,
  delete: ButtonDelete,
  review: ReviewIndicator,
}

type Props = {
  actions: Array<DataRowAction>
}

const Actions: React.FC<Props> = (props: Props) => {
  const { actions } = props

  if (actions.length <= 0) {
    return null
  }

  return (
    <DataCell actions>
      {actions.map((action) => {
        const Component = Components[action.type]
        return (
          <div key={action.type} className="action">
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...action} />
          </div>
        )
      })}
    </DataCell>
  )
}

export default Actions
