import React from 'react'
import R from 'ramda'

import './tableStyles.less'
import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'


const exampleTable = () => <table className="fra-table">
  <thead>
  <tr><td className="fra-table__header-cell">heading</td></tr>
  </thead>
  <tbody>
  <tr className="">
    <td className="fra-table__cell">
      <input className="fra-table__cell-input"/>
    </td>
  </tr>
  </tbody>
</table>

const mapIndexed = R.addIndex(R.map)

const integerInput = (rowIdx, colIdx) => {
  return <td key={`${rowIdx}-${colIdx}`} className="fra-table__cell-input">
    <ThousandSeparatedIntegerInput integerValue={ null }
                                   onChange={ console.log('integer updated', rowIdx, colIdx) }
                                   onPaste={ console.log('pasted', rowIdx, colIdx) }/>

  </td>
}

const cell = (rowIdx, colIdx, cellSpec) => {
  if (cellSpec.type === 'integerInput') {
    return integerInput(rowIdx, colIdx)
  } else if (cellSpec.type === 'readOnly') {
    return cellSpec.jsx
  } else {
    throw `Unknown cell type ${cellSpec.type}`
  }
}

const tableRows = (tableSpec) => {
  return mapIndexed(
    (rowSpec, rowIdx) =>
      <tr key={rowIdx}>
        {mapIndexed((cellSpec, colIdx) => cell(rowIdx, colIdx, cellSpec), rowSpec)}
      </tr>
    ,tableSpec.rows)
}

const tableBody = (tableSpec) =>
  <tbody>
  {tableRows(tableSpec)}
  </tbody>

const createTable = (tableSpec) => <table>
    {tableSpec.header}
   {tableBody(tableSpec)}
  </table>

export default ({tableSpec}) => createTable(tableSpec)//exampleTable()
