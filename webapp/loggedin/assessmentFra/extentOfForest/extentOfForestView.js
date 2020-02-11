import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as R from 'ramda'
import Icon from '@webapp/components/icon'
import DefinitionLink from '@webapp/components/definitionLink'
import ChartWrapper from './chart/chartWrapper'
import { GenerateFraValuesControl, TableWithOdp } from '../../../tableWithOdp/tableWithOdp'
import NationalDataDescriptions from '@webapp/descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '@webapp/descriptionBundles/analysisDescriptions'
import GeneralComments from '@webapp/descriptionBundles/generalComments'
import ReviewIndicator from '@webapp/loggedin/review/reviewIndicator'
import TraditionalTable from '@webapp/traditionalTable/traditionalTable'
import NationalDataPointsPrintView from '../../../originalDataPoint/nationalDataPointsPrintView'

import { saveCountryConfigSetting } from '../../../country/actions'
import { fetchItem, generateFraValues, save, saveMany } from '../../../tableWithOdp/actions'
import { fetchLastSectionUpdateTimestamp } from '@webapp/audit/actions'

import { abs, formatNumber, greaterThanOrEqualTo, lessThanOrEqualTo, sub, sum } from '@common/bignumberUtils'
import climaticDomainTableSpec from './climaticDomainTableSpec'
import { hasOdps } from '@common/extentOfForestHelper'
import { isFRA2020SectionEditDisabled } from '@webapp/utils/assessmentAccess'
import { isAdministrator } from '@common/countryRole'

import FraUtils from '@common/fraUtils'
import { isPrintingMode, isPrintingOnlyTables } from '@webapp/loggedin/printAssessment/printAssessment'
import * as AppState from '@webapp/app/appState'
import * as UserState from '@webapp/user/userState'
import * as CountryState from '@webapp/country/countryState'

const sectionName = 'extentOfForest'
const mapIndexed = R.addIndex(R.map)
const odpValueCellClass = (fraColumn) => fraColumn.type === 'odp' && !isPrintingMode() ? 'odp-value-cell-total' : 'fra-table__calculated-cell'

const ExtentOfForest = (props) => {

  const { i18n, isEditDataDisabled, userInfo, showNDPs, toggleNDPs, hasNDPs, fra, hasData } = props

  const getFaostatValue = year => R.path(['faoStat', year, 'area'], props)
  const getForestArea2015Value = year => R.path(['fra2015ForestAreas', year], props)

  const forestAreaComparedTo2015ValueValidator = fraColumn => {
    const forestAreaFromFra2015 = getForestArea2015Value(fraColumn.name)
    if (R.isNil(forestAreaFromFra2015) || R.isNil(fraColumn.forestArea)) return true
    const tolerance = 1
    const absDifference = abs(sub(forestAreaFromFra2015, fraColumn.forestArea))
    return lessThanOrEqualTo(absDifference, tolerance)
  }

  const calculateOtherLandArea = (fraColumn) => {
    const faoStatLandArea = getFaostatValue(fraColumn.name)
    return sub(faoStatLandArea, sum([fraColumn.forestArea, fraColumn.otherWoodedLand]))
  }

  const fedAreasNotExceedingTotalLandAreaValidator = fraColumn => {
    const otherLandArea = calculateOtherLandArea(fraColumn)
    const faoStatLandArea = getFaostatValue(fraColumn.name)
    if (R.isNil(faoStatLandArea) || R.isNil(otherLandArea)) return true
    return greaterThanOrEqualTo(otherLandArea, 0)
  }

  const forestAreaValidator = fraColumn =>
    forestAreaComparedTo2015ValueValidator(fraColumn) &&
    fedAreasNotExceedingTotalLandAreaValidator(fraColumn) &&
    (fraColumn.type === 'odp' ? !R.isNil(fraColumn.forestArea) : true)

  const otherWoodedLandValidator = fraColumn =>
    fedAreasNotExceedingTotalLandAreaValidator(fraColumn) &&
    (fraColumn.type === 'odp' ? !R.isNil(fraColumn.otherWoodedLand) : true)

  const otherLandValidationClass = fraColumn =>
    fedAreasNotExceedingTotalLandAreaValidator(fraColumn) ? '' : 'validation-error'

  const rowHighlightClass = (target) => props.openCommentThread && R.isEmpty(R.difference(props.openCommentThread.target, [target])) ? 'fra-row-comments__open' : ''

  const otherLandRow = fra =>
    <tr className={rowHighlightClass('otherLand')}>
      <th className="fra-table__header-cell-left">
        {i18n.t('fraClass.otherLand')} (c-a-b)
      </th>
      {
        mapIndexed((fraColumn, i) => {
          const otherLandArea = calculateOtherLandArea(fraColumn)
          return <td className={`${odpValueCellClass(fraColumn)} ${otherLandValidationClass(fraColumn)}`} key={i}>
            {formatNumber(otherLandArea)}
          </td>
        }, R.values(fra))
      }
      <td className="fra-table__row-anchor-cell">
        <div className="fra-table__review-indicator-anchor">
          {
            !isEditDataDisabled && <ReviewIndicator key="totalArea"
                                                    section={sectionName}
                                                    title={i18n.t('fraClass.otherLand')}
                                                    target={['otherLand']}
                                                    countryIso={props.countryIso}/>
          }
        </div>
      </td>
    </tr>

  const faoStatTotalLandAreaRow = fra =>
    <tr className={rowHighlightClass('faoStat')}>
      <th className="fra-table__header-cell-left">
        {props.i18n.t('extentOfForest.totalLandArea')} (c)
      </th>
      {
        mapIndexed((faoStatColumn, i) => {
          const faoStatLandArea = getFaostatValue(faoStatColumn.name)
          return <td className={odpValueCellClass(faoStatColumn)} key={i}>
            {formatNumber(faoStatLandArea)}
          </td>
        }, R.values(fra))
      }
      <td className="fra-table__row-anchor-cell">
        <div className="fra-table__review-indicator-anchor">
          {
            !isEditDataDisabled &&
            <ReviewIndicator key="faoStat"
                             section={sectionName}
                             title={i18n.t('extentOfForest.totalLandArea')}
                             target={['faoStat']}
                             countryIso={props.countryIso}/>
          }
        </div>
      </td>
    </tr>

  const validationErrorMessages = fra =>
    R.map(fraColumn => {
      const validationErrors = [
        fraColumn.type === 'odp' && R.isNil(fraColumn.forestArea)
          ? props.i18n.t('extentOfForest.ndpMissingValues')
          : null,

        !forestAreaComparedTo2015ValueValidator(fraColumn)
          ? props.i18n.t(
          'extentOfForest.forestAreaDoesNotMatchPreviouslyReported',
          { previous: getForestArea2015Value(fraColumn.name) }
          )
          : null,

        !fedAreasNotExceedingTotalLandAreaValidator(fraColumn)
          ? props.i18n.t('extentOfForest.fedAreasExceedTotalLandArea')
          : null
      ]

      return R.reject(R.isNil, validationErrors)
    }, R.values(fra))

  const eofRows = [
    {
      type: 'field',
      field: 'forestArea',
      validator: forestAreaValidator,
      rowHeader: i18n.t('extentOfForest.forestArea'),
      rowVariable: '(a)'
    },
    {
      type: 'field',
      field: 'otherWoodedLand',
      validator: otherWoodedLandValidator,
      rowHeader: i18n.t('fraClass.otherWoodedLand'),
      rowVariable: '(b)'
    },
    {
      type: 'custom',
      render: otherLandRow
    },
    {
      type: 'custom',
      render: faoStatTotalLandAreaRow
    },
    {
      type: 'custom',
      render: () => <tr>
        <td className="fra-table__notice-message-cell" rowSpan="2">{i18n.t('extentOfForest.tableNoticeMessage')}</td>
      </tr>
    },
    {
      type: 'validationErrors',
      validationErrorMessages
    }
  ]

  return <div className='fra-view__content'>

    <h1 className="title only-print">
      {`${isPrintingOnlyTables() ? '' : '1a '}${i18n.t('extentOfForest.extentOfForest')}`}
    </h1>

    <Link className={`btn btn-primary no-print${isEditDataDisabled ? ' disabled' : ''}`}
          to={`/country/${props.countryIso}/odp/${sectionName}`}
          style={{ marginRight: 16 }}>
      <Icon className="icon-sub icon-white" name="small-add"/>
      {i18n.t('nationalDataPoint.addNationalDataPoint')}
    </Link>
    <hr className="no-print"/>

    {
      hasNDPs
        ? isPrintingMode() && <NationalDataPointsPrintView {...props} section={sectionName}/>
        : <>
          <NationalDataDescriptions key="ndd" section={sectionName} countryIso={props.countryIso}
                                    disabled={isEditDataDisabled}/>,
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
    <div className="fra-view__section-toolbar">
      <DefinitionLink className="margin-right-big no-print" document="tad" anchor="1a"
                      title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      <DefinitionLink className="align-left no-print" document="faq" anchor="1a" title={i18n.t('definition.faqLabel')}
                      lang={i18n.language}/>
    </div>

    {
      (!isPrintingMode() || (!isPrintingOnlyTables() && hasData)) &&
      <>
        <div className="page-break" />

        <ChartWrapper
          fra={fra}
          trends={[
            { name: 'forestArea', label: i18n.t('fraClass.forest'), color: '#0098a6' },
            { name: 'otherWoodedLand', label: i18n.t('fraClass.otherWoodedLand'), color: '#bf00af' }
          ]}
        />
      </>
    }

    {
      hasNDPs && showNDPs && !isEditDataDisabled &&
      <div className="fra-view__section-toolbar no-print">
        <GenerateFraValuesControl section={sectionName} rows={eofRows} useOriginalDataPoints={true} {...props} />
        {
          props.odpDirty &&
          <div className="support-text">
            {i18n.t('nationalDataPoint.remindDirtyOdp')}
          </div>
        }
      </div>
    }

    {
      !isPrintingOnlyTables() &&
      <div className="page-break" />
    }

    <TableWithOdp
      section={sectionName}
      rows={eofRows}
      tableHeader={props.i18n.t('extentOfForest.areaUnitLabel')}
      categoryHeader={props.i18n.t('extentOfForest.categoryHeader')}
      {...props}
      fra={fra}
      copyValues={false}
      disabled={isEditDataDisabled}
    />
    <TraditionalTable
      tableSpec={climaticDomainTableSpec(props.i18n, props.climaticDomainPercents2015)}
      countryIso={props.countryIso}
      section={sectionName}
      disabled={isEditDataDisabled}
    />
    <GeneralComments
      section={sectionName}
      countryIso={props.match.params.countryIso}
      disabled={isEditDataDisabled}
    />
  </div>
}

const DataFetchingComponent = props => {
  const { fra, fraNoNDPs, fetchItem, fetchLastSectionUpdateTimestamp } = props
  const countryIso = useSelector(AppState.getCountryIso)

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

  return <ExtentOfForest {...props}
                         hasData={hasData(data)}
                         countryIso={countryIso}
                         fra={data}
                         showNDPs={showNDPs}
                         hasNDPs={hasNDPs}
                         toggleNDPs={() => setshowNDPs(!showNDPs)}/>
}

const mapStateToProps = state =>
  ({
    ...state.extentOfForest,
    openCommentThread: state.review.openThread,
    faoStat: CountryState.getConfigFaoStat(state),
    fra2015ForestAreas: CountryState.getConfigFra2015ForestAreas(state),
    climaticDomainPercents2015: CountryState.getConfigClimaticDomainPercents2015(state),
    i18n: UserState.getI18n(state),
    isEditDataDisabled: isFRA2020SectionEditDisabled(state, sectionName),
    userInfo: UserState.getUserInfo(state)
  })

export default connect(
  mapStateToProps,
  {
    save,
    saveMany,
    fetchItem,
    generateFraValues,
    fetchLastSectionUpdateTimestamp,
    saveCountryConfigSetting
  }
)(DataFetchingComponent)
