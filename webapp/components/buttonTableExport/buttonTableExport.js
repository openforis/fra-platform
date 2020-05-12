import './buttonTableExport.less'

import React from 'react'
import PropTypes from 'prop-types'

import { CSVLink } from 'react-csv'

import { isPrintingMode } from '@webapp/app/assessment/components/print/printAssessment'
import useIsAssessmentLocked from '@webapp/components/hooks/useIsAssessmentLocked'

import Icon from '../icon'
import * as Utils from './utils'

const ButtonTableExport = (props) => {
  const { filename, tableRef } = props

  if (isPrintingMode()) {
    return null
  }

  const isLocked = useIsAssessmentLocked()

  return (
    <CSVLink
      className={`fra-table__btn-export btn-xs btn-primary${isLocked ? '' : ' disabled'}`}
      target="_blank"
      filename={filename}
      data={Utils.getData(tableRef.current)}
    >
      <Icon className="icon-sub icon-white" name="hit-down" />
      CSV
    </CSVLink>
  )
}

ButtonTableExport.defaultProps = {
  filename: 'tableData',
}
ButtonTableExport.propTypes = {
  filename: PropTypes.string,
  tableRef: PropTypes.object.isRequired,
}

export default ButtonTableExport
