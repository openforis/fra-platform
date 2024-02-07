import React from 'react'

import { Contact } from 'meta/cycleData'

import { DataRow } from 'client/components/DataGrid'
import CellNodeExt from 'client/components/TableNodeExt/CellNodeExt'
import { Columns, Fields } from 'client/pages/Section/Contacts/types'

import { useOnChange } from './hooks/useOnChange'
import { useRowActions } from './hooks/useRowActions'

type Props = {
  canEdit: boolean
  columns: Columns
  contact: Contact
  fields: Fields
  lastRow: boolean
}

const ContactRow: React.FC<Props> = (props) => {
  const { canEdit, columns, contact, fields, lastRow } = props

  const actions = useRowActions({ canEdit, contact })
  const onChange = useOnChange()

  const { readOnly } = contact.props
  const disabled = !canEdit || readOnly

  return (
    <DataRow actions={actions}>
      {fields.map(({ field, hidden }, j) => {
        const column = columns[field]
        const nodeExt = contact[field]

        if (hidden) return null

        return (
          <CellNodeExt
            column={column}
            disabled={disabled}
            key={`${contact.uuid}_${field}`}
            lastCol={j === fields.length - 1}
            lastRow={lastRow}
            onChange={(raw) => {
              onChange({ contact, field, raw })
            }}
            nodeExt={nodeExt}
          />
        )
      })}
    </DataRow>
  )
}

export default ContactRow
