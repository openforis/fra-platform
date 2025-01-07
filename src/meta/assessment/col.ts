import { CSSProperties } from 'react'

import { AssessmentName } from 'meta/assessment/assessmentName'
import { CycledPropsObject, CycleName, CycleUuid } from 'meta/assessment/cycle'
import { VariableName } from 'meta/assessment/row'
import { TableName } from 'meta/assessment/table'

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
  select = 'select',
  taxon = 'taxon',
  text = 'text',
  textarea = 'textarea',
}

export interface ColSelectOption {
  hidden?: boolean
  name: string
  type?: 'header' | undefined
}

export interface ColSelectProps {
  isMulti?: boolean
  labelKeyPrefix?: string
  options?: Array<ColSelectOption>
  years?: { start: number; end?: number }
}

export interface ColStyle extends CSSProperties {
  colSpan?: number
  rowSpan?: number
}

export type ColLinkedNode = {
  assessmentName: AssessmentName
  cycleName: CycleName
  tableName: TableName
  variableName: VariableName
  colName: ColName
}

export interface ColProps {
  calculateFn?: Record<CycleUuid, string>
  classNames?: Record<CycleUuid, Array<string>>
  colName?: ColName
  colType: ColType
  index?: number | string
  inputPlaceholder?: InputPlaceholder
  labels?: Record<CycleUuid, Label>
  linkedNodes?: Record<CycleUuid, ColLinkedNode>
  readonly?: boolean
  select?: Record<CycleUuid, ColSelectProps>
  style?: Record<CycleUuid, ColStyle>
  validateFns?: Record<CycleUuid, Array<string>>
  variableNo?: Record<CycleUuid, string>

  /**
   * Adding and deprecating this prop already.
   * See HACK FOR HAVING RIGHT CALCULATION ORDER in src/server/controller/cycleData/updateDependencies/updateCalculationDependencies/updateCalculationDependencies.ts
   * @deprecated
   */
  calcOrder?: number
}

export interface Col extends CycledPropsObject<ColProps> {
  rowId: number
}
