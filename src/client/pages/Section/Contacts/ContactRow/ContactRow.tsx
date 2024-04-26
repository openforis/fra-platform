import React from 'react'

import { Contact } from 'meta/cycleData'

import { useIsEditTableDataEnabled } from 'client/store/user'
import { DataCell, DataRow } from 'client/components/DataGrid'
import CellNodeExt from 'client/components/TableNodeExt/CellNodeExt'
import { Columns, Fields } from 'client/pages/Section/Contacts/types'
import { useSectionContext } from 'client/pages/Section/context'

import { useOnChange } from './hooks/useOnChange'
import { useRowActions } from './hooks/useRowActions'

type Props = {
  columns: Columns
  contact: Contact
  fields: Fields
  lastRow: boolean
}

const ContactRow: React.FC<Props> = (props) => {
  const { columns, contact, fields, lastRow } = props

  const { sectionName } = useSectionContext()
  const actions = useRowActions({ contact })
  const editEnabled = useIsEditTableDataEnabled(sectionName)
  const onChange = useOnChange()

  const { readOnly } = contact.props
  const disabled = !editEnabled || readOnly

  return (
    <>
      <DataRow actions={actions}>
        {fields.map(({ field, hidden }) => {
          const column = columns[field]
          const nodeExt = contact[field]

          if (hidden) return null

          return (
            <DataCell key={`${contact.uuid}_${field}`} editable={!disabled} lastRow={lastRow}>
              <CellNodeExt
                column={column}
                disabled={disabled}
                nodeExt={nodeExt}
                onChange={(raw) => {
                  onChange({ contact, field, raw })
                }}
              />
            </DataCell>
          )
        })}
      </DataRow>
      {editEnabled && !actions.length && <div />}
    </>
  )
}

export default ContactRow
