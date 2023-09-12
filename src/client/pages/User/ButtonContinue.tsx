import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { Routes } from 'meta/routes'
import { Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUserToEdit } from 'client/store/ui/userManagement/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

const ButtonContinue = () => {
  const { t } = useTranslation()
  const cycle = useCycle()
  const { countryIso } = useCountryRouteParams()
  const location = useLocation()
  const navigate = useNavigate()
  const userToEdit = useUserToEdit()
  const { routeParams, userRole: _userRole } = location.state ?? {}

  const userRole = Users.getRole(userToEdit, countryIso, cycle) ?? _userRole

  const isPersonalInfoRequired = Users.isPersonalInfoRequired(userToEdit, userRole)

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
