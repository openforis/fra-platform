import React from 'react'
import { Navigate } from 'react-router-dom'

import { Routes } from 'meta/routes'
import { RoleName, Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useAssessment, useAssessments, useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'

const redirectRoles = [
  RoleName.REVIEWER,
  RoleName.NATIONAL_CORRESPONDENT,
  RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  RoleName.COLLABORATOR,
  RoleName.VIEWER,
]

const Landing: React.FC = () => {
  const assessments = useAssessments()
  const defaultAssessment = useAssessment()
  const defaultCycle = useCycle()
  const user = useUser()

  const userLastRole = UserRoles.getLastRole({ user })
  const assessment =
    assessments.find((assessment) => Number(assessment.id) === Number(userLastRole?.assessmentId)) ?? defaultAssessment
  const cycle = assessment.cycles.find((cycle) => cycle.uuid === userLastRole?.cycleUuid) ?? defaultCycle

  const urlParams = { assessmentName: assessment.props.name, cycleName: cycle.name }

  if (Users.isAdministrator(user)) {
    urlParams.cycleName = assessment.cycles.at(0).name
  }

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
