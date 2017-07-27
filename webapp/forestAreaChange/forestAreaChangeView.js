import React from 'react'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import CommentableDescription from '../description/commentableDescription'

const ForestAreaChangeView = (props) =>
    <LoggedInPageTemplate>
      <div className="tv__container">
        <h2 className="headline tv__page-header">Forest area loss, gain and net change</h2>
        <TraditionalTable tableSpec={tableSpec} countryIso={props.match.params.countryIso}/>
        <CommentableDescription
          section={tableSpec.name}
          descriptionName="forestAreaChange"
          descriptionTitle="Description"
          countryIso={props.match.params.countryIso}
        />
      </div>
    </LoggedInPageTemplate>

export default ForestAreaChangeView
