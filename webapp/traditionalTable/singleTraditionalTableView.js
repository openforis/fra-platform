/*
 * Use this view if you have only a single table with the standard description elements etc
 * If you have Anything more custom, e.g. having multiple tables, special markup or styles,
 * just do a custom view and use TraditionalTable, CommentableDescriptions etc. directly instead!
 */

import React from 'react'
import { connect } from 'react-redux'
import LoggedInPageTemplate from '../app/loggedInPageTemplate'
import TraditionalTable from '../traditionalTable/traditionalTable'
import { CommentableDescriptions } from '../description/commentableDescription'
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
    const {match, i18n, headingLocalizationKey, headingDetailsLocalizationKey, sectionAnchor, tadAnchor, faqAnchor} = this.props
    const countryIso = match.params.countryIso
    const tableSpecInstance = this.getTableSpec()

    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <div className="fra-view__page-header">
          <h1 className="title">
            {i18n.t(headingLocalizationKey)}
            {headingDetailsLocalizationKey ? ` (${i18n.t(headingDetailsLocalizationKey)})` : null}
          </h1>
          <div className="fra-view__header-secondary-content">
            <DefinitionLink document="tad" anchor={sectionAnchor ? sectionAnchor : tadAnchor} title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
            <DefinitionLink document="faq" anchor={sectionAnchor ? sectionAnchor : faqAnchor} title={i18n.t('definition.faqLabel')} lang={i18n.language}/>
          </div>
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
