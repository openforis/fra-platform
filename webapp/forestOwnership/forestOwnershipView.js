import React from 'react'
import SingleTraditionalTableView from '../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

export default props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="forestOwnership.forestOwnership"
    sectionAnchor="6a"
    tableSpec={tableSpec}/>
