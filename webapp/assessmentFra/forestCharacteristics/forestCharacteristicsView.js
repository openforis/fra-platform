import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Link } from '../../reusableUiComponents/link'
import { fetchItem, save, saveMany, generateFraValues } from '../../tableWithOdp/actions'
import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import { TableWithOdp, GenerateFraValuesControl } from '../../tableWithOdp/tableWithOdp'
import ChartWrapper from '../extentOfForest/chart/chartWrapper'
import NationalDataDescriptions from '../../descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '../../descriptionBundles/analysisDescriptions'
import GeneralComments from '../../descriptionBundles/generalComments'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import { saveCountryConfigSetting } from '../../country/actions'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import { sum, formatNumber, greaterThanOrEqualTo, abs, sub, greaterThan } from '../../../common/bignumberUtils'
import { getForestAreaForYear } from '../../../common/extentOfForestHelper'
import ReviewIndicator from '../../review/reviewIndicator'
import NationalDataPointsPrintView from '../../originalDataPoint/nationalDataPointsPrintView'

import { hasOdps } from '../../../common/extentOfForestHelper'
import { isFRA2020SectionEditDisabled } from '../../utils/assessmentAccess'
import { isPrintingMode, isPrintingOnlyTables } from '../../printAssessment/printAssessment'

import FraUtils from '../../../common/fraUtils'

const mapIndexed = R.addIndex(R.map)
const sectionName = 'forestCharacteristics'
const odpValueCellClass = (fraColumn) => fraColumn.type === 'odp' ? 'odp-value-cell-total' : 'fra-table__calculated-cell'

const ForestCharacteristics = props => {

  const { i18n, isEditDataDisabled } = props

  const totalForestArea = (fraColumn) =>
    sum([
      fraColumn.plantationForestArea,
      fraColumn.otherPlantedForestArea,
      fraColumn.naturalForestArea
    ])

  const totalForestAreaNotEqualToExtentOfForest = (eofForestArea, totalForestArea) => {
    if (R.isNil(eofForestArea)) return false
    if (R.isNil(totalForestArea)) return false
    const tolerance = 1
    const absDifference = abs(sub(eofForestArea, totalForestArea))
    return greaterThanOrEqualTo(absDifference, tolerance)
  }

  const plantationForestValidator = fraColumn => {
    const plantationForest = fraColumn.plantationForestArea
    const introduced = fraColumn.plantationForestIntroducedArea
    if (R.isNil(plantationForest) || R.isNil(introduced)) return true
    const tolerance = -1
    const difference = sub(plantationForest, introduced)
    return greaterThan(difference, tolerance)
  }

  const rowHighlightClass = (target) => props.openCommentThread && R.isEmpty(R.difference(props.openCommentThread.target, [target])) ? 'fra-row-comments__open' : ''

  const plantedForestRow = fra =>
    <tr className={rowHighlightClass('plantedForest')}>
      <th className="fra-table__header-cell-left">
        {i18n.t('forestCharacteristics.plantedForest')} (b)
      </th>
      {
        mapIndexed((fraColumn, i) => {
          const plantedForestArea = sum([fraColumn.plantationForestArea, fraColumn.otherPlantedForestArea])
          return <td className={odpValueCellClass(fraColumn)} key={i}>
            {formatNumber(plantedForestArea)}
          </td>
        }, R.values(fra))
      }
      <td className="fra-table__row-anchor-cell">
        <div className="fra-table__review-indicator-anchor">
          {
            isEditDataDisabled
              ? null
              : <ReviewIndicator key="plantedForest"
                                 section={sectionName}
                                 title={i18n.t('forestCharacteristics.plantedForest')}
                                 target={['plantedForest']}
                                 countryIso={props.countryIso}/>
          }
        </div>
      </td>
    </tr>

  const totalRow = fra =>
    <tr className={rowHighlightClass('total')}>
      <th className="fra-table__header-cell-left">
        {i18n.t('forestCharacteristics.total')} (a+b)
      </th>
      {
        mapIndexed((fraColumn, i) => {
          const forestArea = totalForestArea(fraColumn)
          const eofForestArea = getForestAreaForYear(props.extentOfForest, fraColumn.name)
          const validationErrorClass =
            totalForestAreaNotEqualToExtentOfForest(eofForestArea, forestArea)
              ? 'validation-error'
              : ''
          return <td className={`${odpValueCellClass(fraColumn)} ${validationErrorClass}`} key={i}>
            {formatNumber(forestArea)}
          </td>
        }, R.values(fra))
      }
      <td className="fra-table__row-anchor-cell">
        <div className="fra-table__review-indicator-anchor">
          {
            isEditDataDisabled
              ? null
              : <ReviewIndicator key="total"
                                 section={sectionName}
                                 title={i18n.t('forestCharacteristics.total')}
                                 target={['total']}
                                 countryIso={props.countryIso}/>
          }
        </div>
      </td>
    </tr>

  const totalForestAreaRow = fra =>
    <tr className={rowHighlightClass('totalForestArea')}>
      <th className="fra-table__header-cell-left">
        <div className="only-print">
          {i18n.t('forestCharacteristics.totalForestArea')}
        </div>
        <Link to={`/country/${props.countryIso}/extentOfForest`} className="link no-print">
          {i18n.t('forestCharacteristics.totalForestArea')}
        </Link>
      </th>
      {
        mapIndexed((fraColumn, i) => {
          const eofForestArea = getForestAreaForYear(props.extentOfForest, fraColumn.name)
          return <td className={`${odpValueCellClass(fraColumn)}`} key={i}>
            {formatNumber(eofForestArea)}
          </td>
        }, R.values(fra))
      }
      <td className="fra-table__row-anchor-cell">
        <div className="fra-table__review-indicator-anchor">
          {
            isEditDataDisabled
              ? null
              : <ReviewIndicator key="totalForestArea"
                                 section={sectionName}
                                 title={i18n.t('forestCharacteristics.totalForestArea')}
                                 target={['totalForestArea']}
                                 countryIso={props.countryIso}/>
          }
        </div>
      </td>
    </tr>

  const validationErrorMessages = fra =>
    R.map(fraColumn => {
      const forestArea = totalForestArea(fraColumn)
      const eofForestArea = getForestAreaForYear(props.extentOfForest, fraColumn.name)
      const validationErrors =
        R.reject(
          R.isNil,
          [
            !plantationForestValidator(fraColumn)
              ? i18n.t('generalValidation.subCategoryExceedsParent')
              : null,
            totalForestAreaNotEqualToExtentOfForest(eofForestArea, forestArea)
              ? i18n.t('generalValidation.forestAreaDoesNotMatchExtentOfForest')
              : null
          ]
        )
      return validationErrors
    }, R.values(fra))

  const focRows = [
    {
      type: 'field',
      field: 'naturalForestArea',
      rowHeader: i18n.t('forestCharacteristics.naturalForestArea'),
      rowVariable: '(a)'
    },
    {
      type: 'custom',
      render: plantedForestRow
    },
    {
      type: 'field',
      field: 'plantationForestArea',
      rowHeader: i18n.t('forestCharacteristics.plantationForestArea')
    },
    {
      type: 'field',
      field: 'plantationForestIntroducedArea',
      validator: plantationForestValidator,
      className: 'fra-table__subcategory-cell',
      rowHeader: i18n.t('forestCharacteristics.plantationForestIntroducedArea')
    },
    {
      type: 'field',
      field: 'otherPlantedForestArea',
      rowHeader: i18n.t('forestCharacteristics.otherPlantedForestArea')
    },
    {
      type: 'custom',
      render: totalRow
    },
    {
      type: 'custom',
      render: totalForestAreaRow
    },
    {
      type: 'custom',
      render: () => <tr>
        <td rowSpan="2"></td>
      </tr>
    },
    {
      type: 'validationErrors',
      validationErrorMessages
    }
  ]

  const handleOdpButtonClick = () => {
    props.saveCountryConfigSetting(
      props.countryIso,
      'useOriginalDataPointsInFoc',
      !props.useOriginalDataPointsInFoc,
      () => props.fetchItem(sectionName, props.countryIso)
    )
  }

  return <div className='fra-view__content'>

    <h1 className="title only-print">
      {`${isPrintingOnlyTables() ? '' : '1b '}${i18n.t('forestCharacteristics.forestCharacteristics')}`}
    </h1>

    {
      props.useOriginalDataPoints
        ? [
          <button key="odpButton"
                  className={`btn btn-${props.useOriginalDataPointsInFoc ? 'secondary' : 'primary'} no-print`}
                  onClick={() => handleOdpButtonClick()}
                  disabled={isEditDataDisabled}>
            {
              props.useOriginalDataPointsInFoc
                ? i18n.t('forestCharacteristics.dontUseOriginalDataPoints')
                : i18n.t('forestCharacteristics.useOriginalDataPoints')
            }
          </button>,
          <hr key="separator" className="no-print"/>
        ]
        : null
    }
    {
      props.useOriginalDataPointsInFoc
        ? isPrintingMode()
        ? <NationalDataPointsPrintView {...props} section={sectionName}/>
        : null
        : [
          <NationalDataDescriptions key="ndd" section={sectionName} countryIso={props.countryIso}
                                    disabled={isEditDataDisabled}/>,
          <AnalysisDescriptions key="ad" section={sectionName} countryIso={props.countryIso}
                                disabled={isEditDataDisabled}/>
        ]
    }
    <h2 className="headline no-print">
      {i18n.t('forestCharacteristics.forestCharacteristics')}
    </h2>
    <div className="fra-view__section-toolbar no-print">
      <DefinitionLink className="margin-right-big" document="tad" anchor="1b"
                      title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      <DefinitionLink className="align-left" document="faq" anchor="1b" title={i18n.t('definition.faqLabel')}
                      lang={i18n.language}/>
    </div>

    {
      !isPrintingOnlyTables() &&
      [
        <div className="page-break" key={0}/>,

        <ChartWrapper
          key={1}
          fra={props.fra}
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
      ]
    }
    {
      props.useOriginalDataPointsInFoc && !isEditDataDisabled
        ? <div className="fra-view__section-toolbar no-print">
          <GenerateFraValuesControl section={sectionName} rows={focRows} {...props} />
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
      rows={focRows}
      tableHeader={i18n.t('forestCharacteristics.areaUnitLabel')}
      categoryHeader={i18n.t('forestCharacteristics.categoryHeader')}
      {...props}
      fra={props.fra}
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
  componentWillMount () {
    const countryIso = this.props.match.params.countryIso
    this.fetch(countryIso)
    this.props.fetchLastSectionUpdateTimestamp(countryIso, sectionName)
  }

  fetch (countryIso) {
    this.props.fetchItem(sectionName, countryIso)
  }

  hasData (data) {
    return R.pipe(
      R.map(R.omit(['year', 'name', 'type'])),
      R.map(R.values),
      FraUtils.hasData,
    )(data)
  }

  render () {
    const { fra } = this.props
    const data = fra && isPrintingMode() ? FraUtils.filterFraYears(fra) : fra

    const render = isPrintingOnlyTables() ? this.hasData(data) : true

    return render && (
      <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>

        <ForestCharacteristics
          {...this.props}
          countryIso={this.props.match.params.countryIso}
          fra={data}
        />

      </LoggedInPageTemplate>
    )
  }
}

const mapStateToProps = state => {
  //System-wide data-point enabling for country is done  by adding one or more ODPs in table 1a
  const useOriginalDataPoints = hasOdps(R.path(['extentOfForest', 'fra'], state))
  const useOriginalDataPointsInFoc = !!R.path(['country', 'config', 'useOriginalDataPointsInFoc'], state)

  return {
    ...state.forestCharacteristics,
    openCommentThread: state.review.openThread,
    i18n: state.user.i18n,
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
    save,
    saveMany,
    fetchItem,
    generateFraValues,
    fetchLastSectionUpdateTimestamp,
    saveCountryConfigSetting
  }
)(DataFetchingComponent)
