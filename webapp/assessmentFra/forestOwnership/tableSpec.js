import React from 'react'
import * as R from 'ramda'

import { formatDecimal } from '@webapp/utils/numberFormat'
import { subCategoryValidator, positiveOrZero } from '../../traditionalTable/validators'
import { getForestAreaForYear } from '@common/extentOfForestHelper'
import { Link } from 'react-router-dom'
import { sub } from '@common/bignumberUtils'

const mapIndexed = R.addIndex(R.map)

const createInputRow = (rowHeader, cname = 'fra-table__category-cell', validator) => [
  {type: 'readOnly', jsx: <th className={`${cname}`}>{rowHeader}</th>},
  ...(R.times(() => ({
    type: 'decimalInput',
    validator: validator
  }), 4))
]

const privateOwnershipValidator = subCategoryValidator(0, R.range(1, 4))

const years = [1990, 2000, 2010, 2015]

export default (i18n, extentOfForest, countryIso) => ({
  name: 'forestOwnership',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('forestOwnership.categoryHeader')}</th>
    <th className="fra-table__header-cell" colSpan={years.length}>{i18n.t('forestOwnership.areaUnitLabel')}</th>
  </tr>
  <tr>
    {
      R.map(year => <th key={year} className="fra-table__header-cell">{year}</th>, years)
    }
  </tr>
  </thead>,
  rows: [
    createInputRow(i18n.t('forestOwnership.privateOwnership') + ' (a)'),
    createInputRow(i18n.t('forestOwnership.ofWhichIndividuals'), 'fra-table__subcategory-cell', privateOwnershipValidator),
    createInputRow(i18n.t('forestOwnership.ofWhichPrivateBusinesses'), 'fra-table__subcategory-cell', privateOwnershipValidator),
    createInputRow(i18n.t('forestOwnership.ofWhichCommunities'), 'fra-table__subcategory-cell', privateOwnershipValidator),
    createInputRow(i18n.t('forestOwnership.publicOwnership') + ' (b)'),
    [
      {
        type: 'readOnly',
        jsx: <th className="fra-table__category-cell">{`${i18n.t('forestOwnership.otherOrUnknown')} (c)`}</th>
      },
      ...mapIndexed((year, i) =>
        ({
          type: 'calculated',
          calculateValue: props => {

            const getValue = (row, col) => R.pipe(
              R.prop(row),
              R.prop(col),
              R.defaultTo(0)
            )(props.tableData)

            const rows = [0, 4]
            const value = R.reduce(
              (value, row) => sub(value, getValue(row, i + 1)),
              getForestAreaForYear(extentOfForest, year),
              rows
            )

            return value
          },
          valueFormatter: formatDecimal,
          validator: positiveOrZero(),
        }), years)
    ],
    // [
    //   {
    //     type: 'readOnly',
    //     jsx:
    //       <th className="fra-table__header-cell-left">
    //         {i18n.t('forestOwnership.total')} (a+b+c)
    //       </th>
    //   },
    //   ...mapIndexed((year, i) =>
    //     ({
    //       type: 'calculated',
    //       calculateValue: props => totalSum(props.tableData, i + 1, sumRows),
    //       valueFormatter: formatDecimal,
    //       validator: forestAreaSameAsExtentOfForestValidator(year, extentOfForest, sumRows)
    //     }), years)
    // ],
    [
      {
        type: 'readOnly',
        jsx:
          <th className="fra-table__header-cell-left">
            <div className="only-print">
              {i18n.t('forestOwnership.totalForestArea')}
            </div>
            <Link to={`/country/${countryIso}/extentOfForest`} className="link no-print">
              {i18n.t('forestOwnership.totalForestArea')}
            </Link>
          </th>
      },
      ...R.map(year =>
        ({
          type: 'calculated',
          calculateValue: props => getForestAreaForYear(extentOfForest, year),
          valueFormatter: formatDecimal
        }), years)
    ]
  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -1
  }
})
