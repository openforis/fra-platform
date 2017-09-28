import React from 'react'

export default i18n => ({
  name: 'annualReforestation', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('annualReforestation.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="4">{i18n.t('annualReforestation.areaUnitLabel')}</th>
  </tr>
  <tr>
    <td className="fra-table__header-cell-right">1990-2000</td>
    <td className="fra-table__header-cell-right">2000-2010</td>
    <td className="fra-table__header-cell-right">2010-2015</td>
    <td className="fra-table__header-cell-right">2015-2020</td>
  </tr>
  </thead>,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <td key="reforestation" className="fra-table__header-cell">{i18n.t('annualReforestation.reforestation')}</td>
      },
      {type: 'decimalInput'},
      {type: 'decimalInput'},
      {type: 'decimalInput'},
      {type: 'decimalInput'}
    ]
  ],
  valueSlice: {columnStart: 1}
})
