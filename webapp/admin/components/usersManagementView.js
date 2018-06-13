import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import UsersTable from '../../userManagement/list/usersTable'
import UsersCount from './usersCount'
import EditUserForm from '../../userManagement/edit/editUserForm'

import { fetchAllUsers, removeUser, sendInvitationEmail } from '../../userManagement/actions'

class UsersManagementView extends React.Component {

  fetchUsers () {
    this.props.fetchAllUsers()
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

  render () {
    const {i18n, allUsers, userCounts, countryIso} = this.props
    const onEditClick = userId => this.setState({editingUserId: userId})

    const editingUserId = R.path(['state', 'editingUserId'], this)

    return editingUserId
      ? <EditUserForm userId={editingUserId}
                      countryIso={countryIso}
                      onCancel={() => this.setState({editingUserId: null})}
      />
      : <div>
        <UsersTable {...this.props} isAdminTable={true} users={allUsers} onEditClick={onEditClick}/>
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
  {fetchAllUsers, removeUser, sendInvitationEmail}
)(UsersManagementView)
