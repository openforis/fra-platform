import React from 'react'
import * as R from 'ramda'
import { formatDecimal } from '@webapp/utils/numberFormat'
import { totalSum } from '../../traditionalTable/aggregate'
import { sub, abs, lessThan } from '@common/bignumberUtils'
import { Link } from 'react-router-dom'

const mapIndexed = R.addIndex(R.map)
const years = [1990, 2000, 2010, 2015]
const sumRows = R.range(0, 5)

const createInputRow = (rowHeader, cname = 'fra-table__category-cell') => [
  {type: 'readOnly', jsx: <th className={`${cname}`}>{rowHeader}</th>},
  ...(R.times(() => ({type: 'decimalInput'}), 4))
]

const getTotalPublicOwnershipForColumn = (forestOwnership, column) => {
  const areaForYear = R.path(['tableData', 4, column], forestOwnership) // 4 is public ownership row
  return areaForYear
}

const totalAreaSameAsTotalPublicOwnershipValidator = (column, forestOwnership, sumRows) => (props) => {
  const areaForYear = getTotalPublicOwnershipForColumn(forestOwnership, column)
  const sumForYear = totalSum(props.tableData, column, sumRows)
  if (!areaForYear || !sumForYear) return {valid: true}
  const tolerance = 1
  const absDifference = abs(sub(areaForYear, sumForYear))
  const result = lessThan(absDifference, tolerance)
  return {
    valid: result,
    message: result
      ? null
      : props.i18n.t('holderOfManagementRights.publicOwnershipDoesNotMatch')
  }
}

export default (i18n, forestOwnership, countryIso) => ({
  name: 'holderOfManagementRights',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('holderOfManagementRights.categoryHeader')}</th>
    <th className="fra-table__header-cell"
        colSpan={years.length}>{i18n.t('holderOfManagementRights.areaUnitLabel')}</th>
  </tr>
  <tr>
    {
      R.map(year => <th key={year} className="fra-table__header-cell">{year}</th>, years)
    }
  </tr>
  </thead>,
  rows: [
    createInputRow(i18n.t('holderOfManagementRights.publicAdministration') + ' (a)'),
    createInputRow(i18n.t('holderOfManagementRights.individuals') + ' (b)'),
    createInputRow(i18n.t('holderOfManagementRights.privateBusinesses') + ' (c)'),
    createInputRow(i18n.t('holderOfManagementRights.communities') + ' (d)'),
    // createInputRow(i18n.t('holderOfManagementRights.other') + ' (e)'),
    [
      {
        type: 'readOnly',
        jsx:
          <th className="fra-table__category-cell">
            {i18n.t('holderOfManagementRights.other')} (e)
          </th>
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

            const rows = [0, 1, 2, 3]
            const value = R.reduce(
              (value, row) => sub(value, getValue(row, i + 1)),
              getTotalPublicOwnershipForColumn(forestOwnership, i + 1),
              rows
            )

            return value
          },
          valueFormatter: formatDecimal
        }), years)
    ],
    [
      {
        type: 'readOnly',
        jsx:
          <th className="fra-table__header-cell-left">
            <div className="only-print">
              {i18n.t('holderOfManagementRights.totalPublicOwnership')}
            </div>
            <Link to={`/country/${countryIso}/forestOwnership`} className="link no-print">
              {i18n.t('holderOfManagementRights.totalPublicOwnership')}
            </Link>
          </th>
      },
      ...R.times(i =>
        ({
          type: 'calculated',
          calculateValue: props => getTotalPublicOwnershipForColumn(forestOwnership, i + 1),
          valueFormatter: formatDecimal
        }), years.length)
    ]
  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -1
  }
})
