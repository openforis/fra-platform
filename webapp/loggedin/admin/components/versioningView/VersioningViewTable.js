import React from 'react';
import { Link, useParams } from 'react-router-dom'
import Icon from '@webapp/components/icon'
import useI18n from '@webapp/hooks/useI18n'
import { classNames, sortVersions, formatDate } from './versioningViewUtils'
import * as FRAVersion from '@common/versioning/fraVersion'

const VersioningViewTableRow = ({ deleteVersion, version}) => {
  const { countryIso } = useParams()
  const i18n = useI18n()

  return <tr className={`tr-${status}`}>
    <td className={classNames.td}>{FRAVersion.getVersionNumber(version)}</td>
    <td className={classNames.td}>
      {status === 'pending' ? `${i18n.t('landing.versioning.table.scheduledAt')}:` : ''}
      {formatDate(FRAVersion.getPublishedAt(version), i18n)}
    </td>
    <td className={classNames.td}>
      <Link to={`/country/${countryIso}/user/${FRAVersion.getUserId(version)}`}>{FRAVersion.getUserName(version)}</Link>
    </td>
    <td className={classNames.td}>{i18n.t(`landing.versioning.status.${FRAVersion.getStatus(version)}`)}</td>
    <td className={classNames.td}>
      {
        // status !== 'pending' &&
        <button onClick={() => deleteVersion(FRAVersion.getId(version))} className={classNames.button}>
          <Icon className={classNames.icon} name="remove" /> {i18n.t('landing.versioning.table.delete')}
        </button>
      }
    </td>
  </tr >
}

const VersioningViewTable = (props) => {
  const { versions, deleteVersion } = props;
  const i18n = useI18n()
  const thead = [
    i18n.t('landing.versioning.table.versionNumber'),
    i18n.t('landing.versioning.table.publishedAt'),
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
              <VersioningViewTableRow deleteVersion={deleteVersion} key={i} version={version} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default VersioningViewTable
