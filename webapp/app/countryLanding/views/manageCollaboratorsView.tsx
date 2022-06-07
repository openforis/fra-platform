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
import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'
import { useCountryIso } from '@webapp/store/app'
import { RootState } from '@webapp/store/RootState'
import { useI18n } from '@webapp/hooks'

const ManageCollaboratorsView = (props: any) => {
  const { countryUsers, newUser, allowedRoles, editUserStatus, fetchUsers } = props
  const countryIso = useCountryIso()
  const i18n = useI18n()
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
      <AddUserForm {...props} i18n={i18n} user={newUser} countryIso={countryIso} />
      <UsersTable {...props} i18n={i18n} users={countryUsers} onEditClick={(userId: any) => setEditingUserId(userId)} />
    </>
  )
}

// TODO: Refactor: Remove mapStateToProps
const mapStateToProps = (state: RootState) => ({
  userInfo: state.user,
  allowedRoles: rolesAllowedToChange(AppState.getCountryIso(state), state.user),
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
