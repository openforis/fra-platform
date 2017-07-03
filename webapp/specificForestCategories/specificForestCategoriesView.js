import './style.less'
import React from 'react'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'

const SpecificForestCategoriesView = props =>
  <LoggedInPageTemplate>
    <div className="sfc__container">
      <h2 className="headline sfc__page-header">Specific forest categories</h2>
      <TraditionalTable tableSpec={tableSpec} countryIso={props.match.params.countryIso}/>
    </div>
  </LoggedInPageTemplate>

export default SpecificForestCategoriesView
