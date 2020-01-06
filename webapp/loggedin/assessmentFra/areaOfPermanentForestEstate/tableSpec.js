import * as R from 'ramda'
import React from 'react'
import { forestAreaLessThanOrEqualToExtentOfForestValidator } from '@webapp/traditionalTable/validators'

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
      <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('areaOfPermanentForestEstate.categoryHeader')}</th>
      <th className="fra-table__header-cell" colSpan={years.length + 1}>{i18n.t('areaOfPermanentForestEstate.areaUnitLabel')}</th>
    </tr>
    <tr>
      <th className="fra-table__header-cell">{i18n.t('areaOfPermanentForestEstate.applicable')}</th>
      {
        R.map(year => <th key={year} className="fra-table__header-cell">{year}</th>, years)
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
