import React from 'react'
import Icon from '@webapp/components/icon'
import { useI18n } from '@webapp/components/hooks'

const DataExportView = () => {
  const i18n = useI18n()

  return (
    <a className="btn btn-primary" href="/api/assessment/admin/export">
      <Icon className="icon-sub icon-white" name="hit-down" />
      {i18n.t('landing.dataExport.downloadData')}
    </a>
  )
}

export default DataExportView
