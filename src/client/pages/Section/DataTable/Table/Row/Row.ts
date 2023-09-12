import React from 'react'

import { RowType } from 'meta/assessment'

import { Props } from './props'
import RowData from './RowData'
import RowNoticeMessage from './RowNoticeMessage'

const Components: Record<string, React.FC<Props>> = {
  [RowType.data]: RowData,
  [RowType.noticeMessage]: RowNoticeMessage,
}

const Row: React.FC<Props> = (props) => {
  const { data, assessmentName, sectionName, table, row, disabled } = props

  const { type } = row.props

  const Component = Components[type]
  return React.createElement(Component, { data, assessmentName, sectionName, table, row, disabled })
}

export default Row
