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

export interface ColSelectOption {
  hidden?: boolean
  name: string
  type?: 'header' | undefined
}

export interface ColSelectProps {
  options: Array<ColSelectOption>
  labelKeyPrefix?: string
}

export interface ColProps {
  colName?: string
  colSpan?: number
  colType: ColType
  index?: number | string
  label?: Label
  rowSpan?: number
  variableNo?: string
  // calculated props
  calculateFn?: string
  // select props
  select?: ColSelectProps
}

export interface Col extends CycledPropsObject<ColProps> {
  rowId: number
}
