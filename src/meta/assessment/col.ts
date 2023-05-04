import { CSSProperties } from 'react'

import { CycledPropsObject, CycleUuid } from './cycle'
import { Label } from './label'

export type ColName = string
export type InputPlaceholder = string

export enum ColType {
  calculated = 'calculated',
  decimal = 'decimal',
  header = 'header',
  integer = 'integer',
  noticeMessage = 'noticeMessage',
  placeholder = 'placeholder',
  multiselect = 'multiselect',
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

export interface ColStyle extends CSSProperties {
  colSpan?: number
  rowSpan?: number
}

export interface ColProps {
  calculateFn?: Record<CycleUuid, string>
  colName?: ColName
  colType: ColType
  index?: number | string
  labels?: Record<string, Label> // label by cycle uuid
  readonly?: boolean
  select?: ColSelectProps
  style: Record<string, ColStyle> // style by cycle uuid
  classNames?: Record<string, Array<string>> // classes by cycle uuid
  validateFns?: Record<CycleUuid, Array<string>>
  variableNo?: Record<string, string> // variable number by cycle uuid
  inputPlaceholder?: InputPlaceholder
}

export interface Col extends CycledPropsObject<ColProps> {
  rowId: number
}
