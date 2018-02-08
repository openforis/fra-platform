import React from 'react'
import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

export default props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="forestPolicy.forestPolicy"
    sectionAnchor="6a"
    tableSpec={tableSpec}
    useAnalysisDescriptions={false}/>
