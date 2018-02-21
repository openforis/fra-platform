import React from 'react'
import R from 'ramda'

const notSelectedOption = {name: 'notSelected', hidden: true}

const isHeadingOption = option => option.type === 'heading'

const optionLabel = (option, i18n, localizationPrefix) => {
  const localized = i18n.t(localizationPrefix + '.' + option.name)
  return isHeadingOption(option) ? `--- ${localized} ---` : localized
}

const TextSelectType = ({
                          countryIso,
                          tableSpec,
                          tableData,
                          rowIdx,
                          colIdx,
                          tableValueChanged,
                          options,
                          localizationPrefix,
                          i18n
                        }) => {
  const currentValue = tableData[rowIdx][colIdx]
  return <td className="fra-table__cell">
    <div className="fra-table__select-container">
      <select
        className="fra-table__select"
        value={currentValue || 'notSelected'}
        onChange={
          (evt) => {
            tableValueChanged(countryIso, tableSpec, rowIdx, colIdx, evt.target.value)
          }
        }>
        {
          R.map(option =>
              <option
                value={option.name}
                disabled={isHeadingOption(option)}
                hidden={option.hidden ? true : false}
                key={option.name}>{optionLabel(option, i18n, localizationPrefix)}
              </option>
            , [notSelectedOption, ...options])
        }
      </select>
    </div>
  </td>
}

const acceptValue = cellSpec => (newValue, oldValue) =>
  R.contains(newValue, [...R.pluck('name', cellSpec.options), notSelectedOption.name])
    ? newValue
    : oldValue

export default (cellSpec) => ({
  render: (props) =>
    <TextSelectType
      {...props}
      options={cellSpec.options}
      localizationPrefix={cellSpec.localizationPrefix}/>,
  acceptValue: acceptValue(cellSpec)
})
