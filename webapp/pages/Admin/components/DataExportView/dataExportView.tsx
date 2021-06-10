import React from 'react'
import Icon from '@webapp/components/icon'
import { useI18n } from '@webapp/components/hooks'
import { ApiEndPoint } from '@common/api/endpoint'

const DataExportView = () => {
  const i18n = useI18n()
  return (
    <a className="btn btn-primary" href={`${ApiEndPoint.Assessment.export()}`}>
      <Icon className="icon-sub icon-white" name="hit-down" />
      {(i18n as any).t('landing.dataExport.downloadData')}
    </a>
  )
}
export default DataExportView
