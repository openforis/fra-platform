import React from 'react'
import PropTypes from 'prop-types'

import RowData from '@webapp/app/assessment/components/dataTable/table/rowData'
import RowValidation from '@webapp/app/assessment/components/dataTable/table/rowValidation'
import RowNoticeMessage from '@webapp/app/assessment/components/dataTable/table/rowNoticeMessage'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

const rowRenderers = {
  data: RowData,
  validationMessages: RowValidation,
  noticeMessage: RowNoticeMessage,
}

const Row = props => {
  const userInfo = useUserInfo()

  const { data, assessmentType, sectionName, tableName, odp, row, disabled } = props
  const { type, render } = row

  // validation error rows are hidden in public view
  if (type === 'validationErrors' && !userInfo) {
    return null
  }

  const renderer = type === 'custom' ? render : rowRenderers[type]``
  return React.createElement(renderer, { data, assessmentType, sectionName, tableName, odp, row, disabled })
}

Row.propTypes = {
  data: PropTypes.array.isRequired,
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  odp: PropTypes.bool.isRequired,
  row: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default Row
