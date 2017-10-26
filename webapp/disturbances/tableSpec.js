import React from 'react'
import R from 'ramda'
import { totalSumFormatted } from '../traditionalTable/aggregate'

const inputColumns = R.times(() => ({type: 'decimalInput'}), 18)

const totalDisturbanceCell = (column) => (props) =>
  <td key="" className="fra-table__calculated-cell">
    {totalSumFormatted(props.tableData, column, R.range(0,4))}
  </td>

export default i18n => ({
  name: 'disturbances', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('disturbances.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="18">{i18n.t('disturbances.areaUnitLabel')}</th>
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
    [
      {
        type: 'readOnly',
        jsx: <th key="expansion" className="fra-table__category-cell">{i18n.t('disturbances.insects')}</th>
      },
    ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <th key="expansion" className="fra-table__category-cell">{i18n.t('disturbances.diseases')}</th>
      },
    ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <th key="expansion" className="fra-table__category-cell">{i18n.t('disturbances.severeWeatherEvents')}</th>
      },
    ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <th key="expansion" className="fra-table__category-cell">{i18n.t('disturbances.other')}</th>
      },
    ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <th key="expansion" className="fra-table__header-cell">{i18n.t('disturbances.total')}</th>
      },
      {type: 'custom', render: totalDisturbanceCell(1)},
      {type: 'custom', render: totalDisturbanceCell(2)},
      {type: 'custom', render: totalDisturbanceCell(3)},
      {type: 'custom', render: totalDisturbanceCell(4)},
      {type: 'custom', render: totalDisturbanceCell(5)},
      {type: 'custom', render: totalDisturbanceCell(6)},
      {type: 'custom', render: totalDisturbanceCell(7)},
      {type: 'custom', render: totalDisturbanceCell(8)},
      {type: 'custom', render: totalDisturbanceCell(9)},
      {type: 'custom', render: totalDisturbanceCell(10)},
      {type: 'custom', render: totalDisturbanceCell(11)},
      {type: 'custom', render: totalDisturbanceCell(12)},
      {type: 'custom', render: totalDisturbanceCell(13)},
      {type: 'custom', render: totalDisturbanceCell(14)},
      {type: 'custom', render: totalDisturbanceCell(15)},
      {type: 'custom', render: totalDisturbanceCell(16)},
      {type: 'custom', render: totalDisturbanceCell(17)},
      {type: 'custom', render: totalDisturbanceCell(18)}
    ]
  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -1
  }
})
