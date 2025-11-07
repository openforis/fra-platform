import './Contacts.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'
import { Labels } from 'meta/assessment/labels'
import { Users } from 'meta/user'

import { useCountry } from 'client/store/area/hooks/country'
import { useIsEditTableDataEnabled } from 'client/store/user/hooks/auth'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useIsPrintRoute } from 'client/hooks/routes'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import ContactRow from 'client/pages/Section/Contacts/ContactRow'
import ContactsTitle from 'client/pages/Section/Contacts/ContactsTitle'
import CreateContact from 'client/pages/Section/Contacts/CreateContact'
import { useSectionContext } from 'client/pages/Section/context'

import { useContactsData } from './hooks/useContactsData'
import { useColumns, useFields } from './hooks/useDefinitions'
import { useGetContacts } from './hooks/useGetContacts'
import { useGridTemplateColumns } from './hooks/useGridTemplateColumns'

const Contacts: React.FC = () => {
  const { t } = useTranslation()

  useGetContacts()
  const user = useUser()
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const country = useCountry(countryIso)
  const { print } = useIsPrintRoute()
  const { sectionName } = useSectionContext()
  const editEnabled = useIsEditTableDataEnabled(sectionName)
  const contacts = useContactsData()
  const columns = useColumns()
  const fields = useFields()
  const gridTemplateColumns = useGridTemplateColumns({ fields })

  const { hideContactsTable } = country.props

  if ((print || !Users.isAdministrator(user)) && hideContactsTable) return null

  return (
    <div className="contacts">
      <ContactsTitle />

      {!hideContactsTable && (
        <>
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
        </>
      )}
    </div>
  )
}

export default Contacts
