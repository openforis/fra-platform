import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'
import { Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useUserToEdit } from 'client/store/ui/userManagement/hooks'

const ButtonContinue = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const userToEdit = useUserToEdit()
  const { routeParams, userLastRole: _userLastRole } = location.state ?? {}

  const userLastRole = UserRoles.getLastRole(userToEdit) ?? _userLastRole

  const isPersonalInfoRequired = Users.isPersonalInfoRequired(userToEdit, userLastRole)

  const onClick = useCallback(() => {
    navigate(ClientRoutes.Assessment.Cycle.Country.Home.Root.getLink(routeParams))
  }, [navigate, routeParams])

  if (!location.state?.personalInfoRequired) return null

  return (
    <button type="button" disabled={isPersonalInfoRequired} onClick={onClick} className="btn btn-primary">
      {t('common.continue')}
    </button>
  )
}
export default ButtonContinue
