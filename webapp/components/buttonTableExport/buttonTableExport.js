import './buttonTableExport.less'

import React from 'react'
import PropTypes from 'prop-types'

import { CSVLink } from 'react-csv'

import { useIsAssessmentLocked, usePrintView } from '@webapp/components/hooks'

import Icon from '../icon'
import * as Utils from './utils'

const ButtonTableExport = (props) => {
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

ButtonTableExport.propTypes = {
  disabled: PropTypes.bool,
  filename: PropTypes.string,
  tableRef: PropTypes.object.isRequired,
}

export default ButtonTableExport
