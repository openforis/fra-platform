import React from 'react'

import ButtonDelete from 'client/components/Buttons/ButtonDelete'
import ButtonEdit from 'client/components/Buttons/ButtonEdit'
import DataCell from 'client/components/DataGrid/DataCell'
import { Action } from 'client/components/DataGrid/DataRow/types'
import ReviewIndicator from 'client/components/ReviewIndicator'

const Components: Record<Action['type'], React.FC<any>> = {
  editLink: ButtonEdit,
  delete: ButtonDelete,
  review: ReviewIndicator,
}

type Props = {
  actions: Array<Action>
}

const Actions: React.FC<Props> = (props: Props) => {
  const { actions } = props
  const hasAction = actions?.length > 0
  if (!hasAction) return null

  return (
    <DataCell actions>
      {actions.map((action) => {
        const Component = Components[action.type]
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Component {...action} />
      })}
    </DataCell>
  )
}

export default Actions
