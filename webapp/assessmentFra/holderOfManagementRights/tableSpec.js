import React from 'react'
import R from 'ramda'
import { formatDecimal } from '../../utils/numberFormat'
import { totalSum } from '../../traditionalTable/aggregate'
import { sub, abs, lessThan } from '../../../common/bignumberUtils'
import { Link } from '../../reusableUiComponents/link'

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
    <th className="fra-table__header-cell" colSpan="4">{i18n.t('holderOfManagementRights.areaUnitLabel')}</th>
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
    createInputRow(i18n.t('holderOfManagementRights.other') + ' (e)'),
    [
      {
        type: 'readOnly',
        jsx:
          <th className="fra-table__header-cell-left">
            {i18n.t('holderOfManagementRights.total')} (a+b+c+d+e)
          </th>
      },
      ...mapIndexed((year, i) =>
        ({
          type: 'calculated',
          calculateValue: props => totalSum(props.tableData, i+1, sumRows),
          valueFormatter: formatDecimal,
          validator: totalAreaSameAsTotalPublicOwnershipValidator(i+1, forestOwnership, sumRows)
        }), years)
    ],
    [
      {
        type: 'readOnly',
        jsx:
          <th className="fra-table__header-cell-left">
            <Link to={`/country/${countryIso}/forestOwnership`} className="link">
              {i18n.t('holderOfManagementRights.totalPublicOwnership')}
            </Link>
          </th>
      },
      ...R.times(i =>
        ({
          type: 'calculated',
          calculateValue: props => getTotalPublicOwnershipForColumn(forestOwnership, i+1),
          valueFormatter: formatDecimal
        }), years.length)
    ]
  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -2
  }
})
