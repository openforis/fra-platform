import './user.scss'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useUser } from '@client/store/user'
import { UserManagementActions } from '@client/store/userManagement'
import { useUserToEdit } from '@client/store/userManagement/hooks'
import EditUserForm from '@client/components/EditUserForm'

const UserPage: React.FC = () => {
  const dispatch = useAppDispatch()

  const user = useUser()
  const userToEdit = useUserToEdit()
  const { id: userId } = useParams<{ id: string }>()

  const isAdministrator = Users.isAdministrator(user)

  useEffect(() => {
    dispatch(UserManagementActions.getUserToEdit({ id: Number(userId) }))
  }, [dispatch, userId])

  if (!userToEdit) return null

  return (
    <div className="app-view__content">
      <EditUserForm user={userToEdit} isAdminForm={isAdministrator} />
    </div>
  )
}

export default UserPage
