import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Areas } from 'meta/area'
import { AssessmentNames } from 'meta/assessment/assessment'
import { Cycles } from 'meta/assessment/cycles'
import { Routes } from 'meta/routes'
import { Users } from 'meta/user'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useCycle, useLastPublishedCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useUserRedirect = (): void => {
  const cycle = useCycle()
  const lastPublishedCycle = useLastPublishedCycle()
  const cycleName = cycle.name
  const { assessmentName, countryIso } = useCountryRouteParams()
  const country = useAssessmentCountry()
  const user = useUser()
  const userRole = Users.getRole(user, countryIso, cycle)
  const navigate = useNavigate()

  useEffect(() => {
    const personalInfoRequired = Users.isPersonalInfoRequired(user, userRole)
    const isFra = assessmentName === AssessmentNames.fra

    // When user is not logged in, redirect to last published (e.g. when accessing older cycles)
    // Disable this if you want to allow non-logged users to access older cycles
    const shouldRedirectToLastPublished = !user && country && cycleName !== country?.lastPublishedInfo.cycleName

    if (shouldRedirectToLastPublished) {
      const _cycleName = country?.lastPublishedInfo.cycleName

      const route = Routes.Country.generatePath({
        assessmentName,
        cycleName: _cycleName,
        countryIso,
      })
      navigate(route)
    }

    const shouldRedirectToProfile = Boolean(personalInfoRequired && navigate && isFra)

    if (shouldRedirectToProfile) {
      const params = { assessmentName, cycleName, countryIso, id: user.id }
      const routeParams = { assessmentName, cycleName, countryIso }
      const state = { userLastRole: userRole, personalInfoRequired, routeParams }
      navigate(Routes.CountryUser.generatePath(params), { state })
    }

    // Redirect non admin users to the cycle page if the cycle is not published when accessing regions
    if (!Cycles.isPublished(cycle) && !Users.isAdministrator(user) && !Areas.isISOCountry(countryIso)) {
      navigate(Routes.Cycle.generatePath({ assessmentName, cycleName }))
    }
  }, [assessmentName, country, countryIso, cycle, cycleName, lastPublishedCycle.name, navigate, user, userRole])
}
