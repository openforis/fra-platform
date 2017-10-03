import React from 'react'
import SingleTraditionalTableView from '../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

export default props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="forestPolicy.header"
    sectionAnchor="10a"
    tableSpec={tableSpec}/>
