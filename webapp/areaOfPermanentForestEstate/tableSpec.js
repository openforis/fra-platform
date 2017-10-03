import R from 'ramda'
import React from 'react'

const inputColumns = R.times(() => ({type: 'decimalInput'}), 5)

export default i18n => ({
  name: 'areaOfPermanentForestEstate',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell" rowSpan="2">{i18n.t('areaOfPermanentForestEstate.categoryHeader')}</th>
    <th className="fra-table__header-cell-middle" colSpan="6">{i18n.t('areaOfPermanentForestEstate.areaUnitLabel')}</th>
  </tr>
  <tr>
    <td className="fra-table__header-cell-right">1990</td>
    <td className="fra-table__header-cell-right">2000</td>
    <td className="fra-table__header-cell-right">2010</td>
    <td className="fra-table__header-cell-right">2015</td>
    <td className="fra-table__header-cell-right">2020</td>
    <td className="fra-table__header-cell-right">{i18n.t('areaOfPermanentForestEstate.applicable')}</td>
  </tr>
  </thead>,

  rows: [
    [
      {
        type: 'readOnly',
        jsx: <td className="fra-table__header-cell">
          {i18n.t('areaOfPermanentForestEstate.areaOfPermanentForestEstate')}
        </td>
      },
      ...inputColumns,
      {type: 'yesNoSelect'}
    ]
  ],
  valueSlice: {
    columnStart: 1
  }
})
