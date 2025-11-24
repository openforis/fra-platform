import React from 'react'
import { CSVLink } from 'react-csv'

import { useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

export type DashboardCSVData = {
  variable: string
  column: string
  value: string | number
  unit: string
}

export type ButtonDataExportProps = {
  data?: Array<object>
  filename?: string
}

const ButtonDataExport: React.FC<ButtonDataExportProps> = (props) => {
  const { data, filename = 'data' } = props

  const className = useButtonClassName({ disabled: false, iconName: 'hit-down', label: 'CSV' })
  if (!data) return null

  return (
    <div>
      <CSVLink className={className} data={data} filename={`${filename}.csv`} target="_blank">
        <Icon className="icon-white" name="hit-down" />
        CSV
      </CSVLink>
    </div>
  )
}

export default ButtonDataExport
