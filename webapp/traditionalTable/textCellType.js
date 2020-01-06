import React from 'react'
import TextInput from '@webapp/components/textInput'
import { handlePaste } from './paste'

const TextInputTableCell = ({
                              countryIso,
                              tableSpec,
                              tableData,
                              rowIdx,
                              colIdx,
                              tableValueChanged,
                              tableChanged,
                              disabled
                            }) => {
  const currentValue = tableData[rowIdx][colIdx]
  return <td className="fra-table__cell-left">
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
      disabled={disabled}/>
  </td>
}

export default (cellSpec) => ({
  render: (props) => <TextInputTableCell {...props} />,
  acceptValue: (newValue, _) => newValue
})
