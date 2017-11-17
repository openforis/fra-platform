import React from 'react'
import R from 'ramda'

const years = [1990, 2000, 2010, 2015, 2020]
const inputColumns = R.times(() => ({type: 'decimalInput'}), 5)

const createInputRow = (rowHeader) => [
  {type: 'readOnly', jsx: <th className="fra-table__subcategory-cell">{rowHeader}</th>},
  ...(R.times(() => ({type: 'decimalInput'}), 5))
]

export default i18n => ({
  name: 'otherLandWithTreeCover', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('otherLandWithTreeCover.categoryHeader')}</th>
    <th className="fra-table__header-cell" colSpan="5">{i18n.t('otherLandWithTreeCover.areaUnitLabel')}</th>
  </tr>
  <tr>
    {
      R.map(year => <th key={year} className="fra-table__header-cell">{year}</th>, years)
    }
  </tr>
  </thead>,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <th className="fra-table__category-cell">{i18n.t('otherLandWithTreeCover.otherLandWithTreeCover')}</th>
      },
      ...inputColumns
    ],
    createInputRow(i18n.t('otherLandWithTreeCover.ofWhichPalms')),
    createInputRow(i18n.t('otherLandWithTreeCover.ofWhichTreeOrchards')),
    createInputRow(i18n.t('otherLandWithTreeCover.ofWhichAgroforestry')),
    createInputRow(i18n.t('otherLandWithTreeCover.ofWhichTreesInUrbanSettings'))
  ],
  valueSlice: {columnStart: 1}
})
