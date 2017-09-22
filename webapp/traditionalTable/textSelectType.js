import React from 'react'
import R from 'ramda'

const TextSelectType = ({countryIso,
                          tableSpec,
                          tableData,
                          rowIdx,
                          colIdx,
                          tableValueChanged,
                          options,
                          localizationPrefix,
                          i18n}) => {
  const currentValue = tableData[rowIdx][colIdx]
  return <td className="fra-table__cell">
    <select
      className="select traditional-table__text-select"
      value={currentValue || 'notSelected'}
      onChange={
        (evt) => {
          tableValueChanged(countryIso, tableSpec, rowIdx, colIdx, evt.target.value)
        }
      }>
      {
        R.map(option =>
            <option
              value={option}
              key={option}>{i18n.t(localizationPrefix + '.' + option)}
              </option>
          ,[...options, 'notSelected'])
      }
    </select>
  </td>
}

export default (cellSpec) => ({
  render: (props) =>
    <TextSelectType
      {...props}
      options={cellSpec.options}
      localizationPrefix={cellSpec.localizationPrefix}/>,
  acceptValue: (newValue, oldValue) => R.contains(newValue, cellSpec.options) ? newValue : oldValue
})
