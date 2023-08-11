import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'
import { AssessmentNames } from 'meta/assessment'
import { Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useAssessment, useCycle, useIsAppInitialized } from 'client/store/assessment'
import { useUser } from 'client/store/user'

export const useUserRedirect = (): void => {
  const isAppInitialized = useIsAppInitialized()
  const assessment = useAssessment()
  const user = useUser()
  const userLastRole = UserRoles.getLastRole({ assessment, user })
  const cycle = useCycle(userLastRole?.cycleUuid)
  const countryIso = userLastRole?.countryIso
  const navigate = useNavigate()

  const assessmentName = assessment?.props.name
  const cycleName = cycle?.name

  useEffect(() => {
    const personalInfoRequired = Users.isPersonalInfoRequired(user, userLastRole)
    const isFra = assessmentName === AssessmentNames.fra
    const shouldRedirectToProfile = Boolean(
      isAppInitialized && personalInfoRequired && assessment && cycle && navigate && isFra
    )

    if (shouldRedirectToProfile) {
      const params = { assessmentName, cycleName, countryIso, id: user.id }
      const routeParams = { assessmentName, cycleName, countryIso }
      const state = { userLastRole, personalInfoRequired, routeParams }
      navigate(ClientRoutes.Assessment.Cycle.Country.Users.User.getLink(params), { state })
    }
  }, [assessment, assessmentName, countryIso, cycle, cycleName, isAppInitialized, navigate, user, userLastRole])
}
