import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { AreaCode, Areas } from 'meta/area'
import { Routes } from 'meta/routes'

import { useCountries } from 'client/store/area'
import { useAssessment, useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useIsGeoRoute } from 'client/hooks'

export const useDefaultHandleElementSelect = () => {
  const navigate = useNavigate()
  const user = useUser()

  const assessment = useAssessment()
  const assessmentName = assessment.props.name
  const cycle = useCycle()
  const defaultCycle = useCycle(assessment.props.defaultCycle)
  const countries = useCountries()

  const isInGeoPage = useIsGeoRoute()

  return useCallback(
    (areaCode: AreaCode) => {
      const isCountry = Areas.isISOCountry(areaCode)

      const destinationRoute = isInGeoPage && isCountry ? Routes.Geo : Routes.Country

      let cycleName = cycle.name

      // If the user is not logged in, direct the user to the last published cycle
      if (!user && Areas.isISOCountry(areaCode)) {
        cycleName = countries.find((country) => country.countryIso === areaCode).lastPublishedInfo.cycleName
        // If the user is not logged in and accessing a region, direct to default cycle
      } else if (!user && !Areas.isISOCountry(areaCode)) {
        cycleName = defaultCycle.name
      }

      const path = destinationRoute.generatePath({ assessmentName, cycleName, countryIso: areaCode })
      navigate(path)
    },
    [assessmentName, countries, cycle.name, defaultCycle.name, isInGeoPage, navigate, user]
  )
}
