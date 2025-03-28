import { Col, NodeValue, Row, Table } from 'meta/assessment'
import { AssessmentName } from 'meta/assessment/assessment'

import { OnChange, OnChangeNodeValue, OnPaste } from './hooks/useOnChange'

export type PropsCell = {
  assessmentName: AssessmentName
  col: Col
  disabled: boolean
  nodeValue: NodeValue
  onChange: OnChange
  onChangeNodeValue: OnChangeNodeValue
  onPaste: OnPaste
  row: Row
  rowIndex: number
  sectionName: string
  table: Table
}
