import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { Routes } from 'meta/routes'
import { Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useAssessment } from 'client/store/assessment'
import { useUserToEdit } from 'client/store/ui/userManagement/hooks'

const ButtonContinue = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const assessment = useAssessment()
  const userToEdit = useUserToEdit()
  const { routeParams, userLastRole: _userLastRole } = location.state ?? {}

  const userLastRole = UserRoles.getLastRole({ assessment, user: userToEdit }) ?? _userLastRole

  const isPersonalInfoRequired = Users.isPersonalInfoRequired(userToEdit, userLastRole)

  const onClick = useCallback(() => {
    navigate(Routes.CountryHome.generatePath(routeParams))
  }, [navigate, routeParams])

  if (!location.state?.personalInfoRequired) return null

  return (
    <button type="button" disabled={isPersonalInfoRequired} onClick={onClick} className="btn btn-primary">
      {t('common.continue')}
    </button>
  )
}
export default ButtonContinue
