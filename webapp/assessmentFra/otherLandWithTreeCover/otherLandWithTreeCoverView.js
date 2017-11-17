import React from 'react'
import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

export default props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="otherLandWithTreeCover.otherLandWithTreeCover"
    sectionAnchor="1f"
    tableSpec={tableSpec}/>
