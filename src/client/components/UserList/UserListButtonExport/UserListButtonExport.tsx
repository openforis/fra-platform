import React from 'react'
import { CSVLink } from 'react-csv'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area'
import { RoleName, User, Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useFilteredRoleNames, useUsers } from 'client/store/ui/userManagement'
import { useCountryIso } from 'client/hooks'
import Icon from 'client/components/Icon'

type Props = {
  isAdmin?: boolean
}

const UserListButtonExport = ({ isAdmin }: Props) => {
  const filteredRoleNames = useFilteredRoleNames()

  const { t } = useTranslation()
  const users = useUsers()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  // ==== HEADERS
  const csvRoleHeaders = () =>
    isAdmin
      ? filteredRoleNames.map((roleName: RoleName) => ({
          key: roleName,
          label: t(Users.getI18nRoleLabelKey(roleName)),
        }))
      : [{ key: 'role', label: t('userManagement.role') }]

  const csvHeaders = () => [
    { key: 'name', label: t('userManagement.name') },
    ...csvRoleHeaders(),
    { key: 'email', label: t('userManagement.email') },
  ]

  // ==== TABLE DATA

  const csvAdminRoleData = (user: User) => ({
    name: Users.getFullName(user),
    ...filteredRoleNames.reduce(
      (prev, roleName: RoleName) => ({
        ...prev,
        [roleName]: user.roles
          .filter((role) => role.role === roleName)
          .map((role) => {
            if (role.role === RoleName.ADMINISTRATOR) return t(Users.getI18nRoleLabelKey(role.role))
            return t(Areas.getTranslationKey(role.countryIso))
          })
          .join(','),
      }),
      {}
    ),
    email: user.email,
  })

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
    return isAdmin ? users.map((user: User) => csvAdminRoleData(user)) : users.map((user: User) => csvRowData(user))
  }

  return (
    <CSVLink
      className="btn-s btn-primary"
      target="_blank"
      filename="FRA-Users.csv"
      data={csvTableData()}
      headers={csvHeaders()}
    >
      <Icon className="icon-sub icon-white" name="hit-down" />
      CSV
    </CSVLink>
  )
}

UserListButtonExport.defaultProps = {
  isAdmin: false,
}

export default UserListButtonExport
