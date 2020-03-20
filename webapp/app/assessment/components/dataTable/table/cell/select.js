import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import * as R from 'ramda'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import useI18n from '@webapp/components/hooks/useI18n'

const isOptionHeader = R.propEq(SectionSpec.TYPE, SectionSpec.TYPES.header)

const getOptionLabel = (option, i18n, optionsLabelKeyPrefix) => {
  const optionName = option[SectionSpec.KEYS_COL.optionName]
  const label = i18n.t(`${optionsLabelKeyPrefix}.${optionName}`)
  return isOptionHeader(option) ? `--- ${label} ---` : label
}

const optionNotSelected = { [SectionSpec.KEYS_COL.optionName]: 'notSelected', hidden: true }

const Select = props => {
  const { assessmentType, sectionName, tableName, updateTableDataCell, rowIdx, col, datum, disabled } = props
  const { options, optionsLabelKeyPrefix } = col
  const optionSelected = options.find(R.propEq(SectionSpec.KEYS_COL.optionName, datum))

  const dispatch = useDispatch()
  const i18n = useI18n()

  if (disabled) {
    return (
      <div className="fra-table__select-container">
        {datum && getOptionLabel(optionSelected, i18n, optionsLabelKeyPrefix)}
      </div>
    )
  }

  return (
    <div className="fra-table__select-container">
      <select
        className="fra-table__select no-print"
        value={datum || optionNotSelected[SectionSpec.KEYS_COL.optionName]}
        disabled={disabled}
        onChange={e => {
          const { value } = e.target
          dispatch(updateTableDataCell(assessmentType, sectionName, tableName, rowIdx, col.idx, value))
        }}
      >
        {[optionNotSelected, ...options].map(option => {
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
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  rowIdx: PropTypes.number.isRequired,
  col: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  datum: PropTypes.any,
  updateTableDataCell: PropTypes.func.isRequired,
}

Select.defaultProps = {
  datum: null,
}

export default Select
