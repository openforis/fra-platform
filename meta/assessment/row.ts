import { Col, CycledPropsObject } from './index'

export enum RowType {
  header = 'header',
  data = 'data',
  noticeMessage = 'noticeMessage',
  validationMessages = 'validationMessages',
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
  key?: string
  prefix?: string
  params?: Record<string, string>
}

export interface RowProps {
  index: number | string
  linkToSection?: string
  type: RowType
  variableName?: string
  calculateFn?: string
  chart?: {
    labelKey: string
    color: string
  }
  label?: RowLabel
}

export interface Row extends CycledPropsObject<RowProps> {
  cols?: Array<Col>
  tableId: number
  // validator?: Validator
  // calculateFn?: CalculateValue
  // chartProps?: RowChartSpec
  // idx?: string | number
  // label?: string
  // validation messages
  // getValidationMessages?: GetValidationMessages
  // row header
  // mainCategory?: boolean
  // subcategory?: boolean
  // variableNo?: string
  // row notice message
  // rowSpan?: number
  // colSpan?: number
  // variableExport?: string
}
