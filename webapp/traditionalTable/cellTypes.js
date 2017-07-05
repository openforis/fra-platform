import React from 'react'
import assert from 'assert'

import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import { acceptNextInteger, acceptableAsInteger } from '../utils/numberInput'
import { handlePaste } from './paste'

const IntegerInput = ({countryIso, tableSpec, tableData, rowIdx, colIdx, tableValueChanged, tableChanged}) => {
  const currentValue = tableData[rowIdx][colIdx]
  return <td className="fra-table__cell">
    <ThousandSeparatedIntegerInput integerValue={ currentValue }
                                   className="fra-table__integer-input"
                                   onChange={
                                     (evt) => {
                                       const newValue = evt.target.value
                                       if (acceptableAsInteger(newValue)) {
                                         const sanitizedNewValue = acceptNextInteger(newValue, tableData[rowIdx][colIdx])
                                         tableValueChanged(countryIso, tableSpec, rowIdx, colIdx, sanitizedNewValue)
                                       }
                                     }
                                   }
                                   onPaste={ handlePaste(countryIso, rowIdx, colIdx, tableSpec, tableData, tableChanged) }/>
  </td>
}

const cellTypes = {
  'integerInput': {render: (cellSpec, props) => <IntegerInput {...props}/>, acceptValue: acceptNextInteger},
  'readOnly': {render: (cellSpec, props) => cellSpec.jsx},
  'custom': {render: (cellSpec, props) => cellSpec.render(props)}
}

export const getCellSpecAndType = (tableSpec, rowIdx, colIdx) => {
  const cellSpec = tableSpec.rows[rowIdx][colIdx]
  assert(cellSpec, `No cellspec for ${rowIdx} ${colIdx}`)
  const cellType = cellTypes[cellSpec.type]
  assert(cellType, `Unknown cell type ${cellSpec.type}`)
  return [cellSpec, cellType]
}
