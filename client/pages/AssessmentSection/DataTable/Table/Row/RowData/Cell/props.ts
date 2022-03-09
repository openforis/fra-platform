import { AssessmentName, Col, Table } from '@meta/assessment'

export type PropsCell = {
  assessmentName: AssessmentName
  sectionName: string
  table: Table
  disabled: boolean
  rowIndex: number
  col: Col
  datum: string
  onChange: any // TODO ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  onPaste: any // TODO ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
}
