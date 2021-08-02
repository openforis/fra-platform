import React from 'react'

import { useUserInfo } from '@webapp/components/hooks'
import { TypeSpec } from '@webapp/sectionSpec'

import RowData from './RowData'
import RowValidation from './RowValidation'
import RowNoticeMessage from './RowNoticeMessage'
import { Props } from './props'

const Components: Record<string, React.FC<Props>> = {
  [TypeSpec.data]: RowData,
  [TypeSpec.validationMessages]: RowValidation,
  [TypeSpec.noticeMessage]: RowNoticeMessage,
}

const Row: React.FC<Props> = (props) => {
  const { data, assessmentType, sectionName, tableSpec, row, disabled } = props

  const userInfo = useUserInfo()
  const { type } = row

  // validation error rows are hidden in public view
  if (type === TypeSpec.validationMessages && !userInfo) {
    return null
  }

  const Component = Components[type]
  return React.createElement(Component, { data, assessmentType, sectionName, tableSpec, row, disabled })
}

export default Row
