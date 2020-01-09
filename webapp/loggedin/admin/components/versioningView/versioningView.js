import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { getVersions, createVersion, onChangeNewVersionForm } from '../../actions'


import './versioningViewStyle.less'
import { NewVersionButton } from './NewVersionButton'
import { NewVersionForm } from './NewVersionForm'
import { VersioningViewTable } from './VersioningViewTable'

const VersioningView = (props) => {
  const {
    getVersions,
    versions,
    createVersion,
    onChangeNewVersionForm
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
          <VersioningViewTable versions={versions} getVersions={getVersions} />
          :
          <h1>No versions yet</h1>}
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
  versions: state.admin.versions
})

export default connect(mapStateToProps,
  {
    getVersions,
    createVersion,
    onChangeNewVersionForm
  })(VersioningView)

