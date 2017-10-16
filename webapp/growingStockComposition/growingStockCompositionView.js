import './style.less'
import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import { CommentableDescriptions } from '../description/commentableDescription'
import DefinitionLink from './../reusableUiComponents/definitionLink'

const GrowingStockCompositionView = ({match, i18n}) => {
  const tableProps = tableSpec(i18n)

  return <LoggedInPageTemplate>
    <div className="tv__container growing-stock__container">
      <div className="tv__page-header">
        <h1 className="title">{i18n.t('growingStockComposition.growingStockComposition')}</h1>
        <DefinitionLink document="tad" anchor="2b" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
        <DefinitionLink document="faq" anchor="2b" title={i18n.t('definition.faqLabel')} lang={i18n.language} className="align-left"/>
      </div>
      <TraditionalTable tableSpec={tableProps} countryIso={match.params.countryIso}/>
      <CommentableDescriptions
        section={tableProps.name}
        name="growingStockComposition"
        countryIso={match.params.countryIso}
        i18n={i18n}
      />
    </div>
  </LoggedInPageTemplate>
}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps)(GrowingStockCompositionView)
