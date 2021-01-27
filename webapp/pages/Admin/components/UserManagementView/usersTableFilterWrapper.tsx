import React from 'react'

import { defaultFilter, filterUsers } from '@webapp/app/user/userManagement/list/filter'

import UsersTable from '@webapp/app/user/userManagement/list/usersTable'
import UsersTableFilter from './usersTableFilter'

type State = any

class UsersTableFilterWrapper extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {
      filter: defaultFilter,
    }
  }

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'users' does not exist on type 'Readonly<... Remove this comment to see the full error message
    const { users = [] } = this.props
    const filteredUsers = filterUsers(this.state.filter)(users)

    return (
      <div>
        <UsersTableFilter
          {...this.props}
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          filter={this.state.filter}
          onChange={(filter: any) => this.setState({ filter })}
        />

        <UsersTable {...this.props} users={filteredUsers} filter={this.state.filter} />
      </div>
    )
  }
}

export default UsersTableFilterWrapper
