import { Assessments } from 'meta/assessment/assessments'
import { Users } from 'meta/user'

import { useUser } from 'client/store/user'
import { _useInitialAssessment } from 'client/pages/Landing/hooks/_useInitialAssessment'

export const useRedirectAssessmentAndCycle = () => {
  const user = useUser()

  const assessment = _useInitialAssessment()

  const isAdmin = Users.isAdministrator(user)
  const cycle = isAdmin ? Assessments.getLastCreatedCycle(assessment) : Assessments.getLastPublishedCycle(assessment)

  return { assessment, cycle }
}
