import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as R from 'ramda'

import * as table from './table'
import * as cellTypes from './cellTypes'
import { tableValueChanged, tableChanged, fetchTableData } from './actions'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import UpdateOnResizeReactComponent from '@webapp/components/updateOnResizeReactComponent'

import * as AppState from '@webapp/app/appState'
import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'
import ButtonTableExport from '@webapp/components/buttonTableExport'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

const mapIndexed = R.addIndex(R.map)
const commentTarget = (tableName, rowIdx) => [tableName, 'row', `${rowIdx}`]
const rowShouldBeHighlighted = (tableName, rowIdx, openCommentThreadTarget) =>
  R.equals(commentTarget(tableName, rowIdx), openCommentThreadTarget)

const Cell = (props) => {
  const { tableSpec, rowIdx, colIdx } = props
  const userInfo = useUserInfo()
  const cellType = cellTypes.getCellType(tableSpec, rowIdx, colIdx)
  return cellType.render(props)
}

class ReviewWrapper extends React.Component {
  render() {
    const { section, tableSpec, rowIdx, countryIso, disabled } = this.props
    return <td ref="rowAnchor" className="fra-table__row-anchor-cell">
      <div className="fra-table__review-indicator-anchor">
        {
          disabled
            ? null
            : <ReviewIndicator section={section || tableSpec.name}
              title=""
              target={commentTarget(tableSpec.name, rowIdx)}
              countryIso={countryIso} />
        }
      </div>
    </td>
  }
}

const tableRows = (props) => {
  return mapIndexed(
    (rowSpec, rowIdx) =>
      <tr key={rowIdx}
        className={rowShouldBeHighlighted(props.tableSpec.name, rowIdx, props.openCommentThreadTarget) ? 'fra-row-comments__open' : ''}>
        {
          mapIndexed(
            (cellSpec, colIdx) => <Cell key={`${rowIdx}-${colIdx}`}
              rowIdx={rowIdx}
              colIdx={colIdx}
              {...props} />,
            rowSpec
          )
        }
        {
          !props.tableSpec.disableReviewComments
            ? <ReviewWrapper {...props} rowIdx={rowIdx} />
            : null
        }
      </tr>,
    props.tableSpec.rows)
}

const createValidationStatus = (props) => {
  const handleRow = (row, rowIdx) =>
    mapIndexed(
      (value, colIdx) => {
        const cellSpec = props.tableSpec.rows[rowIdx][colIdx]
        return cellSpec.validator
          ? cellSpec.validator(R.merge(props, cellSpec), rowIdx, colIdx)
          : null
      },
      row
    )
  return mapIndexed(
    handleRow,
    props.tableData
  )
}

createValidationStatus.propTypes = {
  cellSpec: PropTypes.any.isRequired
}

const validationErrorColumns = props => {
  const validationErrorColumnMessages =
    R.pipe(
      R.transpose,
      R.map(R.reject(R.isNil)),
      R.map(R.reject(v => v.valid)),
      R.map(R.pluck('message')),
      R.map(R.uniq)
    )(createValidationStatus(props))

  if (R.all(R.isEmpty, validationErrorColumnMessages)) return null
  return mapIndexed(
    (columnErrorMsgs, i) =>
      <td key={`errorColumn${i}`} className="fra-table__validation-cell">
        <div className="fra-table__validation-container">
          {
            mapIndexed((errorMsg, j) =>
              <div key={j} className="fra-table__validation-error">{errorMsg}</div>
              , columnErrorMsgs)
          }
        </div>
      </td>,
    validationErrorColumnMessages
  )
}

const validationErrorRow = props => {
  const columns = validationErrorColumns(props)
  if (!columns) return null
  return <tr className="no-print">
    {columns}
  </tr>
}

const TableBody = props => {
  // If user not logged, hide validation (error) message
  const userInfo = useUserInfo()
  const showValidation = !props.skipValidation && userInfo
  return <tbody>
    {tableRows(props)}
    {showValidation && validationErrorRow(props)}
  </tbody>
}

class FraTable extends UpdateOnResizeReactComponent {

  constructor(props) {
    super(props)
    this.tableRef = React.createRef()
  }

  componentDidMount() {
    if (!this.props.tableDataFetched) {
      this.props.fetchTableData(this.props.countryIso, this.props.tableSpec)
    }
  }

  render() {
    const { sectionAnchor } = this.props

    return <div ref="traditionalTable" className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <ButtonTableExport
          tableRef={this.tableRef}
          filename={sectionAnchor}
        />
        <table ref={this.tableRef} className="fra-table">
          {this.props.tableSpec.header}
          <TableBody {...this.props} />
        </table>
      </div>
    </div>
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    tableData: R.path(['traditionalTable', props.tableSpec.name, 'tableData'], state) || table.createTableData(props.tableSpec),
    openCommentThreadTarget: ReviewState.getOpenThreadTarget(state),
    i18n: AppState.getI18n(state)
  }
}

FraTable.propTypes = {
  tableSpec: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
}

export default connect(mapStateToProps, { tableValueChanged, tableChanged, fetchTableData })(FraTable)
