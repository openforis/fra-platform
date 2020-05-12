import React from 'react'
import SingleTraditionalTableView from '@webapp/app/assessment/components/traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

export default props =>
  <SingleTraditionalTableView
    {...props}
    useNationalDataDescriptions={false}
    useAnalysisDescriptions={false}
    headingLocalizationKey="degradedForest.degradedForest"
    sectionAnchor="5c"
    tableSpec={tableSpec}/>
