import React from 'react'
import { Navigate } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'
import { RoleName } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'

const redirectRoles = [
  RoleName.REVIEWER,
  RoleName.NATIONAL_CORRESPONDENT,
  RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  RoleName.COLLABORATOR,
  RoleName.VIEWER,
]

const Landing: React.FC = () => {
  const assessment = useAssessment()
  const user = useUser()
  const userLastRole = UserRoles.getLastRole({ assessment, user })
  const cycle = useCycle(userLastRole?.cycleUuid)

  const urlParams = { assessmentName: assessment.props.name, cycleName: cycle.name }
  let url = ClientRoutes.Assessment.Cycle.Landing.getLink(urlParams)

  if (userLastRole && userLastRole.countryIso && redirectRoles.includes(userLastRole.role)) {
    url = ClientRoutes.Assessment.Cycle.Country.Home.Root.getLink({
      ...urlParams,
      countryIso: userLastRole.countryIso,
    })
  }

  return <Navigate to={url} replace />
}

export default Landing
