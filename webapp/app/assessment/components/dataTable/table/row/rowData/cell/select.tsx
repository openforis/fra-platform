import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import { useI18n } from '@webapp/components/hooks'

const isOptionHeader = R.propEq(SectionSpec.TYPE, SectionSpec.TYPES.header)

const getOptionLabel = (option: any, i18n: any, optionsLabelKeyPrefix: any) => {
  const optionName = option[SectionSpec.KEYS_COL.optionName]
  const label = i18n.t(`${optionsLabelKeyPrefix}.${optionName}`)
  return isOptionHeader(option) ? `--- ${label} ---` : label
}

const optionNotSelected = { [SectionSpec.KEYS_COL.optionName]: 'notSelected', hidden: true }

type OwnProps = {
  col: any
  disabled: boolean
  datum?: any
  onChange: (...args: any[]) => any
  onPaste: (...args: any[]) => any
}

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof Select.defaultProps

// @ts-expect-error ts-migrate(7022) FIXME: 'Select' implicitly has type 'any' because it does... Remove this comment to see the full error message
const Select = (props: Props) => {
  const { onChange, onPaste, col, datum, disabled } = props
  const { options, optionsLabelKeyPrefix } = col
  const optionSelected = options.find(R.propEq(SectionSpec.KEYS_COL.optionName, datum))

  const i18n = useI18n()

  if (disabled) {
    return (
      <div className="text-input__container">
        <div className="text-input__readonly-view">
          {datum && getOptionLabel(optionSelected, i18n, optionsLabelKeyPrefix)}
        </div>
      </div>
    )
  }

  return (
    <div className="fra-table__select-container">
      <select
        className="fra-table__select no-print"
        value={datum || optionNotSelected[SectionSpec.KEYS_COL.optionName]}
        disabled={disabled}
        onChange={onChange}
        onPaste={onPaste}
      >
        {[optionNotSelected, ...options].map((option) => {
          const { hidden } = option
          const optionName = option[SectionSpec.KEYS_COL.optionName]
          return (
            <option key={optionName} value={optionName} disabled={isOptionHeader(option)} hidden={!!hidden}>
              {getOptionLabel(option, i18n, optionsLabelKeyPrefix)}
            </option>
          )
        })}
      </select>
      <div className="text-input__readonly-view only-print" style={{ textAlign: 'left' }}>
        {datum && getOptionLabel(optionSelected, i18n, optionsLabelKeyPrefix)}
      </div>
    </div>
  )
}

Select.defaultProps = {
  datum: null,
}

export default Select
