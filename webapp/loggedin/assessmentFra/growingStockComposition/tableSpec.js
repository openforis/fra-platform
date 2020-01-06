import React from 'react'
import * as R from 'ramda'
import { totalSumFormatted } from '@webapp/traditionalTable/aggregate'
import { equalToTotalGrowingStock } from '@webapp/traditionalTable/validators'

const years = [1990, 2000, 2010, 2015, 2020]

const yearlyVolumeInputsForRow = () =>
  [
    {type: 'decimalInput'},
    {type: 'decimalInput'},
    {type: 'decimalInput'},
    {type: 'decimalInput'},
    {type: 'decimalInput'}
  ]

const fillerCell = {
  type: 'readOnly',
  jsx: <td className="fra-table__filler"/>
}

const rankRow = i18n => idx => [
  {
    type: 'readOnly',
    jsx: <th key={`rank${idx}`} className="fra-table__category-cell">
      #{idx} {i18n.t('growingStockComposition.rank')}
    </th>
  },
  {type: 'textInput'},
  {type: 'textInput'},
  ...yearlyVolumeInputsForRow()
]

const totalNativeRows = R.range(0, 11)
const totalNative = (tableData, column) => totalSumFormatted(tableData, column, totalNativeRows)

const totalIntroducedRows = R.range(13, 19)
const totalIntroduced = (tableData, column) => totalSumFormatted(tableData, column, totalIntroducedRows)

const totalGrowingStock = (tableData, column) => totalSumFormatted(tableData, column, R.concat(totalNativeRows, totalIntroducedRows))

const renderAggregate = (aggregateFunction, column) =>
  props => {
    const {tableData, validator, rowIdx, colIdx} = props
    const valid = validator ? validator(props, rowIdx, colIdx).valid : true

    return <td className={`fra-table__calculated-cell ${valid ? '' : 'error'}`}>
      {aggregateFunction(tableData, column)}
    </td>
  }

const aggregateCell = (aggregateFunction, growingStock = null) => (column, i) => {
  const year = years[i]
  return {
    type: 'custom',
    render: renderAggregate(aggregateFunction, column),
    validator: growingStock ? equalToTotalGrowingStock(year, growingStock, aggregateFunction) : null
  }
}

const remainingNativeRow = i18n => [
  {
    type: 'readOnly',
    jsx: <th className="fra-table__header-cell-left fra-table__filler-first">
      {i18n.t('growingStockComposition.remainingNative')}
    </th>
  },
  fillerCell,
  fillerCell,
  ...yearlyVolumeInputsForRow()
]

const remainingIntroducedRow = i18n => [
  {
    type: 'readOnly',
    jsx: <th className="fra-table__header-cell-left fra-table__filler-first">
      {i18n.t('growingStockComposition.remainingIntroduced')}
    </th>
  },
  fillerCell,
  fillerCell,
  ...yearlyVolumeInputsForRow()
]

const totalRow = (i18n, rowHeaderKey, aggregateFunction, growingStock) => [
  {
    type: 'readOnly',
    jsx: <th className="fra-table__header-cell-left fra-table__filler-first">{i18n.t(rowHeaderKey)}</th>
  },
  fillerCell,
  fillerCell,
  ...R.range(3, 8).map(aggregateCell(aggregateFunction, growingStock))
]

const totalNativeRow = i18n => totalRow(i18n, 'growingStockComposition.totalNative', totalNative)

const totalIntroducedRow = i18n => totalRow(i18n, 'growingStockComposition.totalIntroduced', totalIntroduced)

const totalGrowingStockRow = (i18n, growingStock) => totalRow(i18n, 'growingStockComposition.totalGrowingStock', totalGrowingStock, growingStock)

const introducedHeaderRow = i18n => [
  {
    type: 'readOnly',
    jsx: <th className="fra-table__header-cell-left fra-table__filler-first">
      {i18n.t('growingStockComposition.introducedTreeSpecies')}
    </th>
  },
  ...R.map(() => fillerCell, R.range(1, 7)),
  {
    type: 'readOnly',
    jsx: <td className="fra-table__filler-last"/>
  }
]

export const sectionName = 'growingStockComposition'

export default (i18n, growingStock) => ({
  name: sectionName,
  header: <thead>
  <tr>
    <th className="fra-table__header-cell-left">{i18n.t('growingStockComposition.categoryHeader')}</th>
    <th rowSpan="2" className="fra-table__header-cell">{i18n.t('growingStockComposition.scientificName')}</th>
    <th rowSpan="2" className="fra-table__header-cell">{i18n.t('growingStockComposition.commonName')}</th>
    <th className="fra-table__header-cell" colSpan={years.length}>{i18n.t('growingStockComposition.areaUnitLabel')}</th>
  </tr>
  <tr>
    <th className="fra-table__header-cell-left">{i18n.t('growingStockComposition.nativeTreeSpecies')}</th>
    {
      R.map(year =>
          <th key={year} className="fra-table__header-cell">{year}</th>
        , years)
    }
  </tr>
  </thead>,
  rows:
    [
      ...R.map(rankRow(i18n), R.range(1, 11)),
      remainingNativeRow(i18n),
      totalNativeRow(i18n),
      introducedHeaderRow(i18n),
      ...R.map(rankRow(i18n), R.range(1, 6)),
      remainingIntroducedRow(i18n),
      totalIntroducedRow(i18n),
      totalGrowingStockRow(i18n, growingStock)
    ],
  valueSlice: {
    rowStart: 0,
    rowEnd: -2,
    columnStart: 1,
    columnEnd: undefined
  }
})
