import React from 'react'
import R from 'ramda'

const productRow = idx => [
  {
    type: 'readOnly',
    jsx: <td key={idx} className="fra-table__header-cell-sub">
      #{idx}
    </td>
  },
  {type: 'textInput', minWidth: 240},
  {type: 'textInput'},
  {type: 'integerInput'},
  {type: 'textInput'},
  {type: 'integerInput'},
  {type: 'textSelect', localizationPrefix: 'nonWoodForestProductsRemovals', options: ['a', 'b']},
]

export default i18n => ({
  name: 'nonWoodForestProductsRemovals',
  header: <thead>
  <tr>
    <td className="fra-table__header-cell"/>
    <td className="fra-table__header-cell">{i18n.t('nonWoodForestProductsRemovals.nameOfProduct')}</td>
    <td className="fra-table__header-cell">{i18n.t('nonWoodForestProductsRemovals.keySpecies')}</td>
    <td className="fra-table__header-cell-right">{i18n.t('nonWoodForestProductsRemovals.quantity')}</td>
    <td className="fra-table__header-cell">{i18n.t('nonWoodForestProductsRemovals.unit')}</td>
    <td className="fra-table__header-cell-right">{i18n.t('nonWoodForestProductsRemovals.value')}</td>
    <td className="fra-table__header-cell">{i18n.t('nonWoodForestProductsRemovals.category')}</td>
  </tr>
  </thead>,
  rows: [
    ...R.map(productRow,R.range(1, 11)),
    [{type: 'readOnly', jsx: <td className="fra-table__header-cell"/>}],
    [{type: 'readOnly', jsx: <td className="fra-table__header-cell"/>}]
  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -1
  }
})
