import React from 'react'

import { RowType } from '@meta/assessment'

import { useUser } from '@client/store/user'

import { Props } from './props'
import RowData from './RowData'
import RowNoticeMessage from './RowNoticeMessage'
import RowValidation from './RowValidation'

const Components: Record<string, React.FC<Props>> = {
  [RowType.data]: RowData,
  [RowType.validationMessages]: RowValidation,
  [RowType.noticeMessage]: RowNoticeMessage,
}

const Row: React.FC<Props> = (props) => {
  const { data, assessmentName, sectionName, table, row, disabled } = props

  const user = useUser()
  const { type } = row.props

  // TODO: validation
  if ([RowType.validationMessages].includes(type)) return null

  // validation error rows are hidden in public view
  if (type === RowType.validationMessages && !user) {
    return null
  }

  const Component = Components[type]
  return React.createElement(Component, { data, assessmentName, sectionName, table, row, disabled })
}

export default Row
