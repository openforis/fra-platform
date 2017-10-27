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
      jsx: <th key="carbon_forest_above_ground" className="fra-table__category-cell">{i18n.t('carbonStock.carbonAboveGroundBiomass')}</th>
    },
    ...inputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <th key="carbon_forest_below_ground" className="fra-table__category-cell">{i18n.t('carbonStock.carbonBelowGroundBiomass')}</th>
    },
    ...inputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <th key="carbon_forest_deadwood" className="fra-table__category-cell">{i18n.t('carbonStock.carbonDeadwood')}</th>
    },
    ...inputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <th key="carbon_forest_litter" className="fra-table__category-cell">{i18n.t('carbonStock.carbonLitter')}</th>
    },
    ...inputColumns
    ],
    [{
      type: 'readOnly',
      jsx: <th key="carbon_forest_soil" className="fra-table__category-cell">{i18n.t('carbonStock.carbonSoil')}</th>
    },
    ...inputColumns
    ]
  ],
  valueSlice: {
    columnStart: 1
  }
})
