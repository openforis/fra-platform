import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TextInput from '../reusableUiComponents/textInput'
import { reviewer, nationalCorrespondent, collaborator } from '../../common/countryRole'

import { fetchUsers, updateUser, removeUser } from './actions'

const AddUserForm = ({countryIso, i18n, user}) =>
  <div className="users__add-user-container">
    <table className="users__add-user-table">
      {/*<thead>*/}
      {/*<tr className="users__add-user-table-header-row">*/}
      {/*<th colSpan="4">{i18n.t('users.addNewUser')}</th>*/}
      {/*</tr>*/}
      {/*</thead>*/}
      <tbody>
      <tr className="users__add-user-table-row">
        <td>
          <UserTextField countryIso={countryIso} i18n={i18n} user={user} field="name"/>
        </td>
        <td>
          <UserRoleSelect countryIso={countryIso} i18n={i18n} user={user}/>
        </td>
        <td>
          <UserTextField countryIso={countryIso} i18n={i18n} user={user} field="email"/>
        </td>
        <td>
          <button className="btn btn-primary" onClick={() => null}>
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
  <table className="users__list-table">
    <thead>
    <tr className='users__list-table-header-row'>
      <th>{i18n.t('users.name')}</th>
      <th>{i18n.t('users.role')}</th>
      <th>{i18n.t('users.email')}</th>
      <th>{i18n.t('users.loginEmail')}</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    {
      users.length > 0
        ? users.map(user =>
          <UserRow key={user.id} countryIso={countryIso} i18n={i18n} user={user}
                   updateUser={updateUser} removeUser={removeUser}/>
        )
        : <tr className="users__list-table-row">
          <td className="users__list-table-empty" colSpan="5">{i18n.t('users.noUsers')}</td>
        </tr>
    }
    </tbody>
  </table>

const UserRow = ({countryIso, i18n, user, updateUser, removeUser}) => {
  const readOnly = R.endsWith('ALL', user.role)

  return <tr className={`users__list-table-row${readOnly ? ' read-only' : ''}`}>
    <td>
      <UserTextField
        countryIso={countryIso} i18n={i18n} user={user} field="name" readOnly={readOnly} updateUser={updateUser}/>
    </td>
    <td>{
      readOnly
        ? <div className="users__list-table-read-only-cell">{i18n.t(`user.roles.${R.toLower(user.role)}`)}</div>
        : <UserRoleSelect countryIso={countryIso} i18n={i18n} user={user} updateUser={updateUser}/>
    }</td>
    <td>
      <UserTextField
        countryIso={countryIso} i18n={i18n} user={user} field="email" readOnly={readOnly} updateUser={updateUser}/>
    </td>
    <td>
      <div className="users__list-table-read-only-cell">{user.loginEmail}</div>
    </td>
    <td>
      {
        readOnly
          ? null
          : <span className="btn btn-destructive" onClick={e => removeUser(countryIso, user.id)}>
              {i18n.t('users.remove')}
            </span>
      }
    </td>
  </tr>
}

const UserTextField = ({countryIso, i18n, user, field, readOnly, updateUser}) =>
  readOnly
    ? <div className="users__list-table-read-only-cell">{user[field]}</div>
    : <TextInput placeholder={i18n.t(`users.${field}`)} value={user[field]} onChange={e => updateUser(countryIso, user.id, field, e.target.value)}/>

const UserRoleSelect = ({countryIso, i18n, user, updateUser}) =>
  <select required
    className="fra-table__select"
    value={user.role}
    onChange={e => updateUser(countryIso, user.id, 'role', e.target.value)}>
    {user.role === '' ? <option value="">{i18n.t('users.role')}</option> : null}
    <option value={reviewer.role}>{i18n.t(reviewer.labelKey)}</option>
    <option value={nationalCorrespondent.role}>{i18n.t(nationalCorrespondent.labelKey)}</option>
    <option value={collaborator.role}>{i18n.t(collaborator.labelKey)}</option>
  </select>

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
    const {i18n, match, users} = this.props

    return users
      ? <LoggedInPageTemplate>
        <div className="fra-view__content">
          <h1 className="title">{i18n.t('users.manageUsers')}</h1>
          <AddUserForm {...this.props} user={{name: '', email: '', role: ''}}/>
          <UsersTable {...this.props} countryIso={match.params.countryIso}/>
        </div>
      </LoggedInPageTemplate>
      : null
  }
}

const mapStateToProps = state =>
  ({
    i18n: state.user.i18n,
    users: state.users.list
  })

export default connect(mapStateToProps, {fetchUsers, updateUser, removeUser})(UsersView)
