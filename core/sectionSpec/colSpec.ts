import { TypeSpec } from './typeSpec'
import { Validator } from './validation'

export type CalculateValue = (colIdx: number, rowIdx: number) => (state: any) => number

export type FormatValue = (value: number | string) => string

export interface ColSpec {
  type: TypeSpec
  idx?: number
  labelKey?: string
  labelParams?: Record<string, string>
  label?: string
  className?: string
  rowSpan?: number
  colSpan?: number
  left?: boolean
  calculateFn?: CalculateValue
  validator?: Validator
  formatFn?: FormatValue
  // select
  options?: Array<Record<string, string>>
  optionsLabelKeyPrefix?: string
  optionName?: string
}
