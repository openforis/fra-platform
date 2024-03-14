import React, { MutableRefObject, useState } from 'react'
import { CSVLink } from 'react-csv'

import { Objects } from 'utils/objects'

import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

import { CSVData } from './types'
import * as Utils from './utils'

type Props = {
  csvData?: CSVData
  disabled?: boolean
  filename?: string
  tableRef: MutableRefObject<HTMLTableElement>
}

const ButtonTableExport: React.FC<Props> = (props) => {
  const { csvData, disabled, filename, tableRef } = props

  const [data, setData] = useState<Array<object>>([])
  const { print } = useIsPrintRoute()
  const isLocked = useIsDataLocked()

  const className = useButtonClassName({ disabled: !isLocked && disabled, iconName: 'hit-down', label: 'CSV' })

  if (print) return null

  if (!Objects.isEmpty(csvData)) {
    return (
      <CSVLink
        className={className}
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

  return (
    <CSVLink
      asyncOnClick
      className={className}
      data={data}
      filename={`${filename}.csv`}
      onClick={(_, done) => {
        setData(Utils.getData(tableRef.current))
        done()
      }}
      target="_blank"
    >
      <Icon className="icon-sub icon-white" name="hit-down" />
      CSV
    </CSVLink>
  )
}

ButtonTableExport.defaultProps = {
  csvData: undefined,
  disabled: false,
  filename: 'tableData',
}

export default ButtonTableExport
