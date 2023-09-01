import { UserRoles } from 'meta/user/userRoles'

import { useAppSelector } from 'client/store'
import { useAssessments } from 'client/store/assessment'
import { useUser } from 'client/store/user'

export const useRedirectAssessmentAndCycle = () => {
  const assessments = useAssessments()
  const { defaultAssessmentId } = useAppSelector((state) => state.assessment.settings)
  const user = useUser()

  const userLastRole = UserRoles.getLastRole({ user })
  const assessment = assessments.find(
    (assessment) => Number(assessment.id) === Number(userLastRole?.assessmentId ?? defaultAssessmentId)
  )

  const cycle = assessment.cycles.find(
    (cycle) => cycle.uuid === (userLastRole?.cycleUuid ?? assessment.props.defaultCycle)
  )

  return { assessment, cycle }
}
