import React from 'react'
import { Link, matchPath, NavLink, Redirect, Route, Switch, useLocation } from 'react-router-dom'

import { FRA } from '@core/assessment'
import { Areas, RegionCode } from '@core/country'
import * as BasePaths from '@webapp/main/basePaths'
import { useCountryIso, useI18n, useUserInfo, useCountryLandingSections } from '@webapp/components/hooks'
import { useFraRegions } from '@webapp/store/app/hooks'

import Icon from '@webapp/components/icon'
import StatisticalFactsheets from '@webapp/pages/StatisticalFactsheets'
import CountrySelector from './CountrySelector'
import SelectedCountries from './SelectedCountries'

const FraHome: React.FC = () => {
  const { pathname } = useLocation()
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const i18n = useI18n()
  const sections = useCountryLandingSections()
  const isCountry = Areas.isISOCountry(countryIso)
  const overviewPath = BasePaths.getAssessmentHomeSectionLink(countryIso, FRA.type, 'overview')
  const matchOverview = matchPath(pathname, {
    path: [BasePaths.getAssessmentHomeLink(countryIso, FRA.type), overviewPath],
    exact: true,
  })
  // tabs are available when user is logged-in and selected area is country
  const displayTabs = userInfo && isCountry
  const fraRegions = useFraRegions()
  const showButton = (fraRegions.includes(countryIso as RegionCode) || Areas.isISOGlobal(countryIso)) && matchOverview

  return (
    <>
      <div className="landing__page-header space-between">
        <h1 className="landing__page-title title">
          {i18n.t(`area.${countryIso}.listName`)}

          {showButton && (
            <Link
              className="btn-s btn-primary landing__btn-download"
              to={`/api/fileRepository/statisticalFactsheets/${countryIso}/${i18n.language}`}
              target="_top"
            >
              <Icon name="hit-down" className="icon-hit-down icon-white" />
              <Icon name="icon-table2" className="icon-no-margin icon-white" />
            </Link>
          )}
        </h1>

        {Areas.isISOGlobal(countryIso) && <CountrySelector />}
      </div>

      {Areas.isISOGlobal(countryIso) && <SelectedCountries />}

      {displayTabs && (
        <div className="landing__page-menu">
          {sections.map(({ name: section }) => (
            <NavLink
              key={section}
              to={BasePaths.getAssessmentHomeSectionLink(countryIso, FRA.type, section)}
              className="btn landing__page-menu-button"
              activeClassName="disabled"
            >
              {i18n.t(`landing.sections.${section}`)}
            </NavLink>
          ))}
        </div>
      )}
      {displayTabs ? (
        <Switch>
          <Route exact path={BasePaths.getAssessmentHomeLink(countryIso, FRA.type)}>
            <Redirect to={overviewPath} />
          </Route>
          {sections.map(({ name: section, component }: any) => (
            <Route
              key={section}
              path={BasePaths.getAssessmentHomeSectionLink(':countryIso', FRA.type, section)}
              component={component}
            />
          ))}
        </Switch>
      ) : (
        <StatisticalFactsheets />
      )}
    </>
  )
}
export default FraHome
