import BigNumber from 'bignumber.js'

import { TypeSpec } from './typeSpec'
import { Validator } from './validation'

export type CalculateValue = (colIdx: number, rowIdx: number) => (state: any) => number | BigNumber

export type FormatValue = (value: number | string) => string

export interface ColOptionSpec {
  optionName: string
  type?: TypeSpec
}

export interface ColSpec {
  type: TypeSpec
  idx?: number | string
  label?: string
  labelKey?: string
  labelParams?: Record<string | number, string | number>
  labelPrefixKey?: string
  className?: string
  rowSpan?: number
  colSpan?: number
  // left?: boolean // TODO: is it only in factory?
  calculateFn?: CalculateValue
  validator?: Validator
  formatFn?: FormatValue
  // select
  options?: Array<ColOptionSpec>
  optionsLabelKeyPrefix?: string
  optionName?: string
  variableNo?: string
  linkToSection?: string
}
