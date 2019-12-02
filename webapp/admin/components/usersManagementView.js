import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import UsersTableFilterWrapper from '../../userManagement/list/usersTableFilterWrapper'
import UsersCount from './usersCount'

import EditUserForm from '../../userManagement/edit/editUserForm'

import { fetchAllUsers, removeUser, sendInvitationEmail } from '../../userManagement/actions'
import { getCountryName } from '../../country/actions'
import { administrator } from '../../../common/countryRole'

class UsersManagementView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editUserStatus: null,
      editingUserId: null
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (R.prop('editUserStatus', this.props) === 'completed' && R.prop('editUserStatus', prevProps) === 'loaded') {
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

  render () {
    const {i18n, allUsers, userCounts, countryIso} = this.props

    const onEditClick = userId => this.setState({editingUserId: userId})
    const editingUserId = R.path(['state', 'editingUserId'], this)

    return editingUserId
      ? <EditUserForm userId={editingUserId}
                      countryIso={countryIso}
                      onCancel={() => this.setState({editingUserId: null})}
      />
      : <>
        <UsersTableFilterWrapper {...this.props}
                                 isAdminTable={true}
                                 users={allUsers}
                                 onEditClick={onEditClick}/>
        <UsersCount i18n={i18n} userCounts={userCounts}/>
      </>
  }

}

const mapStateToProps = (state, props) =>
  ({
    i18n: state.user.i18n,
    userInfo: state.user.userInfo,
    countryIso: R.path(['match', 'params', 'countryIso'], props),
    allUsers: state.userManagement.allUsers,
    userCounts: state.userManagement.userCounts,
    editUserStatus: R.path(['userManagement', 'editUser', 'status'], state),
    countries: R.path(['country', 'countries', administrator.role], state)
  })

export default connect(
  mapStateToProps,
  {fetchAllUsers, removeUser, sendInvitationEmail, getCountryName}
)(UsersManagementView)
