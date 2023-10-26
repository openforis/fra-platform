import './Contacts.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, Users } from 'meta/user'

import { useContacts } from 'client/store/data'
import DataGrid from 'client/components/DataGrid'
import DataColumn from 'client/components/DataGrid/DataColumn'
import TextInput from 'client/components/TextInput'
import { useGetContacts } from 'client/pages/Section/Contacts/hooks/useGetContacts'
import { useOnChange } from 'client/pages/Section/Contacts/hooks/useOnChange'
import Select from 'client/pages/Section/Contacts/Select'

type Props = {
  disabled: boolean
}

const allowedRoles = [RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, RoleName.COLLABORATOR]

const Contacts: React.FC<Props> = (props: Props) => {
  const { disabled } = props
  const { t } = useTranslation()
  useGetContacts()
  const contacts = useContacts()

  const onChange = useOnChange()

  const items = useMemo(() => {
    return allowedRoles.map((role) => {
      const label = t(Users.getI18nRoleLabelKey(role))
      const value = role
      return { label, value }
    })
  }, [t])

  return (
    <DataGrid className="contacts-datagrid">
      <DataColumn head>Appellation</DataColumn>
      <DataColumn head>Name</DataColumn>
      <DataColumn head>Surname</DataColumn>
      <DataColumn head>Role</DataColumn>
      <DataColumn head>Institution</DataColumn>
      <DataColumn head>Contribution</DataColumn>

      {contacts.map((contact) => {
        const { id, uuid, props } = contact
        const { role, appellation, name, surname, institution, contribution, readOnly } = props
        const _disabled = disabled || readOnly

        return (
          <React.Fragment key={`contact_${String(id)}`}>
            <DataColumn>
              <Select
                disabled={_disabled}
                value={appellation}
                onChange={(appellation) => onChange(uuid, 'appellation', appellation)}
                items={['Mr.', 'Mrs.', 'Ms.', 'Other'].map((appellation: string) => ({
                  label: appellation,
                  value: appellation,
                }))}
              />
            </DataColumn>
            <DataColumn>
              <TextInput
                disabled={_disabled}
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(uuid, 'name', e.target.value)}
              />
            </DataColumn>
            <DataColumn>
              <TextInput
                disabled={_disabled}
                value={surname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(uuid, 'surname', e.target.value)}
              />
            </DataColumn>
            <DataColumn>
              <Select
                disabled={_disabled}
                value={role}
                onChange={({ value }) => onChange(uuid, 'role', value)}
                items={items}
              />
            </DataColumn>
            <DataColumn>
              <TextInput
                disabled={_disabled}
                value={institution}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(uuid, 'institution', e.target.value)}
              />
            </DataColumn>
            <DataColumn> {contribution.join(', ')}</DataColumn>
          </React.Fragment>
        )
      })}
    </DataGrid>
  )
}

export default Contacts
