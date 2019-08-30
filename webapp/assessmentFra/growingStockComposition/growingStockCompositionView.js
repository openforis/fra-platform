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
import * as table from '../../traditionalTable/table'
import { isPrintingOnlyTables } from '../../printAssessment/printAssessment'
import FraUtils from '../../../common/fraUtils'
import { fetchTableData } from '../../traditionalTable/actions'

class GrowingStockCompositionView extends React.Component {

  componentWillMount () {
    const countryIso = this.props.match.params.countryIso
    const tableSpec = this.props.tableSpecInstance

    this.props.fetchTableData(countryIso, tableSpec)
    this.props.fetchLastSectionUpdateTimestamp(countryIso, tableSpec.name)
  }

  render () {
    const { match, i18n, isEditDataDisabled, tableData, tableSpecInstance } = this.props

    const render = isPrintingOnlyTables() ? FraUtils.hasData(tableData) : true

    return render &&
      <LoggedInPageTemplate>

        <h2 className="title only-print">
          {`${isPrintingOnlyTables() ? '' : '2b '}${i18n.t('growingStockComposition.growingStockComposition')}`}
        </h2>

        <div className="fra-view__content growing-stock-composition-view">
          <NationalDataDescriptions section={tableSpecInstance.name} countryIso={match.params.countryIso}
                                    disabled={isEditDataDisabled}/>
          <AnalysisDescriptions section={tableSpecInstance.name} countryIso={match.params.countryIso}
                                disabled={isEditDataDisabled}/>
          <h2 className="headline no-print">
            {i18n.t('growingStockComposition.growingStockComposition')}
          </h2>
          <div className="fra-view__section-toolbar">
            <DefinitionLink className="margin-right-big" document="tad" anchor="2b"
                            title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
            <DefinitionLink className="align-left" document="faq" anchor="2b" title={i18n.t('definition.faqLabel')}
                            lang={i18n.language}/>
            <div className="support-text">{i18n.t('growingStockComposition.rankingYear')}</div>
          </div>
          <TraditionalTable tableSpec={tableSpecInstance} countryIso={match.params.countryIso}
                            disabled={isEditDataDisabled}/>
          <GeneralComments
            section={tableSpecInstance.name}
            countryIso={match.params.countryIso}
            disabled={isEditDataDisabled}
          />
        </div>
      </LoggedInPageTemplate>
  }

}

const mapStateToProps = state => {
  const i18n = state.user.i18n
  const growingStock = R.prop('growingStock', state)
  const tableSpecInstance = tableSpec(i18n, growingStock)

  return {
    i18n,
    isEditDataDisabled: isFRA2020SectionEditDisabled(state, sectionName),
    growingStock,
    tableSpecInstance,
    tableData: R.path(['traditionalTable', tableSpecInstance.name, 'tableData'], state) || table.createTableData(tableSpecInstance),
  }
}

export default connect(mapStateToProps, {
  fetchLastSectionUpdateTimestamp,
  fetchTableData
})(GrowingStockCompositionView)
