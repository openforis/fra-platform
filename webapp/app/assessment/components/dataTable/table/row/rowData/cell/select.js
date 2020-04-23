import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import { useI18n } from '@webapp/components/hooks'

const isOptionHeader = R.propEq(SectionSpec.TYPE, SectionSpec.TYPES.header)

const getOptionLabel = (option, i18n, optionsLabelKeyPrefix) => {
  const optionName = option[SectionSpec.KEYS_COL.optionName]
  const label = i18n.t(`${optionsLabelKeyPrefix}.${optionName}`)
  return isOptionHeader(option) ? `--- ${label} ---` : label
}

const optionNotSelected = { [SectionSpec.KEYS_COL.optionName]: 'notSelected', hidden: true }

const Select = (props) => {
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

Select.propTypes = {
  col: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  datum: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
}

Select.defaultProps = {
  datum: null,
}

export default Select
