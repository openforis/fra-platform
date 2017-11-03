import React from 'react'
import TextInput from '../reusableUiComponents/textInput'
import { handlePaste } from './paste'

const TextInputTableCell = ({countryIso,
                             tableSpec,
                             tableData,
                             rowIdx,
                             colIdx,
                             tableValueChanged,
                             tableChanged}) => {
  const currentValue = tableData[rowIdx][colIdx]
  return <td className="fra-table__cell">
    <TextInput
      value={currentValue}
      onChange={
        (evt) => {
          tableValueChanged(countryIso, tableSpec, rowIdx, colIdx, evt.target.value)
        }
      }
      onPaste={
        handlePaste(
          countryIso,
          rowIdx,
          colIdx,
          tableSpec,
          tableData,
          tableChanged,
          tableValueChanged)
      }/>
  </td>
}

export default (cellSpec) => ({
  render: (props) => <TextInputTableCell {...props} />,
  acceptValue: (newValue, _) => newValue
})
