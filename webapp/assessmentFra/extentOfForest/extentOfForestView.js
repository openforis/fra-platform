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
import { TableWithOdp, GenerateFraValuesControl, hasFraValues} from '../../tableWithOdp/tableWithOdp'
import { CommentableDescriptions } from '../../description/commentableDescription'
import countryConfig from '../../../common/countryConfig'
import { sum, formatNumber, eq, greaterThanOrEqualTo, abs, sub, greaterThan } from '../../../common/bignumberUtils'
import ReviewIndicator from '../../review/reviewIndicator'

const sectionName = 'extentOfForest'
const mapIndexed = R.addIndex(R.map)
const odpValueCellClass = (fraColumn) => fraColumn.type === 'odp' ? 'odp-value-cell-total' : 'fra-table__calculated-cell'

const ExtentOfForest = (props) => {

  const i18n = props.i18n

  const totalAreaNotEqualToFaoStat = (fraColumn, totalArea) => {
    const faoStatValue = R.path([props.countryIso, 'faoStat', fraColumn.name], countryConfig)
    if (!faoStatValue) return false // It's normal that we don't have faoStat-values for years
    if (R.isNil(totalArea)) return false
    const tolerance = 1
    const absDifference = abs(sub(faoStatValue, totalArea))
    return greaterThanOrEqualTo(absDifference, tolerance)
  }

  const otherLandValidator = (fraColumn, field) => {
    if (field && R.isNil(fraColumn[field])) return true
    const subCategorySum =sum([
      fraColumn.otherLandPalms,
      fraColumn.otherLandTreeOrchards,
      fraColumn.otherLandAgroforestry,
      fraColumn.otherLandTreesUrbanSettings
    ])
    const otherLand = fraColumn.otherLand
    if (R.isNil(subCategorySum) || R.isNil(otherLand)) return true
    const tolerance = -1
    const difference = sub(otherLand, subCategorySum)
    return greaterThan(difference, tolerance)
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
          const faoStatLandArea = R.path([props.countryIso, 'faoStat', faoStatColumn.name], countryConfig)
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
            !otherLandValidator(fraColumn)
              ? props.i18n.t('generalValidation.subCategoryExceedsParent')
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
      type: 'field',
      field: 'otherLandPalms',
      validator: otherLandValidator,
      className: 'fra-table__subcategory-cell',
      rowHeader: i18n.t('extentOfForest.ofWhichPalms')
    },
    {
      type: 'field',
      field: 'otherLandTreeOrchards',
      validator: otherLandValidator,
      className: 'fra-table__subcategory-cell',
      rowHeader: i18n.t('extentOfForest.ofWhichTreeOrchards')
    },
    {
      type: 'field',
      field: 'otherLandAgroforestry',
      validator: otherLandValidator,
      className: 'fra-table__subcategory-cell',
      rowHeader: i18n.t('extentOfForest.ofWhichAgroforestry')
    },
    {
      type: 'field',
      field: 'otherLandTreesUrbanSettings',
      validator: otherLandValidator,
      className: 'fra-table__subcategory-cell',
      rowHeader: i18n.t('extentOfForest.ofWhichTreesUrbanSettings')
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


  const generateFraValues = (generateMethod) => {
    const generateAnnualChange = () => {
      const valuesRaw = window.prompt('Annual change rate', '-0.1 0.1')
      const [ratePast, rateFuture] = valuesRaw.split(' ')
      if (
        isNaN(ratePast) ||
        isNaN(rateFuture) ||
        ratePast === ' ' ||
        rateFuture === ' '
      ) { return }
      props.generateFraValues(
        'extentOfForest',
        props.countryIso,
        {
          method:
          generateMethod,
          ratePast,
          rateFuture
        }
      )
    }
    const generate = () => {
      if (generateMethod === 'annualChange') {
        generateAnnualChange()
      } else {
        props.generateFraValues('extentOfForest', props.countryIso, {method: generateMethod})
      }
    }
    if (hasFraValues(props.fra, eofRows)) {
      if (window.confirm(i18n.t('extentOfForest.confirmGenerateFraValues'))) {
        generate()
      }
    } else {
      generate()
    }
  }

  return <div className='fra-view__content'>
    <div className="fra-view__page-header">
      <h1 className="title">{i18n.t('extentOfForest.estimationAndForecasting')}</h1>
      <Link className="btn btn-primary align-right" to={`/country/${props.countryIso}/odp`}>
        <Icon className="icon-sub icon-white" name="small-add"/>
        {i18n.t('nationalDataPoint.addNationalDataPoint')}
      </Link>
    </div>
    <ChartWrapper stateName={sectionName} trends={[
      {name: 'forestArea', label: i18n.t('fraClass.forest'), color: '#0098a6'},
      {name: 'otherWoodedLand', label: i18n.t('fraClass.otherWoodedLand'), color: '#bf00af'}
    ]}/>
    <div className="fra-view__section-header">
      <h3 className="subhead">{i18n.t('extentOfForest.extentOfForest')}</h3>
      <DefinitionLink document="tad" anchor="1a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      <DefinitionLink document="faq" anchor="1a" title={i18n.t('definition.faqLabel')} lang={i18n.language}
                      className="align-left"/>
      <GenerateFraValuesControl section={sectionName} rows={eofRows} {...props} />
      {
        props.odpDirty
          ? <div className="support-text">
          <Icon name="alert" className="icon-orange icon-sub icon-margin-right"/>
          {i18n.t('nationalDataPoint.remindDirtyOdp')}
        </div>
          : null
      }
    </div>
    <TableWithOdp
               section={sectionName}
               rows={eofRows}
               areaUnitLabel={props.i18n.t('extentOfForest.areaUnitLabel')}
               categoryHeader={props.i18n.t('extentOfForest.categoryHeader')}
               {...props}/>
    <CommentableDescriptions
      section={sectionName}
      name={sectionName}
      countryIso={props.match.params.countryIso}
      i18n={i18n}
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
    i18n: state.user.i18n
  })

export default connect(
    mapStateToProps,
    {
      save,
      saveMany,
      fetchItem,
      generateFraValues,
      fetchLastSectionUpdateTimestamp
    }
  )(DataFetchingComponent)
