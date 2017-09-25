import React from 'react'
import { connect } from 'react-redux'
import tableSpec from './tableSpec'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import { CommentableDescriptions } from '../description/commentableDescription'

const DegradedForestView = ({match, i18n}) => {
  const tableSpecInstance = tableSpec(i18n)
  const countryIso = match.params.countryIso

  return <LoggedInPageTemplate>
    <div className="tv__container">
      <h1 className="title tv__page-header">{i18n.t('degradedForest.degradedForest')}</h1>
      <TraditionalTable tableSpec={tableSpecInstance} countryIso={match.params.countryIso}/>
      <CommentableDescriptions
        section={tableSpecInstance.name}
        name={tableSpecInstance.name}
        countryIso={countryIso}
        i18n={i18n}
      />
    </div>
  </LoggedInPageTemplate>
}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps)(DegradedForestView)
