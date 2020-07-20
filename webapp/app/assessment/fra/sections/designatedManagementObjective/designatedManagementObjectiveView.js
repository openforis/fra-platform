import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { withRouter } from 'react-router'

import TraditionalTable from '@webapp/app/assessment/components/traditionalTable/traditionalTable'
import {
  primaryDesignatedManagementObjectiveTableSpec,
  totalAreaWithDesignatedManagementObjectiveTableSpec
} from './tableSpecs'
import DefinitionLink from '@webapp/components/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'
import NationalDataDescriptions from '@webapp/app/assessment/components/section/components/descriptions/components/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/app/assessment/components/section/components/descriptions/components/analysisDescriptions'
import GeneralComments from '@webapp/app/assessment/components/section/components/descriptions/components/generalComments'

import * as R from 'ramda'
import * as table from '@webapp/app/assessment/components/traditionalTable/table'
import { isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'
import FraUtils from '@common/fraUtils'
import { fetchTableData } from '@webapp/app/assessment/components/traditionalTable/actions'

import * as AppState from '@webapp/app/appState'
import * as FraState from '@webapp/app/assessment/fra/fraState'

const sectionName = 'designatedManagementObjective'

const designatedManagementObjectiveView = props => {
  const {
    disabled,
    fetchLastSectionUpdateTimestamp,
    fetchTableData,
    i18n,
    primaryDmoTableData,
    primaryDmoTableSpec,
    totalDmoTableData,
    totalDmoTableSpec,
  } = props
  const countryIso = useSelector(AppState.getCountryIso)

  useEffect(() => {
    fetchTableData(countryIso, primaryDmoTableSpec)
    fetchTableData(countryIso, totalDmoTableSpec)
    fetchLastSectionUpdateTimestamp(countryIso, sectionName)
  }, [])

  const primaryHasData = FraUtils.hasData(primaryDmoTableData)
  const totalHasData = FraUtils.hasData(totalDmoTableData)

  const renderPrimary = isPrintingOnlyTables() ? primaryHasData : true
  const renderTotal = isPrintingOnlyTables() ? totalHasData : true
  if (!(renderPrimary || renderTotal)) return null

  return <>
    <h2 className="title only-print">
      {`${isPrintingOnlyTables() ? '' : '3a '}${i18n.t('designatedManagementObjective.designatedManagementObjective')}`}
    </h2>

    <div className="app-view__content">
      <NationalDataDescriptions section={sectionName} countryIso={countryIso} disabled={disabled}/>
      <AnalysisDescriptions section={sectionName} countryIso={countryIso} disabled={disabled}/>
      <h2 className="headline no-print">
        {i18n.t('designatedManagementObjective.designatedManagementObjective')}
      </h2>
      <div className="app-view__section-toolbar">
        <DefinitionLink className="margin-right-big" document="tad" anchor="3a"
                        title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
        <DefinitionLink className="align-left" document="faq" anchor="3a" title={i18n.t('definition.faqLabel')}
                        lang={i18n.language}/>
      </div>

      {
        !isPrintingOnlyTables() &&
        <div className="page-break"/>
      }

      {
        renderPrimary &&
        [
          <h3 className="subhead" key={0}>
            {i18n.t('designatedManagementObjective.primaryDesignatedManagementObjective')}
          </h3>,
          <div className="app-view__section-toolbar" key={1}>
            <div className="support-text no-print">
              {i18n.t('designatedManagementObjective.primaryDesignatedManagementObjectiveSupport')}
            </div>
          </div>,
          <TraditionalTable
            key={2}
            tableSpec={primaryDmoTableSpec}
            countryIso={countryIso}
            section={sectionName}
            disabled={disabled}/>
        ]
      }

      {
        renderTotal &&
        [

          <h3 className="subhead" key={0}>
            {i18n.t('designatedManagementObjective.totalAreaWithDesignatedManagementObjective')}
          </h3>,
          <div className="app-view__section-toolbar" key={1}>
            <div className="support-text ">
              {i18n.t('designatedManagementObjective.totalAreaWithDesignatedManagementObjectiveSupport')}
            </div>
          </div>,
          <TraditionalTable
            key={2}
            tableSpec={totalDmoTableSpec}
            countryIso={countryIso}
            section={sectionName}
            disabled={disabled}/>
        ]
      }
      <GeneralComments
        section={sectionName}
        countryIso={countryIso}
        disabled={disabled}
      />
    </div>
  </>
}

const mapStateToProps = (state, { match }) => {
  const i18n = AppState.getI18n(state)
  const countryIso = match.params.countryIso
  const extentOfForest = state.extentOfForest
  const primaryDmoTableSpec = primaryDesignatedManagementObjectiveTableSpec(i18n, extentOfForest, countryIso)
  const totalDmoTableSpec = totalAreaWithDesignatedManagementObjectiveTableSpec(i18n)

  return {
    i18n,
    extentOfForest,
    disabled: FraState.isSectionEditDisabled(sectionName)(state),
    primaryDmoTableSpec,
    totalDmoTableSpec,
    primaryDmoTableData: R.path(['traditionalTable', primaryDmoTableSpec.name, 'tableData'], state) || table.createTableData(primaryDmoTableSpec),
    totalDmoTableData: R.path(['traditionalTable', totalDmoTableSpec.name, 'tableData'], state) || table.createTableData(totalDmoTableSpec),
  }
}

export default withRouter(connect(mapStateToProps, {
  fetchLastSectionUpdateTimestamp,
  fetchTableData
})(designatedManagementObjectiveView))
