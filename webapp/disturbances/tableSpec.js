import React from 'react'
import R from 'ramda'
import { formatDecimal } from '../utils/numberFormat'
import { totalSum } from '../traditionalTable/aggregate'

const inputColumns = R.times(() => ({type: 'decimalInput'}), 18)

const totalDisturbanceCell = (column) => (props) => {
  const totalDisturbance = totalSum(props.tableData, column, R.range(0,4))
  return <td key="" className="fra-table__aggregate-cell">
    {formatDecimal(totalDisturbance)}
  </td>
}

export default i18n => ({
  name: 'disturbances', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('disturbances.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="18">{i18n.t('disturbances.areaUnitLabel')}</th>
  </tr>
  <tr>
    <td className="fra-table__header-cell-right">2000</td>
    <td className="fra-table__header-cell-right">2001</td>
    <td className="fra-table__header-cell-right">2002</td>
    <td className="fra-table__header-cell-right">2003</td>
    <td className="fra-table__header-cell-right">2004</td>
    <td className="fra-table__header-cell-right">2005</td>
    <td className="fra-table__header-cell-right">2006</td>
    <td className="fra-table__header-cell-right">2007</td>
    <td className="fra-table__header-cell-right">2008</td>
    <td className="fra-table__header-cell-right">2009</td>
    <td className="fra-table__header-cell-right">2010</td>
    <td className="fra-table__header-cell-right">2011</td>
    <td className="fra-table__header-cell-right">2012</td>
    <td className="fra-table__header-cell-right">2013</td>
    <td className="fra-table__header-cell-right">2014</td>
    <td className="fra-table__header-cell-right">2015</td>
    <td className="fra-table__header-cell-right">2016</td>
    <td className="fra-table__header-cell-right">2017</td>
  </tr>
  </thead>,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <td key="expansion" className="fra-table__header-cell">{i18n.t('disturbances.insects')}</td>
      },
    ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <td key="expansion" className="fra-table__header-cell">{i18n.t('disturbances.diseases')}</td>
      },
    ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <td key="expansion" className="fra-table__header-cell">{i18n.t('disturbances.severeWeatherEvents')}</td>
      },
    ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <td key="expansion" className="fra-table__header-cell">{i18n.t('disturbances.other')}</td>
      },
    ...inputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <td key="expansion" className="fra-table__header-cell">{i18n.t('disturbances.total')}</td>
      },
      {type: 'custom', render: totalDisturbanceCell(1)},
      {type: 'custom', render: totalDisturbanceCell(2)},
      {type: 'custom', render: totalDisturbanceCell(3)},
      {type: 'custom', render: totalDisturbanceCell(4)},
      {type: 'custom', render: totalDisturbanceCell(5)},
      {type: 'custom', render: totalDisturbanceCell(6)},
      {type: 'custom', render: totalDisturbanceCell(7)},
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
