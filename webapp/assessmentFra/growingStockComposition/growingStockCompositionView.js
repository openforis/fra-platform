import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import TraditionalTable from '../../traditionalTable/traditionalTable'
import tableSpec, { sectionName } from './tableSpec'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import NationalDataDescriptions from '../../descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '../../descriptionBundles/analysisDescriptions'
import GeneralComments from '../../descriptionBundles/generalComments'
import { isFRA2020SectionEditDisabled } from '../../utils/assessmentAccess'

class GrowingStockCompositionView extends React.Component {

  constructor(props) {
    super(props)
    const {i18n, growingStock} = props
    this.tableSpecInstance = tableSpec(i18n, growingStock)
  }

  componentWillMount() {
    this.props.fetchLastSectionUpdateTimestamp(this.props.match.params.countryIso, this.tableSpecInstance.name)
  }

  render () {
    const {match, i18n, isEditDataDisabled} = this.props

    return <LoggedInPageTemplate>

      <h2 className="title only-print">
        2b {i18n.t('growingStockComposition.growingStockComposition')}
      </h2>

      <div className="fra-view__content growing-stock-composition-view">
        <NationalDataDescriptions section={this.tableSpecInstance.name} countryIso={match.params.countryIso} disabled={isEditDataDisabled}/>
        <AnalysisDescriptions section={this.tableSpecInstance.name} countryIso={match.params.countryIso} disabled={isEditDataDisabled}/>
        <h2 className="headline no-print">
          {i18n.t('growingStockComposition.growingStockComposition')}
        </h2>
        <div className="fra-view__section-toolbar">
          <DefinitionLink className="margin-right-big" document="tad" anchor="2b" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
          <DefinitionLink className="align-left" document="faq" anchor="2b" title={i18n.t('definition.faqLabel')} lang={i18n.language}/>
          <div className="support-text">{i18n.t('growingStockComposition.rankingYear')}</div>
        </div>
        <TraditionalTable tableSpec={this.tableSpecInstance} countryIso={match.params.countryIso} disabled={isEditDataDisabled}/>
        <GeneralComments
          section={this.tableSpecInstance.name}
          countryIso={match.params.countryIso}
          disabled={isEditDataDisabled}
        />
      </div>
    </LoggedInPageTemplate>
  }

}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  isEditDataDisabled: isFRA2020SectionEditDisabled(state, sectionName),
  growingStock: R.prop('growingStock', state)
})

export default connect(mapStateToProps, {fetchLastSectionUpdateTimestamp})(GrowingStockCompositionView)
