import './style.less'

import React from 'react'
import {connect} from 'react-redux'
import * as R from 'ramda'

import AddUserForm from './addUserForm'

import {rolesAllowedToChange} from '../../../../common/userManagementAccessControl'
import {i18nUserRole} from '../../../../common/userUtils'

import {getCountryName} from '../../../country/actions'
import {fetchUsers, removeUser, persistUser, updateNewUser, addNewUser} from './actions'

const mapIndexed = R.addIndex(R.map)

const UserTable = ({userList, i18n, ...props}) =>
  <table className="user-list__table">
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
      userList.length > 0
        ? mapIndexed((user, i) => <UserRow key={i} i18n={i18n} user={user} {...props}/>, userList)
        : <tr>
          <td className="user-list__cell" colSpan="5">
            <div className="user-list__cell--read-only">{i18n.t('userManagement.noUsers')}</div>
          </td>
        </tr>
    }
    </tbody>
  </table>

class UserRow extends React.Component {

  constructor(props) {
    super(props)
    this.state = {editing: false}
  }

  toggleOpen() {
    this.setState({editing: !this.state.editing})
  }

  render() {
    const {countryIso, i18n, user, removeUser, persistUser, getCountryName} = this.props

    return <tr>
      <UserColumn user={user} field="name"/>
      <td className="user-list__cell">
        <div className="user-list__cell--read-only">{i18nUserRole(i18n, user.role)}</div>
      </td>
      <UserColumn user={user} field="email"/>
      <UserColumn user={user} field="loginEmail"/>

      <td className="user-list__cell user-list__edit-column">
        { // pending users cannot be edited
          user.invitationUuid
            ? null
            : <button className="btn-s btn-link" onClick={() => {
              if (this.state.editing) {
                persistUser(countryIso, user, true)
              }
              this.toggleOpen()
            }}>
              {this.state.editing ? i18n.t('userManagement.done') : i18n.t('userManagement.edit')}
            </button>
        }
        <button className="btn-s btn-link-destructive" disabled={this.state.editing} onClick={() =>
          window.confirm(i18n.t('userManagement.confirmDelete', {
            user: user.name,
            country: getCountryName(countryIso, i18n.language)
          }))
            ? removeUser(countryIso, user)
            : null
        }>
          {i18n.t('userManagement.remove')}
        </button>
      </td>
    </tr>
  }
}

const UserColumn = ({user, field}) => <td className="user-list__cell">
  <div className="user-list__cell--read-only">{user[field] ? user[field] : '\xA0'}</div>
</td>

class UsersView extends React.Component {

  componentWillMount() {
    this.fetch(this.props.match.params.countryIso)
  }

  componentWillReceiveProps(next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      this.fetch(next.match.params.countryIso)
  }

  fetch(countryIso) {
    this.props.fetchUsers(countryIso)
  }

  render() {
    const {match, userList, newUser, allowedRoles} = this.props
    const countryIso = match.params.countryIso

    return userList && !R.isEmpty(allowedRoles)
      ? <div>
        <AddUserForm {...this.props} user={newUser} countryIso={countryIso}/>
        <UserTable {...this.props} countryIso={countryIso}/>
      </div>
      : null
  }
}

const mapStateToProps = (state, props) =>
  ({
    i18n: state.user.i18n,
    userList: state.userManagement.list,
    allowedRoles: rolesAllowedToChange(props.match.params.countryIso, R.path(['user', 'userInfo'], state)),
    newUser: state.userManagement.newUser
  })

export default connect(mapStateToProps, {
  fetchUsers,
  removeUser,
  persistUser,
  updateNewUser,
  addNewUser,
  getCountryName
})(UsersView)
