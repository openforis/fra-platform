import './versioningViewStyle.less'

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { getVersions, createVersion, deleteVersion, onChangeNewVersionForm } from '../../actions'

import { NewVersionButton } from './NewVersionButton'
import { NewVersionForm } from './NewVersionForm'
import { VersioningViewTable } from './VersioningViewTable'

import * as AdminState from '@webapp/loggedin/admin/adminState'

const VersioningView = (props) => {
  const {
    getVersions,
    versions,
    createVersion,
    deleteVersion,
    onChangeNewVersionForm,
    i18n
  } = props
  const { path } = useRouteMatch()
  const versionsExist = versions.length > 0

  useEffect(() => {
    getVersions()
  }, [])

  return (
    <Switch>
      <Route exact path={path}>
        {versionsExist ?
          <VersioningViewTable
            i18n={i18n}
            deleteVersion={deleteVersion}
            versions={versions}
            getVersions={getVersions} />
          :
          <h1>No versions yet</h1>}
        <NewVersionButton />
      </Route>
      <Route path={`${path}new/`}>
        <NewVersionForm i18n={i18n} onChange={onChangeNewVersionForm} onSubmit={createVersion} />
      </Route>
    </Switch>
  )
}

VersioningView.defaultProps = {
  versions: []
}

const mapStateToProps = (state) => ({
  versions: AdminState.getVersions(state),
  i18n: state.user.i18n,
})

export default connect(mapStateToProps,
  {
    getVersions,
    createVersion,
    deleteVersion,
    onChangeNewVersionForm
  })(VersioningView)
