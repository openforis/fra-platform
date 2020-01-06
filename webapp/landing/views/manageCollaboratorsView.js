import '../../userManagement/style.less'

import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import * as R from 'ramda'

import AddUserForm from '../../userManagement/edit/addUserForm'
import EditUserForm from '../../userManagement/edit/editUserForm'
import UsersTable from '../../userManagement/list/usersTable'

import { rolesAllowedToChange } from '@common/userManagementAccessControl'

import { getCountryName } from '../../country/actions'
import {
  addNewUser,
  fetchUsers,
  persistCollaboratorCountryAccess,
  removeUser,
  sendInvitationEmail,
  updateNewUser
} from '../../userManagement/actions'
import * as AppState from '@webapp/app/appState'

const ManageCollaboratorsView = props => {
  const { countryUsers, newUser, allowedRoles, editUserStatus, fetchUsers } = props
  const countryIso = useSelector(AppState.getCountryIso)
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
    return <EditUserForm
      userId={editingUserId}
      countryIso={countryIso}
      onCancel={() => setEditingUserId(null)}
    />
  }

  return (
    <>
      <AddUserForm {...props} user={newUser} countryIso={countryIso}/>
      <UsersTable
        {...props}
        users={countryUsers}
        onEditClick={userId => setEditingUserId(userId)}/>
    </>
  )
}

const mapStateToProps = (state, props) =>
  ({
    i18n: state.user.i18n,
    userInfo: state.user.userInfo,
    allowedRoles: rolesAllowedToChange(props.match.params.countryIso, R.path(['user', 'userInfo'], state)),
    countryUsers: state.userManagement.countryUsers,
    newUser: state.userManagement.newUser,
    editUserStatus: R.path(['userManagement', 'editUser', 'status'], state),
    countryIso: R.path(['match', 'params', 'countryIso'], props)
  })

export default connect(mapStateToProps, {
  fetchUsers,
  removeUser,
  updateNewUser,
  addNewUser,
  getCountryName,
  sendInvitationEmail,
  persistCollaboratorCountryAccess
})(ManageCollaboratorsView)
