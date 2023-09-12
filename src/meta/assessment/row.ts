import { Col, CycledPropsObject, CycleUuid, VariableCache } from 'meta/assessment'

export type VariableName = string

export enum RowType {
  header = 'header',
  data = 'data',
  noticeMessage = 'noticeMessage',
  calculated = 'calculated',
  // decimal = 'decimal',
  // integer = 'integer',
  // text = 'text',
  // textarea = 'textarea',
  // select = 'select',
  // selectYesNo = 'selectYesNo',
  placeholder = 'placeholder',
}

export interface RowLabel {
  prefix?: string
  params?: Record<string, string>
  key?: string
}

export interface ChartProps {
  color: string
  labelKey: string
}

export interface RowProps {
  calculateFn?: Record<CycleUuid, string>
  // if a variable is subcategory, then categoryLevel starts from 1
  categoryLevel?: number
  chart?: Record<CycleUuid, ChartProps>
  /**
   * This property includes the variable dependants which the row should be excluded from.
   *
   * e.g. growingStockAvg.naturallyRegeneratingForest has as dependantsExclude [{ tableName: 'forestCharacteristics', variableName: 'naturalForestArea' }].
   * This means when forestCharacteristics.naturalForestArea is updated, growingStockAvg.naturallyRegeneratingForest will not be updated
   * even if forestCharacteristics.naturalForestArea is included in its calculation formula.
   */
  dependantsExclude?: Array<VariableCache>
  format?: {
    integer?: boolean
  }
  index: number | string
  label?: RowLabel // TODO: remove? (check if used - probably not)
  linkToSection?: Record<CycleUuid, string>
  readonly?: boolean
  type: RowType
  variableName?: VariableName
  validateFns?: Record<CycleUuid, Array<string>>
}

export interface Row extends CycledPropsObject<RowProps> {
  cols?: Array<Col>
  tableId: number
}
