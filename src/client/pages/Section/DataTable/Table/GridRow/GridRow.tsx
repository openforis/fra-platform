import React from 'react'

import { RowType } from 'meta/assessment'

import RowData from 'client/pages/Section/DataTable/Table/GridRow/RowData'

import { Props } from './props'

const Components: Record<string, React.FC<Props>> = {
  [RowType.data]: RowData,
  // [RowType.noticeMessage]: RowNoticeMessage, TODO
}

const GridRow: React.FC<Props> = (props) => {
  const { data, assessmentName, sectionName, table, row, disabled } = props

  const { type } = row.props

  const Component = Components[type]

  if (!Component) return null // TODO: Remove

  return React.createElement(Component, { data, assessmentName, sectionName, table, row, disabled })
}

export default GridRow
