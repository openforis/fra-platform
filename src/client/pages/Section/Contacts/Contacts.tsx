import './Contacts.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment'

import { DataCell, DataGrid } from 'client/components/DataGrid'
import CellNodeExt from 'client/components/TableNodeExt/CellNodeExt'
import CreateContact from 'client/pages/Section/Contacts/CreateContact'
import DeleteContact from 'client/pages/Section/Contacts/DeleteContact'

import { useContactsData } from './hooks/useContactsData'
import { useColumns, useFields } from './hooks/useDefinitions'
import { useGetContacts } from './hooks/useGetContacts'
import { useGridTemplateColumns } from './hooks/useGridTemplateColumns'
import { useOnChange } from './hooks/useOnChange'

type Props = {
  canEdit: boolean
}

const Contacts: React.FC<Props> = (props: Props) => {
  const { canEdit } = props

  const { t } = useTranslation()
  useGetContacts()

  const contacts = useContactsData()
  const onChange = useOnChange()

  const columns = useColumns()
  const fields = useFields()
  const gridTemplateColumns = useGridTemplateColumns({ canEdit, fields })

  return (
    <div className="contacts">
      <h2 className="headline">{t('contactPersons.reportPreparationAndContactPersons')}</h2>
      <div className="contacts__subTitle">{t('contactPersons.contactPersonsSupport')}</div>

      <DataGrid gridTemplateColumns={gridTemplateColumns}>
        {fields.map(({ field, hidden }, i) => {
          const { header } = columns[field].props

          if (hidden) return null

          return (
            <DataCell lastCol={i === fields.length - 1} header key={`${field}_header`}>
              {Labels.getLabel({ label: header.label, t })}
            </DataCell>
          )
        })}
        {canEdit && <div />}

        {contacts.map((contact, i) => {
          const { readOnly } = contact.props
          const disabled = !canEdit || readOnly

          return (
            <React.Fragment key={contact.uuid}>
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
                    lastRow={i === contacts.length - 1}
                    onChange={(raw) => {
                      onChange({ contact, field, raw })
                    }}
                    nodeExt={nodeExt}
                  />
                )
              })}
              {canEdit && <DeleteContact contact={contact} disabled={disabled} />}
            </React.Fragment>
          )
        })}
      </DataGrid>
      <CreateContact canEdit={canEdit} />
    </div>
  )
}

export default Contacts
