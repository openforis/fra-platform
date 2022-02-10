import { CycledPropsObject, Col } from './index'

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

export interface RowProps {
  index: number | string
  linkToSection?: string
  type: RowType
  variableName?: string
}

export interface Row extends CycledPropsObject<RowProps> {
  cols?: Array<Col>
  tableId: number
  // validator?: Validator
  // calculateFn?: CalculateValue
  // chartProps?: RowChartSpec
  // idx?: string | number
  // labelKey?: string
  // labelPrefixKey?: string
  // labelParams?: Record<string, string>
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
