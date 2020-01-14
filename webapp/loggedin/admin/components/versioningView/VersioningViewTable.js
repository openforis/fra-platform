import React from 'react';
import { Link, useParams } from 'react-router-dom'
import Icon from '@webapp/components/icon'
import { classNames, sortVersions, formatDate } from './versioningViewUtils'

const VersioningViewTableRow = ({ i18n, deleteVersion, id, userId, version, timestamp, userName, status }) => {
  const { countryIso } = useParams()
  return <tr className={`tr-${status}`}>
    <td className={classNames.td}>{version}</td>
    <td className={classNames.td}>
      {status === 'pending' ? `${i18n.t('landing.versioning.table.scheduledAt')}:` : ''}
      {formatDate(timestamp)}
    </td>
    <td className={classNames.td}>
      <Link to={`/country/${countryIso}/user/${userId}`}>{userName}</Link>
    </td>
    <td className={classNames.td}>{i18n.t(`landing.versioning.status.${status}`)}</td>
    <td className={classNames.td}>
      {
        status !== 'pending' &&
        <button onClick={() => deleteVersion(id)} className={classNames.button}>
          <Icon className={classNames.icon} name="remove" /> {i18n.t('landing.versioning.table.delete')}
        </button>
      }
    </td>
  </tr >
}

export const VersioningViewTable = (props) => {
  const { versions, deleteVersion, i18n } = props;
  const thead = [
    i18n.t('landing.versioning.table.versionNumber'),
    i18n.t('landing.versioning.table.timestamp'),
    i18n.t('landing.versioning.table.createdBy'),
    i18n.t('landing.versioning.table.status'),
    ''];
  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table style={{ maxWidth: 700 }} className={classNames.table}>
          <thead>
            <tr>
              <th className={classNames.th} colSpan="5">
                {i18n.t('landing.versioning.table.databaseVersions')}
              </th>
            </tr>
            <tr>
              {thead.map((title, i) => <th className={classNames.th} key={i}>{title}</th>)}
            </tr>
          </thead>
          <tbody>
            {sortVersions(versions).map((version, i) =>
              <VersioningViewTableRow i18n={i18n} deleteVersion={deleteVersion} key={i} {...version} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
};
