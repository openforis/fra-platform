import React from 'react'
import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

export default props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="employment.employment"
    headingDetailsLocalizationKey="employment.average"
    sectionAnchor="7a"
    tableSpec={tableSpec}/>
