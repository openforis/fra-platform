/*
 * Use this view if you have only a single table with the standard description elements etc
 * If you have Anything more custom, e.g. having multiple tables, special markup or styles,
 * just do a custom view and use TraditionalTable, CommentableDescriptions etc. directly instead!
 */

import React from 'react'
import { connect } from 'react-redux'
import LoggedInPageTemplate from '../app/loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import NationalDataDescriptions from '../descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '../descriptionBundles/analysisDescriptions'
import GeneralComments from '../descriptionBundles/generalComments'
import { fetchLastSectionUpdateTimestamp } from '../audit/actions'
import DefinitionLink from '../reusableUiComponents/definitionLink'

class SingleTraditionalTableView extends React.Component {

  componentDidMount() {
    this.props.fetchLastSectionUpdateTimestamp(this.props.match.params.countryIso, this.getTableSpec().name)
  }

  getTableSpec() {
    return this.props.tableSpecInstance || this.props.tableSpec(this.props.i18n)
  }

  render() {
    const {
      match,
      i18n,
      headingLocalizationKey,
      headingDetailsLocalizationKey,
      sectionAnchor,
      tadAnchor,
      faqAnchor,
      useAnalysisDescriptions
    } = this.props
    const countryIso = match.params.countryIso
    const tableSpecInstance = this.getTableSpec()

    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <NationalDataDescriptions section={tableSpecInstance.name} countryIso={countryIso}/>
        {
          // Default is that we show the analysisDescriptions if this prop doesn't exist
          useAnalysisDescriptions === false
            ? null
            : <AnalysisDescriptions section={tableSpecInstance.name} countryIso={countryIso}/>
        }
        <h2 className="headline">
          <span className="only-print">{`${sectionAnchor ? sectionAnchor : tadAnchor} `}</span>{i18n.t(headingLocalizationKey)}
          {headingDetailsLocalizationKey ? ` (${i18n.t(headingDetailsLocalizationKey)})` : null}
        </h2>
        <div className="fra-view__section-toolbar">
          <DefinitionLink className="margin-right-big" document="tad" anchor={sectionAnchor ? sectionAnchor : tadAnchor} title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
          <DefinitionLink className="align-left" document="faq" anchor={sectionAnchor ? sectionAnchor : faqAnchor} title={i18n.t('definition.faqLabel')} lang={i18n.language}/>
        </div>
        <TraditionalTable tableSpec={tableSpecInstance} countryIso={match.params.countryIso}/>
        <GeneralComments section={tableSpecInstance.name} countryIso={countryIso}/>
      </div>
    </LoggedInPageTemplate>

  }
}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(SingleTraditionalTableView)
