import React from 'react'
import { connect } from 'react-redux'
import {
  Switch,
  Redirect,
  Route,
  NavLink,
  useRouteMatch,
} from 'react-router-dom'

import { isAdministrator } from '@common/countryRole'
import NotFound from '@webapp/app/notfound'
import UsersManagementView from './components/usersManagementView'
import DataExportView from './components/dataExportView'
import VersioningView from './components/versioningView'

const sections = [
  {
    name: 'usersManagement',
    component: UsersManagementView,
    labelKey: 'landing.sections.userManagement'
  },
  {
    name: 'dataExport',
    component: DataExportView,
    labelKey: 'landing.sections.dataExport'
  },
  {
    name: 'versioning',
    component: VersioningView,
    labelKey: 'landing.sections.versioning'
  }
]

const AdminViewLink = ({ labelKey, name, i18n }) => {
  let { url } = useRouteMatch()

  return <NavLink
    to={`${url}/${name}/`}
    className="landing__page-menu-button"
    activeClassName="disabled"
    key={name}>
    {i18n.t(labelKey)}
  </NavLink>
}

const AdminView = (props) => {
  const { userInfo, i18n } = props
  let { path, url } = useRouteMatch()

  // Todo : redirect to /404 or /notfound
  if (!isAdministrator(userInfo)) {
    return <NotFound/>
  }

  return (
    <div className="fra-view__content">

      <div className="landing__page-header">
        <h1 className="landing__page-title">{i18n.t('admin.admin')}</h1>
        <div className="landing__page-menu">
          {sections.map((section, i) => <AdminViewLink key={i} i18n={i18n} {...section} />)}
        </div>
      </div>

      <Switch>
        <Route exact path={path}>
          <Redirect to={`${url}usersManagement/`}/>
        </Route>
        <Route path={`${path}usersManagement/`}>
          <UsersManagementView {...props} />
        </Route>
        <Route path={`${path}dataExport/`}>
          <DataExportView {...props} />
        </Route>
        <Route path={`${path}versioning/`}>
          <VersioningView {...props} />
        </Route>
      </Switch>

    </div>
  )
}

const mapStateToProps = (state) => ({
  i18n: state.user.i18n,
  userInfo: state.user.userInfo,
})

export default connect(mapStateToProps)(AdminView)
