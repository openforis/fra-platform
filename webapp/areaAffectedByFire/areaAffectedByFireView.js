import './style.less'
import React from 'react'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import Description from '../description/description'
import ReviewIndicator from '../review/reviewIndicator'

const areaAffectedByFire = ({match}) =>
  <LoggedInPageTemplate>
    <div className="tw__container aabf__container">
      <h2 className="headline tw__page-header">Area affected by fire</h2>
      <TraditionalTable tableSpec={tableSpec} countryIso={match.params.countryIso}/>
      <div className="tw__description-with-review-indicator">
        <div className="tw__description-wrapper">
          <Description title="Description"
                       name="areaAffectedByFire"
                       countryIso={match.params.countryIso}/>
        </div>
        <div className="tw__review-indicator-wrapper">
          <ReviewIndicator section='areaAffectedByFire'
                           name="Area affected by fire"
                           target={['description']}
                           countryIso={match.params.countryIso}/>
        </div>
      </div>
    </div>
  </LoggedInPageTemplate>

export default areaAffectedByFire
