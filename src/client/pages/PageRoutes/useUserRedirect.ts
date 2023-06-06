import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'
import { Users } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useAssessment, useCycle, useIsAppInitialized } from 'client/store/assessment'
import { useUser } from 'client/store/user'

export const useUserRedirect = (): void => {
  const isAppInitialized = useIsAppInitialized()
  const user = useUser()
  const userLastRole = UserRoles.getLastRole(user)
  const assessment = useAssessment()
  const cycle = useCycle(userLastRole?.cycleUuid)
  const countryIso = userLastRole?.countryIso
  const navigate = useNavigate()

  useEffect(() => {
    const personalInfoRequired = Users.isPersonalInfoRequired(user, userLastRole)
    const shouldRedirectToProfile = Boolean(isAppInitialized && personalInfoRequired && assessment && cycle && navigate)

    if (shouldRedirectToProfile) {
      navigate(
        `${ClientRoutes.Assessment.Cycle.Country.Users.User.getLink({
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          countryIso,
          id: user.id,
        })}`,
        {
          state: {
            userLastRole,
            personalInfoRequired,
            routeParams: { assessmentName: assessment.props.name, cycleName: cycle.name, countryIso },
          },
        }
      )
    }
  }, [assessment?.props.name, cycle?.name, countryIso, navigate, isAppInitialized, user, assessment, cycle, userLastRole])
}
