import React from 'react'
import SingleTraditionalTableView from '../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

export default props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="holderOfManagementRights.holderOfManagementRights"
    sectionAnchor="6b"
    tableSpec={tableSpec}/>
