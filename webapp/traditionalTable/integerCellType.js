import React from 'react'

import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import { acceptNextInteger, acceptableAsInteger } from '../utils/numberInput'
import { handlePaste } from './paste'

const IntegerInput = ({
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
  const valid = validator ? validator(tableData, rowIdx, colIdx) : true
  return <td className={`fra-table__cell ${valid ? '' : 'error'}`}>
    <ThousandSeparatedIntegerInput integerValue={ currentValue }
                                   className="fra-table__integer-input"
                                   onChange={
                                     (evt) => {
                                       const newValue = evt.target.value
                                       // This if prevents just a useless, no-op autosave, the value wouldn't
                                       // be accepted anyway...
                                       if (acceptableAsInteger(newValue)) {
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
  render: (props) => <IntegerInput
    {...props}
    validator={cellSpec.validator}
  />,
  acceptValue: acceptNextInteger
})
