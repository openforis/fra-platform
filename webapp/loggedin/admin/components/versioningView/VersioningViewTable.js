import React from 'react';
import { Link, useParams } from 'react-router-dom'
import Icon from '@webapp/components/icon'
import { classNames, sortVersions, formatDate } from './versioningViewUtils'

const VersioningViewTableRow = ({ deleteVersion, id, uid, version, timestamp, name, status }) => {
  const { countryIso } = useParams()
  return <tr className={`tr-${status}`}>
    <td className={classNames.td}>{version}</td>
    <td className={classNames.td}>
      {status === 'pending' ? 'Scheduled at:' : ''}
      {formatDate(timestamp)}
    </td>
    <td className={classNames.td}>
      <Link to={`/country/${countryIso}/user/${uid}`}>{name}</Link>
    </td>
    <td className={classNames.td}>{status}</td>
    <td className={classNames.td}>
      {
        status !== 'pending' &&
        <button onClick={() => deleteVersion(id)} className={classNames.button}>
          <Icon className={classNames.icon} name="remove" /> Delete
        </button>
      }
    </td>
  </tr >
}

export const VersioningViewTable = (props) => {
  const { versions, deleteVersion } = props;
  const thead = ['Version Number', 'Timestamp', 'Created By', 'Status', ''];
  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table style={{ maxWidth: 700 }} className={classNames.table}>
          <thead>
            <tr>
              <th className={classNames.th} colSpan="5">Database Versions</th>
            </tr>
            <tr>
              {thead.map((title, i) => <th className={classNames.th} key={i}>{title}</th>)}
            </tr>
          </thead>
          <tbody>
            {sortVersions(versions).map((version, i) =>
              <VersioningViewTableRow deleteVersion={deleteVersion} key={i} {...version} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
};
