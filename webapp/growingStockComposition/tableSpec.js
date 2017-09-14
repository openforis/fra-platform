import React from 'react'
import R from 'ramda'

export default i18n => ({
  name: 'growingStockComposition',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell">{i18n.t('growingStockComposition.fra2020categories')}</th>
    <th rowSpan="2" className="fra-table__header-cell">{i18n.t('growingStockComposition.scientificName')}</th>
    <th rowSpan="2" className="fra-table__header-cell">{i18n.t('growingStockComposition.commonName')}</th>
    <th className="fra-table__header-cell-middle" colSpan="5">{i18n.t('growingStockComposition.areaUnitLabel')}</th>
  </tr>
  <tr>
    <td className="fra-table__header-cell">{i18n.t('growingStockComposition.nativeTreeSpecies')}</td>
    <td className="fra-table__header-cell-right">1990</td>
    <td className="fra-table__header-cell-right">2000</td>
    <td className="fra-table__header-cell-right">2005</td>
    <td className="fra-table__header-cell-right">2010</td>
    <td className="fra-table__header-cell-right">2015</td>
  </tr>
  </thead>,
  rows: [
    [
      {type: 'readOnly', jsx: <td key="rank1" className="fra-table__header-cell">#1 {i18n.t('growingStockComposition.rank')}</td>},
      {type: 'stringInput'},
      {type: 'stringInput'},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'},
      {type: 'integerInput'}
    ]
  ],
  valueSlice: {
    rowStart: 0,
    rowEnd: -3,
    columnStart: undefined,
    columnEnd: undefined
  }
})
