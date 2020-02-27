import './style.less'

import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

import AboutView from '@webapp/landing/views/aboutView'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useLandingViewSections from '@webapp/landing/useLandingViewSections'

import { getCountryName } from '@webapp/country/actions'

const LandingView = () => {
  const dispatch = useDispatch()
  const { path, url } = useRouteMatch()

  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const i18n = useI18n()

  const sections = useLandingViewSections()

  return (
    <div className="fra-view__content">

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
            userInfo && sections.map(({ name }, i) => (
              <NavLink
                key={i}
                to={`${url}/${name}/`}
                className="landing__page-menu-button"
                activeClassName="disabled">
                {i18n.t(`landing.sections.${name}`)}
              </NavLink>
            ))
          }
        </div>
      </div>

      {
        userInfo
          ? (
            <Switch>
              <Route exact path={path}>
                <Redirect to={`${url}overview/`}/>
              </Route>
              {
                sections.map((section, i) =>
                  <Route key={i} path={`${path}${section.name}/`} component={section.component}/>)
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
