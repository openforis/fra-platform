import React, { MutableRefObject, useState } from 'react'
import { CSVLink } from 'react-csv'

import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

import * as Utils from './utils'

type Props = {
  disabled?: boolean
  filename?: string
  tableRef: MutableRefObject<HTMLTableElement>
}

const ButtonTableExport: React.FC<Props> = (props) => {
  const { disabled, filename, tableRef } = props

  const [data, setData] = useState<Array<object>>([])
  const { print } = useIsPrintRoute()
  const isLocked = useIsDataLocked()

  const className = useButtonClassName({ disabled: !isLocked && disabled, iconName: 'hit-down', label: 'CSV' })

  if (print) return null

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
  disabled: false,
  filename: 'tableData',
}

export default ButtonTableExport
