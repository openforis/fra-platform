import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import assert from 'assert'

import './tableStyles.less'
import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import * as table from './table'
import { tableValueChanged } from './actions'

const mapIndexed = R.addIndex(R.map)

const IntegerInput = ({tableSpec, tableData, rowIdx, colIdx, tableValueChanged}) => {
  const currentValue = tableData[rowIdx][colIdx]
  return <td className="fra-table__cell">
    <ThousandSeparatedIntegerInput integerValue={ currentValue }
                                   className="fra-table__integer-input"
                                   onChange={ (evt) => tableValueChanged(tableSpec, rowIdx, colIdx, evt.target.value) }
                                   onPaste={ () => console.log('pasted', rowIdx, colIdx) }/>
  </td>
}

const Cell = (props) => {
  const {tableSpec, rowIdx, colIdx} = props
  const cellSpec = tableSpec.rows[rowIdx][colIdx]
  assert(cellSpec, `No cellspec for ${rowIdx} ${colIdx}`)
  if (cellSpec.type === 'integerInput') {
    return <IntegerInput {...props}/>
  } else if (cellSpec.type === 'readOnly') {
    return cellSpec.jsx
  } else {
    throw `Unknown cell type ${cellSpec.type}`
  }
}

const tableRows = (props) => {
  return mapIndexed(
    (rowSpec, rowIdx) =>
      <tr key={rowIdx}>
        { mapIndexed((cellSpec, colIdx) => <Cell key={`${rowIdx}-${colIdx}`} rowIdx={rowIdx} colIdx={colIdx} {...props}/>, rowSpec) }
      </tr>,
    props.tableSpec.rows)
}

const TableBody = (props) =>
  <tbody>
   {tableRows(props)}
  </tbody>

const FraTable = (props) => <table className="fra-table">
  {props.tableSpec.header}
  <TableBody {...props}/>
</table>

const mapStateToProps = (state, props) => {
  assert(props.tableSpec.name, 'tableSpec is missing name')
  return {...props, tableData: state.fraTable[props.tableSpec.name] || table.createTableData(props.tableSpec)}
}

export default connect(mapStateToProps, { tableValueChanged })(FraTable)
