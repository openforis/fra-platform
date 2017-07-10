import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import assert from 'assert'

import * as table from './table'
import * as cellTypes from './cellTypes'
import { tableValueChanged, tableChanged, fetchTableData } from './actions'
import ReviewIndicator from '../review/reviewIndicator'

const mapIndexed = R.addIndex(R.map)

const Cell = (props) => {
  const {tableSpec, rowIdx, colIdx} = props
  const cellType = cellTypes.getCellType(tableSpec, rowIdx, colIdx)
  return cellType.render(props)
}

class ReviewWrapper extends React.Component {
  render () {
    if (this.refs.rowAnchor) {
      console.log('top', this.refs.rowAnchor.getBoundingClientRect().top)
      console.log('tableTop', this.props.tableTop)
    }
    const top = this.refs.rowAnchor && this.props.tableTop
      ? this.refs.rowAnchor.getBoundingClientRect().top - this.props.tableTop
      : 0
    return <td ref="rowAnchor">
      <div style={{position: 'absolute', top: top, right: 2}}>
        <ReviewIndicator section={`TraditionalTable-${this.props.tableSpec.name}`}
                         name="National data point"
                         target={['row', `${this.props.rowIdx}`]}
                         countryIso={this.props.countryIso}/>
      </div>
    </td>
  }
}

const tableRows = (props) => {
  return mapIndexed(
    (rowSpec, rowIdx) =>
      <tr key={rowIdx}>
        {
          mapIndexed(
            (cellSpec, colIdx) => <Cell key={`${rowIdx}-${colIdx}`}
                                        rowIdx={rowIdx}
                                        colIdx={colIdx}
                                        {...props}/>,
            rowSpec
          )
        }
        <ReviewWrapper {...props} rowIdx={rowIdx}/>
      </tr>,
    props.tableSpec.rows)
}

const TableBody = (props) =>
  <tbody>
  {tableRows(props)}
  </tbody>

class FraTable extends React.Component {

  constructor () {
    super()
    this.resizeListener = () => this.forceUpdate()
  }

  componentDidMount () {
    window.addEventListener('resize', this.resizeListener, true)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeListener, true)
  }

  componentWillMount () {
    this.props.fetchTableData(this.props.countryIso, this.props.tableSpec)
  }

  render () {
    return <div ref="traditionalTable" style={{position: 'relative'}}>
      <div style={{overflowX: 'auto'}}>
        <table className="fra-table">
          {this.props.tableSpec.header}
          <TableBody {...this.props}
                     tableTop={
                       this.refs.traditionalTable
                         ? this.refs.traditionalTable.getBoundingClientRect().top
                         : null
                     }/>
        </table>
      </div>
    </div>
  }
}

const mapStateToProps = (state, props) => {
  assert(props.tableSpec.name, 'tableSpec is missing name')
  return {...props, tableData: state.traditionalTable[props.tableSpec.name] || table.createTableData(props.tableSpec)}
}

export default connect(mapStateToProps, {tableValueChanged, tableChanged, fetchTableData})(FraTable)
