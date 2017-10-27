import React from 'react'

export default i18n => ({
  name: 'specificForestCategories', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('specificForestCategories.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="5">{i18n.t('specificForestCategories.areaUnitLabel')}</th>
  </tr>
  <tr>
    <th className="fra-table__header-cell-right">1990</th>
    <th className="fra-table__header-cell-right">2000</th>
    <th className="fra-table__header-cell-right">2010</th>
    <th className="fra-table__header-cell-right">2015</th>
    <th className="fra-table__header-cell-right">2020</th>
  </tr>
  </thead>,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <th key="bamboo" className="fra-table__category-cell">{i18n.t('specificForestCategories.bamboo')}</th>
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
        jsx: <th key="mangroves" className="fra-table__category-cell">{i18n.t('specificForestCategories.mangroves')}</th>
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
        jsx: <th key="temporarilyUnstocked" className="fra-table__category-cell">{i18n.t('specificForestCategories.temporarilyUnstocked')}</th>
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
        jsx: <th key="primaryForest" className="fra-table__category-cell">{i18n.t('specificForestCategories.primaryForest')}</th>
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
