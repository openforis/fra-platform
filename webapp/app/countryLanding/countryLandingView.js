import './style.less'

import React from 'react'
import { Link, matchPath, NavLink, Redirect, Route, Switch, useLocation } from 'react-router-dom'

import { Area } from '@common/country'
import * as BasePaths from '@webapp/main/basePaths'

import { useCountryIso, useI18n, useUserInfo } from '@webapp/components/hooks'
import Icon from '@webapp/components/icon'
import useCountryLandingSections from '@webapp/app/countryLanding/useCountryLandingSections'
import StatisticalFactsheets from '@webapp/app/countryLanding/views/statisticalFactsheets'

const CountryLandingView = () => {
  const { pathname } = useLocation()
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const i18n = useI18n()
  const sections = useCountryLandingSections()

  const overviewPath = BasePaths.getCountrySectionLink(countryIso, 'overview')
  const matchOverview = matchPath(pathname, {
    path: [BasePaths.getCountryHomeLink(countryIso), overviewPath],
    exact: true,
  })
  // tabs are available when user is logged-in and selected area is country
  const displayTabs = userInfo && countryIso && Area.isISOCountry(countryIso)

  return (
    <div className="app-view__content">
      <div className="landing__page-header">
        <h1 className="landing__page-title">
          {i18n.t(`area.${countryIso}.listName`)}

          {!Area.isISOCountry(countryIso) && matchOverview && (
            <Link
              className="btn-s btn-primary landing__btn-download"
              to={`/api/fileRepository/statisticalFactsheets/${countryIso}/${i18n.language}`}
              target="_top"
              alt=""
            >
              <Icon name="hit-down" className="icon-hit-down icon-white" />
              <Icon name="icon-table2" className="icon-no-margin icon-white" />
            </Link>
          )}
        </h1>

        {displayTabs && (
          <div className="landing__page-menu">
            {sections.map(({ name: section }) => (
              <NavLink
                key={section}
                to={BasePaths.getCountrySectionLink(countryIso, section)}
                className="landing__page-menu-button"
                activeClassName="disabled"
              >
                {i18n.t(`landing.sections.${section}`)}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {displayTabs ? (
        <Switch>
          <Route exact path={BasePaths.getCountryHomeLink(countryIso)}>
            <Redirect to={overviewPath} />
          </Route>
          {sections.map(({ name: section, component }) => (
            <Route key={section} path={BasePaths.getCountrySectionLink(':countryIso', section)} component={component} />
          ))}
        </Switch>
      ) : (
        <StatisticalFactsheets />
      )}
    </div>
  )
}

export default CountryLandingView
