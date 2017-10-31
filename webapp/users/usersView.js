import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../app/loggedInPageTemplate'
import TextInput from '../reusableUiComponents/textInput'
import { reviewer, nationalCorrespondent, collaborator } from '../../common/countryRole'
import { getCountryName } from '../../common/country'

import { fetchUsers, updateUser, removeUser, persistUser, updateNewUser, addNewUser } from './actions'
import { validField } from './users'

const UsersTable = ({users, i18n, ...props}) =>
  <table className="users-list__table">
    <thead>
      <tr>
        <th className="users-list__header-cell">{i18n.t('users.name')}</th>
        <th className="users-list__header-cell">{i18n.t('users.role')}</th>
        <th className="users-list__header-cell">{i18n.t('users.email')}</th>
        <th className="users-list__header-cell">{i18n.t('users.loginEmail')}</th>
        <th className="users-list__header-cell user-list__edit-column"></th>
      </tr>
    </thead>
    <tbody>
    {
      users.length > 0
        ? R.map(user => <UserRow key={user.id} i18n={i18n} user={user} {...props}/> , users)
        : <tr>
            <td className="users-list__read-only-cell" colSpan="5">
              {i18n.t('users.noUsers')}
            </td>
          </tr>
    }
    </tbody>
  </table>

const UserTextFieldCol = ({countryIso, i18n, user, field, editing, readOnly, updateUser, validate}) =>
  <td className={`users-list__cell ${validate ? '' : 'error'} ${editing ? 'editing' : ''}`}>
  {
    editing
      ? <TextInput placeholder={i18n.t(`users.${field}`)} value={user[field]}
                   onChange={e => updateUser(countryIso, user.id, field, e.target.value)}
                   disabled={user.saving}/>
      : readOnly
        ? <div className="users-list__cell--read-only">{user[field] ? user[field] : '\xA0' }</div>
        : <div className="users-list__cell--editable">{user[field]}</div>
  }
  </td>

const UserRoleSelectCol = ({countryIso, i18n, user, editing, readOnly, updateUser, validate}) =>
  <td className={`users-list__cell ${validate ? '' : 'error'} ${editing ? 'editing' : ''}`}>
  {
    editing
      ? <div className="users-list__input-container validation-error-sensitive-field">
          <select required
                  className="fra-table__select"
                  value={user.role}
                  onChange={e => updateUser(countryIso, user.id, 'role', e.target.value)}
                  disabled={user.saving}>
            {user.role === '' ? <option value="" hidden>{i18n.t('users.role')}</option> : null}
            <option value={reviewer.role}>{i18n.t(reviewer.labelKey)}</option>
            <option value={nationalCorrespondent.role}>{i18n.t(nationalCorrespondent.labelKey)}</option>
            <option value={collaborator.role}>{i18n.t(collaborator.labelKey)}</option>
          </select>
        </div>
      : readOnly
        ? <div className="users-list__cell--read-only">{i18n.t(`user.roles.${R.toLower(user.role)}`)}</div>
        : <div className="users-list__cell--editable">{i18n.t(`user.roles.${R.toLower(user.role)}`)}</div>
  }
  </td>



class AddUserForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {adding: false}
  }

  render () {
    const {countryIso, i18n, user, updateNewUser, addNewUser} = this.props
    const validateFunc = (user, field) => this.state.adding ? validField(user, field) : () => true
    return <div className="add-user__container">
      <table className="add-user__table">
        <tbody>
        <tr>
          <UserTextFieldCol countryIso={countryIso} i18n={i18n} user={user} field="name" editing={true} readOnly={false} updateUser={updateNewUser} validate={validateFunc(user, 'name')}/>
          <UserRoleSelectCol countryIso={countryIso} i18n={i18n} user={user} field="role" editing={true} readOnly={false} updateUser={updateNewUser} validate={validateFunc(user, 'role')}/>
          <UserTextFieldCol countryIso={countryIso} i18n={i18n} user={user} field="email" editing={true} readOnly={false} updateUser={updateNewUser} validate={validateFunc(user, 'email')}/>
          <td>
            <button className="btn btn-primary" onClick={() => {
              this.setState({adding: true})
              addNewUser(countryIso)
              this.setState({adding: false})
            }}>
              <svg className="icon icon-sub icon-white">
                <use xlinkHref="img/icons.svg#small-add"/>
              </svg>
              {i18n.t('users.addUser')}
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  }
}

class UserRow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {editing: false}
  }

  toggleOpen () {
    this.setState({editing: !this.state.editing})
  }

  render () {
    const {countryIso, i18n, user, updateUser, removeUser, persistUser} = this.props
    const readOnly = R.endsWith('ALL', user.role)
    const editing = this.state.editing && !readOnly
    return <tr>
      <UserTextFieldCol countryIso={countryIso} i18n={i18n} user={user} field="name" editing={editing} readOnly={readOnly} updateUser={updateUser} validate={validField(user, 'name')}/>
      <UserRoleSelectCol countryIso={countryIso} i18n={i18n} user={user} field="role" editing={editing} readOnly={readOnly} updateUser={updateUser} validate={validField(user, 'role')}/>
      <UserTextFieldCol countryIso={countryIso} i18n={i18n} user={user} field="email" editing={editing} readOnly={readOnly} updateUser={updateUser} validate={validField(user, 'email')}/>
      <UserTextFieldCol countryIso={countryIso} i18n={i18n} user={user} field="loginEmail" editing={false} readOnly={true} updateUser={updateUser}/>
      <td className="users-list__cell user-list__edit-column">
        {
          readOnly
            ? null
            : <div>
                <button className="btn btn-s btn-link" onClick={() => {
                  if (this.state.editing) {
                    persistUser(countryIso, user, true)
                  }
                  this.toggleOpen()
                }}>
                  {this.state.editing ? 'Done' : 'Edit'}
                </button>
                <button className="btn btn-s btn-destructive" onClick={() =>
                  window.confirm(i18n.t('users.confirmDelete', {user: user.name, country: getCountryName(countryIso, i18n.language)}))
                    ? removeUser(countryIso, user.id)
                    : null
                }>
                  Delete
                </button>
              </div>
        }
        </td>
    </tr>
  }
}

class UsersView extends React.Component {

  componentWillMount () {
    this.fetch(this.props.match.params.countryIso)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      this.fetch(next.match.params.countryIso)
  }

  fetch (countryIso) {
    this.props.fetchUsers(countryIso)
  }

  render () {
    const {i18n, match, users, newUser} = this.props

    return users
      ? <LoggedInPageTemplate>
          <div className="fra-view__content">
            <div className="fra-view__page-header">
              <h1 className="title">{i18n.t('users.manageUsers')}</h1>
            </div>
            <AddUserForm {...this.props} user={newUser} countryIso={match.params.countryIso}/>
            <UsersTable {...this.props} countryIso={match.params.countryIso}/>
          </div>
        </LoggedInPageTemplate>
      : null
  }
}

const mapStateToProps = state =>
  ({
    i18n: state.user.i18n,
    users: state.users.list,
    newUser: state.users.newUser
  })

export default connect(mapStateToProps, {fetchUsers, updateUser, removeUser, persistUser, updateNewUser, addNewUser})(UsersView)
