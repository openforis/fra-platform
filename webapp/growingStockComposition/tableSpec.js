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
  jsx: <td className="fra-table__header-cell"/>
}

const speciesRow = i18n => [
  {type: 'readOnly', jsx: <td className="fra-table__header-cell">{i18n.t('growingStockComposition.nativeTreeSpecies')}</td>},
  fillerCell,
  fillerCell,
  ...yearlyVolumeInputsForRow()
]

const rankRow = i18n => idx => [
  {type: 'readOnly', jsx: <td key={`rank${idx}`} className="fra-table__header-cell">#{idx} {i18n.t('growingStockComposition.rank')}</td>},
  {type: 'stringInput'},
  {type: 'stringInput'},
  ...yearlyVolumeInputsForRow()
]

const totalNative = (tableData, column) =>
  R.reduce((sum, row) => {
    const value = tableData[row][column]
    if (!R.isNil(value))
      return sum + value
    else
      return sum
    },
    0,
    R.range(0, 11)
  )

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
    jsx: <td className="fra-table__header-cell">{i18n.t('growingStockComposition.remainingNative')}</td>
  },
  fillerCell,
  fillerCell,
  ...yearlyVolumeInputsForRow()
]

const totalNativeRow = i18n => [
  {
    type: 'readOnly',
    jsx: <td className="fra-table__header-cell">{i18n.t('growingStockComposition.totalNative')}</td>
  },
  fillerCell,
  fillerCell,
  ...R.map(aggregateCell(totalNative), R.range(3, 9))
]

const introducedHeaderRow = i18n => [
  {
    type: 'readOnly',
    jsx: <td className="fra-table__header-cell">{i18n.t('growingStockComposition.introducedTreeSpecies')}</td>
  },
  ...R.map(() => fillerCell, R.range(1, 9))
]

export default i18n => ({
  name: 'growingStockComposition',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell">{i18n.t('growingStockComposition.fra2020categories')}</th>
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
    ...R.map(rankRow(i18n), R.range(1, 6))],

  valueSlice: {
    rowStart: 0,
    rowEnd: undefined,
    columnStart: 1,
    columnEnd: undefined
  }
})
