import React from 'react'
import * as R from 'ramda'

import { CSVLink } from 'react-csv'
import Icon from '@webapp/components/icon'

import { administrator, getRoleLabelKey } from '@common/countryRole'
import { getFilterRoles, filterUserCountryRoles } from './filter'

const UsersTableCSVExportButton = ({users, i18n, isAdminTable = false, filter = {}, userInfo, getCountryName}) =>
  <CSVLink className="btn-s btn-primary"
           target="_blank"
           filename="FRA-Users.csv"
           data={csvTableData(users, i18n, getCountryName, userInfo.lang, isAdminTable, filter)}
           headers={csvHeaders(i18n, isAdminTable, filter)}>
    <Icon className="icon-sub icon-white" name="hit-down"/>CSV
  </CSVLink>

// ==== HEADERS
const csvHeaders = (i18n, isAdminTable, filter) => [
  {key: 'name', label: i18n.t('userManagement.name')},
  ...csvRoleHeaders(i18n, isAdminTable, filter),
  {key: 'email', label: i18n.t('userManagement.email')},
  {key: 'loginEmail', label: i18n.t('userManagement.loginEmail')},
]

const csvRoleHeaders = (i18n, isAdminTable, filter) =>
  isAdminTable
    ? getFilterRoles(filter)
      .map(role => ({key: role, label: i18n.t(getRoleLabelKey(role))}))
    : [{key: 'role', label: i18n.t('userManagement.role')}]

// ==== TABLE DATA
const csvTableData = (users, i18n, getCountryName, lang, isAdminTable, filter) =>
  isAdminTable
    ? adminCsvTableData(users, i18n, getCountryName, lang, filter)
    : users.map(user =>
      csvRowData(user, i18n, user, false, getCountryName, lang)
    )

const adminCsvTableData = (users, i18n, getCountryName, lang, filter) =>
  R.reduce(
    (rows, user) => {
      user.invitationUuid
        ? rows.push(
        csvRowData(user, i18n, user, true, getCountryName, lang)
        )
        : user.roles
          .forEach(userRole => rows.push(
            csvRowData(user, i18n, userRole, true, getCountryName, lang)
          ))

      return rows
    }
    , []
    , filterUserCountryRoles(filter)(users)
  )

const csvRowData = (user, i18n, userRole, isAdminTable, getCountryName, lang) => {
  const roleKey = isAdminTable ? userRole.role : 'role'
  const roleValue = isAdminTable
    ? userRole.role === administrator.role
      ? i18n.t(getRoleLabelKey(administrator.role))
      : getCountryName(userRole.countryIso, lang)
    : i18n.t(getRoleLabelKey(userRole.role))

  return {
    name: user.name,
    [roleKey]: `${roleValue}${user.invitationUuid ? ' - ' + i18n.t('admin.invitationPending') : ''}`,
    email: user.email,
    loginEmail: user.loginEmail
  }
}

export default UsersTableCSVExportButton
