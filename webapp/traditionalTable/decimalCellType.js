import React from 'react'

import { ThousandSeparatedDecimalInput } from '../reusableUiComponents/thousandSeparatedDecimalInput'
import { acceptNextDecimal, acceptableAsDecimal } from '../utils/numberInput'
import { handlePaste } from './paste'

const DecimalCellType = ({
                           countryIso,
                           tableSpec,
                           tableData,
                           rowIdx,
                           colIdx,
                           tableValueChanged,
                           tableChanged,
                           validator
                         }) => {
  const currentValue = tableData[rowIdx][colIdx]
  const valid = validator ? validator(tableData, rowIdx, colIdx).valid : true
  return <td className={`fra-table__cell ${valid ? '' : 'error'}`}>
    <ThousandSeparatedDecimalInput numberValue={ currentValue }
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
  render: (props) => <DecimalCellType
    {...props}
    validator={cellSpec.validator}
  />,
  acceptValue: acceptNextDecimal
})
