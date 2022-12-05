import React from 'react'
import { CSVLink } from 'react-csv'
import { useTranslation } from 'react-i18next'

import { RoleName, User, UserRole, Users } from '@meta/user'

import { useCycle } from '@client/store/assessment'
import { useUsers } from '@client/store/ui/userManagement'
import { useCountryIso } from '@client/hooks'
import Icon from '@client/components/Icon'

const UserListButtonExport = () => {
  const { t } = useTranslation()
  const users = useUsers()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  // ==== HEADERS
  const csvRoleHeaders = () => [{ key: 'role', label: t('userManagement.role') }]

  const csvHeaders = () => [
    { key: 'name', label: t('userManagement.name') },
    ...csvRoleHeaders(),
    { key: 'email', label: t('userManagement.email') },
    { key: 'loginEmail', label: t('userManagement.loginEmail') },
  ]

  // ==== TABLE DATA

  const csvRowData = (user: User, userRole: UserRole<RoleName, any>, isAdminTable: boolean) => {
    const roleKey = isAdminTable ? userRole?.role : 'role'
    let roleValue = ''
    if (isAdminTable) {
      roleValue =
        userRole?.role === RoleName.ADMINISTRATOR
          ? t(Users.getI18nRoleLabelKey(RoleName.ADMINISTRATOR))
          : t(`area.${userRole.countryIso}.listName`)
    } else roleValue = t(Users.getI18nRoleLabelKey(userRole?.role))

    return {
      name: user.name,
      [roleKey]: `${roleValue}${userRole?.invitationUuid ? ` - ${t('admin.invitationPending')}` : ''}`,
      email: user.email,
      loginEmail: userRole?.props.email || user.email,
    }
  }

  const csvTableData = () => users.map((user: User) => csvRowData(user, Users.getRole(user, countryIso, cycle), false))

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

export default UserListButtonExport
