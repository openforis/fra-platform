import React from 'react'

import { ThousandSeparatedDecimalInput } from '../reusableUiComponents/thousandSeparatedDecimalInput'
import { acceptNextDecimal, acceptableAsDecimal } from '../utils/numberInput'
import { handlePaste } from './paste'

const DecimalCellType = ({countryIso, tableSpec, tableData, rowIdx, colIdx, tableValueChanged, tableChanged}) => {
  const currentValue = tableData[rowIdx][colIdx]
  return <td className="fra-table__cell">
    <ThousandSeparatedDecimalInput numberValue={ currentValue }
                                   className="fra-table__integer-input"
                                   onChange={
                                     (evt) => {
                                       const newValue = evt.target.value
                                       // This if prevents just a useless, no-op autosave, the value wouldn't
                                       // be accepted anyway...
                                       if (acceptableAsDecimal(newValue)) {
                                         tableValueChanged(countryIso, tableSpec, rowIdx, colIdx, newValue)
                                       }
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
  render: (props) => <DecimalCellType {...props}/>,
  acceptValue: acceptNextDecimal
})
