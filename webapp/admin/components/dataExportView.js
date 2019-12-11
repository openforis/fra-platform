import React from 'react'
import Icon from '../../reusableUiComponents/icon'

const DataExportView = (props) => {
  const { i18n } = props

  return (
    <a className="btn btn-primary" href={`/api/assessment/admin/export`}>
      <Icon className="icon-sub icon-white" name="hit-down"/>
      {i18n.t('landing.dataExport.downloadData')}
    </a>
  )
}

export default DataExportView
