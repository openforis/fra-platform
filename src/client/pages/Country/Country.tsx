import './Country.scss'
import React from 'react'
import { Outlet } from 'react-router'
import classNames from 'classnames'

import { useCountries } from 'client/store/area/hooks/countries'
import { useNavigationVisible } from 'client/store/ui/countryReport/hooks/navigation'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useIsGeoRoute } from 'client/hooks/routes'
import Navigation from 'client/components/Navigation'

import { useDescriptionValidationsListener } from './hooks/useDescriptionValidationsListener'
import { useGetValidationsSummary } from './hooks/useGetValidationsSummary'
import { useInitSections } from './hooks/useInitSections'
import { useNationalDataPointValidationsListener } from './hooks/useNationalDataPointValidationsListener'
import { useReviewSummaryListener } from './hooks/useReviewSummaryListener'
import { useTableValidationsListener } from './hooks/useTableValidationsListener'
import { useUserRedirect } from './hooks/useUserRedirect'

const Country: React.FC = () => {
  const { countryIso } = useCountryRouteParams()

  const navigationVisible = useNavigationVisible()
  const countries = useCountries()
  const geoRoute = useIsGeoRoute()
  useInitSections()
  useTableValidationsListener()
  useDescriptionValidationsListener()
  useNationalDataPointValidationsListener()
  useGetValidationsSummary()
  useReviewSummaryListener()
  useUserRedirect()

  if (!countryIso) return null

  if (countries?.length === 0) return null

  return (
    <div className={classNames('app-view', { 'navigation-on': navigationVisible && !geoRoute })}>
      <Navigation />
      <Outlet />
    </div>
  )
}

export default Country
