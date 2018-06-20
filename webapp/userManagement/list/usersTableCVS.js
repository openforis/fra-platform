import React from 'react'
import * as R from 'ramda'

import { CSVLink } from 'react-csv'
import Icon from '../../reusableUiComponents/icon'

import { i18nUserRole } from '../../../common/userUtils'
import { getRoleLabelKey } from '../../../common/countryRole'
import { getFilterRoles } from './filter'

const UsersTableCSVExportButton = ({users, i18n, isAdminTable, filter, userInfo, getCountryName}) =>
  <CSVLink className="btn-s btn-primary"
           target="_blank"
           filename="FRA-Users.csv"
           data={csvData(users, i18n, isAdminTable, userInfo, getCountryName)}
           headers={isAdminTable
             ? adminCsvHeaders(i18n, filter)
             : csvHeaders(i18n)
           }>
    <Icon className="icon-sub icon-white" name="hit-down"/>CSV
  </CSVLink>

const csvHeaders = i18n => [
  {key: 'name', label: i18n.t('userManagement.name')},
  {key: 'role', label: i18n.t('userManagement.role')},
  {key: 'email', label: i18n.t('userManagement.email')},
  {key: 'loginEmail', label: i18n.t('userManagement.loginEmail')},
]

const adminCsvHeaders = (i18n, filter) => [
  {key: 'name', label: i18n.t('userManagement.name')},
  ...getFilterRoles(filter)
    .map(role => ({key: role, label: i18n.t(getRoleLabelKey(role))})),
  {key: 'email', label: i18n.t('userManagement.email')},
  {key: 'loginEmail', label: i18n.t('userManagement.loginEmail')},
]

const csvData = (users, i18n, isAdminTable, userInfo, getCountryName) =>
  R.map(
    user => ({
      name: user.name,
      role: userRoleCSVColumn(user, i18n, isAdminTable, userInfo, getCountryName),
      email: user.email,
      loginEmail: user.loginEmail
    })
    , users
  )

const adminCsvData = (users, i18n, adminRoles, userInfo, getCountryName) =>
  R.map(
    user => ({
      name: user.name,
      role: userRoleCSVColumn(user, i18n, isAdminTable, userInfo, getCountryName),
      email: user.email,
      loginEmail: user.loginEmail
    })
    , users
  )

const userRoleCSVColumn = (user, i18n, isAdminTable, userInfo, getCountryName) =>
  isAdminTable
    ? userRoles(user, i18n, userInfo, getCountryName)
    : i18nUserRole(i18n, user.role)

const userRoles = (user, i18n, userInfo, getCountryName) => {
  if (user.invitationUuid) {
    return userRole(i18n, getCountryName, userInfo.lang, user.role, [user.countryIso])
  } else {
    const roleCountries = R.groupBy(R.prop('role'), user.roles)
    return R.keys(roleCountries)
      .map(role => {
        const countryISOs = roleCountries[role].map(R.prop('countryIso'))
        return userRole(i18n, getCountryName, userInfo.lang, role, countryISOs)
      })
      .join(`\r\n\r\n`)
  }
}

const userRole = (i18n, getCountryName, lang, role, countryISOs) => {
  const countryNames = countryISOs
    .map(countryIso => getCountryName(countryIso, lang))
    .join(', ')

  return `${i18nUserRole(i18n, role)}\r\n${countryNames}`
}

export default UsersTableCSVExportButton
