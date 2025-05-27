import { UserRoles } from 'meta/user/userRoles'

import { useAssessmentDefault, useAssessments } from 'client/store/meta/hooks/assessments'
import { useUser } from 'client/store/user'

export const useInitialAssessment = () => {
  const assessments = useAssessments()
  const assessmentDefault = useAssessmentDefault()
  const user = useUser()

  const userLastRole = UserRoles.getLastRole({ user })
  const _assessment = assessments.find((assessment) => assessment.uuid === userLastRole?.assessmentUuid)
  return _assessment ?? assessmentDefault
}
