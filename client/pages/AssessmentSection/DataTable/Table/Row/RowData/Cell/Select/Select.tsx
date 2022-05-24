import React from 'react'
import { useTranslation } from 'react-i18next'

import { i18n } from 'i18next'

import { ColSelectOption } from '@meta/assessment'

import { PropsCell } from '@client/pages/AssessmentSection/DataTable/Table/Row/RowData/Cell/props'

const getOptionLabel = (option: ColSelectOption, i18n: i18n, labelKeyPrefix: string): string => {
  const label = i18n.t(`${labelKeyPrefix}.${option.name}`)
  return option?.type === 'header' ? `--- ${label} ---` : label
}

const optionNotSelected: ColSelectOption = { name: 'notSelected', hidden: true }

const Select: React.FC<PropsCell> = (props) => {
  const { onChange, onPaste, col, datum, disabled } = props
  const { options, labelKeyPrefix = 'yesNoTextSelect' } = col.props.select

  const optionSelected = options.find((option) => option.name === datum)
  const { i18n } = useTranslation()

  if (disabled) {
    return (
      <div className="text-input__container">
        <div className="text-input__readonly-view">{datum && getOptionLabel(optionSelected, i18n, labelKeyPrefix)}</div>
      </div>
    )
  }

  return (
    <div className="fra-table__select-container">
      <select
        className="fra-table__select no-print"
        value={datum ?? optionNotSelected.name}
        disabled={disabled}
        onChange={onChange}
        onPaste={onPaste}
      >
        {[optionNotSelected, ...options].map((option) => {
          const { hidden, name } = option
          return (
            <option key={name} value={name} disabled={option.type === 'header'} hidden={!!hidden}>
              {getOptionLabel(option, i18n, labelKeyPrefix)}
            </option>
          )
        })}
      </select>
      <div className="text-input__readonly-view only-print" style={{ textAlign: 'left' }}>
        {datum && getOptionLabel(optionSelected, i18n, labelKeyPrefix)}
      </div>
    </div>
  )
}

export default Select
