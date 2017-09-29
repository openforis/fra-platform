import React from 'react'
import SingleTraditionalTableView from '../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

export default props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="areaOfPermanentForest.areaOfPermanentForest"
    sectionAnchor="10b"
    tableSpec={tableSpec}/>
