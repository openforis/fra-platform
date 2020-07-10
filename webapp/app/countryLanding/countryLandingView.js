import './style.less'

import React from 'react'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'

import * as BasePaths from '@webapp/main/basePaths'

import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useCountryLandingSections from '@webapp/app/countryLanding/useCountryLandingSections'
import StatisticalFactsheets from '@webapp/app/countryLanding/views/statisticalFactsheets'

import * as Area from '@common/country/area'

const CountryLandingView = () => {
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const i18n = useI18n()

  const sections = useCountryLandingSections()
  const userAndCountry = userInfo && countryIso

  // tabs are available when user is logged-in and selected area is country
  const displayTabs = userAndCountry && Area.isISOCountry(countryIso)

  return (
    <div className="app-view__content">
      <div className="landing__page-header">
        <h1 className="landing__page-title">
          {countryIso ? i18n.t(`area.${countryIso}.listName`) : i18n.t('common.fraPlatform')}
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
            <Redirect to={BasePaths.getCountrySectionLink(countryIso, 'overview')} />
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
