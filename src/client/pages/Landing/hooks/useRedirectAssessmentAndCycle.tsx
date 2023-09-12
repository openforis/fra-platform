import { Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useAssessments } from 'client/store/assessment'
import { useSettings } from 'client/store/assessment/hooks'
import { useUser } from 'client/store/user'

export const useRedirectAssessmentAndCycle = () => {
  const assessments = useAssessments()
  const { defaultAssessmentId } = useSettings()
  const user = useUser()

  const userLastRole = UserRoles.getLastRole({ user })
  const assessment = assessments.find(
    (assessment) => Number(assessment.id) === Number(userLastRole?.assessmentId ?? defaultAssessmentId)
  )

  const isAdmin = Users.isAdministrator(user)

  const cycle = isAdmin
    ? [...assessment.cycles].sort((a, b) => (a.name > b.name ? -1 : 1)).at(0)
    : assessment.cycles.find((cycle) => cycle.uuid === (userLastRole?.cycleUuid ?? assessment.props.defaultCycle))

  return { assessment, cycle }
}
