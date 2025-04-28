import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Areas } from 'meta/area'
import { AssessmentNames } from 'meta/assessment/assessment'
import { Cycles } from 'meta/assessment/cycles'
import { Routes } from 'meta/routes'
import { Users } from 'meta/user'

import { useAssessmentCountry } from 'client/store/area'
import { useCycle, useLastPublishedCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useUserRedirect = (): void => {
  const cycle = useCycle()
  const defaultCycle = useLastPublishedCycle()
  const cycleName = cycle.name
  const { assessmentName, countryIso } = useCountryRouteParams()
  const country = useAssessmentCountry()
  const user = useUser()
  const userRole = Users.getRole(user, countryIso, cycle)
  const navigate = useNavigate()

  useEffect(() => {
    const personalInfoRequired = Users.isPersonalInfoRequired(user, userRole)
    const isFra = assessmentName === AssessmentNames.fra
    const shouldRedirectToProfile = Boolean(personalInfoRequired && navigate && isFra)

    // When user is not logged in, redirect to last published (e.g. when accessing older cycles)
    // Note: First load might not have country
    const shouldRedirectToLastPublished = !user && country && cycleName !== country?.lastPublishedInfo.cycleName

    if (shouldRedirectToLastPublished) {
      const route = Routes.Country.generatePath({
        assessmentName,
        cycleName: country?.lastPublishedInfo.cycleName,
        countryIso,
      })
      navigate(route)
    }

    // When user is not logged in and accessing a region, we should redirect to default cycle
    const shouldRedirectToDefaultCycle = !user && !Areas.isISOCountry(countryIso)
    if (shouldRedirectToDefaultCycle) {
      const route = Routes.Country.generatePath({
        assessmentName,
        cycleName: defaultCycle.name,
        countryIso,
      })
      navigate(route)
    }

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
  }, [assessmentName, country, countryIso, cycle, defaultCycle.name, cycleName, navigate, user, userRole])
}
