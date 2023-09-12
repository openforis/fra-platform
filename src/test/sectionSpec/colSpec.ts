import BigNumber from 'bignumber.js'

import { ColLinkedNode, ColStyle, CycleUuid, Label } from 'meta/assessment'

import { TypeSpec } from './typeSpec'
import { Validator } from './validation'

export type FormatValue = (value: number | string | BigNumber) => string

export interface ColOptionSpec {
  hidden?: boolean
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
  inputPlaceholder?: string
  // left?: boolean // TODO: is it only in factory?
  validator?: Validator
  formatFn?: FormatValue
  // select
  options?: Array<ColOptionSpec>
  optionsLabelKeyPrefix?: string
  optionName?: string
  variableNo?: string
  linkToSection?: string // TODO: remove? (check if used - probably not)
  // migration
  colName?: string
  migration?: {
    calculateFn?: string | Record<CycleUuid, string>
    validateFns?: Array<string> | Record<CycleUuid, Array<string>>
    cycles?: Array<string>
    forceColName?: boolean
    label?: Record<string, Label>
    style?: Record<string, ColStyle>
    variableNo?: Record<string, string>
    linkedNodes?: Record<CycleUuid, ColLinkedNode>
  }
}
