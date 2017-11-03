import React from 'react'
import R from 'ramda'
import { subCategoryValidator } from '../../traditionalTable/validators'

const mapIndexed = R.addIndex(R.map)
const years = R.range(2000, 2018)
const integerInputColumns = R.times(() => ({type: 'decimalInput'}), 18)

export default i18n => ({
  name: 'areaAffectedByFire', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('areaAffectedByFire.categoryHeader')}</th>
    <th className="fra-table__header-cell" colSpan="18">{i18n.t('areaAffectedByFire.areaUnitLabel')}</th>
  </tr>
  <tr>
    {
      mapIndexed((year, i) => <th key={i} className="fra-table__header-cell">{year}</th>, years)
    }
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
