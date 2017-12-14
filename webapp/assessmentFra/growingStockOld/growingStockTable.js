import React, { Component } from 'react'
import * as R from 'ramda'
import ReviewIndicator from '../../review/reviewIndicator'
import { readPasteClipboard } from '../../utils/copyPasteUtil'
import { ThousandSeparatedDecimalInput } from '../../reusableUiComponents/thousandSeparatedDecimalInput'
import { formatDecimal } from '../../utils/numberFormat'
import { sum, div, mul, eq } from '../../../common/bignumberUtils'
import { getOwlAreaForYear, getForestAreaForYear } from './growingStock'

const GrowingStockTable = (props) => {
  const filterCols = R.filter(v => v.type !== 'odp', R.values(props.areaValues))
  const cols = R.map(col => {
    const otherWoodedLand = getOwlAreaForYear(props.extentOfForest, col.year)
    const forestArea = getForestAreaForYear(props.extentOfForest, col.year)
    return {...col, otherWoodedLand, forestArea}
  }, filterCols)

  return <div className="fra-table__container">
    <div className="fra-table__scroll-wrapper">
      <Table
        {...props}
        categoriesHeader={props.header}
        colsHeader={props.avgTableHeader}
        areaValues={cols}
        type='avg' />
    </div>
    <div className="fra-table__scroll-wrapper">
      <Table
        {...props}
        categoriesHeader={props.header}
        colsHeader={props.totalTableHeader}
        areaValues={cols}
        type='total' />
    </div>
  </div>
}

const Table = (props) => {
  const {areaValues, rows} = props

  return <table className="fra-table">
    <thead>
    <tr>
      <th rowSpan="2" className="fra-table__header-cell-left">{props.categoriesHeader}</th>
      <th colSpan={areaValues.length} className="fra-table__header-cell">{props.colsHeader}</th>
    </tr>
    <tr>
      {
        areaValues.map(v =>
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
  const {openCommentThread, i18n, row, areaValues, type} = props

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
      areaValues.map((col, i) =>
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
  const totalField = type === 'avg' ? field + 'Avg' : field

  const value = R.pipe(
    R.find(v => eq(v.year, col.year)),
    R.defaultTo({}),
    R.prop(`${field}${type === 'avg' ? 'Avg' : ''}`),
    R.defaultTo(null)
  )(values)

  const currentCol = (object) => R.pipe(
    R.find(v => eq(v.year, col.year)),
    R.defaultTo({})
  )(object)

  const colAreaValues = currentCol(areaValues)
  const colValues = currentCol(values)

  const plantedForestSum = sum([colValues.plantationForest, colValues.otherPlantedForest])
  const totalForestSum = sum([colValues.naturallyRegeneratingForest, colValues.plantationForest, colValues.otherPlantedForest])
  const areaPlantedForestSum = sum([colAreaValues.plantationForestArea, colAreaValues.otherPlantedForestArea])

  const totalSums = {
    plantedForestAvg: div(mul(plantedForestSum, 1000), areaPlantedForestSum),
    totalForestAvg: div(mul(totalForestSum, 1000), colAreaValues.forestArea),
    plantedForest: plantedForestSum,
    totalForest: totalForestSum
  }

  return calculated
    ? <td className="fra-table__calculated-cell">{formatDecimal(totalSums[totalField])}</td>
    : <td className="fra-table__cell">
        <ThousandSeparatedDecimalInput
          numberValue={value}
          onChange={e => props.updateValue(countryIso, areaValues, values, col.year, field, type, e.target.value)}
          onPaste={e => props.updateValues(countryIso, areaValues, values, readPasteClipboard(e, 'decimal'), type, props.rowIdx, props.colIdx)}
        />
      </td>
}

export default GrowingStockTable
