import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment'

import { useContacts } from 'client/store/data'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import CellNodeExt from 'client/components/TableNodeExt/CellNodeExt'
import Delete from 'client/pages/Section/Contacts/Delete'

import { useColumns } from './hooks/useColumns'
import { useGetContacts } from './hooks/useGetContacts'
import { useOnChange } from './hooks/useOnChange'

type Props = {
  canEdit: boolean
}

const Contacts: React.FC<Props> = (props: Props) => {
  const { canEdit } = props

  const { t } = useTranslation()
  useGetContacts()
  const contacts = useContacts({ canEdit })
  const onChange = useOnChange()
  const { columns, fields } = useColumns()
  const gridTemplateColumns = useMemo(() => `12ch repeat(${fields.length - 1}, 1fr) 4ch`, [fields.length])

  return (
    <div className="fra-table__container">
      <DataGrid gridTemplateColumns={gridTemplateColumns}>
        {fields.map((field, i) => {
          const { header } = columns[field].props

          return (
            <DataCell lastCol={i === fields.length - 1} header key={`${field}_header`}>
              {Labels.getLabel({ label: header.label, t })}
            </DataCell>
          )
        })}

        {/* Delete button placeholder */}
        <div />

        {contacts.map((contact, i) => {
          const { readOnly } = contact.props
          const disabled = !canEdit || readOnly

          return (
            <React.Fragment key={contact.uuid}>
              {fields.map((field, j) => {
                const column = columns[field]
                const nodeExt = contact[field]

                return (
                  <CellNodeExt
                    column={column}
                    disabled={disabled}
                    key={`${contact.uuid}_${field}`}
                    lastCol={j === fields.length - 1}
                    lastRow={i === contacts.length - 1}
                    onChange={(raw) => {
                      onChange({ contact, field, raw })
                    }}
                    nodeExt={nodeExt}
                  />
                )
              })}
              <Delete contact={contact} disabled={disabled} />
            </React.Fragment>
          )
        })}
      </DataGrid>
    </div>
  )
}

export default Contacts
