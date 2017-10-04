import React from 'react'
import R from 'ramda'

const inputColumns = R.times(() => ({type: 'decimalInput'}), 9)

export default i18n => ({
  name: 'biomassStock', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell">{i18n.t('biomassStock.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="9">{i18n.t(`biomassStock.tableHeader`)}</th>
  </tr>
  <tr>
    <td className="fra-table__header-cell">{i18n.t('fraClass.forest')}</td>
    <td className="fra-table__header-cell-right">1990</td>
    <td className="fra-table__header-cell-right">2000</td>
    <td className="fra-table__header-cell-right">2010</td>
    <td className="fra-table__header-cell-right">2015</td>
    <td className="fra-table__header-cell-right">2016</td>
    <td className="fra-table__header-cell-right">2017</td>
    <td className="fra-table__header-cell-right">2018</td>
    <td className="fra-table__header-cell-right">2019</td>
    <td className="fra-table__header-cell-right">2020</td>
  </tr>
  </thead>,
  rows:[
    [{
      type: 'readOnly',
      jsx: <td key="forest_above_ground_" className="fra-table__header-cell-sub">{i18n.t('biomassStock.aboveGround')}</td>
    },
    ...inputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <td key="forest_below_ground" className="fra-table__header-cell-sub">{i18n.t('biomassStock.belowGround')}</td>
    },
    ...inputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <td key="forest_deadwood" className="fra-table__header-cell-sub">{i18n.t('biomassStock.deadWood')}</td>
    },
    ...inputColumns
    ]
  ],
  valueSlice: {
    columnStart: 1
  }
})
