import React from 'react'
import { forestAreaLessThanOrEqualToExtentOfForestValidator } from '@webapp/traditionalTable/validators'

import { getValueForYear } from '@common/extentOfForestHelper'
import { sub, greaterThan } from '@common/bignumberUtils'

const years = [1990, 2000, 2010, 2015, 2020]

const forestAreaRow = (i18n, extentOfForest, key) => [
  {
    type: 'readOnly',
    jsx: <th key={key} className="fra-table__category-cell">{i18n.t(`specificForestCategories.${key}`)}</th>
  },
  ...years.map(year => ({
      type: 'decimalInput',
      validator: forestAreaLessThanOrEqualToExtentOfForestValidator(year, extentOfForest)
    })
  )
]

export const primaryForestValidator = (year, forestCharacteristics) =>
  (props, row, column) => {
    const naturalForestArea = getValueForYear(forestCharacteristics, year, 'naturalForestArea')
    const primaryForest = props.tableData[row][column]

    if (!naturalForestArea || !primaryForest)
      return {valid: true}

    const tolerance = -1
    const difference = sub(naturalForestArea, primaryForest)
    const result = greaterThan(difference, tolerance)

    return {
      valid: result,
      message: result ? null : props.i18n.t('specificForestCategories.exceedsNaturallyRegeneratingForest')
    }
  }

export default (i18n, extentOfForest, forestCharacteristics) => ({
  name: 'specificForestCategories', // used to uniquely identify table
  header: <thead>
  <tr>
    <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('specificForestCategories.categoryHeader')}</th>
    <th className="fra-table__header-cell" colSpan="5">{i18n.t('specificForestCategories.areaUnitLabel')}</th>
  </tr>
  <tr>
    {
      years.map(year => <th key={year} className="fra-table__header-cell">{year}</th>)
    }
  </tr>
  </thead>,
  rows: [
    forestAreaRow(i18n, extentOfForest, 'bamboo'),
    forestAreaRow(i18n, extentOfForest, 'mangroves'),
    [
      {
        type: 'readOnly',
        jsx: <th key="temporarilyUnstocked"
                 className="fra-table__category-cell">{i18n.t('specificForestCategories.temporarilyUnstocked')}</th>
      },
      {type: 'decimalInput'},
      {type: 'decimalInput'},
      {type: 'decimalInput'},
      {type: 'decimalInput'},
      {type: 'decimalInput'}
    ],
    [
      {
        type: 'readOnly',
        jsx: <th key="primaryForest"
                 className="fra-table__category-cell">{i18n.t('specificForestCategories.primaryForest')}</th>
      },
      ...years.map(year => ({
        type: 'decimalInput',
        validator: primaryForestValidator(year, forestCharacteristics)
      }))
    ],
    forestAreaRow(i18n, extentOfForest, 'rubberWood'),
  ],
  valueSlice: {columnStart: 1}
})
