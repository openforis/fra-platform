import React from 'react'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import { connect } from 'react-redux'

import { fetchUsers } from './actions'
import * as R from 'ramda'

const UsersTable = ({i18n, users}) =>
  <table className="odp-list__list-table">
    <thead>
    <tr className='odp-list__header-row'>
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
        : <tr className="odp-list__list-row">
          <td className="odp_list__empty-column" colSpan="4">{i18n.t('users.noUsers')}</td>
        </tr>
    }
    </tbody>
  </table>

const UserRow = ({i18n, user}) =>
  <tr className="odp-list__list-row">
    <td>{user.name}</td>
    <td>{user.role}</td>
    <td>{user.email}</td>
    <td>{user.loginEmail}</td>
    <td></td>
  </tr>

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
