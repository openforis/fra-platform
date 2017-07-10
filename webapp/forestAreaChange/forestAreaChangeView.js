import React from 'react'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import Description from '../description/description'

const ForestAreaChangeView = (props) =>
    <LoggedInPageTemplate>
      <div className="tw__container">
        <h2 className="headline tw__page-header">Forest area loss, gain and net change</h2>
        <TraditionalTable tableSpec={tableSpec} countryIso={props.match.params.countryIso}/>
        <Description title="Description"
                     name="forestAreaChange"
                     countryIso={props.match.params.countryIso}/>
      </div>
    </LoggedInPageTemplate>

export default ForestAreaChangeView
