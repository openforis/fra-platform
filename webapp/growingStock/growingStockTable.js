import React, { Component } from 'react'
import * as R from 'ramda'
import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import ReviewIndicator from '../review/reviewIndicator'
import { readPasteClipboard } from '../utils/copyPasteUtil'

const GrowingStockTable = (props) => {
  const cols = R.filter(v => v.type !== 'odp', R.values(props.areaValues))

  return <div>
    <Table
      categoriesHeader={props.header}
      colsHeader={props.avgTableHeader}
      cols={cols}
      type='avg'
      {...props} />
    <Table
      categoriesHeader={props.header}
      colsHeader={props.totalTableHeader}
      cols={cols}
      type='total'
      {...props} />
  </div>
}

const Table = (props) => {
  const {cols, rows} = props

  return <div className="nde__data-table-container">
    <div className="fra-table__scroll-wrapper">
      <table className="fra-table">
        <thead>
        <tr>
          <th rowSpan="2" className="fra-table__header-cell">{props.categoriesHeader}</th>
          <th colSpan={cols.length} className="fra-table__header-cell-middle">{props.colsHeader}</th>
        </tr>
        <tr>
          {
            cols.map(v =>
              <th className="fra-table__header-cell-right" key={`${v.name}`}>
                {v.name}
              </th>)
          }
        </tr>
        </thead>
        <tbody>
        {
          rows.map((row, i) =>
            <Row
              key={row.field}
              rowIdx={i}
              row={row}
              {...props}
            />)
        }
        </tbody>
      </table>
    </div>
    <div className="nde__comment-column">
      {
        rows.map((row, i) =>
          <ReviewIndicator
            key={`${row.field}_ri`}
            section={props.section}
            name={props.i18n.t(row.labelKey)}
            target={[row.field, props.type]}
            countryIso={props.countryIso}
          />)
      }
    </div>
  </div>
}

const Row = (props) => {
  const {openCommentThread, i18n, row, cols, type} = props

  return <tr
    className={`${openCommentThread && R.equals(openCommentThread.target, [row.field, type]) ? 'fra-row-comments__open' : ''}`}>
    <td className={`fra-table__header-cell${row.subCategory?'-sub':''}`}>{i18n.t(row.labelKey)}</td>
    {
      cols.map((col, i) =>
        <Cell
          key={`${row.field}${col.name}`}
          field={row.field}
          calculated={row.calculated}
          colIdx={i}
          col={col}
          {...props}
        />)
    }
  </tr>
}

const Cell = (props) => {
  const {countryIso, col, type, field, areaValues, values, calculated} = props
  const value = R.pipe(
    R.find(R.propEq('year', col.year)),
    R.defaultTo({}),
    R.prop(`${field}${type === 'avg' ? 'Avg' : ''}`),
    R.defaultTo(null),
  )(values)

  return calculated
    ? <td className="fra-table__aggregate-cell">{value}</td>
    : <td className="fra-table__cell">
      <ThousandSeparatedIntegerInput
        className="fra-table__integer-input"
        integerValue={value}
        disabled={calculated}
        onChange={e => props.updateValue(countryIso, areaValues, values, col.year, field, type, e.target.value)}
        onPaste={e => props.updateValues(countryIso, areaValues, values, readPasteClipboard(e), type, props.cols, props.rowIdx, props.colIdx)}
      />
    </td>
}

export default GrowingStockTable
