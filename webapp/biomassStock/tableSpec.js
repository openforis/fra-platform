import React from 'react'
import R from 'ramda'

const inputColumns = R.times(() => ({type: 'decimalInput'}), 9)

export default i18n => ({
  name: 'biomassStock', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('biomassStock.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="9">{i18n.t(`biomassStock.tableHeader`)}</th>
  </tr>
  <tr>
    <th className="fra-table__header-cell-right">1990</th>
    <th className="fra-table__header-cell-right">2000</th>
    <th className="fra-table__header-cell-right">2010</th>
    <th className="fra-table__header-cell-right">2015</th>
    <th className="fra-table__header-cell-right">2016</th>
    <th className="fra-table__header-cell-right">2017</th>
    <th className="fra-table__header-cell-right">2018</th>
    <th className="fra-table__header-cell-right">2019</th>
    <th className="fra-table__header-cell-right">2020</th>
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
