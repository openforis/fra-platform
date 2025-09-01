import { CSSProperties } from 'react'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName, CycleUuid } from 'meta/assessment/cycle'
import { CycledPropsObject } from 'meta/assessment/cycledObject'
import { Label } from 'meta/assessment/label'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'

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
  calculateClientSide?: Record<CycleUuid, boolean>
  classNames?: Record<CycleUuid, Array<string>>
  colName?: ColName
  colNameSort?: string
  colType: ColType
  enableIf?: Record<CycleUuid, string>
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
   * @deprecated
   * Adding and deprecating this prop already.
   *
   * IMPORTANT: This prop has been added to handle transposed tables in print view only.
   * It's used in the src/client/pages/Section/DataTable/Table/RowData/Cell/hooks/useNodeValue.tsx.
   * DO NOT USE IT anywhere else.
   *
   * When migrating to measure/dimension each Cell will be associated to a measure/dimension making this prop useless
   */
  variableName?: VariableName
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
