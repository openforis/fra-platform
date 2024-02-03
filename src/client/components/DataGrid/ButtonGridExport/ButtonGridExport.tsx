import './ButtonGridExport.scss'
import React, { MutableRefObject, useState } from 'react'
import { CSVLink } from 'react-csv'

import classNames from 'classnames'

import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import Icon from 'client/components/Icon'

import * as Utils from './utils'

type Props = {
  disabled?: boolean
  filename?: string
  gridRef: MutableRefObject<HTMLDivElement>
}

const ButtonGridExport: React.FC<Props> = (props) => {
  const { disabled, filename, gridRef } = props

  const [data, setData] = useState<Array<object>>([])

  const { print } = useIsPrintRoute()
  const isLocked = useIsDataLocked()

  if (print) return null

  return (
    <CSVLink
      className={classNames('fra-table__btn-export', 'btn-xs', 'btn-primary', 'no-print', {
        disabled: !isLocked || disabled,
      })}
      data={data}
      onClick={(_, done) => {
        setData(Utils.getDataGridData(gridRef.current))
        done()
      }}
      asyncOnClick
      filename={`${filename}.csv`}
      target="_blank"
    >
      <Icon className="icon-sub icon-white" name="hit-down" />
      CSV
    </CSVLink>
  )
}

ButtonGridExport.defaultProps = {
  disabled: false,
  filename: 'tableData',
}

export default ButtonGridExport
