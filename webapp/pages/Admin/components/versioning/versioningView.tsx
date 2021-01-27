import './versioningViewStyle.less'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import useI18n from '@webapp/components/hooks/useI18n'
import { AdminState, AdminActions } from '@webapp/store/admin'
import NewVersionButton from './NewVersionButton'
import NewVersionForm from './NewVersionForm'
import VersioningViewTable from './VersioningViewTable'

const VersioningView = (props: any) => {
  const { getVersions, versions, createVersion, deleteVersion, onChangeNewVersionForm } = props
  const i18n = useI18n()
  const { path } = useRouteMatch()
  const versionsExist = versions.length > 0
  useEffect(() => {
    getVersions()
  }, [])
  return (
    <Switch>
      <Route exact path={path}>
        {versionsExist ? (
          <VersioningViewTable deleteVersion={deleteVersion} versions={versions} getVersions={getVersions} />
        ) : (
          <h1>{(i18n as any).t('landing.versioning.table.noVersions')}</h1>
        )}
        <NewVersionButton />
      </Route>
      <Route path={`${path}new/`}>
        <NewVersionForm onChange={onChangeNewVersionForm} onSubmit={createVersion} />
      </Route>
    </Switch>
  )
}
VersioningView.defaultProps = {
  versions: [],
}
const mapStateToProps = (state: any) => ({
  versions: AdminState.getVersions(state),
})
export default connect(mapStateToProps, {
  getVersions: AdminActions.getVersions,
  createVersion: AdminActions.createVersion,
  deleteVersion: AdminActions.deleteVersion,
  onChangeNewVersionForm: AdminActions.onChangeNewVersionForm,
})(VersioningView)
