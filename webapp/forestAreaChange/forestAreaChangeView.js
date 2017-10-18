import React from 'react'
import tableSpec from './tableSpec'
import SingleTraditionalTableView from '../traditionalTable/singleTraditionalTableView'

export default props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="forestAreaChange.forestAreaChange"
    sectionAnchor="1c"
    tableSpec={tableSpec}/>
