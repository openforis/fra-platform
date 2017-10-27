import React from 'react'

import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import { acceptNextInteger, acceptableAsInteger } from '../utils/numberInput'
import { handlePaste } from './paste'

const IntegerInput = props => {
  const {
    countryIso,
    tableSpec,
    tableData,
    rowIdx,
    colIdx,
    tableValueChanged,
    tableChanged,
    validator
  } = props
  const currentValue = tableData[rowIdx][colIdx]
  const valid = validator ? validator(props, rowIdx, colIdx).valid : true
  return <td className={`fra-table__cell ${valid ? '' : 'error'}`}>
    <ThousandSeparatedIntegerInput integerValue={ currentValue }
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
