import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import TraditionalTable from '@webapp/app/assessment/components/traditionalTable/traditionalTable'
import tableSpec from './tableSpec'
import NationalDataDescriptions from '@webapp/app/assessment/components/section/components/descriptions/components/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/app/assessment/components/section/components/descriptions/components/analysisDescriptions'
import GeneralComments from '@webapp/app/assessment/components/section/components/descriptions/components/generalComments'
import DefinitionLink from '@webapp/components/definitionLink'
import ExcelCalculatorDownload from '@webapp/app/assessment/fra/sections/biomassStock/excelCalculatorDownload'
import { fetchLastSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'
import { isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'
import FraUtils from '@common/fraUtils'
import * as table from '@webapp/app/assessment/components/traditionalTable/table'
import { fetchTableData } from '@webapp/app/assessment/components/traditionalTable/actions'

import * as AppState from '@webapp/app/appState'
import * as FraState from '@webapp/app/assessment/fra/fraState'

const sectionName = 'carbonStock'

const soilDepthTableSpec = i18n => ({
  name: 'carbonStockSoilDepth',
  header: <thead/>,
  disableReviewComments: true,
  rows: [
    [
      {
        type: 'readOnly',
        jsx: <td className="fra-secondary-table__heading-cell">
          {i18n.t('carbonStock.soilDepthHeading')}
        </td>
      },
      { type: 'decimalInput' }
    ]
  ],
  valueSlice: {
    columnStart: 1
  }
})

const CarbonStockView = props => {
  const {
    i18n,
    disabled,
    tableSpecInstance,
    tableData,
    fetchTableData,
    fetchLastSectionUpdateTimestamp
  } = props

  const { language } = i18n
  const countryIso = useSelector(AppState.getCountryIso)

  useEffect(() => {
    fetchTableData(countryIso, tableSpecInstance)
    fetchLastSectionUpdateTimestamp(countryIso, tableSpecInstance.name)
  }, [])

  const render = isPrintingOnlyTables() ? FraUtils.hasData(tableData) : true
  if (!render) return null
  return <>

    <h2 className="title only-print">
      {`${isPrintingOnlyTables() ? '' : '2d '}${i18n.t('carbonStock.carbonStock')}`}
    </h2>

    <div className="app-view__content">
      <NationalDataDescriptions section={sectionName} countryIso={countryIso} disabled={disabled}/>
      <AnalysisDescriptions section={sectionName} countryIso={countryIso} disabled={disabled}/>

      <h2 className="headline no-print">
        {i18n.t('carbonStock.carbonStock')}
      </h2>

      <div className="app-view__section-toolbar" style={{ marginTop: '4px' }}>
        <DefinitionLink className="margin-right-big" document="tad" anchor="2d"
                        title={i18n.t('definition.definitionLabel')} lang={language}/>
        <DefinitionLink className="align-left" document="faq" anchor="2c" title={i18n.t('definition.faqLabel')}
                        lang={language}/>

        <ExcelCalculatorDownload/>
      </div>

      {
        !isPrintingOnlyTables() &&
        <div className="page-break"/>
      }

      <TraditionalTable tableSpec={tableSpecInstance} countryIso={countryIso} disabled={disabled}/>
      <div className="fra-secondary-table__wrapper">
        <TraditionalTable tableSpec={soilDepthTableSpec(i18n)} countryIso={countryIso}
                          disabled={disabled}/>
      </div>
      <GeneralComments
        section={sectionName}
        countryIso={countryIso}
        disabled={disabled}
      />
    </div>
  </>
}

const mapStateToProps = state => {
  const i18n = AppState.getI18n(state)
  const tableSpecInstance = tableSpec(i18n)

  return {
    i18n,
    disabled: FraState.isSectionEditDisabled(sectionName)(state),
    tableSpecInstance,
    tableData: R.path(['traditionalTable', tableSpecInstance.name, 'tableData'], state) || table.createTableData(tableSpecInstance),
  }
}

export default connect(mapStateToProps, { fetchLastSectionUpdateTimestamp, fetchTableData })(CarbonStockView)
