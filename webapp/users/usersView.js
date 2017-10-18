import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TextInput from '../reusableUiComponents/textInput'
import { reviewer, nationalCorrespondent, collaborator } from '../../common/countryRole'

import { fetchUsers } from './actions'

const UsersTable = ({i18n, users}) =>
  <table className="users__list-table">
    <thead>
    <tr className='users__list-table-header-row'>
      <th>{i18n.t('users.name')}</th>
      <th>{i18n.t('users.role')}</th>
      <th>{i18n.t('users.email')}</th>
      <th>{i18n.t('users.login')}</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    {
      users.length > 0
        ? users.map(user =>
          <UserRow key={user.id} i18n={i18n} user={user}/>
        )
        : <tr className="users__list-table-row">
          <td className="users__list-table-empty" colSpan="4">{i18n.t('users.noUsers')}</td>
        </tr>
    }
    </tbody>
  </table>

const UserRow = ({i18n, user}) => {
  const readOnly = R.endsWith('ALL', user.role)

  return <tr className={`users__list-table-row${readOnly ? ' read-only' : ''}`}>
    <td>
      <UserTextField i18n={i18n} user={user} field="name" readOnly={readOnly}/>
    </td>
    <td>{
      readOnly
        ? <div className="users__list-table-read-only-cell">{i18n.t(`user.roles.${R.toLower(user.role)}`)}</div>
        : <UserRoleSelect i18n={i18n} user={user}/>
    }</td>
    <td>
      <UserTextField i18n={i18n} user={user} field="email" readOnly={readOnly}/>
    </td>
    <td>
      {user.loginEmail}
    </td>
    <td></td>
  </tr>
}

const UserTextField = ({i18n, user, field, readOnly}) =>
  readOnly
    ? <div className="users__list-table-read-only-cell">{user[field]}</div>
    : <TextInput value={user[field]} onChange={e => console.log(e.target.value)}/>

const UserRoleSelect = ({i18n, user}) =>
  <select
    className="fra-table__select"
    value={user.role}
    onChange={e => console.log(e.target.value)}>
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
    const {i18n} = this.props

    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <h1 className="title">{i18n.t('users.manageUsers')}</h1>
        <UsersTable {...this.props}/>
      </div>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state =>
  ({
    i18n: state.user.i18n,
    users: state.users
  })

export default connect(mapStateToProps, {fetchUsers})(UsersView)
