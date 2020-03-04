import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import { isFRA2020SectionEditDisabled } from '@webapp/utils/assessmentAccess'
import { isPrintingMode, isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'
import { hasOdps } from '@common/extentOfForestHelper'

import TableWithOdp from '@webapp/app/assessment/fra/components/tableWithOdp'
import ChartWrapper from '@webapp/app/assessment/fra/sections/extentOfForest/chart/chartWrapper'
import NationalDataDescriptions from '@webapp/components/description/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/components/description/analysisDescriptions'
import GeneralComments from '@webapp/components/description/generalComments'
import DefinitionLink from '@webapp/components/definitionLink'
import NationalDataPointsPrintView
  from '@webapp/app/assessment/fra/sections/originalDataPoint/nationalDataPointsPrintView'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

import FraUtils from '@common/fraUtils'
import * as AppState from '@webapp/app/appState'
import * as CountryState from '@webapp/app/country/countryState'
import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'

import { fetchItem, generateFraValues } from '@webapp/app/assessment/fra/components/tableWithOdp/actions'
import { fetchLastSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'
import { saveCountryConfigSetting } from '@webapp/app/country/actions'

import tableRows from '@webapp/app/assessment/fra/sections/forestCharacteristics/tableRows'

const anchorName = '1b'
const sectionName = 'forestCharacteristics'

const ForestCharacteristics = props => {

  const { i18n, isEditDataDisabled, fra, hasData, useOriginalDataPoints, useOriginalDataPointsInFoc } = props

  const handleOdpButtonClick = () => {
    props.saveCountryConfigSetting(
      props.countryIso,
      'useOriginalDataPointsInFoc',
      !useOriginalDataPointsInFoc,
      () => props.fetchItem(sectionName, props.countryIso)
    )
  }

  return <div className='app-view__content'>

    <h1 className="title only-print">
      {`${isPrintingOnlyTables() ? '' : '1b '}${i18n.t('forestCharacteristics.forestCharacteristics')}`}
    </h1>

    {
      useOriginalDataPoints
        ? <>
          <button className={`btn btn-${useOriginalDataPointsInFoc ? 'secondary' : 'primary'} no-print`}
                  onClick={() => handleOdpButtonClick()}
                  disabled={isEditDataDisabled}>
            {
              useOriginalDataPointsInFoc
                ? i18n.t('forestCharacteristics.dontUseOriginalDataPoints')
                : i18n.t('forestCharacteristics.useOriginalDataPoints')
            }
          </button>
          <hr className="no-print"/>
        </>
        : null
    }
    {
      useOriginalDataPointsInFoc
        ? isPrintingMode()
        ? <NationalDataPointsPrintView {...props} section={sectionName}/>
        : null
        : <>
          <NationalDataDescriptions section={sectionName} countryIso={props.countryIso}
                                    disabled={isEditDataDisabled}/>
          <AnalysisDescriptions section={sectionName} countryIso={props.countryIso}
                                disabled={isEditDataDisabled}/>
        </>
    }
    <h2 className="headline no-print">
      {i18n.t('forestCharacteristics.forestCharacteristics')}
    </h2>
    <div className="app-view__section-toolbar no-print">
      <DefinitionLink className="margin-right-big" document="tad" anchor={anchorName}
                      title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      <DefinitionLink className="align-left" document="faq" anchor={anchorName} title={i18n.t('definition.faqLabel')}
                      lang={i18n.language}/>
    </div>

    {
      (!isPrintingMode() || (!isPrintingOnlyTables() && hasData)) &&
      <>
        <div className="page-break"/>

        <ChartWrapper
          fra={fra}
          trends={[
            {
              name: 'naturalForestArea',
              label: props.i18n.t('forestCharacteristics.naturalForestArea'),
              color: '#0098a6'
            },
            {
              name: 'plantationForestArea',
              label: props.i18n.t('forestCharacteristics.plantationForestArea'),
              color: '#bf00af'
            },
            {
              name: 'otherPlantedForestArea',
              label: props.i18n.t('forestCharacteristics.otherPlantedForestArea'),
              color: '#f58833'
            }
          ]}
        />
      </>
    }

    <TableWithOdp
      fra={fra}
      rows={tableRows}
      section={sectionName}
      sectionAnchor={anchorName}
      disabled={isEditDataDisabled}
      generateValues={useOriginalDataPointsInFoc}
      useOriginalDataPoints={useOriginalDataPoints}
      tableHeaderLabel={i18n.t('forestCharacteristics.areaUnitLabel')}
      categoryHeaderLabel={i18n.t('forestCharacteristics.categoryHeader')}
    />
    <GeneralComments
      section={sectionName}
      countryIso={props.match.params.countryIso}
      disabled={isEditDataDisabled}
    />
  </div>
}

const DataFetchingComponent = props => {
  const { fra, fetchItem, fetchLastSectionUpdateTimestamp } = props
  const countryIso = useSelector(AppState.getCountryIso)
  const userInfo = useUserInfo()
  const i18n = useI18n()

  const hasData = (data) => {
    return R.pipe(
      R.map(R.omit(['year', 'name', 'type'])),
      R.map(R.values),
      FraUtils.hasData,
    )(data)
  }

  const data = fra && isPrintingMode() ? FraUtils.filterFraYears(fra) : fra
  const render = isPrintingOnlyTables() ? hasData(data) : true

  useEffect(() => {
    fetchItem(sectionName, countryIso)
    fetchLastSectionUpdateTimestamp(countryIso, sectionName)
  }, [])

  if (!render) return null
  return <ForestCharacteristics
    {...props}
    hasData={hasData(data)}
    countryIso={countryIso}
    userInfo={userInfo}
    fra={data}
    i18n={i18n}
  />
}

const mapStateToProps = state => {
  //System-wide data-point enabling for country is done  by adding one or more ODPs in table 1a
  const useOriginalDataPoints = hasOdps(R.path(['extentOfForest', 'fra'], state))
  const useOriginalDataPointsInFoc = !!CountryState.getConfigUseOriginalDataPointsInFoc(state)

  return {
    ...state.forestCharacteristics,
    openCommentThread: ReviewState.getOpenThread(state),
    openCommentThreadTarget: ReviewState.getOpenThreadTarget(state),
    extentOfForest: state.extentOfForest,
    useOriginalDataPoints: useOriginalDataPoints,
    // Only if ODPs are enabled system-wide and ALSO locally, they are enabled:
    useOriginalDataPointsInFoc: useOriginalDataPoints && useOriginalDataPointsInFoc,
    isEditDataDisabled: isFRA2020SectionEditDisabled(state, sectionName)
  }
}

export default connect(
  mapStateToProps,
  {
    fetchItem,
    generateFraValues,
    fetchLastSectionUpdateTimestamp,
    saveCountryConfigSetting
  }
)(DataFetchingComponent)
