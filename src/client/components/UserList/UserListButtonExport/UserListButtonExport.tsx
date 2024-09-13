import React from 'react'
import { CSVLink } from 'react-csv'
import { useTranslation } from 'react-i18next'

import { User, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUsers } from 'client/store/ui/userManagement'
import { useCountryIso } from 'client/hooks'
import Icon from 'client/components/Icon'

const UserListButtonExport = () => {
  const { t } = useTranslation()
  const users = useUsers()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  // ==== HEADERS
  const csvRoleHeaders = () => [{ key: 'role', label: t('common.role') }]

  const csvHeaders = () => [
    { key: 'name', label: t('common.name') },
    ...csvRoleHeaders(),
    { key: 'email', label: t('common.email') },
  ]

  // ==== TABLE DATA

  const csvRowData = (user: User) => {
    const userRole = Users.getRole(user, countryIso, cycle)

    return {
      name: Users.getFullName(user),
      role: `${t(Users.getI18nRoleLabelKey(userRole?.role))}${
        userRole?.invitationUuid && !userRole.acceptedAt ? ` - ${t('admin.invitationPending')}` : ''
      }`,
      email: user.email,
    }
  }

  const csvTableData = () => {
    return users.map((user: User) => csvRowData(user))
  }

  return (
    <CSVLink
      className="btn-s btn-primary"
      data={csvTableData()}
      filename="FRA-Users.csv"
      headers={csvHeaders()}
      target="_blank"
    >
      <Icon className="icon-sub icon-white" name="hit-down" />
      CSV
    </CSVLink>
  )
}

export default UserListButtonExport
