import classNames from 'classnames'

import { RowChartSpec, RowSpec } from '@webapp/sectionSpec/rowSpec'
import { CalculateValue, ColSpec } from '@webapp/sectionSpec/colSpec'
import { TypeSpec } from '@webapp/sectionSpec/typeSpec'
import { GetValidationMessages, Validator } from '@webapp/sectionSpec/validation'

interface RowDataProps {
  cols?: Array<ColSpec>
  validator?: Validator
  variableName?: string
  calculateFn?: CalculateValue
  chartProps?: RowChartSpec
  labelKey?: string
  labelPrefixKey?: string
  labelParams?: Record<string | number, string | number>
  label?: string
  // validation messages
  getValidationMessages?: GetValidationMessages
  // row header
  mainCategory?: boolean
  subcategory?: boolean
  variableNo?: string
  linkToSection?: string
  // row notice message
  rowSpan?: number
  colSpan?: number
  variableExport?: string
}

const newHeaderInstance = (props: { cols?: Array<ColSpec> }): RowSpec => ({
  cols: [],
  ...props,
  type: TypeSpec.header,
})

const newDataInstance = (props: RowDataProps): RowSpec => {
  const row: RowSpec = { type: TypeSpec.data, cols: [], ...props }

  const { calculateFn, mainCategory, subcategory } = props
  const colHeader: ColSpec = {
    idx: `header_0`,
    type: TypeSpec.header,
    colSpan: props.colSpan ?? 1,
    rowSpan: props.rowSpan,
    labelKey: props.labelKey,
    labelParams: props.labelParams,
    label: props.label,
    labelPrefixKey: props.labelPrefixKey,
    variableNo: props.variableNo,
    linkToSection: props.linkToSection,
    className: classNames({
      'fra-table__header-cell-left': calculateFn || mainCategory,
      'fra-table__subcategory-cell': subcategory,
      'fra-table__category-cell': !calculateFn && !mainCategory && !subcategory,
    }),
  }
  row.cols = [colHeader, ...row.cols.map((col, idx) => ({ idx: col.idx ?? idx, ...col }))]

  return row
}

const newNoticeMessageInstance = (props: { labelKey?: string; colSpan?: number; rowSpan?: number }): RowSpec => ({
  type: TypeSpec.noticeMessage,
  cols: [
    {
      colSpan: props.colSpan ?? 1,
      rowSpan: props.rowSpan ?? 1,
      labelKey: props.labelKey ?? null,
      type: TypeSpec.noticeMessage,
    },
  ],
})

const newValidationMessagesInstance = (props: { getValidationMessages?: GetValidationMessages }): RowSpec => ({
  type: TypeSpec.validationMessages,
  getValidationMessages: props.getValidationMessages,
  cols: [],
})

export const RowSpecFactory = {
  newHeaderInstance,
  newDataInstance,
  newNoticeMessageInstance,
  newValidationMessagesInstance,
}
