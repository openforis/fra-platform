import './style.less'

import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'

import AboutView from '@webapp/app/landing/views/aboutView'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useLandingViewSections from '@webapp/app/landing/useLandingViewSections'

import { getCountryName } from '@webapp/app/country/actions'

const LandingView = () => {
  const dispatch = useDispatch()

  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const i18n = useI18n()

  const url = `/country/${countryIso}/`
  const sections = useLandingViewSections()
  const userAndCountry = userInfo && countryIso

  return (
    <div className="app-view__content">

      <div className="landing__page-header">
        <h1 className="landing__page-title">
          {
            countryIso
              ? dispatch(getCountryName(countryIso, i18n.language))
              : i18n.t('common.fraPlatform')
          }
        </h1>
        <div className="landing__page-menu">
          {
            userAndCountry && sections.map(({ name }, i) => (
              <NavLink
                key={i}
                to={`${url}${name}/`}
                className="landing__page-menu-button"
                activeClassName="disabled">
                {i18n.t(`landing.sections.${name}`)}
              </NavLink>
            ))
          }
        </div>
      </div>

      {
        userAndCountry
          ? (
            <Switch>
              <Route exact path={['/', url]}>
                <Redirect to={`${url}overview/`}/>
              </Route>
              {
                sections.map((section, i) =>
                  <Route key={i} path={`${url}${section.name}/`} component={section.component}/>)
              }
            </Switch>
          )
          : (
            <AboutView/>
          )
      }

    </div>
  )
}

export default LandingView
