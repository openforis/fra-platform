import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment'

import { useContacts } from 'client/store/data'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import CellNodeExt from 'client/components/TableNodeExt/CellNodeExt'

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
  const gridTemplateColumns = useMemo(() => `12ch repeat(${fields.length - 1}, 1fr)`, [fields.length])

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

        {contacts.map((contact, i) => {
          const { readOnly } = contact.props

          return (
            <React.Fragment key={contact.uuid}>
              {fields.map((field, j) => {
                const column = columns[field]
                const nodeExt = contact[field]

                return (
                  <CellNodeExt
                    column={column}
                    disabled={!canEdit || readOnly}
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
            </React.Fragment>
          )
        })}
      </DataGrid>
    </div>
  )
}

export default Contacts
