import { CycledPropsObject } from './cycle'
import { Label } from './label'

export enum ColType {
  calculated = 'calculated',
  decimal = 'decimal',
  header = 'header',
  integer = 'integer',
  noticeMessage = 'noticeMessage',
  placeholder = 'placeholder',
  select = 'select',
  selectYesNo = 'selectYesNo',
  text = 'text',
  textarea = 'textarea',
  // placeholder = 'placeholder',
}

export interface ColProps {
  colName?: string
  colSpan?: number
  colType: ColType
  index?: number | string
  label?: Label
  rowSpan?: number
  // calculated props
  calculateFn?: string
}

export interface Col extends CycledPropsObject<ColProps> {
  rowId: number
}
