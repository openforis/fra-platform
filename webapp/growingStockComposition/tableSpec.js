import React from 'react'
import R from 'ramda'

const yearlyVolumeInputsForRow = () =>
  [
    {type: 'integerInput'},
    {type: 'integerInput'},
    {type: 'integerInput'},
    {type: 'integerInput'},
    {type: 'integerInput'},
    {type: 'integerInput'}
  ]

const fillerCell = {
  type: 'readOnly',
  jsx: <td className="growing-stock__filler-cell"/>
}

const rankRow = i18n => idx => [
  {
    type: 'readOnly',
    jsx: <td key={`rank${idx}`} className="fra-table__header-cell-sub">
           #{idx} {i18n.t('growingStockComposition.rank')}
         </td>
  },
  {type: 'textInput', minWidth: 300},
  {type: 'textInput', minWidth: 250},
  ...yearlyVolumeInputsForRow()
]

const total = (tableData, column, range) =>
  R.reduce((sum, row) => {
      const value = tableData[row][column]
      if (!R.isNil(value))
        return sum + value
      else
        return sum
    },
    0,
    range
  )

const totalNative = (tableData, column) => total(tableData, column, R.range(0, 11))

const totalIntroduced = (tableData, column) => total(tableData, column, R.range(13, 19))

const totalGrowingStock = (tableData, column) =>
  totalNative(tableData, column) + totalIntroduced(tableData, column)

const renderAggregate = (aggregateFunction, column) => ({tableData}) =>
  <td key="" className="fra-table__aggregate-cell">
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
    jsx: <td className="growing-stock__row-header-continued-with-fillers">
           {i18n.t('growingStockComposition.remainingNative')}
         </td>
  },
  fillerCell,
  fillerCell,
  ...yearlyVolumeInputsForRow()
]

const remainingIntroducedRow = i18n => [
  {
    type: 'readOnly',
    jsx: <td className="growing-stock__row-header-continued-with-fillers">
          {i18n.t('growingStockComposition.remainingIntroduced')}
         </td>
  },
  fillerCell,
  fillerCell,
  ...yearlyVolumeInputsForRow()
]

const totalRow = (i18n, rowHeaderKey, aggregateFunction) => [
  {
    type: 'readOnly',
    jsx: <td className="growing-stock__row-header-continued-with-fillers">{i18n.t(rowHeaderKey)}</td>
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
    jsx: <td className="growing-stock__row-header-continued-with-fillers">
          {i18n.t('growingStockComposition.introducedTreeSpecies')}
         </td>
  },
  ...R.map(() => fillerCell, R.range(1, 8)),
  {
    type: 'readOnly',
    jsx: <td className="growing-stock__filler-cell" style={{borderRight: '1px solid #d5d5d5'}}/>
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
    <td className="fra-table__header-cell">{i18n.t('growingStockComposition.nativeTreeSpecies')}</td>
    <td className="fra-table__header-cell-right">1990</td>
    <td className="fra-table__header-cell-right">1995</td>
    <td className="fra-table__header-cell-right">2000</td>
    <td className="fra-table__header-cell-right">2005</td>
    <td className="fra-table__header-cell-right">2010</td>
    <td className="fra-table__header-cell-right">2015</td>
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
