import React from 'react'
import * as R from 'ramda'

import { CSVLink } from 'react-csv'
import Icon from '../../../../components/icon'

import { administrator, getRoleLabelKey } from '@common/countryRole'
import { getFilterRoles, filterUserCountryRoles } from './filter'

const UsersTableCSVExportButton = ({ users, i18n, isAdminTable = false, filter = {} }: any) => (
  <CSVLink
    className="btn-s btn-primary"
    target="_blank"
    filename="FRA-Users.csv"
    data={csvTableData(users, i18n, isAdminTable, filter)}
    headers={csvHeaders(i18n, isAdminTable, filter)}
  >
    <Icon className="icon-sub icon-white" name="hit-down" />
    CSV
  </CSVLink>
)

// ==== HEADERS
const csvHeaders = (i18n: any, isAdminTable: any, filter: any) => [
  { key: 'name', label: i18n.t('userManagement.name') },
  ...csvRoleHeaders(i18n, isAdminTable, filter),
  { key: 'email', label: i18n.t('userManagement.email') },
  { key: 'loginEmail', label: i18n.t('userManagement.loginEmail') },
]

const csvRoleHeaders = (i18n: any, isAdminTable: any, filter: any) =>
  isAdminTable
    ? getFilterRoles(filter).map((role: any) => ({
        key: role,
        label: i18n.t(getRoleLabelKey(role)),
      }))
    : [{ key: 'role', label: i18n.t('userManagement.role') }]

// ==== TABLE DATA
const csvTableData = (users: any, i18n: any, isAdminTable: any, filter: any) =>
  isAdminTable ? adminCsvTableData(users, i18n, filter) : users.map((user: any) => csvRowData(user, i18n, user, false))

const adminCsvTableData = (users: any, i18n: any, filter: any) =>
  R.reduce(
    (rows: any, user: any) => {
      user.invitationUuid
        ? rows.push(csvRowData(user, i18n, user, true))
        : user.roles.forEach((userRole: any) => rows.push(csvRowData(user, i18n, userRole, true)))

      return rows
    },
    [],
    filterUserCountryRoles(filter)(users)
  )

const csvRowData = (user: any, i18n: any, userRole: any, isAdminTable: any) => {
  const roleKey = isAdminTable ? userRole.role : 'role'
  const roleValue = isAdminTable
    ? userRole.role === administrator.role
      ? i18n.t(getRoleLabelKey(administrator.role))
      : i18n.t(`area.${userRole.countryIso}.listName`)
    : i18n.t(getRoleLabelKey(userRole.role))

  return {
    name: user.name,
    [roleKey]: `${roleValue}${user.invitationUuid ? ` - ${i18n.t('admin.invitationPending')}` : ''}`,
    email: user.email,
    loginEmail: user.loginEmail,
  }
}

export default UsersTableCSVExportButton
