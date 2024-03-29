import './style.less'
import React, { memo } from 'react'
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom'
import useI18n from '@webapp/hooks/useI18n'
import * as BasePaths from '@webapp/main/basePaths'
import { isAdministrator } from '@common/countryRole'
import NotFound from '@webapp/app/notfound'
import { useUserInfo } from '@webapp/store/user'
import UsersManagementView from './components/UserManagementView'
import DataExportView from './components/DataExportView'
import Menu from './components/Menu'

const Admin = (props: any) => {
  const userInfo = useUserInfo()
  const i18n = useI18n()
  const { path, url } = useRouteMatch()
  // Todo : redirect to /404 or /notfound
  if (!isAdministrator(userInfo)) {
    return <NotFound />
  }
  return (
    <div className="app-view__content">
      <div className="landing__page-header">
        <h1 className="landing__page-title title">{i18n.t('admin.admin')}</h1>
        <Menu />
      </div>

      <Switch>
        <Route exact path={BasePaths.admin} render={() => <Redirect to={`${url}usersManagement/`} />} />
        <Route path={`${path}usersManagement/`}>
          <UsersManagementView {...props} />
        </Route>
        <Route path={`${path}dataExport/`}>
          <DataExportView />
        </Route>
      </Switch>
    </div>
  )
}
export default memo(Admin)
