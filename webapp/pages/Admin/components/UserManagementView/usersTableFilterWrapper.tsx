import React from 'react'

import { defaultFilter, filterUsers } from '@webapp/app/user/userManagement/list/filter'

import UsersTable from '@webapp/app/user/userManagement/list/usersTable'
import UsersTableFilter from './usersTableFilter'


class UsersTableFilterWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: defaultFilter,
    }
  }

  render() {
    const { users = [] } = this.props
    const filteredUsers = filterUsers(this.state.filter)(users)

    return (
      <div>
        <UsersTableFilter {...this.props} filter={this.state.filter} onChange={(filter) => this.setState({ filter })} />

        <UsersTable {...this.props} users={filteredUsers} filter={this.state.filter} />
      </div>
    )
  }
}

export default UsersTableFilterWrapper
