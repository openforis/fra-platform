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
import { isFRA2020SectionEditDisabled } from '../utils/assessmentAccess'

class SingleTraditionalTableView extends React.Component {

  componentDidMount() {
    this.props.fetchLastSectionUpdateTimestamp(this.props.match.params.countryIso, this.props.tableSpecInstance.name)
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
      useAnalysisDescriptions,
      tableSpecInstance,
      isEditDataDisabled
    } = this.props

    const countryIso = match.params.countryIso

    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <NationalDataDescriptions section={tableSpecInstance.name} countryIso={countryIso} disabled={isEditDataDisabled}/>
        {
          // Default is that we show the analysisDescriptions if this prop doesn't exist
          useAnalysisDescriptions === false
            ? null
            : <AnalysisDescriptions section={tableSpecInstance.name} countryIso={countryIso} disabled={isEditDataDisabled}/>
        }
        <h2 className="headline">
          <span className="only-print">{`${sectionAnchor ? sectionAnchor : tadAnchor} `}</span>{i18n.t(headingLocalizationKey)}
          {headingDetailsLocalizationKey ? ` (${i18n.t(headingDetailsLocalizationKey)})` : null}
        </h2>
        <div className="fra-view__section-toolbar">
          <DefinitionLink className="margin-right-big" document="tad" anchor={sectionAnchor ? sectionAnchor : tadAnchor} title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
          <DefinitionLink className="align-left" document="faq" anchor={sectionAnchor ? sectionAnchor : faqAnchor} title={i18n.t('definition.faqLabel')} lang={i18n.language}/>
        </div>
        <TraditionalTable tableSpec={tableSpecInstance} countryIso={match.params.countryIso} disabled={isEditDataDisabled}/>
        <GeneralComments section={tableSpecInstance.name} countryIso={countryIso} disabled={isEditDataDisabled}/>
      </div>
    </LoggedInPageTemplate>

  }
}

const mapStateToProps = (state, props) => {
  const tableSpecInstance =  props.tableSpecInstance || props.tableSpec(state.user.i18n)

  return {
    i18n: state.user.i18n,
    tableSpecInstance,
    isEditDataDisabled: isFRA2020SectionEditDisabled(state, tableSpecInstance.name)
  }
}

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(SingleTraditionalTableView)
