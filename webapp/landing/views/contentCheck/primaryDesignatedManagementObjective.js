import React from 'react'
import * as R from 'ramda'

import TraditionalTable from '../../../traditionalTable/traditionalTable'
import { primaryDesignatedManagementObjectiveTableSpec } from '../../../assessmentFra/designatedManagementObjective/tableSpecs'

const PrimaryDesignatedManagementObjectiveView = (props) => {
  const {years, countryIso, i18n, extentOfForest} = props

  const tableSpec = primaryDesignatedManagementObjectiveTableSpec(i18n, extentOfForest, countryIso)
  tableSpec.disableReviewComments = true
  tableSpec.header = <thead>
  <tr>
    <th className="fra-table__header-cell-left"
        rowSpan="2">{i18n.t('landing.contentCheck.primaryDesignatedManagementObjective')}</th>
    {
      R.map(year => <th key={year} className="fra-table__header-cell">{year}</th>, years.filter(y => y % 5 === 0))
    }
  </tr>
  </thead>

  tableSpec.rows = tableSpec.rows.splice(0, tableSpec.rows.length - 1)

  return (
    <TraditionalTable
      tableSpec={tableSpec}
      countryIso={countryIso}
      section={'designatedManagementObjective'}
      disabled={true}
      skipValidation={true}/>
  )
}

export default PrimaryDesignatedManagementObjectiveView
