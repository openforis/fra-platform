import './ButtonTableExport.scss'
import React, { MutableRefObject } from 'react'
import { CSVLink } from 'react-csv'

import { useIsAssessmentLocked } from '@webapp/hooks'
import { usePrintView } from '@webapp/store/app'

import Icon from '@webapp/components/icon'
import * as Utils from './utils'

type Props = {
  disabled?: boolean
  filename?: string
  tableRef: MutableRefObject<HTMLTableElement>
}

const ButtonTableExport: React.FC<Props> = (props) => {
  const { disabled, filename, tableRef } = props

  const [printView] = usePrintView()
  const isLocked = useIsAssessmentLocked()

  if (printView) return null

  return (
    <CSVLink
      className={`fra-table__btn-export btn-xs btn-primary${isLocked && !disabled ? '' : ' disabled'}`}
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
