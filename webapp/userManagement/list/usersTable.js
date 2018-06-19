import React from 'react'
import * as R from 'ramda'

import UsersTableCSVExportButton from './usersTableCVS'
import Icon from '../../reusableUiComponents/icon'

import { i18nUserRole } from '../../../common/userUtils'

const UsersTable = ({users, i18n, isAdminTable = false, ...props}) =>
  users
    ? <table className="user-list__table">

      <thead>
      <tr>
        <th className="user-list__header-cell">{i18n.t('userManagement.name')}</th>
        <th className="user-list__header-cell">{i18n.t('userManagement.role')}</th>
        <th className="user-list__header-cell">{i18n.t('userManagement.email')}</th>
        <th className="user-list__header-cell">{i18n.t('userManagement.loginEmail')}</th>
        <th className="user-list__header-cell user-list__edit-column">
          <UsersTableCSVExportButton i18n={i18n} users={users} isAdminTable={isAdminTable} {...props}/>
        </th>
      </tr>
      </thead>

      <tbody>
      {
        users.length > 0
          ? users.map((user, i) => <UserRow key={i} i18n={i18n} user={user} isAdminTable={isAdminTable} {...props}/>)
          : <NoUsersRow i18n={i18n}/>
      }
      </tbody>

    </table>
    : null

const NoUsersRow = ({i18n}) => <tr>
  <td className="user-list__cell" colSpan="5">
    <div className="user-list__cell--read-only">{i18n.t('userManagement.noUsers')}</div>
  </td>
</tr>

class UserRow extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    const {
      countryIso,
      i18n,
      user,
      removeUser,
      onEditClick,
      userInfo,
      isAdminTable,
      getCountryName
    } = this.props

    return <tr className={user.invitationUuid ? 'user-list__invitation-row' : ''}>

      <UserColumn user={user} field="name"/>
      <UserRoleColumn user={user}
                      i18n={i18n}
                      isAdminTable={isAdminTable}
                      userInfo={userInfo}
                      getCountryName={getCountryName}/>
      <UserColumn user={user} field="email"/>
      <UserColumn user={user} field="loginEmail"/>

      <td className="user-list__cell user-list__edit-column">
        { // pending users cannot be edited
          user.invitationUuid
            ? <button className="btn-s btn-link"
                      onClick={() => this.setState({showInvitationInfo: true})}>
              {i18n.t('userManagement.info')}
            </button>
            : <button className="btn-s btn-link"
                      onClick={() => onEditClick(user.id)}>
              {i18n.t('userManagement.edit')}
            </button>
        }
        <button
          className="btn-s btn-link-destructive"
          disabled={userInfo.id === user.id}
          onClick={() =>
            window.confirm(i18n.t('userManagement.confirmDelete', {user: user.name}))
              ? removeUser(countryIso, user, isAdminTable)
              : null
          }>
          {i18n.t('userManagement.remove')}
        </button>

        {
          this.state.showInvitationInfo
            ? <UserInvitationInfo {...this.props} onClose={() => this.setState({showInvitationInfo: null})}/>
            : null
        }

      </td>
    </tr>

  }
}

const UserInvitationInfo = ({i18n, countryIso, user, sendInvitationEmail, onClose}) => <div
  className="user-list__invitation-info">
  <div>
    <div>{i18n.t('userManagement.invitationLink')}: {user.invitationLink}</div>
    <div style={{textAlign: 'center'}}>
      <button className="btn-s btn-link"
              onClick={() => {
                sendInvitationEmail(countryIso, user.invitationUuid)
                onClose()
              }}>
        {i18n.t('userManagement.sendInvitation')}
      </button>
    </div>
  </div>
  <a onClick={onClose}>
    <Icon name="remove" className="icon-close"/>
  </a>
</div>

const UserColumn = ({user, field}) => <td className="user-list__cell">
  <div className="user-list__cell--read-only">{user[field] ? user[field] : '\xA0'}</div>
</td>

const UserRoleColumn = ({user, i18n, isAdminTable, userInfo, getCountryName}) => <td className="user-list__cell">
  <div className="user-list__cell--read-only">
    {
      isAdminTable
        ? userRoles(user, i18n, userInfo, getCountryName)
        : i18nUserRole(i18n, user.role)
    }
  </div>
</td>

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
  }
}

const userRole = (i18n, getCountryName, lang, role, countryISOs) => <div key={role}>
  <div className="user-counts__item">
    {i18nUserRole(i18n, role)}
  </div>
  <div>
    {
      countryISOs.map(countryIso =>
        getCountryName(countryIso, lang)
      ).join(', ')
    }
  </div>
</div>

export default UsersTable
