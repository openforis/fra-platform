import React from 'react'
import R from 'ramda'

const integerInputColumns = R.times(() => ({type: 'decimalInput'}), 18)

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
    ...integerInputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <td key="expansion" className="fra-table__header-cell">{i18n.t('disturbances.diseases')}</td>
      },
    ...integerInputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <td key="expansion" className="fra-table__header-cell">{i18n.t('disturbances.severeWeatherEvents')}</td>
      },
    ...integerInputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <td key="expansion" className="fra-table__header-cell">{i18n.t('disturbances.other')}</td>
      },
    ...integerInputColumns
    ],
    [
      {
        type: 'readOnly',
        jsx: <td key="expansion" className="fra-table__header-cell">{i18n.t('disturbances.total')}</td>
      },
    ...integerInputColumns
    ]
  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -1
  }
})
