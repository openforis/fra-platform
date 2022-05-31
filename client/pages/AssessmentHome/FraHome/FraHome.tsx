import React from 'react'
import { useTranslation } from 'react-i18next'
import { Redirect } from 'react-router'
import { NavLink, Route, Switch } from 'react-router-dom'

import { Areas } from '@meta/area'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'
import { AssessmentHomeRouteNames, BasePaths } from '@client/basePaths'
import Dashboard from '@client/pages/Dashboard'

import { useSections } from './hooks/useSections'
import ButtonDownloadStatisticalFactsheets from './ButtonDownloadStatisticalFactsheets'

// import CountrySelector from './CountrySelector'
// import SelectedCountries from './SelectedCountries'

const FraHome: React.FC = () => {
  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const sections = useSections()
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  // tabs are available when user is logged-in and selected area is country
  const displayTabs = sections.length > 1 && Areas.isISOCountry(countryIso)

  return (
    <>
      <div className="landing__page-header space-between">
        <h1 className="landing__page-title title">
          {i18n.t(`area.${countryIso}.listName`)}
          <ButtonDownloadStatisticalFactsheets />
        </h1>

        {/* {Areas.isISOGlobal(countryIso) && <CountrySelector />} */}
      </div>

      {/* {Areas.isISOGlobal(countryIso) && <SelectedCountries />} */}

      {displayTabs && (
        <div className="landing__page-menu">
          {sections.map(({ name }) => (
            <NavLink
              key={name}
              to={BasePaths.Assessment.home(countryIso, assessmentName, cycleName, name)}
              className="btn landing__page-menu-button"
              activeClassName="disabled"
            >
              {i18n.t(`landing.sections.${name}`)}
            </NavLink>
          ))}
        </div>
      )}
      {displayTabs ? (
        <Switch>
          <Redirect
            from={BasePaths.Assessment.home()}
            to={BasePaths.Assessment.home(countryIso, assessmentName, cycleName, AssessmentHomeRouteNames.overview)}
            exact
          />
          {sections.map(({ name, component }) => (
            <Route
              key={name}
              path={BasePaths.Assessment.home(countryIso, assessmentName, cycleName, name)}
              component={component}
            />
          ))}
        </Switch>
      ) : (
        <Dashboard />
      )}
    </>
  )
}
export default FraHome
