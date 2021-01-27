import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { administrator } from '@common/countryRole'

import * as AppState from '@webapp/store/app/state'
import { UserState } from '@webapp/store/user'
import * as UserManagementState from '@webapp/app/user/userManagement/userManagementState'
import { fetchAllUsers, removeUser, sendInvitationEmail } from '@webapp/app/user/userManagement/actions'
import { useI18n } from '@webapp/components/hooks'

import UsersTableFilterWrapper from '@webapp/pages/Admin/components/UserManagementView/usersTableFilterWrapper'
import EditUserForm from '@webapp/app/user/userManagement/edit/editUserForm'
import UsersCount from '../usersCount'

const UsersManagementView = (props: any) => {
  const i18n = useI18n()
  const dispatch = useDispatch()
  const { editUserStatus, allUsers } = props
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
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ userId: any; countryIso: unknown; onCancel... Remove this comment to see the full error message
    return <EditUserForm userId={editingUserId} countryIso={countryIso} onCancel={() => setEditingUserId(null)} />
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

const mapStateToProps = (state: any) => ({
  userInfo: UserState.getUserInfo(state),
  allUsers: UserManagementState.getAllUsers(state),
  editUserStatus: UserManagementState.getEditUserStatus(state),
  countries: R.path(['country', 'countries', administrator.role], state),
})

export default connect(mapStateToProps, { fetchAllUsers, removeUser, sendInvitationEmail })(UsersManagementView)
