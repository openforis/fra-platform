import './Country.scss'
import React from 'react'
import { Outlet } from 'react-router'
import classNames from 'classnames'

import { useCountries } from 'client/store/area/hooks/countries'
import { useNavigationVisible } from 'client/store/ui/countryReport/hooks/navigation'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useIsGeoRoute } from 'client/hooks/routes'
import Navigation from 'client/components/Navigation'

import { useInitSections } from './hooks/useInitSections'
import { useInitValidationSummary } from './hooks/useInitValidationSummary'
import { useReviewSummaryListener } from './hooks/useReviewSummaryListener'
import { useTableValidationsListener } from './hooks/useTableValidationsListener'
import { useUserRedirect } from './hooks/useUserRedirect'

const Country: React.FC = () => {
  const { countryIso } = useCountryRouteParams()

  const navigationVisible = useNavigationVisible()
  const countries = useCountries()
  const geoRoute = useIsGeoRoute()
  useInitSections()
  useInitValidationSummary()
  useReviewSummaryListener()
  useTableValidationsListener()
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
