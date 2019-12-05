import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { useParams } from 'react-router-dom'

import TraditionalTable from '../../traditionalTable/traditionalTable'
import {
  primaryDesignatedManagementObjectiveTableSpec,
  totalAreaWithDesignatedManagementObjectiveTableSpec
} from './tableSpecs'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import NationalDataDescriptions from '../../descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '../../descriptionBundles/analysisDescriptions'
import GeneralComments from '../../descriptionBundles/generalComments'

import { isFRA2020SectionEditDisabled } from '../../utils/assessmentAccess'
import * as R from 'ramda'
import * as table from '../../traditionalTable/table'
import { isPrintingOnlyTables } from '../../printAssessment/printAssessment'
import FraUtils from '../../../common/fraUtils'
import { fetchTableData } from '../../traditionalTable/actions'

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
  const { countryIso } = useParams()

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

    <div className="fra-view__content">
      <NationalDataDescriptions section={sectionName} countryIso={countryIso} disabled={disabled} />
      <AnalysisDescriptions section={sectionName} countryIso={countryIso} disabled={disabled} />
      <h2 className="headline no-print">
        {i18n.t('designatedManagementObjective.designatedManagementObjective')}
      </h2>
      <div className="fra-view__section-toolbar">
        <DefinitionLink className="margin-right-big" document="tad" anchor="3a"
          title={i18n.t('definition.definitionLabel')} lang={i18n.language} />
        <DefinitionLink className="align-left" document="faq" anchor="3a" title={i18n.t('definition.faqLabel')}
          lang={i18n.language} />
      </div>

      {
        renderPrimary &&
        [
          <h3 className="subhead" key={0}>
            {i18n.t('designatedManagementObjective.primaryDesignatedManagementObjective')}
          </h3>,
          <div className="fra-view__section-toolbar" key={1}>
            <div className="support-text no-print">
              {i18n.t('designatedManagementObjective.primaryDesignatedManagementObjectiveSupport')}
            </div>
          </div>,
          <TraditionalTable
            key={2}
            tableSpec={primaryDmoTableSpec}
            countryIso={countryIso}
            section={sectionName}
            disabled={disabled} />
        ]
      }

      {
        renderTotal &&
        [

          <h3 className="subhead" key={0}>
            {i18n.t('designatedManagementObjective.totalAreaWithDesignatedManagementObjective')}
          </h3>,
          <div className="fra-view__section-toolbar" key={1}>
            <div className="support-text ">
              {i18n.t('designatedManagementObjective.totalAreaWithDesignatedManagementObjectiveSupport')}
            </div>
          </div>,
          <TraditionalTable
            key={2}
            tableSpec={totalDmoTableSpec}
            countryIso={countryIso}
            section={sectionName}
            disabled={disabled} />
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
  const i18n = state.user.i18n
  const countryIso = match.params.countryIso
  const extentOfForest = state.extentOfForest
  const primaryDmoTableSpec = primaryDesignatedManagementObjectiveTableSpec(i18n, extentOfForest, countryIso)
  const totalDmoTableSpec = totalAreaWithDesignatedManagementObjectiveTableSpec(i18n)

  return {
    i18n,
    extentOfForest,
    disabled: isFRA2020SectionEditDisabled(state, sectionName),
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