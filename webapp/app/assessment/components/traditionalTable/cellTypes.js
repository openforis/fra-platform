import React from 'react'
import assert from 'assert'
import IntegerCellType from './integerCellType'
import DecimalCellType from './decimalCellType'
import TextCellType from './textCellType'
import TextSelectType from './textSelectType'
import YesNoSelectType from './yesNoSelectType'
import VerticallyGrowingTextCell from './verticallyGrowingTextCellType'
import CalculatedCellType from './calculatedCellType'

const cellTypeCreators = {
  'decimalInput': DecimalCellType,
  'integerInput': IntegerCellType,
  'textInput': TextCellType,
  'textSelect': TextSelectType,
  'yesNoSelect': YesNoSelectType,
  'verticallyGrowingTextInput': VerticallyGrowingTextCell,
  'calculated': CalculatedCellType,
  'readOnly': (cellSpec) => ({render: (props) => cellSpec.jsx}),
  'custom': (cellSpec) => ({
    render: (props) => cellSpec.render({...props, validator: cellSpec.validator}),
    acceptValue: cellSpec.acceptValue
  })
}

export const getCellType = (tableSpec, rowIdx, colIdx) => {
  const cellSpec = tableSpec.rows[rowIdx][colIdx]
  assert(cellSpec, `No cellspec for ${rowIdx} ${colIdx}`)
  const cellType = cellTypeCreators[cellSpec.type]
  assert(cellType, `Unknown cell type ${cellSpec.type}`)
  return cellType(cellSpec)
}
