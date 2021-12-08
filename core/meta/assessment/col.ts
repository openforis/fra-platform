import { CycledPropsObject } from '@core/meta/assessment'

export enum ColType {
  calculated = 'calculated',
  decimal = 'decimal',
  header = 'header',
  integer = 'integer',
  noticeMessage = 'noticeMessage',
  select = 'select',
  selectYesNo = 'selectYesNo',
  text = 'text',
  textarea = 'textarea',
  // placeholder = 'placeholder',
}

export interface ColProps {
  colSpan?: number
  colType: ColType
  index?: number | string
  rowSpan?: number
}

export interface Col extends CycledPropsObject<ColProps> {
  rowId: number
}
