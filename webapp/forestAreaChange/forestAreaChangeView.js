import './style.less'
import React from 'react'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'

const ForestAreaChangeView = (props) =>
    <LoggedInPageTemplate>
      <div className="fac__container">
        <h2 className="headline fac__page-header">Forest area loss, gain and net change</h2>
        <TraditionalTable tableSpec={tableSpec} countryIso={props.match.params.countryIso}/>
      </div>
    </LoggedInPageTemplate>

export default ForestAreaChangeView
