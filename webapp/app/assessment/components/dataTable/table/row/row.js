import React from 'react'
import PropTypes from 'prop-types'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import { useUserInfo } from '@webapp/components/hooks'
import RowData from './rowData'
import RowValidation from './rowValidation'
import RowNoticeMessage from './rowNoticeMessage'

const componentsByType = {
  [SectionSpec.TYPES.data]: RowData,
  [SectionSpec.TYPES.validationMessages]: RowValidation,
  [SectionSpec.TYPES.noticeMessage]: RowNoticeMessage,
}

const Row = (props) => {
  const userInfo = useUserInfo()

  const { data, assessmentType, sectionName, tableName, updateTableDataCell, odp, row, disabled, secondary } = props
  const { type } = row

  // validation error rows are hidden in public view
  if (type === SectionSpec.TYPES.validationMessages && !userInfo) {
    return null
  }

  const component = componentsByType[type]
  return React.createElement(component, {
    data,
    assessmentType,
    sectionName,
    tableName,
    updateTableDataCell,
    odp,
    row,
    disabled,
    secondary,
  })
}

Row.propTypes = {
  data: PropTypes.array.isRequired,
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  odp: PropTypes.bool.isRequired,
  row: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  updateTableDataCell: PropTypes.func.isRequired,
  secondary: PropTypes.bool.isRequired,
}

export default Row
