import React from 'react'
import * as R from 'ramda'
import defaultYears from '@server/eof/defaultYears'

const inputColumns = R.times(() => ({type: 'decimalInput'}), 9)

export default i18n => ({
  name: 'biomassStock', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('biomassStock.categoryHeader')}</th>
    <th className="fra-table__header-cell" colSpan={defaultYears.length}>{i18n.t(`biomassStock.tableHeader`)}</th>
  </tr>
  <tr>
    {R.map(year => <th className="fra-table__header-cell" key={year}>{year}</th>, defaultYears)}
  </tr>
  </thead>,
  rows:[
    [{
      type: 'readOnly',
      jsx: <th key="forest_above_ground_" className="fra-table__category-cell">{i18n.t('biomassStock.aboveGround')}</th>
    },
    ...inputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <th key="forest_below_ground" className="fra-table__category-cell">{i18n.t('biomassStock.belowGround')}</th>
    },
    ...inputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <th key="forest_deadwood" className="fra-table__category-cell">{i18n.t('biomassStock.deadWood')}</th>
    },
    ...inputColumns
    ]
  ],
  valueSlice: {
    columnStart: 1
  }
})
