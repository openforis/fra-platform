import './style.less'

import React from 'react'
import { connect, useSelector } from 'react-redux'
import { NavLink, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

import { getCountryName } from '../country/actions'
import { isAllowedToChangeRole } from '@common/userManagementAccessControl'
import { isReviewer } from '@common/countryRole'

import OverviewView from './views/overviewView'
import AboutView from './views/aboutView'
import RecentActivityView from './views/recentActivityView'
import ManageCollaboratorsView from './views/manageCollaboratorsView'
import LinksView from './views/linksView'
import ContentCheckView from './views/contentCheck/contentCheckView'

import * as AppState from '@webapp/app/appState'
import * as UserState from '@webapp/user/userState'

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


const LandingViewLink = ({ labelKey, name, i18n }) => {
  let { url } = useRouteMatch()

  return <NavLink
    to={`${url}/${name}/`}
    className="landing__page-menu-button"
    activeClassName="disabled"
    key={name}>

    {i18n.t(`landing.sections.${name}`)}
  </NavLink>
}

const LandingView = (props) => {
  const { userInfo, i18n, getCountryName } = props
  const countryIso = useSelector(AppState.getCountryIso)
  const { path, url } = useRouteMatch()

  const sections = getSections(countryIso, userInfo)

  return (
    <div className="fra-view__content">

      <div className="landing__page-header">
        <h1 className="landing__page-title">{getCountryName(countryIso, i18n.language)}</h1>
        <div className="landing__page-menu">
          {sections.map((section, i) => <LandingViewLink key={i} i18n={i18n} {...section} />)}
        </div>
      </div>

      <Switch>
        <Route exact path={path}>
          <Redirect to={`${url}overview/`} />
        </Route>
        {
          sections.map((section, i) =>
            <Route key={i} path={`${path}${section.name}/`} component={section.component} />)
        }
      </Switch>

    </div>
  )
}

const mapStateToProps = state => ({
  i18n: UserState.getI18n(state),
  userInfo: UserState.getUserInfo(state),
})

export default connect(mapStateToProps, {
  getCountryName
})(LandingView)
