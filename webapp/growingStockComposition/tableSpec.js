import React from 'react'
import R from 'ramda'

const rankRow = i18n => idx => [
  {type: 'readOnly', jsx: <td key={`rank${idx}`} className="fra-table__header-cell">#{idx} {i18n.t('growingStockComposition.rank')}</td>},
  {type: 'stringInput'},
  {type: 'stringInput'},
  {type: 'integerInput'},
  {type: 'integerInput'},
  {type: 'integerInput'},
  {type: 'integerInput'},
  {type: 'integerInput'},
  {type: 'integerInput'}
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
    [
      {
        type: 'readOnly',
        jsx: <td className="fra-table__header-cell">{i18n.t('growingStockComposition.remainingNative')}</td>
      },
      {
        type: 'readOnly',
        jsx: <td className="fra-table__header-cell"/>
      }
    ],
    ...R.map(rankRow(i18n), R.range(1, 6))],

  valueSlice: {
    rowStart: 0,
    rowEnd: undefined,
    columnStart: 1,
    columnEnd: undefined
  }
})
