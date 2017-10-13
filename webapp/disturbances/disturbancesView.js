import React from 'react'
import tableSpec from './tableSpec'
import SingleTraditionalTableView from '../traditionalTable/singleTraditionalTableView'

export default props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="disturbances.disturbances"
    sectionAnchor="5a"
    tableSpec={tableSpec}/>
