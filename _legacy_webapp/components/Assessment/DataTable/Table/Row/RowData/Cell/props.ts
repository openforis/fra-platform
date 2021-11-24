import { ChangeEventHandler, ClipboardEventHandler } from 'react'
import { AssessmentType } from '@core/assessment'
import { ColSpec, TableSpec } from '../../../../../../../sectionSpec'

export type PropsCell = {
  assessmentType: AssessmentType
  sectionName: string
  tableSpec: TableSpec
  disabled: boolean
  rowIdx: number
  col: ColSpec
  datum: string
  onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  onPaste: ClipboardEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
}
