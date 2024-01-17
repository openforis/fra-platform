import './Contacts.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment'

import { DataCell, DataGrid } from 'client/components/DataGrid'
import ContactRow from 'client/pages/Section/Contacts/ContactRow'
import CreateContact from 'client/pages/Section/Contacts/CreateContact'

import { useContactsData } from './hooks/useContactsData'
import { useColumns, useFields } from './hooks/useDefinitions'
import { useGetContacts } from './hooks/useGetContacts'
import { useGridTemplateColumns } from './hooks/useGridTemplateColumns'

type Props = {
  canEdit: boolean
}

const Contacts: React.FC<Props> = (props: Props) => {
  const { canEdit } = props

  const { t } = useTranslation()
  useGetContacts()
  const contacts = useContactsData({ canEdit })
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
          return (
            <ContactRow
              canEdit={canEdit}
              columns={columns}
              contact={contact}
              fields={fields}
              key={contact.uuid}
              lastRow={i === contacts.length - 1}
            />
          )
        })}
      </DataGrid>

      {canEdit && <CreateContact />}
    </div>
  )
}

export default Contacts
