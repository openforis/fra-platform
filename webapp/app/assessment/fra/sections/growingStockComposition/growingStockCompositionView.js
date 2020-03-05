import './style.less'
import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import TraditionalTable from '@webapp/app/assessment/components/traditionalTable/traditionalTable'
import tableSpec, { sectionName } from './tableSpec'
import DefinitionLink from '@webapp/components/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'
import NationalDataDescriptions from '@webapp/app/assessment/components/description/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/app/assessment/components/description/analysisDescriptions'
import GeneralComments from '@webapp/app/assessment/components/description/generalComments'
import * as table from '@webapp/app/assessment/components/traditionalTable/table'
import { isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'
import FraUtils from '@common/fraUtils'
import { fetchTableData } from '@webapp/app/assessment/components/traditionalTable/actions'

import * as AppState from '@webapp/app/appState'
import * as FraState from '@webapp/app/assessment/fra/fraState'

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

    <div className="app-view__content growing-stock-composition-view">
      <NationalDataDescriptions section={tableSpecInstance.name} countryIso={countryIso}
                                disabled={isEditDataDisabled}/>
      <AnalysisDescriptions section={tableSpecInstance.name} countryIso={countryIso}
                            disabled={isEditDataDisabled}/>
      <h2 className="headline no-print">
        {i18n.t('growingStockComposition.growingStockComposition')}
      </h2>
      <div className="app-view__section-toolbar">
        <DefinitionLink className="margin-right-big" document="tad" anchor="2b"
                        title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
        <DefinitionLink className="align-left" document="faq" anchor="2b" title={i18n.t('definition.faqLabel')}
                        lang={i18n.language}/>
        <div className="support-text">{i18n.t('growingStockComposition.rankingYear')}</div>
      </div>

      {
        !isPrintingOnlyTables() &&
        <div className="page-break" />
      }

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
  const i18n = AppState.getI18n(state)
  const growingStock = R.prop('growingStock', state)
  const tableSpecInstance = tableSpec(i18n, growingStock)

  return {
    i18n,
    isEditDataDisabled: FraState.isSectionEditDisabled(sectionName)(state),
    growingStock,
    tableSpecInstance,
    tableData: R.path(['traditionalTable', tableSpecInstance.name, 'tableData'], state) || table.createTableData(tableSpecInstance),
  }
}

export default connect(mapStateToProps, {
  fetchLastSectionUpdateTimestamp,
  fetchTableData
})(GrowingStockCompositionView)
