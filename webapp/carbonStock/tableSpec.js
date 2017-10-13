import React from 'react'
import R from 'ramda'

const inputColumns = R.times(() => ({type: 'decimalInput'}), 9)

export default i18n => ({
  name: 'carbonStock', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('carbonStock.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="9">{i18n.t(`carbonStock.tableHeader`)}</th>
  </tr>
  <tr>
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
      jsx: <td key="carbon_forest_above_ground" className="fra-table__header-cell-sub">{i18n.t('carbonStock.carbonAboveGroundBiomass')}</td>
    },
    ...inputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <td key="carbon_forest_below_ground" className="fra-table__header-cell-sub">{i18n.t('carbonStock.carbonBelowGroundBiomass')}</td>
    },
    ...inputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <td key="carbon_forest_deadwood" className="fra-table__header-cell-sub">{i18n.t('carbonStock.carbonDeadwood')}</td>
    },
    ...inputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <td key="carbon_forest_litter" className="fra-table__header-cell-sub">{i18n.t('carbonStock.carbonLitter')}</td>
    },
    ...inputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <td key="carbon_forest_soil" className="fra-table__header-cell-sub">{i18n.t('carbonStock.carbonSoil')}</td>
    },
    ...inputColumns
    ]
  ],
  valueSlice: {
    columnStart: 1
  }
})
