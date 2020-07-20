import React from 'react'

import { ThousandSeparatedDecimalInput } from '@webapp/components/thousandSeparatedDecimalInput'
import { acceptNextDecimal, acceptableAsDecimal } from '@webapp/utils/numberInput'
import { handlePaste } from './paste'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

const DecimalCellType = props => {
  const {
    countryIso,
    tableSpec,
    tableData,
    rowIdx,
    colIdx,
    tableValueChanged,
    tableChanged,
    validator,
    disabled
  } = props
  const userInfo = useUserInfo()
  
  const currentValue = tableData[rowIdx][colIdx]
  const valid = userInfo && validator ? validator(props, rowIdx, colIdx).valid : true
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
                                   }
                                   disabled={disabled}/>
  </td>
}

export default (cellSpec) => ({
  render: (props) => <DecimalCellType
    {...props}
    validator={cellSpec.validator}
  />,
  acceptValue: acceptNextDecimal
})
