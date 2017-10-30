import R from 'ramda'
import React from 'react'
import { forestAreaLessThanOrEqualToExtentOfForestValidator } from '../traditionalTable/validators'

const mapIndexed = R.addIndex(R.map)

const years = [1990, 2000, 2010, 2015, 2020]

export default (i18n, extentOfForest) => {
  const inputColumns = R.map(
    year => ({
      type: 'decimalInput',
      validator: forestAreaLessThanOrEqualToExtentOfForestValidator(year, extentOfForest)
    }),
    years
  )

  return {
    name: 'areaOfPermanentForestEstate',
    header: <thead>
    <tr>
      <th className="fra-table__header-cell" rowSpan="2">{i18n.t('areaOfPermanentForestEstate.categoryHeader')}</th>
      <th className="fra-table__header-cell-middle" colSpan="6">{i18n.t('areaOfPermanentForestEstate.areaUnitLabel')}</th>
    </tr>
    <tr>
      <th className="fra-table__header-cell-right">{i18n.t('areaOfPermanentForestEstate.applicable')}</th>
      {
        mapIndexed((year, i) => <th key={i} className="fra-table__header-cell-right">{year}</th>, years)
      }
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
  }
}
