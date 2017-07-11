import React from 'react'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import Description from '../description/description'
import ReviewIndicator from '../review/reviewIndicator'

const PrimaryDesignatedManagementObjectiveView = props =>
  <LoggedInPageTemplate>
    <div className="tv__container">
      <h2 className="headline tv__page-header">Primary designated management objective</h2>
      <TraditionalTable tableSpec={tableSpec} countryIso={props.match.params.countryIso}/>
      <div className="tv__description-with-review-indicator">
        <div className="tv__description-wrapper">
          <Description title="Description"
                       name="primaryDesignatedManagementObjective"
                       countryIso={props.match.params.countryIso}/>
        </div>
        <div className="tv__review-indicator-wrapper">
          <ReviewIndicator section='primaryDesignatedManagementObjective'
                           name="Primary management objective"
                           target={['description']}
                           countryIso={props.match.params.countryIso}/>
        </div>
      </div>
    </div>
  </LoggedInPageTemplate>

export default PrimaryDesignatedManagementObjectiveView
