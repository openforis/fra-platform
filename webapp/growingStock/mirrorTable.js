import React, { Component } from 'react'
import * as R from 'ramda'
import { ThousandSeparatedIntegerInput } from '../reusableUiComponents/thousandSeparatedIntegerInput'
import ReviewIndicator from '../review/reviewIndicator'
import { readPasteClipboard } from '../utils/copyPasteUtil'

const MirrorTable = (props) => {
  const cols = R.filter(v => v.type !== 'odp', R.values(props.fra))

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
    <div className="nde__data-table-scroll-content">
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
              key={i}
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
    className={`${openCommentThread && R.isEmpty(R.difference(openCommentThread.target, [row.field, type])) ? 'fra-row-comments__open' : ''}`}>
    <td className="fra-table__header-cell">{i18n.t(row.labelKey)}</td>
    {
      cols.map((col, i) =>
        <Cell
          key={i}
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
  const {countryIso, cols, col, type, field, fra, values, calculated, updateValue, updateValues, rowIdx, colIdx} = props
  const value = R.pipe(
    R.find(R.propEq('year', col.year)),
    R.defaultTo({}),
    R.prop(`${field}${type === 'avg' ? 'Avg' : ''}`),
    R.defaultTo(null),
  )(values)

  return <td className={`gs-fra-table__${calculated ? 'text-readonly-cell' : 'cell'}`}>
    <ThousandSeparatedIntegerInput
      className="fra-table__integer-input"
      integerValue={value}
      disabled={calculated}
      onChange={e => updateValue(countryIso, fra, values, col.year, field, type, e.target.value)}
      onPaste={e => updateValues(countryIso, fra, values, readPasteClipboard(e), type, cols, rowIdx, colIdx)}
    />
  </td>
}

export default MirrorTable
