import '@webapp/app/user/userManagement/style.less'

import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

import AddUserForm from '@webapp/app/user/userManagement/edit/addUserForm'
import EditUserForm from '@webapp/app/user/userManagement/edit/editUserForm'
import UsersTable from '@webapp/app/user/userManagement/list/usersTable'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
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

const ManageCollaboratorsView = (props: any) => {
  const { countryUsers, newUser, allowedRoles, editUserStatus, fetchUsers } = props
  const countryIso = useSelector(AppState.getCountryIso)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'location' does not exist on type 'Locati... Remove this comment to see the full error message
  const { location } = useLocation()
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
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ userId: any; countryIso: unknown; onCancel... Remove this comment to see the full error message
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
