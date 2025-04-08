import { UserRoles } from 'meta/user/userRoles'

import { useAssessmentDefault, useAssessments } from 'client/store/assessment'
import { useUser } from 'client/store/user'

export const _useInitialAssessment = () => {
  const assessments = useAssessments()
  const assessmentDefault = useAssessmentDefault()
  const user = useUser()

  const userLastRole = UserRoles.getLastRole({ user })
  const _assessment = assessments.find((assessment) => assessment.uuid === userLastRole?.assessmentUuid)
  return _assessment ?? assessmentDefault
}
