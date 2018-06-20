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
    const {roles, countries} = R.path(['state', 'filter'], this)

    const includeCountryRole = countryRole => R.isEmpty(roles)
      ? R.contains(countryRole.countryIso, countries)
      : R.isEmpty(countries)
        ? R.contains(countryRole.role, roles)
        : R.any(roleFilter =>
            R.any(countryFilter =>
              countryRole.role === roleFilter && countryRole.countryIso === countryFilter
              , countries)
          , roles)

    const filterFn = user => R.isEmpty(roles) && R.isEmpty(countries)
      ? true
      : R.any(
        includeCountryRole,
        user.invitationUuid ? [{...user}] : user.roles
      )

    return R.filter(filterFn, users)
  }

  render () {
    const filteredUsers = this.filterUsers()

    return <div>
      <UsersTableFilter {...this.props}
                        filter={this.state.filter}
                        onChange={filter => this.setState({filter})}/>

      <UsersTable {...this.props}
                  users={filteredUsers}
                  roles={R.path(['filter', 'roles'], this.state)}/>

    </div>
  }
}

export default UsersTableFilterWrapper
