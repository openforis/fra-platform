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
  taxon = 'taxon',
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

export interface ColStyle {
  colSpan?: number
  rowSpan?: number
}

export interface ColProps {
  colName?: string
  colType: ColType
  index?: number | string
  label?: Label
  variableNo?: string
  // calculated props
  calculateFn?: string
  // select props
  select?: ColSelectProps
  // style by cycle uuid
  style: Record<string, ColStyle>
}

export interface Col extends CycledPropsObject<ColProps> {
  rowId: number
}
