import React from 'react'
import Icon from '../../reusableUiComponents/icon'

const versions = [
  {
    version: '1.0.0',
    timestamp: '1576677210872',
    createdBy: 'Admin User',
    status: 'pending'
  },
  {
    version: '2.0.0',
    timestamp: '1576677210872',
    createdBy: 'Admin User2',
    status: 'pending'
  }
]

const VersioningViewTableRow = ({ version, timestamp, createdBy, status }) => {
  return <tr>
    <td>{version}</td>
    <td>{timestamp}</td>
    <td>{createdBy}</td>
    <td>{status}</td>
    <td>remove []</td>
  </tr>
}

const VersioningViewTable = () => {
  const thead = ['Version Number', 'Timestamp', 'Created By', 'Status', '']
  return <table border='1'>
    <thead>
      <tr>
        {thead.map((title, i) => <th key={i}>{title}</th>)}
      </tr>
    </thead>
    <tbody>
      {versions.map((version, i) => <VersioningViewTableRow key={i} {...version} />)}
    </tbody>
  </table>
}

const NewVersionButton = () => {
  return <Icon className="icon-sub icon-white" name="plus"/>
}

const VerisoningView = () => {
  const versionsExist = versions.length > 0
  if (!versionsExist) {
    return <h1>No versions yet</h1>
  }
  return (
    <div>
      <VersioningViewTable />
      <NewVersionButton />
    </div>
  )
}

export default VerisoningView
