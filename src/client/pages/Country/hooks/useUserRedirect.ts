import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AssessmentNames } from 'meta/assessment'
import { Routes } from 'meta/routes'
import { Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useUserRedirect = (): void => {
  const cycle = useCycle()
  const cycleName = cycle.name
  const { assessmentName, countryIso } = useCountryRouteParams()
  const user = useUser()
  const userRole = Users.getRole(user, countryIso, cycle)
  const navigate = useNavigate()

  useEffect(() => {
    const personalInfoRequired = Users.isPersonalInfoRequired(user, userRole)
    const isFra = assessmentName === AssessmentNames.fra
    const shouldRedirectToProfile = Boolean(personalInfoRequired && navigate && isFra)

    if (shouldRedirectToProfile) {
      const params = { assessmentName, cycleName, countryIso, id: user.id }
      const routeParams = { assessmentName, cycleName, countryIso }
      const state = { userLastRole: userRole, personalInfoRequired, routeParams }
      navigate(Routes.CountryUser.generatePath(params), { state })
    }
  }, [assessmentName, countryIso, cycleName, navigate, user, userRole])
}
