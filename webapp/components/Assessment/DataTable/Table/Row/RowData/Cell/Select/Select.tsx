import React from 'react'
import { i18n as I18n } from 'i18next'

import { ColOptionSpec, TypeSpec } from '@webapp/sectionSpec'
import { useI18n } from '@webapp/components/hooks'
import { PropsCell } from '../props'

const getOptionLabel = (option: ColOptionSpec, i18n: I18n, optionsLabelKeyPrefix: string): string => {
  const { optionName } = option
  const label = i18n.t(`${optionsLabelKeyPrefix}.${optionName}`)
  return option.type === TypeSpec.header ? `--- ${label} ---` : label
}

const optionNotSelected: ColOptionSpec = { optionName: 'notSelected', hidden: true }

const Select: React.FC<PropsCell> = (props) => {
  const { onChange, onPaste, col, datum, disabled } = props
  const { options, optionsLabelKeyPrefix } = col
  const optionSelected = options.find((option) => option.optionName === datum)

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
        value={datum || optionNotSelected.optionName}
        disabled={disabled}
        onChange={onChange}
        onPaste={onPaste}
      >
        {[optionNotSelected, ...options].map((option) => {
          const { hidden, optionName } = option
          return (
            <option key={optionName} value={optionName} disabled={option.type === TypeSpec.header} hidden={!!hidden}>
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

export default Select
