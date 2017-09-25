import React from 'react'
import assert from 'assert'
import IntegerCellType from './integerCellType'
import TextCellType from './textCellType'
import TextSelectType from './textSelectType'

const cellTypeCreators = {
  'integerInput': IntegerCellType,
  'textInput': TextCellType,
  'textSelect': TextSelectType,
  'readOnly': (cellSpec) => ({render: (props) => cellSpec.jsx}),
  'custom': (cellSpec) => ({render: (props) => cellSpec.render(props)})
}

export const getCellType = (tableSpec, rowIdx, colIdx) => {
  const cellSpec = tableSpec.rows[rowIdx][colIdx]
  assert(cellSpec, `No cellspec for ${rowIdx} ${colIdx}`)
  const cellType = cellTypeCreators[cellSpec.type]
  assert(cellType, `Unknown cell type ${cellSpec.type}`)
  return cellType(cellSpec)
}
