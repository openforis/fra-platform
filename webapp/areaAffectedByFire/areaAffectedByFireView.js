import './style.less'
import React from 'react'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import Description from '../description/description'

const areaAffectedByFire = ({match}) =>
  <LoggedInPageTemplate>
    <div className="aabf__container">
      <h2 className="headline fac__page-header">Area affected by fire</h2>
      <div className="aabf__traditional-table-wrapper">
        <TraditionalTable tableSpec={tableSpec} countryIso={match.params.countryIso}/>
      </div>
      <Description title="Description"
                   name="areaAffectedByFire"
                   countryIso={match.params.countryIso}/>
    </div>
  </LoggedInPageTemplate>

export default areaAffectedByFire
