import React, { Component } from 'react'
import * as R from 'ramda'
import ReviewIndicator from '../../review/reviewIndicator'
import { readPasteClipboard } from '../../utils/copyPasteUtil'
import { ThousandSeparatedDecimalInput } from '../../reusableUiComponents/thousandSeparatedDecimalInput'
import { formatDecimal } from '../../utils/numberFormat'
import { sum, eq } from '../../../common/bignumberUtils'

const GrowingStockTable = (props) => {
  const cols = R.filter(v => v.type !== 'odp', R.values(props.areaValues))

  return <div className="fra-table__container">
    <div className="fra-table__scroll-wrapper">
      <Table
        categoriesHeader={props.header}
        colsHeader={props.avgTableHeader}
        cols={cols}
        type='avg'
        {...props} />
    </div>
    <div className="fra-table__scroll-wrapper">
      <Table
        categoriesHeader={props.header}
        colsHeader={props.totalTableHeader}
        cols={cols}
        type='total'
        {...props} />
    </div>
  </div>
}

const Table = (props) => {
  const {cols, rows} = props

  return <table className="fra-table">
    <thead>
    <tr>
      <th rowSpan="2" className="fra-table__header-cell-left">{props.categoriesHeader}</th>
      <th colSpan={cols.length} className="fra-table__header-cell">{props.colsHeader}</th>
    </tr>
    <tr>
      {
        cols.map(v =>
          <th className="fra-table__header-cell" key={`${v.name}`}>
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
}

const Row = (props) => {
  const {openCommentThread, i18n, row, cols, type} = props

  return <tr
    className={openCommentThread && R.equals(openCommentThread.target, [row.field, type]) ? 'fra-row-comments__open' : ''}>
    <th className={
      row.subCategory
      ? 'fra-table__subcategory-cell'
      : row.calculated
        ? 'fra-table__header-cell-left'
        : 'fra-table__category-cell'
    }>
      {i18n.t(row.labelKey) }
    </th>
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
    <td className="fra-table__row-anchor-cell">
      <div className="fra-table__review-indicator-anchor">
        <ReviewIndicator
          key={`${row.field}_ri`}
          section={props.section}
          title={props.i18n.t(row.labelKey)}
          target={[row.field, props.type]}
          countryIso={props.countryIso} />
      </div>
    </td>
  </tr>
}

const Cell = (props) => {
  const {countryIso, col, type, field, areaValues, values, calculated} = props
  const value = R.pipe(
    R.find(v => eq(v.year, col.year)),
    R.defaultTo({}),
    R.prop(`${field}${type === 'avg' ? 'Avg' : ''}`),
    R.defaultTo(null),
  )(values)

  const currentCol = R.pipe(
    R.find(v => eq(v.year, col.year)),
    R.defaultTo(null)
  )(values)

  const disableInput = R.pipe(
    R.find(v => eq(v.year, col.year)),
    R.defaultTo(null),
    v => typeof v.year === 'number'
  )(areaValues)

  const whichTotal = props.type === 'avg'
    ? props.rowIdx === 1
      ? sum([currentCol.otherPlantedForestAvg, currentCol.plantationForestAvg])
      : sum([currentCol.naturallyRegeneratingForestAvg, currentCol.otherPlantedForestAvg, currentCol.plantationForestAvg])
    : props.rowIdx === 1
      ? sum([currentCol.otherPlantedForest, currentCol.plantationForest])
      : sum([currentCol.naturallyRegeneratingForest, currentCol.otherPlantedForest, currentCol.plantationForest])

  return calculated
    ? <td className="fra-table__calculated-cell">{formatDecimal(whichTotal)}</td>
    : <td className="fra-table__cell">
        <ThousandSeparatedDecimalInput
          numberValue={value}
          disabled={disableInput}
          onChange={e => props.updateValue(countryIso, areaValues, values, col.year, field, type, e.target.value)}
          onPaste={e => props.updateValues(countryIso, areaValues, values, readPasteClipboard(e, 'decimal'), type, props.cols, props.rowIdx, props.colIdx)}
        />
      </td>
}

export default GrowingStockTable
