import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import assert from 'assert'

import * as table from './table'
import * as cellTypes from './cellTypes'
import { tableValueChanged, tableChanged, fetchTableData } from './actions'

const mapIndexed = R.addIndex(R.map)

const Cell = (props) => {
  const {tableSpec, rowIdx, colIdx} = props
  const cellType = cellTypes.getCellType(tableSpec, rowIdx, colIdx)
  return cellType.render(props)
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
