import '@webapp/app/user/userManagement/style.less'

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import * as R from 'ramda'

import AddUserForm from '@webapp/app/user/userManagement/edit/addUserForm'
import EditUserForm from '@webapp/app/user/userManagement/edit/editUserForm'
import UsersTable from '@webapp/app/user/userManagement/list/usersTable'

import { rolesAllowedToChange } from '@common/userManagementAccessControl'

import {
  addNewUser,
  fetchUsers,
  persistCollaboratorCountryAccess,
  removeUser,
  sendInvitationEmail,
  updateNewUser,
} from '@webapp/app/user/userManagement/actions'

import * as AppState from '@webapp/store/app/state'
import { UserState } from '@webapp/store/user'
import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'
import { useCountryIso } from '@webapp/hooks'

const ManageCollaboratorsView = (props: any) => {
  const { countryUsers, newUser, allowedRoles, editUserStatus, fetchUsers } = props
  const countryIso = useCountryIso()
  const { location }: any = useLocation()
  const [editingUserId, setEditingUserId] = useState(null)

  useEffect(() => {
    fetchUsers(countryIso)
  }, [location])

  useEffect(() => {
    fetchUsers(countryIso)
  }, [countryIso])

  useEffect(() => {
    if (editUserStatus === 'completed') {
      fetchUsers(countryIso)
      setEditingUserId(null)
    }
  }, [editUserStatus])

  if (!countryUsers && !R.isEmpty(allowedRoles)) {
    return null
  }

  if (editingUserId) {
    return <EditUserForm userId={editingUserId} countryIso={countryIso} onCancel={() => setEditingUserId(null)} />
  }

  return (
    <>
      <AddUserForm {...props} user={newUser} countryIso={countryIso} />
      <UsersTable {...props} users={countryUsers} onEditClick={(userId: any) => setEditingUserId(userId)} />
    </>
  )
}

const mapStateToProps = (state: any) => ({
  i18n: AppState.getI18n(state),
  userInfo: UserState.getUserInfo(state),
  allowedRoles: rolesAllowedToChange(AppState.getCountryIso(state), UserState.getUserInfo(state)),
  countryUsers: UserManagementState.getCountryUsers(state),
  newUser: UserManagementState.getNewUser(state),
  editUserStatus: UserManagementState.getEditUserStatus(state),
  countryIso: AppState.getCountryIso(state),
})

export default connect(mapStateToProps, {
  fetchUsers,
  removeUser,
  updateNewUser,
  addNewUser,
  sendInvitationEmail,
  persistCollaboratorCountryAccess,
})(ManageCollaboratorsView)
