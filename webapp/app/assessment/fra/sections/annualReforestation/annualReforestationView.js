import React from 'react'
import tableSpec from './tableSpec'
import SingleTraditionalTableView from '@webapp/app/assessment/components/traditionalTable/singleTraditionalTableView'

export default props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="annualReforestation.annualReforestation"
    sectionAnchor="1d"
    tableSpec={tableSpec}/>
