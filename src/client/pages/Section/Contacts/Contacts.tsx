import './Contacts.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment'

import { useIsEditTableDataEnabled } from 'client/store/user'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import ContactRow from 'client/pages/Section/Contacts/ContactRow'
import CreateContact from 'client/pages/Section/Contacts/CreateContact'
import { useSectionContext } from 'client/pages/Section/context'

import { useContactsData } from './hooks/useContactsData'
import { useColumns, useFields } from './hooks/useDefinitions'
import { useGetContacts } from './hooks/useGetContacts'
import { useGridTemplateColumns } from './hooks/useGridTemplateColumns'

const Contacts: React.FC = () => {
  const { t } = useTranslation()
  useGetContacts()
  const { sectionName } = useSectionContext()
  const editEnabled = useIsEditTableDataEnabled(sectionName)
  const contacts = useContactsData()
  const columns = useColumns()
  const fields = useFields()
  const gridTemplateColumns = useGridTemplateColumns({ fields })

  return (
    <div className="contacts">
      <h2 className="headline">{t('contactPersons.reportPreparationAndContactPersons')}</h2>
      <div className="contacts__subTitle">{t('contactPersons.contactPersonsSupport')}</div>

      <DataGrid gridTemplateColumns={gridTemplateColumns} withActions={editEnabled}>
        {fields.map(({ field, hidden }, i) => {
          const { header } = columns[field].props

          if (hidden) return null

          return (
            <DataCell key={`${field}_header`} header lastCol={i === fields.length - 1}>
              {Labels.getLabel({ label: header.label, t })}
            </DataCell>
          )
        })}
        {editEnabled && <div />}

        {contacts.map((contact, i) => {
          return (
            <ContactRow
              key={contact.uuid}
              columns={columns}
              contact={contact}
              fields={fields}
              lastRow={i === contacts.length - 1}
            />
          )
        })}
      </DataGrid>

      {editEnabled && <CreateContact />}
    </div>
  )
}

export default Contacts
