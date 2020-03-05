/*
 * Use this view if you have only a single table with the standard description elements etc
 * If you have Anything more custom, e.g. having multiple tables, special markup or styles,
 * just do a custom view and use TraditionalTable, CommentableDescriptions etc. directly instead!
 */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import TraditionalTable from '@webapp/app/assessment/components/traditionalTable/traditionalTable'
import NationalDataDescriptions from '@webapp/app/assessment/components/description/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/app/assessment/components/description/analysisDescriptions'
import GeneralComments from '@webapp/app/assessment/components/description/generalComments'
import { fetchLastSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'
import DefinitionLink from '@webapp/components/definitionLink'
import * as R from 'ramda'
import * as table from './table'
import { isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'
import FraUtils from '@common/fraUtils'
import { fetchTableData } from './actions'

import * as AppState from '@webapp/app/appState'
import * as FraState from '@webapp/app/assessment/fra/fraState'

import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'

const SingleTraditionalTableView = props => {

  const {
    fetchLastSectionUpdateTimestamp,
    fetchTableData,
    faqAnchor,
    headingDetailsLocalizationKey,
    headingLocalizationKey,
    isEditDataDisabled,
    sectionAnchor,
    tableData,
    tableSpecInstance,
    tadAnchor,
    useAnalysisDescriptions,
    useNationalDataDescriptions,
  } = props

  const countryIso = useCountryIso()
  const i18n = useI18n()

  useEffect(() => {
    fetchLastSectionUpdateTimestamp(countryIso, tableSpecInstance.name)
    fetchTableData(countryIso, tableSpecInstance)
  }, [])

  const render = isPrintingOnlyTables() ? FraUtils.hasData(tableData) : true
  if (!render) {
    return null
  }

  return <>

      <h2 className="title only-print">
        {
          !isPrintingOnlyTables() &&
          <span className="only-print">{`${sectionAnchor ? sectionAnchor : tadAnchor} `}&nbsp;</span>
        }
        {i18n.t(headingLocalizationKey)}
        {headingDetailsLocalizationKey ? ` (${i18n.t(headingDetailsLocalizationKey)})` : null}
      </h2>

      <div className="app-view__content">
        {
          useNationalDataDescriptions === false
            ? null
            : <NationalDataDescriptions section={tableSpecInstance.name} countryIso={countryIso}
              disabled={isEditDataDisabled} />
        }
        {
          // Default is that we show the analysisDescriptions if this prop doesn't exist
          useAnalysisDescriptions === false
            ? null
            : <AnalysisDescriptions section={tableSpecInstance.name} countryIso={countryIso}
              disabled={isEditDataDisabled} />
        }
        <h2 className="headline no-print">
          {i18n.t(headingLocalizationKey)}
          {headingDetailsLocalizationKey ? ` (${i18n.t(headingDetailsLocalizationKey)})` : null}
        </h2>
        <div className="app-view__section-toolbar">
          <DefinitionLink className="margin-right-big" document="tad"
            anchor={sectionAnchor ? sectionAnchor : tadAnchor}
            title={i18n.t('definition.definitionLabel')} lang={i18n.language} />
          <DefinitionLink className="align-left" document="faq" anchor={sectionAnchor ? sectionAnchor : faqAnchor}
            title={i18n.t('definition.faqLabel')} lang={i18n.language} />
        </div>

        {
          !isPrintingOnlyTables() &&
          <div className="page-break" />
        }

        <TraditionalTable
          tableSpec={tableSpecInstance}
          countryIso={countryIso}
          disabled={isEditDataDisabled}
          tableDataFetched={true}
          sectionAnchor={sectionAnchor}
        />
        <GeneralComments section={tableSpecInstance.name} countryIso={countryIso} disabled={isEditDataDisabled} />
      </div>

    </>

}

const mapStateToProps = (state, props) => {
  const tableSpecInstance = props.tableSpecInstance || props.tableSpec(AppState.getI18n(state))
  return {
    tableSpecInstance,
    isEditDataDisabled: FraState.isSectionEditDisabled(tableSpecInstance.name)(state),
    tableData: R.path(['traditionalTable', tableSpecInstance.name, 'tableData'], state) || table.createTableData(tableSpecInstance),
  }
}

export default connect(mapStateToProps, { fetchLastSectionUpdateTimestamp, fetchTableData })(SingleTraditionalTableView)
