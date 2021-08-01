import React from 'react'
import * as PropTypes from 'prop-types'

import { RowSpec } from '@webapp/app/assessment/components/section/sectionSpec'

import { useUserInfo } from '@webapp/components/hooks'
import RowData from './rowData'
import RowValidation from './rowValidation'
import RowNoticeMessage from './rowNoticeMessage'

const componentsByType = {
  [RowSpec.TypeSpec.data]: RowData,
  [RowSpec.TypeSpec.validationMessages]: RowValidation,
  [RowSpec.TypeSpec.noticeMessage]: RowNoticeMessage,
}

const Row = (props: any) => {
  const userInfo = useUserInfo()

  const { data, assessmentType, sectionName, tableSpec, row, disabled } = props
  const type: any = RowSpec.getType(row)

  // validation error rows are hidden in public view
  if (type === RowSpec.TypeSpec.validationMessages && !userInfo) {
    return null
  }

  const component: any = componentsByType[type]
  return React.createElement(component, { data, assessmentType, sectionName, tableSpec, row, disabled })
}

Row.propTypes = {
  data: PropTypes.array.isRequired,
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  tableSpec: PropTypes.object.isRequired,
  row: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default Row
