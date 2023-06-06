import './ButtonTableExport.scss'
import React, { MutableRefObject } from 'react'
import { CSVLink } from 'react-csv'

import classNames from 'classnames'

import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useIsPrint } from 'client/hooks/useIsPath'
import Icon from 'client/components/Icon'

import * as Utils from './utils'

type Props = {
  disabled?: boolean
  filename?: string
  tableRef: MutableRefObject<HTMLTableElement>
}

const ButtonTableExport: React.FC<Props> = (props) => {
  const { disabled, filename, tableRef } = props

  const { print } = useIsPrint()
  const isLocked = useIsDataLocked()

  if (print) return null

  return (
    <CSVLink
      className={classNames('fra-table__btn-export', 'btn-xs', 'btn-primary', 'no-print', {
        disabled: !isLocked && disabled,
      })}
      target="_blank"
      filename={`${filename}.csv`}
      data={Utils.getData(tableRef.current)}
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
