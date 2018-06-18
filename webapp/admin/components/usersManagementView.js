import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import UsersTable from '../../userManagement/list/usersTable'
import UsersCount from './usersCount'
import UsersTableFilter from './usersTableFilter'
import EditUserForm from '../../userManagement/edit/editUserForm'

import { fetchAllUsers, removeUser, sendInvitationEmail } from '../../userManagement/actions'
import { getCountryName } from '../../country/actions'

class UsersManagementView extends React.Component {

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

  componentWillReceiveProps (next) {
    // edit user is completed, reloading users and resetting state
    if (R.prop('editUserStatus', next) === 'completed' && R.prop('editUserStatus', this.props) === 'loaded') {
      this.setState({editingUserId: null})
      this.fetchUsers()
    }
  }

  componentDidMount () {
    this.fetchUsers()
  }

  fetchUsers () {
    this.props.fetchAllUsers()
  }

  filterUsers () {
    const {allUsers = []} = this.props
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

    return R.filter(filterFn, allUsers)
  }

  render () {
    const {i18n, userCounts, countryIso} = this.props
    const users = this.filterUsers()

    const onEditClick = userId => this.setState({editingUserId: userId})
    const editingUserId = R.path(['state', 'editingUserId'], this)

    return editingUserId
      ? <EditUserForm userId={editingUserId}
                      countryIso={countryIso}
                      onCancel={() => this.setState({editingUserId: null})}
      />
      : <div>
        <UsersTableFilter i18n={i18n} filter={this.state.filter} onChange={filter => this.setState({filter})}/>
        <UsersTable {...this.props} isAdminTable={true} users={users} onEditClick={onEditClick}/>
        <UsersCount i18n={i18n} userCounts={userCounts}/>
      </div>
  }

}

const mapStateToProps = (state, props) =>
  ({
    i18n: state.user.i18n,
    userInfo: state.user.userInfo,
    countryIso: R.path(['match', 'params', 'countryIso'], props),
    allUsers: state.userManagement.allUsers,
    userCounts: state.userManagement.userCounts,
    editUserStatus: R.path(['userManagement', 'editUser', 'status'], state)
  })

export default connect(
  mapStateToProps,
  {fetchAllUsers, removeUser, sendInvitationEmail, getCountryName}
)(UsersManagementView)
