import React from 'react'
import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

export default props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="holderOfManagementRights.holderOfManagementRights"
    tadAnchor="4b"
    faqAnchor="4a"
    tableSpec={tableSpec}/>
