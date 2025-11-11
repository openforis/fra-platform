import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Areas } from 'meta/area/areas'
import { AssessmentNames } from 'meta/assessment/assessment'
import { Cycles } from 'meta/assessment/cycles'
import { Routes } from 'meta/routes'
import { Authorizer, Users } from 'meta/user'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useUserRedirect = (): void => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const cycleName = cycle.name
  const { assessmentName, countryIso } = useCountryRouteParams()
  const country = useAssessmentCountry()
  const user = useUser()
  const userRole = Users.getRole(user, countryIso, cycle)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    // Wait for country data to load before checking authorization
    if (!country) return

    const isAuthorized = Authorizer.canView({ assessment, cycle, areaCode: countryIso, country, user })

    if (!isAuthorized) {
      navigate(Routes.Assessment.generatePath({ assessmentName }))
      return
    }

    // When user is not logged in and is not authorized to access the cycle
    // -> redirect to last published (e.g. when accessing non-published cycles)
    const shouldRedirectToLastPublished = !user && !isAuthorized && cycleName !== country.lastPublishedInfo.cycleName

    if (shouldRedirectToLastPublished) {
      const _cycleName = country.lastPublishedInfo.cycleName

      const route = Routes.Country.generatePath({ assessmentName, cycleName: _cycleName, countryIso })
      navigate(route)
      return
    }

    const personalInfoRequired = Users.isPersonalInfoRequired(user, userRole)
    const isFra = assessmentName === AssessmentNames.fra
    const shouldRedirectToProfile = Boolean(personalInfoRequired && navigate && isFra)

    if (shouldRedirectToProfile) {
      const params = { assessmentName, cycleName, countryIso, id: String(user.id) }
      const routeParams = { assessmentName, cycleName, countryIso }
      const state = { userLastRole: userRole, personalInfoRequired, routeParams }
      navigate(Routes.CountryUser.generatePath(params), { state })
      return
    }

    // Redirect non admin users to the cycle page if the cycle is not published when accessing regions
    if (!Cycles.isPublished(cycle) && !Users.isAdministrator(user) && !Areas.isISOCountry(countryIso)) {
      navigate(Routes.Cycle.generatePath({ assessmentName, cycleName }))
    }
  }, [assessment, assessmentName, country, countryIso, cycle, cycleName, navigate, pathname, user, userRole])
}
