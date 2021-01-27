import React from 'react'
import Icon from '@webapp/components/icon'
import { useI18n } from '@webapp/components/hooks'

const DataExportView = () => {
  const i18n = useI18n()
  return (
    <a className="btn btn-primary" href="/api/assessment/admin/export">
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; name: string; }' is not... Remove this comment to see the full error message */}
      <Icon className="icon-sub icon-white" name="hit-down" />
      {(i18n as any).t('landing.dataExport.downloadData')}
    </a>
  )
}
export default DataExportView
