import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Link, useRouteMatch, useHistory } from 'react-router-dom'

import { getVersions } from '../actions'

import Icon from '../../reusableUiComponents/icon'

const classNames = {
  table: 'fra-table',
  th: 'fra-table__header-cell',
  td: 'fra-table__cell-left',
}

const VersioningViewTableRow = ({ version, timestamp, createdBy, status }) => {
  return <tr>
    <td className={classNames.td}>{version}</td>
    <td className={classNames.td}>{timestamp}</td>
    <td className={classNames.td}>{createdBy}</td>
    <td className={classNames.td}>{status}</td>
    <td className={classNames.td}>remove []</td>
  </tr>
}

const VersioningViewTable = (props) => {
  const { versions } = props
  const thead = ['Version Number', 'Timestamp', 'Created By', 'Status', '']
  return <table style={{ maxWidth: 700 }} className={classNames.table}>
    <thead>
      <tr>
        {thead.map((title, i) => <th className={classNames.th} key={i}>{title}</th>)}
      </tr>
    </thead>
    <tbody>
      {versions.map((version, i) => <VersioningViewTableRow key={i} {...version} />)}
    </tbody>
  </table>
}

const NewVersionButton = () => {

  const { url } = useRouteMatch()

  return <Link to={`${url}new/`}>
    <Icon title="foo" className="icon-new-version icon-red" name="circle-add" />
  </Link>
}

const NewVersionForm = () => {
  const { url } = useRouteMatch()
  const history = useHistory()
  const goBack = (e) => {
    e.preventDefault()
    history.goBack()
  }

  return <form>
    <label>Version</label>
    <input type="text" name="version" /><br />
    <label>Date</label>
    <input type="date" name="timestamp_date" />
    <label>Time</label>
    <input type="time" name="timestamp_time" /><br />
    <button onClick={goBack}>Cancel</button> <button>Submit</button>
  </form>
}

const VersioningView = (props) => {
  const { getVersions, versions } = props
  const { path } = useRouteMatch()
  const versionsExist = versions.length > 0

  useEffect(() => {
    getVersions()
  }, [])

  return (
    <div>
      <Route exact path={path}>
        {versionsExist ?
          <VersioningViewTable versions={versions} getVersions={getVersions} />
          :
          <h1>No versions yet</h1>}
        <NewVersionButton />
      </Route>
      <Route path={`${path}new/`}>
        <NewVersionForm />
      </Route>
    </div>
  )
}

VersioningView.defaultProps = {
  versions: []
}

const mapStateToProps = (state) => ({
  versions: state.admin.versions
})

export default connect(mapStateToProps, { getVersions })(VersioningView)
