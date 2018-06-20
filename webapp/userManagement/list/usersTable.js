import React from 'react'
import * as R from 'ramda'

import UsersTableCSVExportButton from './usersTableCVS'
import Icon from '../../reusableUiComponents/icon'

import { administrator, roleKeys, getRoleLabelKey } from '../../../common/countryRole'

const adminRoles = (roles = []) => R.isEmpty(roles) ? roleKeys : roles

const UsersTable = ({users, i18n, isAdminTable = false, ...props}) =>
  users
    ? <table className="user-list__table">

      <UsersTableHeadRow i18n={i18n} users={users} isAdminTable={isAdminTable} {...props}/>

      <tbody>
      {
        users.length > 0
          ? users.map((user, i) => <UserRow key={i} i18n={i18n} user={user} isAdminTable={isAdminTable} {...props}/>)
          : <NoUsersRow i18n={i18n}/>
      }
      </tbody>

    </table>
    : null

const UsersTableHeadRow = ({users, i18n, isAdminTable, ...props}) =>
  <thead>
  <tr>
    <th className="user-list__header-cell">{i18n.t('userManagement.name')}</th>
    {
      isAdminTable
        ? adminRoles(props.roles).map(role =>
          <th key={role} className="user-list__header-cell">{i18n.t(getRoleLabelKey(role))}</th>
        )
        : <th className="user-list__header-cell">{i18n.t('userManagement.role')}</th>
    }
    <th className="user-list__header-cell">{i18n.t('userManagement.email')}</th>
    {
      isAdminTable
        ? null
        : <th className="user-list__header-cell">{i18n.t('userManagement.loginEmail')}</th>
    }
    <th className="user-list__header-cell user-list__edit-column">
      <UsersTableCSVExportButton i18n={i18n} users={users} isAdminTable={isAdminTable} {...props}/>
    </th>
  </tr>
  </thead>

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
      getCountryName,
      roles
    } = this.props

    return <tr className={user.invitationUuid ? 'user-list__invitation-row' : ''}>

      <UserColumn user={user} field="name"/>

      {
        isAdminTable
          ? adminRoles(roles).map(role =>
            <UserRoleColumn user={user} i18n={i18n}
                            lang={userInfo.lang} getCountryName={getCountryName}
                            isAdminTable={isAdminTable}
                            key={role} role={role}/>
          )
          : <UserRoleColumn user={user} i18n={i18n}
                            isAdminTable={isAdminTable}
                            lang={userInfo.lang} getCountryName={getCountryName}/>

      }

      <UserColumn user={user} field="email"/>

      {
        isAdminTable
          ? null
          : <UserColumn user={user} field="loginEmail"/>
      }

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

const UserRoleColumn = ({i18n, user, role = null, lang, getCountryName, isAdminTable}) => {

  const roleLabel = userRole => i18n.t(getRoleLabelKey(userRole.role))

  const invitationColumnValue = user => isAdminTable
    ? user.role === role
      ? getCountryName(user.countryIso, lang)
      : null
    : roleLabel(user)

  return <td className="user-list__cell">
    <div className="user-list__cell--read-only">
      {
        user.invitationUuid
          ? invitationColumnValue(user)
          : isAdminTable
          ? R.pipe(
            R.filter(userRole => role ? userRole.role === role : role),
            R.map(userRole => userRole.role === administrator.role
              ? roleLabel(userRole)
              : i18n.t(getCountryName(userRole.countryIso, lang))
            ),
            R.join(', ')
          )(user.roles)
          : roleLabel(user)
      }
    </div>
  </td>
}

export default UsersTable
