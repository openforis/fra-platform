import React from 'react'
import { handlePaste } from './paste'
import VerticallyGrowingTextField from '@webapp/components/verticallyGrowingTextField'

const VerticallyGrowingTextCell = ({
                                     countryIso,
                                     tableSpec,
                                     tableData,
                                     rowIdx,
                                     colIdx,
                                     tableValueChanged,
                                     tableChanged,
                                     minWidth,
                                     disabled
                                   }) => {
  const currentValue = tableData[rowIdx][colIdx]
  return <td className="fra-table__cell-left">
    <VerticallyGrowingTextField
      value={currentValue || ''}
      disabled={disabled}
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
      minWidth={minWidth}
    />
  </td>
}

export default cellSpec => ({
  render: props => <VerticallyGrowingTextCell {...props} minWidth={cellSpec.minWidth}/>,
  acceptValue: (newValue, _) => newValue
})
