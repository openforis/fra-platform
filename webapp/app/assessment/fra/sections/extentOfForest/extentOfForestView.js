import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as R from 'ramda'

import Icon from '@webapp/components/icon'
import DefinitionLink from '@webapp/components/definitionLink'
import ChartWrapper from '@webapp/app/assessment/fra/sections/extentOfForest/chart/chartWrapper'
import TableWithOdp  from '@webapp/app/assessment/fra/components/tableWithOdp'
import NationalDataDescriptions from '@webapp/app/assessment/components/description/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/app/assessment/components/description/analysisDescriptions'
import GeneralComments from '@webapp/app/assessment/components/description/generalComments'
import TraditionalTable from '@webapp/app/assessment/components/traditionalTable/traditionalTable'
import NationalDataPointsPrintView
  from '@webapp/app/assessment/fra/sections/originalDataPoint/nationalDataPointsPrintView'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useI18n from '@webapp/components/hooks/useI18n'

import { saveCountryConfigSetting } from '@webapp/app/country/actions'
import { fetchItem, generateFraValues } from '@webapp/app/assessment/fra/components/tableWithOdp/actions'
import { fetchLastSectionUpdateTimestamp } from '@webapp/app/components/audit/actions'

import climaticDomainTableSpec from './climaticDomainTableSpec'
import { hasOdps } from '@common/extentOfForestHelper'
import { isAdministrator } from '@common/countryRole'

import FraUtils from '@common/fraUtils'
import { isPrintingMode, isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'

import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'
import * as CountryState from '@webapp/app/country/countryState'
import * as FraState from '@webapp/app/assessment/fra/fraState'

import tableRows from '@webapp/app/assessment/fra/sections/extentOfForest/tableRows'

const anchorName = '1a'
const sectionName = 'extentOfForest'

const ExtentOfForest = (props) => {

  const { i18n, isEditDataDisabled, userInfo, showNDPs, toggleNDPs, hasNDPs, fra, hasData, countryIso } = props

  return <div className='app-view__content'>

    <h1 className="title only-print">
      {`${isPrintingOnlyTables() ? '' : '1a '}${i18n.t('extentOfForest.extentOfForest')}`}
    </h1>

    {
      userInfo &&
      <>
        <Link className={`btn btn-primary no-print${isEditDataDisabled ? ' disabled' : ''}`}
              to={`/country/${props.countryIso}/odp/${sectionName}`}
              style={{ marginRight: 16 }}>
          <Icon className="icon-sub icon-white" name="small-add"/>
          {i18n.t('nationalDataPoint.addNationalDataPoint')}
        </Link>
        <hr className="no-print"/>
      </>
    }

    {
      hasNDPs
        ? isPrintingMode() && <NationalDataPointsPrintView {...props} section={sectionName}/>
        : <>
          <NationalDataDescriptions key="ndd" section={sectionName} countryIso={props.countryIso}
                                    disabled={isEditDataDisabled}/>
          <AnalysisDescriptions key="ad" section={sectionName} countryIso={props.countryIso}
                                disabled={isEditDataDisabled}/>
        </>
    }

    <h2 className="headline no-print">
      {i18n.t('extentOfForest.extentOfForest')}
      {
        isAdministrator(userInfo) && hasNDPs &&
        <button className="btn-s btn-secondary"
                onClick={toggleNDPs}
                style={{ marginLeft: '12px' }}>
          {i18n.t(`extentOfForest.${showNDPs ? 'hideNDPs' : 'showNDPs'}`)}
        </button>
      }
    </h2>

    <div className="app-view__section-toolbar">
      <DefinitionLink
        className="margin-right-big no-print"
        document="tad"
        anchor={anchorName}

        title={i18n.t('definition.definitionLabel')}
        lang={i18n.language}
      />
      <DefinitionLink
        className="align-left no-print"
        document="faq"
        anchor={anchorName}
        title={i18n.t('definition.faqLabel')}
        lang={i18n.language}
      />
    </div>

    {
      (!isPrintingMode() || (!isPrintingOnlyTables() && hasData)) &&
      <>
        <div className="page-break"/>

        <ChartWrapper
          fra={fra}
          trends={[
            { name: 'forestArea', label: i18n.t('fraClass.forest'), color: '#0098a6' },
            { name: 'otherWoodedLand', label: i18n.t('fraClass.otherWoodedLand'), color: '#bf00af' }
          ]}
        />
      </>
    }

    <TableWithOdp
      fra={fra}
      rows={tableRows}
      section={sectionName}
      sectionAnchor={anchorName}
      copyValues={false}
      disabled={isEditDataDisabled}
      generateValues={hasNDPs && showNDPs}
      tableHeaderLabel={i18n.t('extentOfForest.areaUnitLabel')}
      categoryHeaderLabel={i18n.t('extentOfForest.categoryHeader')}
    />
    <TraditionalTable
      sectionAnchor={anchorName}
      tableSpec={climaticDomainTableSpec(i18n, props.climaticDomainPercents2015)}
      countryIso={countryIso}
      section={sectionName}
      disabled={isEditDataDisabled}
    />
    <GeneralComments
      section={sectionName}
      countryIso={countryIso}
      disabled={isEditDataDisabled}
    />
  </div>
}

const DataFetchingComponent = props => {
  const { fra, fraNoNDPs, fetchItem, fetchLastSectionUpdateTimestamp } = props

  const i18n = useI18n()
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()

  const [showNDPs, setshowNDPs] = useState(true)
  const hasNDPs = hasOdps(fra)

  useEffect(() => {
    fetchItem(sectionName, countryIso)
    fetchLastSectionUpdateTimestamp(countryIso, sectionName)
  }, [])

  const data = isPrintingMode()
    ? FraUtils.filterFraYears(fra)
    : showNDPs
      ? fra
      : fraNoNDPs

  const hasData = (data) => {
    return R.pipe(
      R.map(R.omit(['year', 'name', 'type'])),
      R.map(R.values),
      FraUtils.hasData,
    )(data)
  }

  return (
    <ExtentOfForest
      {...props}
      hasData={hasData(data)}
      i18n={i18n}
      countryIso={countryIso}
      userInfo={userInfo}
      fra={data}
      showNDPs={showNDPs}
      hasNDPs={hasNDPs}
      toggleNDPs={() => setshowNDPs(!showNDPs)}
    />
  )
}

const mapStateToProps = state =>
  ({
    ...state.extentOfForest,
    openCommentThread: ReviewState.getOpenThreadTarget(state),
    openCommentThreadTarget: ReviewState.getOpenThreadTarget(state),
    faoStat: CountryState.getConfigFaoStat(state),
    fra2015ForestAreas: CountryState.getConfigFra2015ForestAreas(state),
    climaticDomainPercents2015: CountryState.getConfigClimaticDomainPercents2015(state),
    isEditDataDisabled: FraState.isSectionEditDisabled(sectionName)(state),
  })

export default connect(
  mapStateToProps,
  {
    fetchItem,
    generateFraValues,
    fetchLastSectionUpdateTimestamp,
    saveCountryConfigSetting
  }
)(DataFetchingComponent)
