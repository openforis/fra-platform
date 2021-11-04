import classNames from 'classnames'

import * as NumberUtils from '@core/utils/numbers'
import { CalculateValue, ColOptionSpec, ColSpec, FormatValue } from '@webapp/sectionSpec/colSpec'
import { TypeSpec } from '@webapp/sectionSpec/typeSpec'
import { Validator } from '@webapp/sectionSpec/validation'

interface ColHeaderProps {
  className?: string
  label?: string
  labelKey?: string
  labelParams?: Record<string, string>
  left?: boolean
  colSpan?: number
  rowSpan?: number
}

interface ColDataProps {
  className?: string
  label?: string
  labelKey?: string
  labelParams?: Record<string, string>
  left?: boolean
  colSpan?: number
  rowSpan?: number
  idx?: number
  calculateFn?: CalculateValue
  validator?: Validator
  formatFn?: FormatValue
  options?: Array<ColOptionSpec>
  optionsLabelKeyPrefix?: string
}

const newHeaderInstance = (props: ColHeaderProps): ColSpec => {
  const col = {
    colSpan: 1,
    rowSpan: 1,
    ...props,
    className: classNames(
      {
        'fra-table__header-cell': !props.left,
        'fra-table__header-cell-left': props.left,
      },
      props.className
    ),
    type: TypeSpec.header,
  }
  delete col.left
  return col
}

const newCol = (type: TypeSpec, props: ColDataProps): ColSpec => ({ type, ...props })

const newCalculatedInstance = (props: ColDataProps): ColSpec =>
  newCol(TypeSpec.calculated, { formatFn: NumberUtils.formatNumber, ...props })

const newDecimalInstance = (props: ColDataProps): ColSpec => newCol(TypeSpec.decimal, props)

const newIntegerInstance = (props: ColDataProps): ColSpec => newCol(TypeSpec.integer, props)

const newTextInstance = (props: ColDataProps): ColSpec => newCol(TypeSpec.text, props)

const newTextAreaInstance = (props: ColDataProps): ColSpec => newCol(TypeSpec.textarea, props)

const newSelectInstance = (props: ColDataProps): ColSpec =>
  newCol(TypeSpec.select, { options: [], optionsLabelKeyPrefix: '', ...props })

const newSelectYesNoInstance = (props: ColDataProps): ColSpec =>
  newCol(TypeSpec.select, {
    options: [{ optionName: 'yes' }, { optionName: 'no' }],
    optionsLabelKeyPrefix: 'yesNoTextSelect',
    ...props,
  })

const newPlaceholderInstance = (props: ColDataProps): ColSpec => newCol(TypeSpec.placeholder, props)

export const ColSpecFactory = {
  newHeaderInstance,
  newCalculatedInstance,
  newDecimalInstance,
  newIntegerInstance,
  newTextInstance,
  newTextAreaInstance,
  newSelectInstance,
  newSelectYesNoInstance,
  newPlaceholderInstance,
}
