import { VariableCache } from '@meta/assessment'

import { ColSpec } from './colSpec'
import { TypeSpec } from './typeSpec'
import { GetValidationMessages, Validator } from './validation'

export interface RowChartSpec {
  labelKey: string
  color: string
}

export interface RowSpec {
  type: TypeSpec
  cols: Array<ColSpec>
  validator?: Validator
  variableName?: string
  // calculateFn?: CalculateValue
  chartProps?: RowChartSpec
  idx?: string | number
  labelKey?: string
  labelPrefixKey?: string
  labelParams?: Record<string, string>
  // label?: string
  // validation messages
  getValidationMessages?: GetValidationMessages
  // row header
  // mainCategory?: boolean
  // subcategory?: boolean
  // variableNo?: string
  // linkToSection?: string
  // row notice message
  // rowSpan?: number
  // colSpan?: number
  variableExport?: string

  migration?: {
    //            string | Record<cycleUuid, string>
    calcFormula?: string | Record<string, string>
    colNames?: Array<string>
    format?: { integer?: boolean }
    readonly?: boolean
    //            Array<string> | Record<cycleUuid, Array<string>>
    validateFns?: Array<string> | Record<string, Array<string>>
    cycles?: Array<string>
    dependantsExclude?: Array<VariableCache>
    categoryLevel?: number
  }
}
