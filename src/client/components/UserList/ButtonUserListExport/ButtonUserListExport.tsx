import React from 'react'
import { CSVLink } from 'react-csv'
import { useTranslation } from 'react-i18next'

import { RoleName, User, UserRole, Users } from '@meta/user'

import { useUsers } from '@client/store/ui/userManagement/hooks'
import { useCountryIso } from '@client/hooks'
import Icon from '@client/components/Icon'

const ButtonUserListExport = () => {
  const { i18n } = useTranslation()
  const users = useUsers()
  const countryIso = useCountryIso()

  // ==== HEADERS
  const csvRoleHeaders = () => [{ key: 'role', label: i18n.t('userManagement.role') }]

  const csvHeaders = () => [
    { key: 'name', label: i18n.t('userManagement.name') },
    ...csvRoleHeaders(),
    { key: 'email', label: i18n.t('userManagement.email') },
    { key: 'loginEmail', label: i18n.t('userManagement.loginEmail') },
  ]

  // ==== TABLE DATA

  const csvRowData = (user: User, userRole: UserRole<RoleName, any>, isAdminTable: boolean) => {
    const roleKey = isAdminTable ? userRole.role : 'role'
    let roleValue = ''
    if (isAdminTable) {
      roleValue =
        userRole.role === RoleName.ADMINISTRATOR
          ? i18n.t(Users.getI18nRoleLabelKey(RoleName.ADMINISTRATOR))
          : i18n.t(`area.${userRole.countryIso}.listName`)
    } else roleValue = i18n.t(Users.getI18nRoleLabelKey(userRole.role))

    return {
      name: user.name,
      [roleKey]: `${roleValue}${userRole.invitationUuid ? ` - ${i18n.t('admin.invitationPending')}` : ''}`,
      email: user.email,
      loginEmail: userRole.props.email || user.email,
    }
  }

  const csvTableData = () => users.map((user: User) => csvRowData(user, Users.getCountryRole(user, countryIso), false))

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

export default ButtonUserListExport
