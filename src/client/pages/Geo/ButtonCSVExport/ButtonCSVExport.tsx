import React from 'react'
import { CSVLink } from 'react-csv'

import Icon from 'client/components/Icon'

import { CSVData } from './types'

type Props = {
  csvData: CSVData
  filename?: string
}

const ButtonCSVExport: React.FC<Props> = (props) => {
  const { csvData, filename } = props

  return (
    <CSVLink
      className="data-grid__btn-export btn-xs btn-primary no-print"
      data={csvData.data}
      filename={`${filename}.csv`}
      headers={csvData.headers}
      target="_blank"
    >
      <Icon className="icon-sub icon-white" name="hit-down" />
      CSV
    </CSVLink>
  )
}

ButtonCSVExport.defaultProps = {
  filename: 'tableData',
}

export default ButtonCSVExport
