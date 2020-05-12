import React from 'react'

import UsersTable from './usersTable'
import UsersTableFilter from './usersTableFilter'

import { defaultFilter, filterUsers } from './filter'

class UsersTableFilterWrapper extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      filter: defaultFilter
    }

  }

  render () {
    const {users = []} = this.props
    const filteredUsers = filterUsers(this.state.filter)(users)

    return <div>
      <UsersTableFilter {...this.props}
                        filter={this.state.filter}
                        onChange={filter => this.setState({filter})}/>

      <UsersTable {...this.props}
                  users={filteredUsers}
                  filter={this.state.filter}/>

    </div>
  }
}

export default UsersTableFilterWrapper
