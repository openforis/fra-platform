import React from 'react'
import tableSpec from './tableSpec'
import SingleTraditionalTableView from '@webapp/traditionalTable/singleTraditionalTableView'

export default props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="annualReforestation.annualReforestation"
    sectionAnchor="1d"
    tableSpec={tableSpec}/>
