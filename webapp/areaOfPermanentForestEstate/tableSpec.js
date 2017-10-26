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
    <th className="fra-table__header-cell-right">{i18n.t('areaOfPermanentForestEstate.applicable')}</th>
    <th className="fra-table__header-cell-right">1990</th>
    <th className="fra-table__header-cell-right">2000</th>
    <th className="fra-table__header-cell-right">2010</th>
    <th className="fra-table__header-cell-right">2015</th>
    <th className="fra-table__header-cell-right">2020</th>
  </tr>
  </thead>,

  rows: [
    [
      {
        type: 'readOnly',
        jsx: <th className="fra-table__category-cell">
          {i18n.t('areaOfPermanentForestEstate.areaOfPermanentForestEstate')}
        </th>
      },
      {type: 'yesNoSelect'},
      ...inputColumns
    ]
  ],
  valueSlice: {
    columnStart: 1
  }
})
