import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'

import { administrator } from '@common/countryRole'

import * as AppState from '@webapp/app/appState'
import * as UserState from '@webapp/store/user/userState'
import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'
import { fetchAllUsers, removeUser, sendInvitationEmail } from '@webapp/app/user/userManagement/actions'

import UsersTableFilterWrapper from '@webapp/pages/Admin/components/UserManagementView/usersTableFilterWrapper'
import EditUserForm from '@webapp/app/user/userManagement/edit/editUserForm'
import UsersCount from '../usersCount'
import { useI18n } from '@webapp/components/hooks'

const UsersManagementView = (props) => {
  const i18n = useI18n()
  const dispatch = useDispatch()
  const { editUserStatus, allUsers, userCounts } = props
  const countryIso = useSelector(AppState.getCountryIso)
  const [editingUserId, setEditingUserId] = useState(null)

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  useEffect(() => {
    if (editingUserId && editUserStatus === 'completed') {
      setEditingUserId(null)
      dispatch(fetchAllUsers())
    }
  }, [editUserStatus])

  if (editingUserId) {
    return <EditUserForm userId={editingUserId} countryIso={countryIso} onCancel={() => setEditingUserId(null)} />
  }

  return (
    <>
      <UsersTableFilterWrapper
        {...props}
        i18n={i18n}
        isAdminTable
        users={allUsers}
        onEditClick={(userId) => setEditingUserId(userId)}
      />
      <UsersCount />
    </>
  )
}

const mapStateToProps = (state) => ({
  userInfo: UserState.getUserInfo(state),
  allUsers: UserManagementState.getAllUsers(state),
  editUserStatus: UserManagementState.getEditUserStatus(state),
  countries: R.path(['country', 'countries', administrator.role], state),
})

export default connect(mapStateToProps, { fetchAllUsers, removeUser, sendInvitationEmail })(UsersManagementView)
