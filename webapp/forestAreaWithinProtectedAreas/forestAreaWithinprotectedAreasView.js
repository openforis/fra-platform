import React from 'react'
import SingleTraditionalTableView from '../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

export default props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="forestAreaWithinProtectedAreas.header"
    sectionAnchor="5b"
    tableSpec={tableSpec}/>
