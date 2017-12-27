import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { fetchItem, save, saveMany, generateFraValues } from '../../tableWithOdp/actions'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import { Link } from '../../reusableUiComponents/link'
import Icon from '../../reusableUiComponents/icon'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import ChartWrapper from './chart/chartWrapper'
import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import { TableWithOdp, GenerateFraValuesControl } from '../../tableWithOdp/tableWithOdp'
import NationalDataDescriptions from '../../descriptionBundles/nationalDataDescriptions'
import AnalysisDescriptions from '../../descriptionBundles/analysisDescriptions'
import GeneralComments from '../../descriptionBundles/generalComments'
import { sum, formatNumber, greaterThanOrEqualTo, lessThanOrEqualTo, abs, sub } from '../../../common/bignumberUtils'
import ReviewIndicator from '../../review/reviewIndicator'
import climaticDomainTableSpec from './climaticDomainTableSpec'
import TraditionalTable from '../../traditionalTable/traditionalTable'
import { saveCountryConfigSetting } from '../../country/actions'

const sectionName = 'extentOfForest'
const mapIndexed = R.addIndex(R.map)
const odpValueCellClass = (fraColumn) => fraColumn.type === 'odp' ? 'odp-value-cell-total' : 'fra-table__calculated-cell'

const ExtentOfForest = (props) => {

  const i18n = props.i18n

  const getFaostatValue = year => R.path(['faoStat', year, 'area'], props)
  const getForestArea2015Value = year => R.path(['fra2015ForestAreas', year], props)

  const totalAreaNotEqualToFaoStat = (fraColumn, totalArea) => {
    const faoStatValue = getFaostatValue(fraColumn.name)
    if (!faoStatValue) return false // It's normal that we don't have faoStat-values for years
    if (R.isNil(totalArea)) return false
    const tolerance = 1
    const absDifference = abs(sub(faoStatValue, totalArea))
    return greaterThanOrEqualTo(absDifference, tolerance)
  }

  const forestAreaValidator = (fraColumn) => {
    const forestAreaFromFra2015 = getForestArea2015Value(fraColumn.name)
    if (R.isNil(forestAreaFromFra2015) || R.isNil(fraColumn.forestArea)) return true
    const tolerance = 1
    const absDifference = abs(sub(forestAreaFromFra2015, fraColumn.forestArea))
    return lessThanOrEqualTo(absDifference, tolerance)
  }

  const totalAreaValidationClass = (fraColumn, totalArea) =>
    totalAreaNotEqualToFaoStat(fraColumn, totalArea) ? 'validation-error' : ''

  const rowHighlightClass = (target) => props.openCommentThread && R.isEmpty(R.difference(props.openCommentThread.target, [target])) ? 'fra-row-comments__open' : ''

  const totalAreaRow = fra =>
    <tr className={rowHighlightClass('totalArea')}>
      <th className="fra-table__header-cell-left">
        {i18n.t('extentOfForest.totalLandArea')} (a+b+c)
      </th>
      {
        mapIndexed((fraColumn, i) => {
          const totalLandArea = sum([fraColumn.forestArea, fraColumn.otherWoodedLand, fraColumn.otherLand])
          return <td className={`${odpValueCellClass(fraColumn)} ${totalAreaValidationClass(fraColumn, totalLandArea)}`} key={i}>
            {formatNumber(totalLandArea)}
          </td>
        }, R.values(fra))
      }
      <td className="fra-table__row-anchor-cell">
        <div className="fra-table__review-indicator-anchor">
          <ReviewIndicator
            key="totalArea"
            section={sectionName}
            title={i18n.t('extentOfForest.totalLandArea')}
            target={['totalArea']}
            countryIso={props.countryIso} />
        </div>
      </td>
    </tr>

  const faoStatRow = fra =>
    <tr className={rowHighlightClass('faoStat')}>
      <th className="fra-table__header-cell-left">{props.i18n.t('extentOfForest.faoStatLandArea')}</th>
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
          <ReviewIndicator
            key="faoStat"
            section={sectionName}
            title={i18n.t('extentOfForest.faoStatLandArea')}
            target={['faoStat']}
            countryIso={props.countryIso} />
        </div>
      </td>
    </tr>

  const validationErrorMessages = fra =>
    R.map(fraColumn => {
      const totalLandArea = sum([fraColumn.forestArea, fraColumn.otherWoodedLand, fraColumn.otherLand])
      const validationErrors =
        R.reject(
          R.isNil,
          [
            !forestAreaValidator(fraColumn)
              ? props.i18n.t(
                'extentOfForest.forestAreaDoesNotMatchPreviouslyReported',
                {previous: getForestArea2015Value(fraColumn.name)}
              )
              : null,
            totalAreaNotEqualToFaoStat(fraColumn, totalLandArea)
              ? props.i18n.t('extentOfForest.faoStatMismatch')
              : null
          ]
        )
      return validationErrors
    },R.values(fra))

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
      rowHeader: i18n.t('fraClass.otherWoodedLand'),
      rowVariable: '(b)'
    },
    {
      type: 'field',
      field: 'otherLand',
      rowHeader: i18n.t('fraClass.otherLand'),
      rowVariable: '(c)'
    },
    {
      type: 'custom',
      render: totalAreaRow
    },
    {
      type: 'custom',
      render: faoStatRow
    },
    {
      type: 'validationErrors',
      validationErrorMessages
    }
  ]
  return <div className='fra-view__content'>
    <div className="fra-view__page-header">
      <button
        className={`btn btn-${props.useOriginalDataPoints ? 'secondary' : 'primary'}`}
        onClick={() => {
          props.saveCountryConfigSetting(
            props.countryIso,
            'useOriginalDataPoints',
            !props.useOriginalDataPoints,
            () => props.fetchItem(sectionName, props.countryIso)
          )
        }}
      >
      {
        props.useOriginalDataPoints
        ? i18n.t('extentOfForest.dontUseOriginalDataPoints')
        : i18n.t('extentOfForest.useOriginalDataPoints')
      }
      </button>
      {
        props.useOriginalDataPoints
        ? <Link className="btn btn-primary" to={`/country/${props.countryIso}/odp/${sectionName}`}>
            <Icon className="icon-sub icon-white" name="small-add"/>
            {i18n.t('nationalDataPoint.addNationalDataPoint')}
          </Link>
        : null
      }
    </div>
    {
      props.useOriginalDataPoints
        ? null
        : [
            <NationalDataDescriptions key="ndd" section={sectionName} countryIso={props.countryIso}/>,
            <AnalysisDescriptions key="ad" section={sectionName} countryIso={props.countryIso}/>
          ]
    }
    <h2 className="headline">{i18n.t('extentOfForest.extentOfForest')}</h2>
    <div className="fra-view__section-toolbar">
      <DefinitionLink className="margin-right-big" document="tad" anchor="1a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      <DefinitionLink className="align-left" document="faq" anchor="1a" title={i18n.t('definition.faqLabel')} lang={i18n.language}/>
    </div>
    <ChartWrapper
      fra={props.fra}
      trends={[
        {name: 'forestArea', label: i18n.t('fraClass.forest'), color: '#0098a6'},
        {name: 'otherWoodedLand', label: i18n.t('fraClass.otherWoodedLand'), color: '#bf00af'}
      ]}
    />
    {
      props.useOriginalDataPoints
      ? <div className="fra-view__section-toolbar">
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
    />
    <TraditionalTable
      tableSpec={climaticDomainTableSpec(props.i18n, props.climaticDomainPercents2015)}
      countryIso={props.countryIso}
      section={sectionName}
    />
    <GeneralComments
      section={sectionName}
      countryIso={props.match.params.countryIso}
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

  render () {
    return <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
      <ExtentOfForest {...this.props} countryIso={this.props.match.params.countryIso}/>
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
    useOriginalDataPoints: !!R.path(['country', 'config', 'useOriginalDataPoints'], state),
    i18n: state.user.i18n
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
