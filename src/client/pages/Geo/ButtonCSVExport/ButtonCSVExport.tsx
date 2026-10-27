import React from 'react'
import { CSVLink } from 'react-csv'

import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'
import { IconName } from 'client/components/Icon/types'

import { CSVData } from './types'

type Props = {
  csvData: CSVData
  filename?: string
}

const ButtonCSVExport: React.FC<Props> = (props) => {
  const { csvData, filename = 'tableData' } = props

  const className = useButtonClassName({ iconName: IconName.hitDown, label: 'CSV', size: ButtonSize.xs })

  return (
    <CSVLink
      className={className}
      data={csvData.data}
      filename={`${filename}.csv`}
      headers={csvData.headers}
      target="_blank"
    >
      <Icon name={IconName.hitDown} />
      CSV
    </CSVLink>
  )
}

export default ButtonCSVExport
