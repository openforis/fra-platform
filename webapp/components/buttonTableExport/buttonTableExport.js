import React from 'react'
import { CSVLink } from 'react-csv'
import Icon from '../icon'

import * as Utils from './utils'

import useIsAssessmentLocked from '@webapp/hooks/useIsAssessmentLocked'

const ButtonTableExport = props => {
  const { filename, tableRef } = props

  const isLocked = useIsAssessmentLocked()

  const style = {
    position: 'absolute',
    right: 1,
    top: -24,
  }

  return (
    <CSVLink
      className={`btn-xs btn-primary${isLocked ? '' : ' disabled'}`}
      style={style}
      target="_blank"
      filename={filename || 'tabledata'}
      data={Utils.getData(tableRef.current)}
    >
      <Icon className="icon-sub icon-white" name="hit-down"/>CSV
    </CSVLink>
  )
}

export default ButtonTableExport
