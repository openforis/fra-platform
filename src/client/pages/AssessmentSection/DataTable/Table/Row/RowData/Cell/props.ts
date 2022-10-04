import { AssessmentName, Col, NodeValue, Row, Table } from '@meta/assessment'

import { OnChange, OnChangeNodeValue, OnPaste } from './hooks/useOnChange'

export type PropsCell = {
  assessmentName: AssessmentName
  sectionName: string
  table: Table
  disabled: boolean
  rowIndex: number
  col: Col
  row: Row
  nodeValue: NodeValue
  datum: string
  onChange: OnChange
  onPaste: OnPaste
  onChangeNodeValue: OnChangeNodeValue
}
