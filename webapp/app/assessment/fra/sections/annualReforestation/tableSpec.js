import React from 'react'

import { positiveOrZero } from '@webapp/app/assessment/components/traditionalTable/validators'

export default i18n => ({
  name: 'annualReforestation', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('annualReforestation.categoryHeader')}</th>
    <th className="fra-table__header-cell" colSpan="4">{i18n.t('annualReforestation.areaUnitLabel')}</th>
  </tr>
  <tr>
    <th className="fra-table__header-cell">1990-2000</th>
    <th className="fra-table__header-cell">2000-2010</th>
    <th className="fra-table__header-cell">2010-2015</th>
    <th className="fra-table__header-cell">2015-2020</th>
  </tr>
  </thead>,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <th key="reforestation" className="fra-table__category-cell">
          {i18n.t('annualReforestation.reforestation')}
        </th>
      },
      {type: 'decimalInput', validator: positiveOrZero()},
      {type: 'decimalInput', validator: positiveOrZero()},
      {type: 'decimalInput', validator: positiveOrZero()},
      {type: 'decimalInput', validator: positiveOrZero()},
    ]
  ],
  valueSlice: {columnStart: 1}
})
