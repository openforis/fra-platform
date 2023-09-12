import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { i18n } from 'i18next'

import { ColSelectOption } from 'meta/assessment'

import { PropsCell } from 'client/pages/Section/DataTable/Table/Row/RowData/Cell/props'
import { optionNotSelected } from 'client/pages/Section/DataTable/Table/Row/RowData/Cell/Select/OptionNotSelected'
import { DOMs } from 'client/utils/dom'

const getOptionLabel = (option: ColSelectOption, i18n: i18n, labelKeyPrefix: string): string => {
  const label = Number.isInteger(+option.name) ? option.name : i18n.t(`${labelKeyPrefix}.${option.name}`)
  return option.type === 'header' ? `--- ${label} ---` : label
}

const Select: React.FC<PropsCell> = (props) => {
  const { onChange, onPaste, col, nodeValue, disabled } = props
  const { options, labelKeyPrefix = 'yesNoTextSelect' } = col.props.select

  const value = nodeValue?.raw

  const optionSelected = [optionNotSelected, ...options].find((option) => option.name === value)
  const { i18n } = useTranslation()

  const ref = useRef(null)

  useEffect(() => {
    if (ref && disabled) {
      const row = ref.current.closest('tr')
      if (row) {
        const { height } = DOMs.elementOffset(ref.current)
        const { height: rowHeight } = DOMs.elementOffset(row)
        row.style.height = `${Math.max(height, rowHeight, 40)}px`
      }
    }
  }, [ref, disabled])

  if (disabled) {
    return (
      <div className="text-input__container">
        <div className="text-input__readonly-view" ref={ref}>
          {value && getOptionLabel(optionSelected, i18n, labelKeyPrefix)}
        </div>
      </div>
    )
  }

  return (
    <div className="fra-table__select-container">
      <select
        className="fra-table__select no-print"
        value={value ?? optionNotSelected.name}
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
        {value && getOptionLabel(optionSelected, i18n, labelKeyPrefix)}
      </div>
    </div>
  )
}

export default Select
