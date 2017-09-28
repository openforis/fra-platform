import React from 'react'

export default i18n => ({
  name: 'specificForestCategories', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('specificForestCategories.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="5">{i18n.t('specificForestCategories.areaUnitLabel')}</th>
  </tr>
  <tr>
    <td className="fra-table__header-cell-right">1990</td>
    <td className="fra-table__header-cell-right">2000</td>
    <td className="fra-table__header-cell-right">2010</td>
    <td className="fra-table__header-cell-right">2015</td>
    <td className="fra-table__header-cell-right">2020</td>
  </tr>
  </thead>,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <td key="bamboo" className="fra-table__header-cell">{i18n.t('specificForestCategories.bamboo')}</td>
      },
      {type: 'decimalInput'},
      {type: 'decimalInput'},
      {type: 'decimalInput'},
      {type: 'decimalInput'},
      {type: 'decimalInput'}
    ],
    [
      {
        type: 'readOnly',
        jsx: <td key="mangroves" className="fra-table__header-cell">{i18n.t('specificForestCategories.mangroves')}</td>
      },
      {type: 'decimalInput'},
      {type: 'decimalInput'},
      {type: 'decimalInput'},
      {type: 'decimalInput'},
      {type: 'decimalInput'}
    ],
    [
      {
        type: 'readOnly',
        jsx: <td key="temporarilyUnstocked"
                className="fra-table__header-cell">{i18n.t('specificForestCategories.temporarilyUnstocked')}</td>
      },
      {type: 'decimalInput'},
      {type: 'decimalInput'},
      {type: 'decimalInput'},
      {type: 'decimalInput'},
      {type: 'decimalInput'}
    ]
  ],
  valueSlice: {columnStart: 1}
})
