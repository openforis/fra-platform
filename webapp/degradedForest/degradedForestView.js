import React from 'react'
import { connect } from 'react-redux'
import tableSpec from './tableSpec'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import { CommentableDescriptions } from '../description/commentableDescription'
import DefinitionLink from './../reusableUiComponents/definitionLink'

const DegradedForestView = ({match, i18n}) => {
  const tableSpecInstance = tableSpec(i18n)
  const countryIso = match.params.countryIso

  return <LoggedInPageTemplate>
    <div className="tv__container">
      <div className="tv__page-header">
        <h1 className="title">{i18n.t('degradedForest.degradedForest')}</h1>
        <DefinitionLink document="tad" section="7c" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
        <DefinitionLink document="faq" section="7c" title={i18n.t('definition.faqLabel')} lang={i18n.language} className="align-left"/>
      </div>
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
