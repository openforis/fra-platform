import React from 'react'
import R from 'ramda'
import { totalSumFormatted } from '../../traditionalTable/aggregate'

const yearlyVolumeInputsForRow = () =>
  [
    {type: 'decimalInput'},
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
  {type: 'textInput', minWidth: 240},
  {type: 'textInput', minWidth: 240},
  ...yearlyVolumeInputsForRow()
]

const totalNativeRows = R.range(0, 11)
const totalNative = (tableData, column) => totalSumFormatted(tableData, column, totalNativeRows)

const totalIntroducedRows = R.range(13, 19)
const totalIntroduced = (tableData, column) => totalSumFormatted(tableData, column, totalIntroducedRows)

const totalGrowingStock = (tableData, column) => totalSumFormatted(tableData, column, R.concat(totalNativeRows, totalIntroducedRows))

const renderAggregate = (aggregateFunction, column) => ({tableData}) =>
  <td key="" className="fra-table__calculated-cell">
    {aggregateFunction(tableData, column)}
  </td>

const aggregateCell = aggregateFunction => column =>
  ({
    type: 'custom',
    render: renderAggregate(aggregateFunction, column)
  })

const remainingNativeRow = i18n => [
  {
    type: 'readOnly',
    jsx: <th className="fra-table__header-cell fra-table__filler-first">
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
    jsx: <th className="fra-table__header-cell fra-table__filler-first">
      {i18n.t('growingStockComposition.remainingIntroduced')}
    </th>
  },
  fillerCell,
  fillerCell,
  ...yearlyVolumeInputsForRow()
]

const totalRow = (i18n, rowHeaderKey, aggregateFunction) => [
  {
    type: 'readOnly',
    jsx: <th className="fra-table__header-cell fra-table__filler-first">{i18n.t(rowHeaderKey)}</th>
  },
  fillerCell,
  fillerCell,
  ...R.map(aggregateCell(aggregateFunction), R.range(3, 9))
]

const totalNativeRow = i18n => totalRow(i18n, 'growingStockComposition.totalNative', totalNative)

const totalIntroducedRow = i18n => totalRow(i18n, 'growingStockComposition.totalIntroduced', totalIntroduced)

const totalGrowingStockRow = i18n => totalRow(i18n, 'growingStockComposition.totalGrowingStock', totalGrowingStock)

const introducedHeaderRow = i18n => [
  {
    type: 'readOnly',
    jsx: <th className="fra-table__header-cell fra-table__filler-first">
      {i18n.t('growingStockComposition.introducedTreeSpecies')}
    </th>
  },
  ...R.map(() => fillerCell, R.range(1, 8)),
  {
    type: 'readOnly',
    jsx: <td className="fra-table__filler-last"/>
  }
]

export default i18n => ({
  name: 'growingStockComposition',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell">{i18n.t('growingStockComposition.categoryHeader')}</th>
    <th rowSpan="2" className="fra-table__header-cell">{i18n.t('growingStockComposition.scientificName')}</th>
    <th rowSpan="2" className="fra-table__header-cell">{i18n.t('growingStockComposition.commonName')}</th>
    <th className="fra-table__header-cell-middle" colSpan="6">{i18n.t('growingStockComposition.areaUnitLabel')}</th>
  </tr>
  <tr>
    <th className="fra-table__header-cell">{i18n.t('growingStockComposition.nativeTreeSpecies')}</th>
    <th className="fra-table__header-cell-right">1990</th>
    <th className="fra-table__header-cell-right">1995</th>
    <th className="fra-table__header-cell-right">2000</th>
    <th className="fra-table__header-cell-right">2005</th>
    <th className="fra-table__header-cell-right">2010</th>
    <th className="fra-table__header-cell-right">2015</th>
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
      totalGrowingStockRow(i18n)
    ],
  valueSlice: {
    rowStart: 0,
    rowEnd: -2,
    columnStart: 1,
    columnEnd: undefined
  }
})
