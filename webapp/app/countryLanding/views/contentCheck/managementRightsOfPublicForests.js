import React from 'react'
import * as R from 'ramda'

import TraditionalTable from '@webapp/app/assessment/components/traditionalTable/traditionalTable'
import tableSpecFn from './tableSpec/holderOfManagementRights'

const ManagementRightsOfPublicForests = (props) => {
  const {years, countryIso, i18n, forestOwnership} = props

  const tableSpec = tableSpecFn(i18n, forestOwnership, countryIso)
  tableSpec.disableReviewComments = true
  tableSpec.header = <thead>
  <tr>
    <th className="fra-table__header-cell-left"
        rowSpan="2">{i18n.t('landing.contentCheck.managementRightsOfPublicForests')}</th>
    {
      R.map(
        year => <th key={year} className="fra-table__header-cell">{year}</th>,
        years.filter(y => y % 5 === 0 && y <= 2015)
      )
    }
  </tr>
  </thead>

  tableSpec.rows = tableSpec.rows.splice(0, tableSpec.rows.length - 1)

  return (
    <TraditionalTable
      tableSpec={tableSpec}
      countryIso={countryIso}
      disabled={true}
      skipValidation={true}/>
  )
}

export default ManagementRightsOfPublicForests
