import React from 'react'
import SingleTraditionalTableView from '../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

export default props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="forestAreaWithinProtectedAreas.forestAreaWithinProtectedAreas"
    sectionAnchor="3b"
    tableSpec={tableSpec}/>
