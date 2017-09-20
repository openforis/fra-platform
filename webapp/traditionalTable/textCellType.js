import React from 'react'
import TextInput from '../reusableUiComponents/textInput'
import { handlePaste } from './paste'

const TextInputTableCell = ({countryIso,
                             tableSpec,
                             tableData,
                             rowIdx,
                             colIdx,
                             tableValueChanged,
                             tableChanged,
                             minWidth}) => {
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
      }
      minWidth={minWidth}/>
  </td>
}

export default (cellSpec) => ({
  render: (props) => <TextInputTableCell {...props} minWidth={cellSpec.minWidth}/>,
  acceptValue: (newValue, _) => newValue
})
