import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import assert from 'assert'

import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import * as table from './table'
import { tableValueChanged, tableChanged, fetchTableData } from './actions'
import { acceptNextInteger, acceptableAsInteger } from '../utils/numberInput'

const mapIndexed = R.addIndex(R.map)

const applyDataStartingFromCell = (startRowIdx, startColIdx, tableSpec, tableData, newData) => {
  return R.reduce((tableData, {rowIdx, colIdx, cellData}) => {
    const rowIdxToUpdate = startRowIdx + rowIdx
    const colIdxToUpdate = startColIdx + colIdx
    if (rowIdxToUpdate > tableSpec.rows.length - 1 ||
      colIdxToUpdate > tableSpec.rows[0].length - 1) return tableData
    const [_, cellType] = getCellSpecAndType(tableSpec, rowIdxToUpdate, colIdxToUpdate)
    if (!cellType.acceptValue) return tableData
    return table.update(tableData, startRowIdx + rowIdx, startColIdx + colIdx, cellType.acceptValue(cellData, tableData[rowIdxToUpdate][colIdxToUpdate]))
  }, tableData, newData)
}

const handlePaste = (countryIso, cellRowIdx, cellColIdx, tableSpec, tableData, tableChanged) => (evt) => {
  evt.stopPropagation()
  evt.preventDefault()
  const el = document.createElement('html')
  el.innerHTML = evt.clipboardData.getData('text/html')
  const rows = el.getElementsByTagName('tr')
  if (rows.length > 0) {
    const pastedData =
      R.flatten(
        mapIndexed(
          (row, rowIdx) =>
            mapIndexed((column, colIdx) =>
              ({rowIdx, colIdx, cellData: column.innerText}), row.getElementsByTagName('td')),
          rows))
    const updatedTable = applyDataStartingFromCell(cellRowIdx, cellColIdx, tableSpec, tableData, pastedData)
    tableChanged(countryIso, tableSpec, updatedTable)
  }
  const txt = evt.clipboardData.getData('text/plain')
}

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

const getCellSpecAndType = (tableSpec, rowIdx, colIdx) => {
  const cellSpec = tableSpec.rows[rowIdx][colIdx]
  assert(cellSpec, `No cellspec for ${rowIdx} ${colIdx}`)
  const cellType = cellTypes[cellSpec.type]
  assert(cellType, `Unknown cell type ${cellSpec.type}`)
  return [cellSpec, cellType]
}

const Cell = (props) => {
  const {tableSpec, rowIdx, colIdx} = props
  const [cellSpec, cellType] = getCellSpecAndType(tableSpec, rowIdx, colIdx)
  return cellType.render(cellSpec, props)
}

const tableRows = (props) => {
  return mapIndexed(
    (rowSpec, rowIdx) =>
      <tr key={rowIdx}>
        { mapIndexed((cellSpec, colIdx) => <Cell key={`${rowIdx}-${colIdx}`} rowIdx={rowIdx}
                                                 colIdx={colIdx} {...props}/>, rowSpec) }
      </tr>,
    props.tableSpec.rows)
}

const TableBody = (props) =>
  <tbody>
  {tableRows(props)}
  </tbody>

class FraTable extends React.Component {

  componentWillMount () {
    this.props.fetchTableData(this.props.countryIso, this.props.tableSpec)
  }

  render () {
    return <table className="fra-table">
      {this.props.tableSpec.header}
      <TableBody {...this.props}/>
    </table>
  }
}

const mapStateToProps = (state, props) => {
  assert(props.tableSpec.name, 'tableSpec is missing name')
  return {...props, tableData: state.traditionalTable[props.tableSpec.name] || table.createTableData(props.tableSpec)}
}

export default connect(mapStateToProps, {tableValueChanged, tableChanged, fetchTableData})(FraTable)
