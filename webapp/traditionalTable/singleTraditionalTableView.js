/*
 * Use this view if you have only a single table with the standard description elements etc
 * If you have Anything more custom, e.g. having multiple tables, special markup or styles,
 * just do a custom view and use TraditionalTable, CommentableDescriptions etc. directly instead!
 */

import React from 'react'
import { connect } from 'react-redux'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import { CommentableDescriptions } from '../description/commentableDescription'
import { fetchLastSectionUpdateTimestamp } from '../audit/actions'
import DefinitionLink from '../reusableUiComponents/definitionLink'
import LastSectionUpdateFetchingView from '../reusableUiComponents/lastSectionUpdateFetchingView'

class SingleTraditionalTableView extends LastSectionUpdateFetchingView {

  constructor(props) {
    super(props, props.tableSpec(props.i18n).name)
  }

  render() {
    const {match, i18n, headingLocalizationKey, sectionAnchor, tadAnchor, faqAnchor} = this.props
    const countryIso = match.params.countryIso
    const tableSpecInstance = this.props.tableSpec(this.props.i18n)

    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <div className="fra-view__page-header">
          <h1 className="title">{i18n.t(headingLocalizationKey)}</h1>
          <DefinitionLink document="tad" anchor={sectionAnchor ? sectionAnchor : tadAnchor} title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
          <DefinitionLink document="faq" anchor={sectionAnchor ? sectionAnchor : faqAnchor} title={i18n.t('definition.faqLabel')} lang={i18n.language} className="align-left"/>
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
}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(SingleTraditionalTableView)
