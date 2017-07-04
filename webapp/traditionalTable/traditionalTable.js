import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import assert from 'assert'

import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import * as table from './table'
import { tableValueChanged, fetchTableData } from './actions'
import { acceptableAsInteger } from '../utils/numberInput'

const mapIndexed = R.addIndex(R.map)

const handlePaste = (evt) => {
  evt.stopPropagation()
  evt.preventDefault()
  console.log(evt)
  const el = document.createElement('html')
  el.innerHTML = evt.clipboardData.getData('text/html')
  const rows = el.getElementsByTagName('tr')
  console.log('pasted html')
  console.log(evt.clipboardData.getData('text/html'))
  console.log('pasted rows')
  console.log(rows)
  console.log('xpasted text')
  const txt = evt.clipboardData.getData('text/plain')
  console.log('the text', txt)
}

const IntegerInput = ({countryIso, tableSpec, tableData, rowIdx, colIdx, tableValueChanged}) => {
  const currentValue = tableData[rowIdx][colIdx]
  return <td className="fra-table__cell">
    <ThousandSeparatedIntegerInput integerValue={ currentValue }
                                   className="fra-table__integer-input"
                                   onChange={
                                     (evt) => {
                                       console.log('EVT')
                                      const newValue = evt.target.value
                                      if (acceptableAsInteger(newValue)) {
                                        console.log('changing tableValue based on', newValue)
                                        tableValueChanged(countryIso, tableSpec, rowIdx, colIdx, evt.target.value)
                                      }
                                    }
                                   }
                                   onPaste={ handlePaste }/>
  </td>
}

const cellTypes = {
  'integerInput': {render: (cellSpec, props) => <IntegerInput {...props}/>, acceptsValue: acceptableAsInteger},
  'readOnly': {render: (cellSpec, props) => cellSpec.jsx},
  'custom': {render: (cellSpec, props) => cellSpec.render(props)}
}

const Cell = (props) => {
  const {tableSpec, rowIdx, colIdx} = props
  const cellSpec = tableSpec.rows[rowIdx][colIdx]
  assert(cellSpec, `No cellspec for ${rowIdx} ${colIdx}`)
  const handler = cellTypes[cellSpec.type]
  if (handler) {
    return handler.render(cellSpec, props)
  } else {
    throw `Unknown cell type ${cellSpec.type}`
  }
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

export default connect(mapStateToProps, {tableValueChanged, fetchTableData})(FraTable)
