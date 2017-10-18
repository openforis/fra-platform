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
import DefinitionLink from './../reusableUiComponents/definitionLink'

class SingleTraditionalTableView extends React.Component {

  constructor(props) {
    super(props)
    this.tableSpecInstance = this.props.tableSpec(this.props.i18n)
  }

  componentDidMount() {
    this.props.fetchLastSectionUpdateTimestamp(this.props.match.params.countryIso, this.tableSpecInstance.name)
  }

  render() {
    const {match, i18n, headingLocalizationKey, sectionAnchor, tadAnchor, faqAnchor} = this.props
    const countryIso = match.params.countryIso

    return <LoggedInPageTemplate>
      <div className="fra-view__content">
        <div className="fra-view__page-header">
          <h1 className="title">{i18n.t(headingLocalizationKey)}</h1>
          <DefinitionLink document="tad" anchor={sectionAnchor ? sectionAnchor : tadAnchor} title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
          <DefinitionLink document="faq" anchor={sectionAnchor ? sectionAnchor : faqAnchor} title={i18n.t('definition.faqLabel')} lang={i18n.language} className="align-left"/>
        </div>
      <TraditionalTable tableSpec={this.tableSpecInstance} countryIso={match.params.countryIso}/>
        <CommentableDescriptions
          section={this.tableSpecInstance.name}
          name={this.tableSpecInstance.name}
          countryIso={countryIso}
          i18n={i18n}
        />
      </div>
    </LoggedInPageTemplate>

  }
}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(SingleTraditionalTableView)
