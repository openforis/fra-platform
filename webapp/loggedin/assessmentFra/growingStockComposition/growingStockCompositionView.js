import './style.less'
import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import TraditionalTable from '@webapp/traditionalTable/traditionalTable'
import tableSpec, { sectionName } from './tableSpec'
import DefinitionLink from '@webapp/components/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '@webapp/audit/actions'
import NationalDataDescriptions from '@webapp/descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/descriptionBundles/analysisDescriptions'
import GeneralComments from '@webapp/descriptionBundles/generalComments'
import { isFRA2020SectionEditDisabled } from '@webapp/utils/assessmentAccess'
import * as table from '@webapp/traditionalTable/table'
import { isPrintingOnlyTables } from '@webapp/loggedin/printAssessment/printAssessment'
import FraUtils from '@common/fraUtils'
import { fetchTableData } from '@webapp/traditionalTable/actions'
import * as AppState from '@webapp/app/appState'
import * as UserState from '@webapp/user/userState'

const GrowingStockCompositionView = props => {
  const { i18n, isEditDataDisabled, tableData, tableSpecInstance } = props
  const countryIso = useSelector(AppState.getCountryIso)

  useEffect(() => {
    props.fetchTableData(countryIso, tableSpecInstance)
    props.fetchLastSectionUpdateTimestamp(countryIso, tableSpecInstance.name)
  }, [])

  const render = isPrintingOnlyTables() ? FraUtils.hasData(tableData) : true

  if (!render) return null
  return <>
    <h2 className="title only-print">
      {`${isPrintingOnlyTables() ? '' : '2b '}${i18n.t('growingStockComposition.growingStockComposition')}`}
    </h2>

    <div className="fra-view__content growing-stock-composition-view">
      <NationalDataDescriptions section={tableSpecInstance.name} countryIso={countryIso}
                                disabled={isEditDataDisabled}/>
      <AnalysisDescriptions section={tableSpecInstance.name} countryIso={countryIso}
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
      <TraditionalTable tableSpec={tableSpecInstance} countryIso={countryIso}
                        disabled={isEditDataDisabled}/>
      <GeneralComments
        section={tableSpecInstance.name}
        countryIso={countryIso}
        disabled={isEditDataDisabled}
      />
    </div>
  </>

}

const mapStateToProps = state => {
  const i18n = UserState.getI18n(state)
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
