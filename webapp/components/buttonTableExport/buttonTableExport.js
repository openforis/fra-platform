import React from 'react'
import { CSVLink } from 'react-csv'
import Icon from '../icon'

import * as Utils from './utils'

const ButtonTableExport = props => {
  const { filename, tableRef, right } = props

  const buttonStyleRight = {
    position: 'absolute',
    right: 1,
    top: -27,
  }

  return (
    <CSVLink
      className="btn-s btn-primary"
      style={right ? buttonStyleRight : {}}
      target="_blank"
      filename={filename || 'tabledata'}
      data={Utils.getData(tableRef.current)}
    >
      <Icon className="icon-sub icon-white" name="hit-down" />CSV
    </CSVLink>
  )
}

export default ButtonTableExport
