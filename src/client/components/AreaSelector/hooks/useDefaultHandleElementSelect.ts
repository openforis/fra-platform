import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { AreaCode } from 'meta/area/areaCode'
import { Areas } from 'meta/area/areas'
import { Routes } from 'meta/routes/routes'

import { useCountries } from 'client/store/area/hooks/countries'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle, useLastPublishedCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useIsGeoRoute } from 'client/hooks/routes'

type Returned = (areaCode: AreaCode) => void

export const useDefaultHandleElementSelect = (): Returned => {
  const navigate = useNavigate()
  const user = useUser()

  const assessment = useAssessment()
  const assessmentName = assessment.props.name
  const cycle = useCycle()
  const defaultCycle = useLastPublishedCycle()
  const countries = useCountries()

  const isInGeoPage = useIsGeoRoute()

  return useCallback(
    (areaCode: AreaCode) => {
      const isCountry = Areas.isISOCountry(areaCode)

      const destinationRoute = isInGeoPage && isCountry ? Routes.Geo : Routes.Country

      let cycleName = cycle.name

      // If the user is not logged in, direct the user to the last published cycle
      if (!user && isCountry) {
        const country = countries.find((country) => country.countryIso === areaCode)
        // If the user is not logged in and accessing a region, direct to default cycle
        const { lastPublishedInfo } = country
        const { cycleName: lastPublishedCycleName } = lastPublishedInfo
        cycleName = lastPublishedCycleName
      } else if (!user && !isCountry) {
        cycleName = defaultCycle.name
      }

      const path = destinationRoute.generatePath({ assessmentName, cycleName, countryIso: areaCode })
      navigate(path)
    },
    [assessmentName, countries, cycle.name, defaultCycle.name, isInGeoPage, navigate, user]
  )
}
