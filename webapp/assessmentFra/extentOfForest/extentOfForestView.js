import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import { Link } from '../../reusableUiComponents/link'
import Icon from '../../reusableUiComponents/icon'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import ChartWrapper from './chart/chartWrapper'
import { TableWithOdp, GenerateFraValuesControl } from '../../tableWithOdp/tableWithOdp'
import NationalDataDescriptions from '../../descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '../../descriptionBundles/analysisDescriptions'
import GeneralComments from '../../descriptionBundles/generalComments'
import ReviewIndicator from '../../review/reviewIndicator'
import TraditionalTable from '../../traditionalTable/traditionalTable'
import NationalDataPointsPrintView from '../../originalDataPoint/nationalDataPointsPrintView'

import { saveCountryConfigSetting } from '../../country/actions'
import { fetchItem, save, saveMany, generateFraValues } from '../../tableWithOdp/actions'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'

import { sum, formatNumber, greaterThanOrEqualTo, lessThanOrEqualTo, abs, sub } from '../../../common/bignumberUtils'
import climaticDomainTableSpec from './climaticDomainTableSpec'
import { hasOdps } from './extentOfForestHelper'
import { isFRA2020SectionEditDisabled } from '../../utils/assessmentAccess'
import { isAdministrator } from '../../../common/countryRole'

import FraUtils from '../../../common/fraUtils'
import { isPrintingMode } from '../../printAssessment/printAssessment'

const sectionName = 'extentOfForest'
const mapIndexed = R.addIndex(R.map)
const odpValueCellClass = (fraColumn) => fraColumn.type === 'odp' ? 'odp-value-cell-total' : 'fra-table__calculated-cell'

const ExtentOfForest = (props) => {

  const { i18n, isEditDataDisabled, userInfo, showNDPs, toggleNDPs, hasNDPs } = props

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
            isEditDataDisabled
              ? null
              : <ReviewIndicator key="totalArea"
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
            isEditDataDisabled
              ? null
              : <ReviewIndicator key="faoStat"
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
      1a {i18n.t('extentOfForest.extentOfForest')}
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
        ? isPrintingMode()
          ? <NationalDataPointsPrintView {...props} section={sectionName} />
          : null
        : [
          <NationalDataDescriptions key="ndd" section={sectionName} countryIso={props.countryIso}
                                    disabled={isEditDataDisabled}/>,
          <AnalysisDescriptions key="ad" section={sectionName} countryIso={props.countryIso}
                                disabled={isEditDataDisabled}/>
        ]
    }

    <h2 className="headline no-print">
      {i18n.t('extentOfForest.extentOfForest')}
      {
        isAdministrator(userInfo) && hasNDPs
          ? <button className="btn-s btn-secondary"
                    onClick={toggleNDPs}
                    style={{ marginLeft: '12px' }}>
            {i18n.t(`extentOfForest.${showNDPs ? 'hideNDPs' : 'showNDPs'}`)}
          </button>
          : null
      }
    </h2>
    <div className="fra-view__section-toolbar">
      <DefinitionLink className="margin-right-big no-print" document="tad" anchor="1a"
                      title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      <DefinitionLink className="align-left no-print" document="faq" anchor="1a" title={i18n.t('definition.faqLabel')}
                      lang={i18n.language}/>
    </div>
    <ChartWrapper
      fra={props.fra}
      trends={[
        { name: 'forestArea', label: i18n.t('fraClass.forest'), color: '#0098a6' },
        { name: 'otherWoodedLand', label: i18n.t('fraClass.otherWoodedLand'), color: '#bf00af' }
      ]}
    />
    {
      hasNDPs && showNDPs && !isEditDataDisabled
        ? <div className="fra-view__section-toolbar no-print">
          <GenerateFraValuesControl section={sectionName} rows={eofRows} useOriginalDataPoints={true} {...props} />
          {
            props.odpDirty
              ? <div className="support-text">
                {i18n.t('nationalDataPoint.remindDirtyOdp')}
              </div>
              : null
          }
        </div>
        : null
    }
    <TableWithOdp
      section={sectionName}
      rows={eofRows}
      tableHeader={props.i18n.t('extentOfForest.areaUnitLabel')}
      categoryHeader={props.i18n.t('extentOfForest.categoryHeader')}
      {...props}
      fra={props.fra}
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

class DataFetchingComponent extends React.Component {

  constructor () {
    super()
    this.state = { showNDPs: true }
  }

  componentWillMount () {
    const countryIso = this.props.match.params.countryIso
    this.fetch(countryIso)
    this.props.fetchLastSectionUpdateTimestamp(countryIso, sectionName)
  }

  fetch (countryIso) {
    this.props.fetchItem(sectionName, countryIso)
  }

  render () {
    const { fra, fraNoNDPs } = this.props
    const { showNDPs } = this.state

    const hasNDPs = hasOdps(fra)

    const data = isPrintingMode()
      ? FraUtils.filterFraYears(fra)
      : showNDPs
        ? fra
        : fraNoNDPs

    return <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
      <ExtentOfForest {...this.props}
                      countryIso={this.props.match.params.countryIso}
                      fra={data}
                      showNDPs={showNDPs}
                      hasNDPs={hasNDPs}
                      toggleNDPs={() => this.setState({ showNDPs: !showNDPs })}/>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state =>
  ({
    ...state.extentOfForest,
    openCommentThread: state.review.openThread,
    faoStat: R.path(['country', 'config', 'faoStat'], state),
    fra2015ForestAreas: R.path(['country', 'config', 'fra2015ForestAreas'], state),
    climaticDomainPercents2015: R.path(['country', 'config', 'climaticDomainPercents2015'], state),
    i18n: state.user.i18n,
    isEditDataDisabled: isFRA2020SectionEditDisabled(state, sectionName),
    userInfo: R.path(['user', 'userInfo'], state)
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
