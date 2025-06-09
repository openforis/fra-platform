import { Assessments } from 'meta/assessment/assessments'
import { Users } from 'meta/user'

import { useUser } from 'client/store/user/hooks/user'

import { useInitialAssessment } from './useInitialAssessment'

export const useRedirectAssessmentAndCycle = () => {
  const user = useUser()

  const assessment = useInitialAssessment()

  const isAdmin = Users.isAdministrator(user)
  const cycle = isAdmin ? Assessments.getLastCreatedCycle(assessment) : Assessments.getLastPublishedCycle(assessment)

  return { assessment, cycle }
}
