import React from 'react'
import R from 'ramda'
import { subCategoryValidator } from '../traditionalTable/validators'

const integerInputColumns = R.times(() => ({type: 'decimalInput'}), 18)

export default i18n => ({
  name: 'areaAffectedByFire', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('areaAffectedByFire.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="18">{i18n.t('areaAffectedByFire.areaUnitLabel')}</th>
  </tr>
  <tr>
    <th className="fra-table__header-cell-right">2000</th>
    <th className="fra-table__header-cell-right">2001</th>
    <th className="fra-table__header-cell-right">2002</th>
    <th className="fra-table__header-cell-right">2003</th>
    <th className="fra-table__header-cell-right">2004</th>
    <th className="fra-table__header-cell-right">2005</th>
    <th className="fra-table__header-cell-right">2006</th>
    <th className="fra-table__header-cell-right">2007</th>
    <th className="fra-table__header-cell-right">2008</th>
    <th className="fra-table__header-cell-right">2009</th>
    <th className="fra-table__header-cell-right">2010</th>
    <th className="fra-table__header-cell-right">2011</th>
    <th className="fra-table__header-cell-right">2012</th>
    <th className="fra-table__header-cell-right">2013</th>
    <th className="fra-table__header-cell-right">2014</th>
    <th className="fra-table__header-cell-right">2015</th>
    <th className="fra-table__header-cell-right">2016</th>
    <th className="fra-table__header-cell-right">2017</th>
  </tr>
  </thead>,
  rows: [
    [{
      type: 'readOnly',
      jsx: <th key="expansion" className="fra-table__category-cell">
        {i18n.t('areaAffectedByFire.totalLandAreaAffectedByFire')}
      </th>
    },
      ...integerInputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <th key="" className="fra-table__subcategory-cell">{i18n.t('areaAffectedByFire.ofWhichForest')}</th>
      },
      ...R.times(() => ({type: 'decimalInput', validator: subCategoryValidator(0, [1])}), 18)
    ]
  ],
  valueSlice: {
    rowStart: 0,
    rowEnd: undefined,
    columnStart: 1,
    columnEnd: undefined
  }
})
