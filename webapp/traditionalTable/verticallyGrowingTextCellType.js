import React from 'react'
import { handlePaste } from './paste'
import VerticallyGrowingTextField from '../reusableUiComponents/verticallyGrowingTextField'

const VerticallyGrowingTextCell = ({countryIso,
                                     tableSpec,
                                     tableData,
                                     rowIdx,
                                     colIdx,
                                     tableValueChanged,
                                     tableChanged}) => {
  const currentValue = tableData[rowIdx][colIdx]
  return <td className="fra-table__cell">
    <VerticallyGrowingTextField
      id={`tableSpec.name-${rowIdx}`}
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
    />
  </td>
}

export default cellSpec => ({
  render: props => <VerticallyGrowingTextCell {...props}/>,
  acceptValue: (newValue, _) => newValue
})
