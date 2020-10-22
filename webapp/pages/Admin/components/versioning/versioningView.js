import './versioningViewStyle.less'

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { getVersions, createVersion, deleteVersion, onChangeNewVersionForm } from '../../actions'
import useI18n from '@webapp/components/hooks/useI18n'

import NewVersionButton from './NewVersionButton'
import NewVersionForm from './NewVersionForm'
import VersioningViewTable from './VersioningViewTable'

import * as AdminState from '@webapp/pages/Admin/adminState'

const VersioningView = (props) => {
  const {
    getVersions,
    versions,
    createVersion,
    deleteVersion,
    onChangeNewVersionForm,
  } = props
  const i18n = useI18n()
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
            deleteVersion={deleteVersion}
            versions={versions}
            getVersions={getVersions} />
          :
          <h1>{i18n.t('landing.versioning.table.noVersions')}</h1>}
        <NewVersionButton />
      </Route>
      <Route path={`${path}new/`}>
        <NewVersionForm onChange={onChangeNewVersionForm} onSubmit={createVersion} />
      </Route>
    </Switch>
  )
}

VersioningView.defaultProps = {
  versions: []
}

const mapStateToProps = (state) => ({
  versions: AdminState.getVersions(state),
})

export default connect(mapStateToProps,
  {
    getVersions,
    createVersion,
    deleteVersion,
    onChangeNewVersionForm
  })(VersioningView)
