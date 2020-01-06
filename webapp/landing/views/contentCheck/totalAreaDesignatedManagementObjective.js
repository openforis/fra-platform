import React from 'react'
import * as R from 'ramda'

import TraditionalTable from '@webapp/traditionalTable/traditionalTable'
import { totalAreaWithDesignatedManagementObjectiveTableSpec } from '@webapp/loggedin/assessmentFra/designatedManagementObjective/tableSpecs'

const TotalAreaDesignatedManagementObjectiveView = (props) => {
  const {years, countryIso, i18n} = props

  const tableSpec = totalAreaWithDesignatedManagementObjectiveTableSpec(i18n)
  tableSpec.disableReviewComments = true
  tableSpec.header = <thead>
  <tr>
    <th className="fra-table__header-cell-left"
        rowSpan="2">{i18n.t('landing.contentCheck.totalAreaDesignatedManagementObjective')}</th>
    {
      R.map(year => <th key={year} className="fra-table__header-cell">{year}</th>, years.filter(y => y % 5 === 0))
    }
  </tr>
  </thead>

  return (
    <TraditionalTable
      tableSpec={tableSpec}
      countryIso={countryIso}
      section={'designatedManagementObjective'}
      disabled={true}
      skipValidation={true}/>
  )
}

export default TotalAreaDesignatedManagementObjectiveView
