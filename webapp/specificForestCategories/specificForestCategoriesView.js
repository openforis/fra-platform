import React from 'react'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import Description from '../description/description'
import ReviewIndicator from '../review/reviewIndicator'

const SpecificForestCategoriesView = props =>
  <LoggedInPageTemplate>
    <div className="tv__container">
      <h2 className="headline tv__page-header">Specific forest categories</h2>
      <TraditionalTable tableSpec={tableSpec} countryIso={props.match.params.countryIso}/>
      <div className="tv__description-with-review-indicator">
        <div className="tv__description-wrapper">
          <Description title="Description"
                       name="specificForestCategories"
                       countryIso={props.match.params.countryIso}/>
        </div>
        <div className="tv__review-indicator-wrapper">
          <ReviewIndicator section='specificForestCategories'
                           name="Specific forest categories"
                           target={['description']}
                           countryIso={props.match.params.countryIso}/>
        </div>
      </div>

    </div>
  </LoggedInPageTemplate>

export default SpecificForestCategoriesView
