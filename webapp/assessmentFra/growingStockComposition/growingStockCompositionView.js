import './style.less'
import React from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import TraditionalTable from '../../traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import { DataSourceDescriptionAndComments } from '../../descriptionBundles/dataSourceDescriptionAndComments'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'

class GrowingStockCompositionView extends React.Component {

  constructor(props) {
    super(props)
    this.tableSpecInstance = tableSpec(this.props.i18n)
  }

  componentWillMount() {
    this.props.fetchLastSectionUpdateTimestamp(this.props.match.params.countryIso, this.tableSpecInstance.name)
  }

  render () {
    const {match, i18n} = this.props

    return <LoggedInPageTemplate>
      <div className="fra-view__content growing-stock-composition-view">
        <div className="fra-view__page-header">
          <h1 className="title">{i18n.t('growingStockComposition.growingStockComposition')}</h1>
          <div className="fra-view__header-secondary-content">
            <DefinitionLink document="tad" anchor="2b" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
            <DefinitionLink document="faq" anchor="2b" title={i18n.t('definition.faqLabel')} lang={i18n.language}/>
            <p className="support-text">{i18n.t('growingStockComposition.rankingYear')}</p>
          </div>
        </div>
        <TraditionalTable tableSpec={this.tableSpecInstance} countryIso={match.params.countryIso}/>
        <DataSourceDescriptionAndComments
          section={this.tableSpecInstance.name}
          name="growingStockComposition"
          countryIso={match.params.countryIso}
          i18n={i18n}
        />
      </div>
    </LoggedInPageTemplate>
  }

}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(GrowingStockCompositionView)
