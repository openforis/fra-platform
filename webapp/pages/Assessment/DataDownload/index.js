import React from 'react'

import { useI18n } from '../../../components/hooks'
// /api/export/bulk-download
const DataDownload = () => {
  const i18n = useI18n()
  return (
    <div className="app-view__content">
      <div className="landing__page-header">
        <h1 className="landing__page-title"> {i18n.t('dataDownload.dataDownload')}</h1>
      </div>
    </div>
  )
}

export default DataDownload
