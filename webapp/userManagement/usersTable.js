import React from 'react'

import Icon from '../reusableUiComponents/icon'

import { i18nUserRole } from '../../common/userUtils'

const UsersTable = ({users, i18n, isAdminTable = false, ...props}) =>
  users
    ? <table className="user-list__table">

      <thead>
      <tr>
        <th className="user-list__header-cell">{i18n.t('userManagement.name')}</th>
        {
          isAdminTable
            ? null
            : <th className="user-list__header-cell">{i18n.t('userManagement.role')}</th>
        }
        <th className="user-list__header-cell">{i18n.t('userManagement.email')}</th>
        <th className="user-list__header-cell">{i18n.t('userManagement.loginEmail')}</th>
        <th className="user-list__header-cell user-list__edit-column"/>
      </tr>
      </thead>

      <tbody>
      {
        users.length > 0
          ? users.map((user, i) =>
            <UserRow key={i} i18n={i18n} user={user} isAdminTable={isAdminTable} {...props}/>
          )
          : <tr>
            <td className="user-list__cell" colSpan="5">
              <div className="user-list__cell--read-only">{i18n.t('userManagement.noUsers')}</div>
            </td>
          </tr>
      }
      </tbody>

    </table>
    : null

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
      sendInvitationEmail,
      isAdminTable
    } = this.props

    return <tr className={user.invitationUuid ? 'user-list__invitation-row' : ''}>
      <UserColumn user={user} field="name"/>

      {
        isAdminTable
          ? null
          : <td className="user-list__cell">
            <div className="user-list__cell--read-only">{i18nUserRole(i18n, user.role)}</div>
          </td>
      }

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
            ? <div className="user-list__invitation-info">
              <div>
                <div>{i18n.t('userManagement.invitationLink')}: {user.invitationLink}</div>
                <div style={{textAlign: 'center'}}>
                  <button className="btn-s btn-link"
                          onClick={() => {
                            sendInvitationEmail(countryIso, user.invitationUuid)
                            this.setState({showInvitationInfo: null})
                          }}>
                    {i18n.t('userManagement.sendInvitation')}
                  </button>
                </div>
              </div>
              <a onClick={() => this.setState({showInvitationInfo: null})}>
                <Icon name="remove" className="icon-close"/>
              </a>
            </div>
            : null
        }

      </td>
    </tr>

  }
}

const UserColumn = ({user, field}) => <td className="user-list__cell">
  <div className="user-list__cell--read-only">{user[field] ? user[field] : '\xA0'}</div>
</td>

export default UsersTable
