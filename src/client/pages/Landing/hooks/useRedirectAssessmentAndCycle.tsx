import { Assessments } from 'meta/assessment/assessments'
import { Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useAssessmentDefault, useAssessments } from 'client/store/assessment'
import { useUser } from 'client/store/user'

export const useRedirectAssessmentAndCycle = () => {
  const assessments = useAssessments()
  const assessmentDefault = useAssessmentDefault()
  const user = useUser()

  const userLastRole = UserRoles.getLastRole({ user })
  const _assessment = assessments.find((assessment) => assessment.uuid === userLastRole?.assessmentUuid)
  const assessment = _assessment ?? assessmentDefault

  const isAdmin = Users.isAdministrator(user)
  const cycle = isAdmin ? Assessments.getLastCreatedCycle(assessment) : Assessments.getLastPublishedCycle(assessment)

  return { assessment, cycle }
}
