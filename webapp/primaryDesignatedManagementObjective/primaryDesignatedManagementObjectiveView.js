import './style.less'
import React from 'react'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'

const PrimaryDesignatedManagementObjectiveView = props =>
  <LoggedInPageTemplate>
    <div className="pdmo__container">
      <h2 className="headline pdmo__page-header">Primary designated management objective</h2>
      <TraditionalTable tableSpec={tableSpec} countryIso={props.match.params.countryIso}/>
    </div>
  </LoggedInPageTemplate>

export default PrimaryDesignatedManagementObjectiveView
