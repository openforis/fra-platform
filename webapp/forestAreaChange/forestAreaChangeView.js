import React from 'react'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import Description from '../description/description'
import ReviewIndicator from '../review/reviewIndicator'

const ForestAreaChangeView = (props) =>
    <LoggedInPageTemplate>
      <div className="tw__container">
        <h2 className="headline tw__page-header">Forest area loss, gain and net change</h2>
        <TraditionalTable tableSpec={tableSpec} countryIso={props.match.params.countryIso}/>
        <div className="tw__description-with-review-indicator">
          <div className="tw__description-wrapper">
            <Description title="Description"
                         name="forestAreaChange"
                         countryIso={props.match.params.countryIso}/>
          </div>
          <div className="tw__review-indicator-wrapper">
            <ReviewIndicator section='forestAreaChange'
                             name="Forest area change"
                             target={['description']}
                             countryIso={props.match.params.countryIso}/>
          </div>
        </div>
      </div>
    </LoggedInPageTemplate>

export default ForestAreaChangeView
