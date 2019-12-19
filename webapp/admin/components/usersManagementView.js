import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import UsersTableFilterWrapper from '../../userManagement/list/usersTableFilterWrapper'
import UsersCount from './usersCount'

import EditUserForm from '../../userManagement/edit/editUserForm'

import { fetchAllUsers, removeUser, sendInvitationEmail } from '../../userManagement/actions'
import { getCountryName } from '../../country/actions'
import { administrator } from '../../../common/countryRole'
import * as AppState from '../../app/appState'

const UsersManagementView = props => {
  const {
    fetchAllUsers,
    editUserStatus,
    i18n,
    allUsers,
    userCounts,
  } = props
  const countryIso = useSelector(AppState.getCountryIso)
  const [editingUserId, setEditingUserId] = useState(null)

  useEffect(() => {
    fetchAllUsers()
  }, [])

  useEffect(() => {
    if (editingUserId && editUserStatus == 'completed') {
      setEditingUserId(null)
      fetchAllUsers()
    }
  }, [editUserStatus])

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     editUserStatus: null,
  //     editingUserId: null
  //   }
  // }
  if (editingUserId) {
    return <EditUserForm userId={editingUserId}
                         countryIso={countryIso}
                         onCancel={userId => setEditingUserId(null)}
    />
  }

  return <>
    <UsersTableFilterWrapper {...props}
                             isAdminTable={true}
                             users={allUsers}
                             onEditClick={userId => setEditingUserId(userId)}/>
    <UsersCount i18n={i18n} userCounts={userCounts}/>
  </>
}

const mapStateToProps = (state, props) =>
  ({
    i18n: state.user.i18n,
    userInfo: state.user.userInfo,
    allUsers: state.userManagement.allUsers,
    userCounts: state.userManagement.userCounts,
    editUserStatus: R.path(['userManagement', 'editUser', 'status'], state),
    countries: R.path(['country', 'countries', administrator.role], state)
  })

export default connect(
  mapStateToProps,
  { fetchAllUsers, removeUser, sendInvitationEmail, getCountryName }
)(UsersManagementView)
