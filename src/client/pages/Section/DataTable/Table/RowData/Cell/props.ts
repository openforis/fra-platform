import { AssessmentName } from 'meta/assessment/assessment'
import { Col } from 'meta/assessment/col'
import { NodeValue } from 'meta/assessment/node'
import { Row } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'

import { OnChange, OnChangeNodeValue, OnPaste } from './hooks/useOnChange/types'

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
