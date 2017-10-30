import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../app/loggedInPageTemplate'
import TextInput from '../reusableUiComponents/textInput'
import { reviewer, nationalCorrespondent, collaborator } from '../../common/countryRole'
import { getCountryName } from '../../common/country'

import { fetchUsers, updateUser, removeUser, updateNewUser, addNewUser } from './actions'
import { validationField } from './users'

const AddUserForm = ({countryIso, i18n, user, updateNewUser, addNewUser}) =>
  <div className="add-user__container">
    <table className="add-user__table">
      <tbody>
      <tr>
        <UserTextFieldCol
          countryIso={countryIso} i18n={i18n} user={user} field="name" updateUser={updateNewUser}/>
        <UserRoleSelectCol
          countryIso={countryIso} i18n={i18n} user={user} updateUser={updateNewUser}/>
        <UserTextFieldCol
          countryIso={countryIso} i18n={i18n} user={user} field="email" updateUser={updateNewUser}/>
        <td>
          <button className="btn btn-primary" onClick={() => addNewUser(countryIso)}>
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

const UsersTable = ({countryIso, i18n, users, updateUser, removeUser}) =>
  <table className="users-list__table">
    <thead>
      <tr>
        <th className="users-list__header-cell">{i18n.t('users.name')}</th>
        <th className="users-list__header-cell">{i18n.t('users.role')}</th>
        <th className="users-list__header-cell">{i18n.t('users.email')}</th>
        <th className="users-list__header-cell">{i18n.t('users.loginEmail')}</th>
        <th className="users-list__header-cell"></th>
      </tr>
    </thead>
    <tbody>
    {
      users.length > 0
        ? R.pipe(
            R.sortBy(R.compose(R.toLower, R.prop('name'))),
            R.map(user => <UserRow key={user.id} countryIso={countryIso} i18n={i18n} user={user} updateUser={updateUser} removeUser={removeUser}/>)
          )(users)
        : <tr>
            <td className="users-list__read-only-cell" colSpan="5">
              {i18n.t('users.noUsers')}
            </td>
          </tr>
    }
    </tbody>
  </table>

const UserRow = ({countryIso, i18n, user, updateUser, removeUser}) => {
  const readOnly = R.endsWith('ALL', user.role)

  return <tr>
    <UserTextFieldCol countryIso={countryIso} i18n={i18n} user={user} field="name" readOnly={readOnly} updateUser={updateUser}/>
    <UserRoleSelectCol countryIso={countryIso} i18n={i18n} user={user} readOnly={readOnly} updateUser={updateUser}/>
    <UserTextFieldCol countryIso={countryIso} i18n={i18n} user={user} field="email" readOnly={readOnly} updateUser={updateUser}/>
    <UserTextFieldCol countryIso={countryIso} i18n={i18n} user={user} field="loginEmail" readOnly={true} updateUser={updateUser}/>
    <td className="users-list__cell">
    {
      readOnly
        ? null
        : <button className="btn btn-s btn-destructive" onClick={() =>
            window.confirm(i18n.t('users.confirmDelete', {user: user.name, country: getCountryName(countryIso, i18n.language)}))
              ? removeUser(countryIso, user.id)
              : null
          }>
            {i18n.t('users.remove')}
          </button>
    }
    </td>
  </tr>
}

const UserTextFieldCol = ({countryIso, i18n, user, field, readOnly, updateUser}) =>
  <td className={`users-list__cell ${user[validationField(field)] === false ? 'error' : ''}`}>
  {
    readOnly
      ? <div className="users-list__read-only-cell">{user[field]}</div>
      : <TextInput placeholder={i18n.t(`users.${field}`)} value={user[field]}
                   onChange={e => updateUser(countryIso, user.id, field, e.target.value)}
                   disabled={user.saving}/>
  }
  </td>

const UserRoleSelectCol = ({countryIso, i18n, user, readOnly, updateUser}) =>
  <td className={`users-list__cell ${user[validationField('role')] === false ? 'error' : ''}`}>
  {
    readOnly
      ? <div className="users-list__read-only-cell">{i18n.t(`user.roles.${R.toLower(user.role)}`)}</div>
      : <div className="users-list__input-container validation-error-sensitive-field">
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
  }
  </td>

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

export default connect(mapStateToProps, {fetchUsers, updateUser, removeUser, updateNewUser, addNewUser})(UsersView)
