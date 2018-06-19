import React from 'react'
import * as R from 'ramda'

import UsersTable from './usersTable'
import UsersTableFilter from './usersTableFilter'

class UsersTableFilterWrapper extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      filter: {
        countries: [],
        langs: [],
        roles: [],
      }
    }
  }

  filterUsers () {
    const {users = []} = this.props
    const {langs, roles, countries} = R.path(['state', 'filter'], this)

    const filterFn = user => {
      let include = true

      if (!R.isEmpty(langs)) {
        // TODO
      }

      if (!R.isEmpty(roles)) {

        //invitation
        if (user.invitationUuid)
          include = R.contains(user.role, roles)
        else
          include = R.any(
            countryRole => R.contains(countryRole.role, roles),
            user.roles
          )

      }

      return include
    }

    return R.filter(filterFn, users)
  }

  render () {
    const {i18n, onEditClick} = this.props
    const filteredUsers = this.filterUsers()

    return <div>
      <UsersTableFilter key="users-table-filter"
                        i18n={i18n}
                        filter={this.state.filter}
                        onChange={filter => this.setState({filter})}/>

      <UsersTable key="users-table"
                  {...this.props}
                  users={filteredUsers}
                  onEditClick={onEditClick}/>

    </div>
  }
}

export default UsersTableFilterWrapper
