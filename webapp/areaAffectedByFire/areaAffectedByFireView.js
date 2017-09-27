import React from 'react'
import SingleTraditionalTableView from '../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

export default props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="areaAffectedByFire.areaAffectedByFire"
    sectionAnchor="7b"
    tableSpec={tableSpec}/>
