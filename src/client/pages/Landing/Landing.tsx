import React from 'react'
import { Navigate } from 'react-router-dom'

import { Routes } from 'meta/routes'
import { RoleName } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useUser } from 'client/store/user'

import { useRedirectAssessmentAndCycle } from './hooks/useRedirectAssessmentAndCycle'

const redirectRoles = [
  RoleName.REVIEWER,
  RoleName.NATIONAL_CORRESPONDENT,
  RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  RoleName.COLLABORATOR,
  RoleName.VIEWER,
]

const Landing: React.FC = () => {
  const { assessment, cycle } = useRedirectAssessmentAndCycle()
  const user = useUser()
  const userLastRole = UserRoles.getLastRole({ user })

  const urlParams = { assessmentName: assessment.props.name, cycleName: cycle.name }

  let url = Routes.Cycle.generatePath(urlParams)

  if (userLastRole && userLastRole.countryIso && redirectRoles.includes(userLastRole.role)) {
    url = Routes.Country.generatePath({
      ...urlParams,
      countryIso: userLastRole.countryIso,
    })
  }

  return <Navigate to={url} replace />
}

export default Landing
