import React from 'react'
import { Redirect } from 'react-router'

import * as BasePaths from '@webapp/main/basePaths'
import * as FRA from '@common/assessment/fra'

const DataExport = () => {
  return <Redirect to={BasePaths.getDataExportSectionLink(Object.values(FRA.sections['1'].children)[0].name)} />
}

export default DataExport
