import './User.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'

import { Areas } from 'meta/area'
import { AssessmentName } from 'meta/assessment'
import { Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useCycle } from 'client/store/assessment'
import { useUserToEdit } from 'client/store/ui//userManagement/hooks'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useUser } from 'client/store/user'
import { useCountryIso, useIsCountry } from 'client/hooks'
import { useToaster } from 'client/hooks/useToaster'
import EditUserForm from 'client/components/EditUserForm'
import ButtonContinue from 'client/pages/User/ButtonContinue'

const User: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const user = useUser()
  const isCountry = useIsCountry()
  const userToEdit = useUserToEdit()
  const location = useLocation()
  const { toaster } = useToaster()

  const {
    assessmentName,
    cycleName,
    id: userId,
  } = useParams<{ assessmentName: AssessmentName; cycleName: string; id: string }>()

  useEffect(() => {
    if (location?.state?.personalInfoRequired) {
      toaster.info(t('userManagement.personalInfoRequired'))
    }
  }, [location?.state?.personalInfoRequired, t, toaster])

  useEffect(() => {
    dispatch(
      UserManagementActions.getUserToEdit({
        assessmentName,
        countryIso,
        cycleName,
        id: Number(userId),
      })
    )
    return () => {
      dispatch(UserManagementActions.setUserToEdit(null))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, userId])

  if (!userToEdit) return null

  const isAdministrator = Users.isAdministrator(user)

  const isSelf = user.id === userToEdit.id

  const canEditUser = isSelf || isAdministrator

  const canEditPermissions =
    !isSelf &&
    Users.getRolesAllowedToEdit({ user, countryIso, cycle }).length > 0 &&
    !Areas.isISOGlobal(countryIso) &&
    isCountry

  const canEditRoles = !isSelf && isAdministrator && Areas.isISOGlobal(countryIso)

  return (
    <div className="app-view__content user-container">
      <EditUserForm
        canEditPermissions={canEditPermissions}
        canEditRoles={canEditRoles}
        canEditUser={canEditUser}
        user={userToEdit}
      />
      <ButtonContinue />
    </div>
  )
}

export default User
