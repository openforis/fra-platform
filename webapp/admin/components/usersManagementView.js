import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import EditUserForm from '../../user/editUserComponents/editUserForm'

import { fetchAllUsers } from '../../userManagement/actions'

import {
  alternateNationalCorrespondent,
  collaborator,
  nationalCorrespondent,
  reviewer
} from '../../../common/countryRole'

import { i18nUserRole } from '../../../common/userUtils'

const UserTable = ({users, i18n, ...props}) =>
  users
    ? <table className="user-list__table">

      <thead>
      <tr>
        <th className="user-list__header-cell">{i18n.t('userManagement.name')}</th>
        <th className="user-list__header-cell">{i18n.t('userManagement.role')}</th>
        <th className="user-list__header-cell">{i18n.t('userManagement.email')}</th>
        <th className="user-list__header-cell">{i18n.t('userManagement.loginEmail')}</th>
        <th className="user-list__header-cell user-list__edit-column"/>
      </tr>
      </thead>

      <tbody>
      {
        users.length > 0
          ? users.map((user, i) =>
            <UserRow key={i} i18n={i18n} user={user} {...props}/>
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
      sendInvitationEmail
    } = this.props

    return < tr className={user.invitationUuid ? 'user-list__invitation-row' : ''}>
      <UserColumn user={user} field="name"/>
      <td className="user-list__cell">
        {/*<div className="user-list__cell--read-only">{i18nUserRole(i18n, user.role)}</div>*/}
      </td>
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
              ? removeUser(countryIso, user)
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

const UsersCount = ({i18n, userCounts}) =>
  <div className="user-counts__container">
    {
      userCounts
        ? [
          nationalCorrespondent.role,
          alternateNationalCorrespondent.role,
          collaborator.role,
          reviewer.role
        ]
          .map(role =>
            <div key={role} className="user-counts__item">
              {`${userCounts[role]} ${i18nUserRole(i18n, role, Number(userCounts[role]))}`}
            </div>
          )
        : null
    }
  </div>

class UsersManagementView extends React.Component {

  fetchUsers () {
    this.props.fetchAllUsers()
  }

  componentWillReceiveProps (next) {
    // edit user is completed, reloading users and resetting state
    if (R.prop('editUserStatus', next) === 'completed' && R.prop('editUserStatus', this.props) === 'loaded') {
      this.setState({editingUserId: null})
      this.fetchUsers()
    }
  }

  componentDidMount () {
    this.fetchUsers()
  }

  render () {
    const {i18n, allUsers, userCounts, countryIso} = this.props
    const onEditClick = userId => this.setState({editingUserId: userId})

    const editingUserId = R.path(['state', 'editingUserId'], this)

    return editingUserId
      ? <EditUserForm userId={editingUserId}
                      countryIso={countryIso}
                      onCancel={() => this.setState({editingUserId: null})}
      />
      : <div>
        <UserTable {...this.props} users={allUsers} onEditClick={onEditClick}/>
        <UsersCount i18n={i18n} userCounts={userCounts}/>
      </div>
  }

}

const mapStateToProps = (state, props) =>
  ({
    i18n: state.user.i18n,
    allUsers: state.userManagement.allUsers,
    userCounts: state.userManagement.userCounts,
    editUserStatus: R.path(['user', 'editUser', 'status'], state),
    countryIso: R.path(['match', 'params', 'countryIso'], props)
  })

export default connect(mapStateToProps, {fetchAllUsers})(UsersManagementView)
