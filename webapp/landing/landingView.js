import './style.less'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

import { isAllowedToChangeRole } from '@common/userManagementAccessControl'
import { isReviewer } from '@common/countryRole'

import OverviewView from '@webapp/landing/views/overviewView'
import AboutView from '@webapp/landing/views/aboutView'
import RecentActivityView from '@webapp/landing/views/recentActivityView'
import ManageCollaboratorsView from '@webapp/landing/views/manageCollaboratorsView'
import LinksView from '@webapp/landing/views/linksView'
import ContentCheckView from '@webapp/landing/views/contentCheck/contentCheckView'
import useI18n from '@webapp/components/hooks/useI18n'

import * as AppState from '@webapp/app/appState'
import * as UserState from '@webapp/user/userState'

import { getCountryName } from '@webapp/country/actions'

const getSections = (countryIso, userInfo) => {
  const sections = [
    { name: 'overview', component: OverviewView },
    { name: 'recentActivity', component: RecentActivityView },
    { name: 'about', component: AboutView },
    { name: 'links', component: LinksView }
  ]

  const userManagementSection = { name: 'userManagement', component: ManageCollaboratorsView }
  const contentCheckSection = { name: 'contentCheck', component: ContentCheckView }

  if (isAllowedToChangeRole(countryIso, userInfo)) {
    sections.splice(1, 0, userManagementSection)
  }

  if (isReviewer(countryIso, userInfo)) {
    sections.splice(1, 0, contentCheckSection)
  }
  return sections
}

const LandingView = () => {
  const dispatch = useDispatch()
  const { path, url } = useRouteMatch()

  const countryIso = useSelector(AppState.getCountryIso)
  const userInfo = useSelector(UserState.getUserInfo)
  const i18n = useI18n()

  const sections = userInfo ? getSections(countryIso, userInfo) : []

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
