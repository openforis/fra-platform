import { CycledPropsObject } from '@core/meta/cycle'

export enum ColType {
  calculated = 'calculated',
  decimal = 'decimal',
  integer = 'integer',
  text = 'text',
  textarea = 'textarea',
  select = 'select',
  selectYesNo = 'selectYesNo',
  // placeholder = 'placeholder',
}

export interface ColProps {
  colSpan?: number
  colType: ColType
  rowSpan?: number
}

export interface Col extends CycledPropsObject<ColProps> {
  rowId: number
}
