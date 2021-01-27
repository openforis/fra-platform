import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '@webapp/components/icon'
import useI18n from '@webapp/components/hooks/useI18n'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRAVersion from '@common/versioning/fraVersion'
import * as BasePaths from '@webapp/main/basePaths'
import { classNames, sortVersions, formatDate } from './versioningViewUtils'

type VersioningViewTableRowProps = {
  deleteVersion: (...args: any[]) => any
  version: any
}
const VersioningViewTableRow = (props: VersioningViewTableRowProps) => {
  const { deleteVersion, version } = props
  const { status } = version
  const i18n = useI18n()
  return (
    <tr className={`tr-${status}`}>
      <td className={classNames.td}>{FRAVersion.getVersionNumber(version)}</td>
      <td className={classNames.td}>
        {status === 'pending' ? `${(i18n as any).t('landing.versioning.table.scheduledAt')}:` : ''}
        {formatDate(FRAVersion.getPublishedAt(version), i18n)}
      </td>
      <td className={classNames.td}>
        <Link to={`${BasePaths.getUserProfileLink(FRAVersion.getUserId(version))}`}>
          {FRAVersion.getUserName(version)}
        </Link>
      </td>
      <td className={classNames.td}>{(i18n as any).t(`landing.versioning.status.${FRAVersion.getStatus(version)}`)}</td>
      <td className={classNames.td}>
        <button type="button" onClick={() => deleteVersion(FRAVersion.getId(version))} className={classNames.button}>
          {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; name: string; }' is not... Remove this comment to see the full error message */}
          <Icon className={classNames.icon} name="remove" /> {(i18n as any).t('landing.versioning.table.delete')}
        </button>
      </td>
    </tr>
  )
}
type VersioningViewTableProps = {
  deleteVersion: (...args: any[]) => any
  versions: any[]
}
const VersioningViewTable = (props: VersioningViewTableProps) => {
  const { versions, deleteVersion } = props
  const i18n = useI18n()
  const thead = [
    (i18n as any).t('landing.versioning.table.versionNumber'),
    (i18n as any).t('landing.versioning.table.publishedAt'),
    (i18n as any).t('landing.versioning.table.createdBy'),
    (i18n as any).t('landing.versioning.table.status'),
    '',
  ]
  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <table style={{ maxWidth: 700 }} className={classNames.table}>
          <thead>
            <tr>
              {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'. */}
              <th className={classNames.th} colSpan="5">
                {(i18n as any).t('landing.versioning.table.databaseVersions')}
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
export default VersioningViewTable
