import React from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import assert from 'assert'

import './style.less'
import * as table from './table'
import * as cellTypes from './cellTypes'
import { tableValueChanged, tableChanged, fetchTableData } from './actions'
import ReviewIndicator from '../review/reviewIndicator'
import UpdateOnResizeReactComponent from '../reusableUiComponents/updateOnResizeReactComponent'

const mapIndexed = R.addIndex(R.map)
const commentTarget = (rowIdx) => ['row', `${rowIdx}`]
const rowShouldBeHighlighted = (rowIdx, openCommentThreadTarget) =>
  R.equals(commentTarget(rowIdx), openCommentThreadTarget)

const Cell = (props) => {
  const {tableSpec, rowIdx, colIdx} = props
  const cellType = cellTypes.getCellType(tableSpec, rowIdx, colIdx)
  return cellType.render(props)
}

class ReviewWrapper extends React.Component {
  render () {
    const top = this.refs.rowAnchor && this.props.tableTop
      ? this.refs.rowAnchor.getBoundingClientRect().top - this.props.tableTop
      : 0
    return <td ref="rowAnchor">
      <div className="traditional-table__review-indicator-row-anchor" style={{top: top}}>
        <ReviewIndicator section={this.props.tableSpec.name}
                         name=""
                         target={commentTarget(this.props.rowIdx)}
                         countryIso={this.props.countryIso}/>
      </div>
    </td>
  }
}

const tableRows = (props) => {
  return mapIndexed(
    (rowSpec, rowIdx) =>
      <tr key={rowIdx}
          className={rowShouldBeHighlighted(rowIdx, props.openCommentThreadTarget) ? 'fra-row-comments__open' : ''}>
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

class FraTable extends UpdateOnResizeReactComponent {

  componentWillMount () {
    this.props.fetchTableData(this.props.countryIso, this.props.tableSpec)
  }

  render () {
    return <div ref="traditionalTable" className="traditional-table">
      <div className="traditional-table__scroll-wrapper">
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
  return {
    ...props,
    tableData: state.traditionalTable[props.tableSpec.name] || table.createTableData(props.tableSpec),
    openCommentThreadTarget: state.review.openThread ? state.review.openThread.target : null
  }
}

export default connect(mapStateToProps, {tableValueChanged, tableChanged, fetchTableData})(FraTable)
