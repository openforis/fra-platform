import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Icon from '@webapp/components/icon'
import useI18n from '@webapp/components/hooks/useI18n'
import * as FRAVersion from '@common/versioning/fraVersion'
import * as BasePaths from '@webapp/main/basePaths'
import { classNames, sortVersions, formatDate } from './versioningViewUtils'

const VersioningViewTableRow = (props) => {
  const { deleteVersion, version } = props
  const { status } = version
  const i18n = useI18n()

  return (
    <tr className={`tr-${status}`}>
      <td className={classNames.td}>{FRAVersion.getVersionNumber(version)}</td>
      <td className={classNames.td}>
        {status === 'pending' ? `${i18n.t('landing.versioning.table.scheduledAt')}:` : ''}
        {formatDate(FRAVersion.getPublishedAt(version), i18n)}
      </td>
      <td className={classNames.td}>
        <Link to={`${BasePaths.getUserLink(FRAVersion.getUserId(version))}`}>{FRAVersion.getUserName(version)}</Link>
      </td>
      <td className={classNames.td}>{i18n.t(`landing.versioning.status.${FRAVersion.getStatus(version)}`)}</td>
      <td className={classNames.td}>
        <button type="button" onClick={() => deleteVersion(FRAVersion.getId(version))} className={classNames.button}>
          <Icon className={classNames.icon} name="remove" /> {i18n.t('landing.versioning.table.delete')}
        </button>
      </td>
    </tr>
  )
}

VersioningViewTableRow.propTypes = {
  deleteVersion: PropTypes.func.isRequired,
  version: PropTypes.object.isRequired,
}

const VersioningViewTable = (props) => {
  const { versions, deleteVersion } = props
  const i18n = useI18n()
  const thead = [
    i18n.t('landing.versioning.table.versionNumber'),
    i18n.t('landing.versioning.table.publishedAt'),
    i18n.t('landing.versioning.table.createdBy'),
    i18n.t('landing.versioning.table.status'),
    '',
  ]
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
              {thead.map((title) => (
                <th className={classNames.th} key={title}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortVersions(versions).map((version) => (
              <VersioningViewTableRow deleteVersion={deleteVersion} key={version.id} version={version} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

VersioningViewTable.propTypes = {
  deleteVersion: PropTypes.func.isRequired,
  versions: PropTypes.array.isRequired,
}

export default VersioningViewTable
