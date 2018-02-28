import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import AddUserForm from './addUserForm'
import EditUserForm from '../../../user/editUserComponents/editUserForm'

import { rolesAllowedToChange } from '../../../../common/userManagementAccessControl'
import { i18nUserRole } from '../../../../common/userUtils'
import { isAdministrator } from '../../../../common/countryRole'

import { getCountryName } from '../../../country/actions'
import { fetchUsers, removeUser, updateNewUser, addNewUser } from './actions'

const mapIndexed = R.addIndex(R.map)

const UserTable = ({users, i18n, showRole = true, ...props}) =>
  <table className="user-list__table">
    <thead>
    <tr>
      <th className="user-list__header-cell">{i18n.t('userManagement.name')}</th>
      {
        showRole
          ? <th className="user-list__header-cell">{i18n.t('userManagement.role')}</th>
          : null
      }
      <th className="user-list__header-cell">{i18n.t('userManagement.email')}</th>
      <th className="user-list__header-cell">{i18n.t('userManagement.loginEmail')}</th>
      <th className="user-list__header-cell user-list__edit-column"/>
    </tr>
    </thead>
    <tbody>
    {
      users.length > 0
        ? mapIndexed((user, i) => <UserRow key={i} i18n={i18n} user={user} showRole={showRole} {...props}/>, users)
        : <tr>
          <td className="user-list__cell" colSpan="5">
            <div className="user-list__cell--read-only">{i18n.t('userManagement.noUsers')}</div>
          </td>
        </tr>
    }
    </tbody>
  </table>

const UserRow = ({countryIso, i18n, user, removeUser, onEditClick, getCountryName, showRole}) =>
  <tr>
    <UserColumn user={user} field="name"/>
    {
      showRole
        ? <td className="user-list__cell">
          <div className="user-list__cell--read-only">{i18nUserRole(i18n, user.role)}</div>
        </td>
        : null
    }
    <UserColumn user={user} field="email"/>
    <UserColumn user={user} field="loginEmail"/>

    <td className="user-list__cell user-list__edit-column">
      { // pending users cannot be edited
        user.invitationUuid
          ? null
          : <button className="btn-s btn-link"
                    onClick={() => onEditClick(user.id)}>
            {i18n.t('userManagement.edit')}
          </button>
      }
      <button className="btn-s btn-link-destructive" onClick={() =>
        window.confirm(i18n.t('userManagement.confirmDelete', {user: user.name}))
          ? removeUser(countryIso, user)
          : null
      }>
        {i18n.t('userManagement.remove')}
      </button>
    </td>
  </tr>

const UserColumn = ({user, field}) => <td className="user-list__cell">
  <div className="user-list__cell--read-only">{user[field] ? user[field] : '\xA0'}</div>
</td>

class UsersView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    this.fetch(this.props.match.params.countryIso)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      this.fetch(next.match.params.countryIso)
    // edit user is completed, reloading users and resetting state
    if (R.prop('editUserStatus', next) === 'completed' && R.prop('editUserStatus', this.props) === 'loaded') {
      this.setState({editingUserId: null})
      this.fetch(next.match.params.countryIso)
    }
  }

  fetch (countryIso) {
    this.props.fetchUsers(countryIso)
  }

  render () {
    const {match, countryUsers, allUsers, newUser, allowedRoles, i18n} = this.props
    const countryIso = match.params.countryIso

    const onEditClick = (userId) => this.setState({editingUserId: userId})

    return countryUsers && !R.isEmpty(allowedRoles)
      ? this.state.editingUserId
        ? <EditUserForm
          userId={this.state.editingUserId}
          countryIso={countryIso}
          onCancel={() => this.setState({editingUserId: null})}
        />
        : <div>
          <AddUserForm {...this.props} user={newUser} countryIso={countryIso}/>
          <UserTable {...this.props} users={countryUsers} countryIso={countryIso} onEditClick={onEditClick}/>
          {
            allUsers
              ? <div className="user-list__other-users-container">
                <h3 className="user-list__other-users-title">{i18n.t('userManagement.allUsers')}</h3>
                <UserTable {...this.props} users={allUsers} showRole={false} countryIso={countryIso}
                           onEditClick={onEditClick}/>
              </div>
              : null
          }
        </div>
      : null
  }
}

const mapStateToProps = (state, props) =>
  ({
    i18n: state.user.i18n,
    countryUsers: state.userManagement.countryUsers,
    allUsers: isAdministrator(state.user.userInfo)
      ? state.userManagement.allUsers
      : null,
    allowedRoles: rolesAllowedToChange(props.match.params.countryIso, R.path(['user', 'userInfo'], state)),
    newUser: state.userManagement.newUser,
    editUserStatus: R.path(['user', 'editUser', 'status'], state)
  })

export default connect(mapStateToProps, {
  fetchUsers,
  removeUser,
  updateNewUser,
  addNewUser,
  getCountryName
})(UsersView)
