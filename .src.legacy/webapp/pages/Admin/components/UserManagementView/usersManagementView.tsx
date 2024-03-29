import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import * as R from 'ramda'

import { administrator } from '@common/countryRole'

import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'
import { fetchAllUsers, removeUser, sendInvitationEmail } from '@webapp/app/user/userManagement/actions'
import { useI18n } from '@webapp/hooks'

import UsersTableFilterWrapper from '@webapp/pages/Admin/components/UserManagementView/usersTableFilterWrapper'
import EditUserForm from '@webapp/app/user/userManagement/edit/editUserForm'
import { RootState } from '@webapp/store/RootState'
import UsersCount from '../usersCount'

const UsersManagementView = (props: any) => {
  const i18n = useI18n()
  const dispatch = useDispatch()
  const { editUserStatus, allUsers } = props
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
    // @ts-ignore
    // TODO: Fix/refactor userManagementView
    return <EditUserForm userId={editingUserId} onCancel={() => setEditingUserId(null)} />
  }

  return (
    <>
      <UsersTableFilterWrapper
        {...props}
        i18n={i18n}
        isAdminTable
        users={allUsers}
        onEditClick={(userId: any) => setEditingUserId(userId)}
      />
      <UsersCount />
    </>
  )
}

// TODO: Refactor: Remove mapStateToProps
const mapStateToProps = (state: RootState | any) => ({
  userInfo: state.user,
  allUsers: UserManagementState.getAllUsers(state),
  editUserStatus: UserManagementState.getEditUserStatus(state),
  countries: R.path(['country', 'countries', administrator.role], state),
})

export default connect(mapStateToProps, { fetchAllUsers, removeUser, sendInvitationEmail })(UsersManagementView)
