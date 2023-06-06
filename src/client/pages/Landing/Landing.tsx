import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'
import { RoleName } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useAppDispatch } from 'client/store'
import { AssessmentActions, useAssessment, useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'

const Landing: React.FC = () => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const user = useUser()
  const userLastRole = UserRoles.getLastRole(user)

  const cycle = useCycle(userLastRole?.cycleUuid)

  useEffect(() => {
    dispatch(AssessmentActions.getAssessment())
  }, [dispatch])

  if (!assessment || !cycle) return null

  const urlParams = {
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
  }

  let url = ClientRoutes.Assessment.Cycle.Landing.getLink(urlParams)

  const redirectRoles = [
    RoleName.REVIEWER,
    RoleName.NATIONAL_CORRESPONDENT,
    RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
    RoleName.COLLABORATOR,
    RoleName.VIEWER,
  ]

  if (userLastRole && userLastRole.countryIso && redirectRoles.includes(userLastRole.role)) {
    url = ClientRoutes.Assessment.Cycle.Country.Home.Root.getLink({
      ...urlParams,
      countryIso: userLastRole.countryIso,
    })
  }

  return <Navigate to={url} replace />
}

export default Landing
