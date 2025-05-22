import React from 'react'

import { Col } from 'meta/assessment/col'
import { NodeValue } from 'meta/assessment/node'
import { Row } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data'

export type Props = {
  col: Col
  data: RecordAssessmentData
  nodeValue: NodeValue
  row: Row
  sectionName: string
  table: Table
}
export type OnChangeNodeValue = (value: NodeValue) => void
export type OnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
export type OnPaste = React.ClipboardEventHandler<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLDivElement
>
export type Returned = {
  onChange: OnChange
  onChangeNodeValue: OnChangeNodeValue
  onPaste: OnPaste
}
