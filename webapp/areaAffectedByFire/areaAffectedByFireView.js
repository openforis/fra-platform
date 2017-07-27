import './style.less'
import React from 'react'
import CommentableDescription from '../description/commentableDescription'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'

const areaAffectedByFire = ({match}) =>
  <LoggedInPageTemplate>
    <div className="tv__container aabf__container">
      <h2 className="headline tv__page-header">Area affected by fire</h2>
      <TraditionalTable tableSpec={tableSpec} countryIso={match.params.countryIso}/>
      <CommentableDescription
        section={tableSpec.name}
        descriptionName="areaAffectedByFire"
        descriptionTitle="Description"
        countryIso={match.params.countryIso}
      />
    </div>
  </LoggedInPageTemplate>

export default areaAffectedByFire
