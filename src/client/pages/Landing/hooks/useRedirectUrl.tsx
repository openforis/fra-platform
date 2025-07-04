import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessments } from 'meta/assessment/assessments'
import { Routes } from 'meta/routes'
import { Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useAssessmentDefault, useAssessments } from 'client/store/meta/hooks/assessments'
import { useUser } from 'client/store/user/hooks/user'

export const useRedirectUrl = (): string => {
  const user = useUser()
  const assessments = useAssessments()

  let assessment = useAssessmentDefault()
  let cycle = Assessments.getLastPublishedCycle(assessment)
  let countryIso: CountryIso

  // if admin, cycle -> last created cycle
  if (Users.isAdministrator(user)) {
    cycle = Assessments.getLastCreatedCycle(assessment)
  }
  // if other users, assessment, cycle, countryIso -> from last role
  const userLastRole = UserRoles.getLastRole({ user })
  if (!Objects.isNil(userLastRole)) {
    assessment = assessments.find((a) => a.uuid === userLastRole.assessmentUuid) ?? assessment
    cycle = assessment.cycles.find((c) => c.uuid === userLastRole.cycleUuid) ?? cycle
    countryIso = userLastRole.countryIso
  }

  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  if (Objects.isNil(countryIso)) return Routes.Cycle.generatePath({ assessmentName, cycleName })

  return Routes.Country.generatePath({ assessmentName, cycleName, countryIso })
}
