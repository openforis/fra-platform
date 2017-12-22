import React from 'react'
import R from 'ramda'

const inputColumns = R.times(() => ({type: 'decimalInput'}), 9)
const years = [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020]

export default i18n => ({
  name: 'biomassStock', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('biomassStock.categoryHeader')}</th>
    <th className="fra-table__header-cell" colSpan="9">{i18n.t(`biomassStock.tableHeader`)}</th>
  </tr>
  <tr>
    {R.map(year => <th className="fra-table__header-cell" key={year}>{year}</th>, years)}
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
