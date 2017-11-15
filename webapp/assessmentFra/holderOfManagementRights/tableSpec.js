import React from 'react'
import R from 'ramda'
import { totalSumFormatted } from '../../traditionalTable/aggregate'
import { formatDecimal } from '../../utils/numberFormat'
import { Link } from '../../reusableUiComponents/link'

const createInputRow = (rowHeader, cname = 'fra-table__category-cell') => [
  {type: 'readOnly', jsx: <th key="protection" className={`${cname}`}>{rowHeader}</th>},
  ...(R.times(() => ({type: 'decimalInput'}), 4))
]

const totalOwnershipCell = (column) => (props) =>
  <td key="" className="fra-table__calculated-cell">
    {totalSumFormatted(props.tableData, column, R.range(0, 5))}
  </td>

const totalPublicOwnershipCell = (column, otherTableData) => (props) => {
  const publicOwnershipAreaForYear = R.path(['tableData', 4, column], otherTableData) // 4 is public ownership row
  return <td key="" className="fra-table__calculated-cell">
   {formatDecimal(publicOwnershipAreaForYear)}
  </td>
}


export default (i18n, forestOwnership, countryIso) => ({
  name: 'holderOfManagementRights',
  header: <thead>
  <tr>
    <th className="fra-table__header-cell-left" rowSpan="2">{i18n.t('holderOfManagementRights.categoryHeader')}</th>
    <th className="fra-table__header-cell" colSpan="4">{i18n.t('holderOfManagementRights.areaUnitLabel')}</th>
  </tr>
  <tr>
    <th className="fra-table__header-cell">1990</th>
    <th className="fra-table__header-cell">2000</th>
    <th className="fra-table__header-cell">2010</th>
    <th className="fra-table__header-cell">2015</th>
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
          <th key="total_public_ownership" className="fra-table__header-cell-left">
            {i18n.t('holderOfManagementRights.total')} (a+b+c+d+e)
          </th>
      },
      {type: 'custom', render: totalOwnershipCell(1)},
      {type: 'custom', render: totalOwnershipCell(2)},
      {type: 'custom', render: totalOwnershipCell(3)},
      {type: 'custom', render: totalOwnershipCell(4)}
    ],
    [
      {
        type: 'readOnly',
        jsx:
          <th key="total_public_ownership" className="fra-table__header-cell-left">
            <Link to={`/country/${countryIso}/forestOwnership`} className="link">
              {i18n.t('holderOfManagementRights.totalPublicOwnership')}
            </Link>
          </th>
      },
      {type: 'custom', render: totalPublicOwnershipCell(1, forestOwnership)},
      {type: 'custom', render: totalPublicOwnershipCell(2, forestOwnership)},
      {type: 'custom', render: totalPublicOwnershipCell(3, forestOwnership)},
      {type: 'custom', render: totalPublicOwnershipCell(4, forestOwnership)}
    ]
  ],
  valueSlice: {
    columnStart: 1,
    rowEnd: -1
  }
})
