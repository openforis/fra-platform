import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { fetchItem, save, saveMany, generateFraValues } from '../../tableWithOdp/actions'
import { fetchLastSectionUpdateTimestamp } from '../../audit/actions'
import { Link } from '../../reusableUiComponents/link'
import DefinitionLink from '../../reusableUiComponents/definitionLink'
import ChartWrapper from './chart/chartWrapper'
import LoggedInPageTemplate from '../../app/loggedInPageTemplate'
import { TableWithOdp } from '../../tableWithOdp/tableWithOdp'
import { CommentableReviewDescription } from '../../description/commentableDescription'
import countryConfig from '../../../common/countryConfig'
import { sum, formatNumber, eq } from '../../../common/bignumberUtils'

const mapIndexed = R.addIndex(R.map)
const odpValueCellClass = (fraColumn) => fraColumn.type === 'odp' ? 'odp-value-cell-total' : 'fra-table__calculated-cell'

const ExtentOfForest = (props) => {

  const disableGenerateFRAValues = () => {
    const odps = R.pipe(
      R.values,
      R.filter(v => v.type === 'odp')
    )(props.fra)
    return props.generatingFraValues || odps.length < 2
  }

  const i18n = props.i18n

  const totalAreaNotEqualToFaoStat = (fraColumn, totalArea) => {
    const faoStatValue = R.path([props.countryIso, 'faoStat', fraColumn.name], countryConfig)
    if (!faoStatValue) return false // It's normal that we don't have faoStat-values for years
    if (R.isNil(totalArea)) return false
    return !eq(faoStatValue, totalArea)
  }

  const totalAreaValidationClass = (fraColumn, totalArea) =>
    totalAreaNotEqualToFaoStat(fraColumn, totalArea) ? 'validation-error' : ''

  const totalAreaRow = fra =>
    <tr key="totalArea">
      <th className="fra-table__header-cell-left">
        {props.i18n.t('extentOfForest.totalLandArea')}
      </th>
      {
        mapIndexed((fraColumn, i) => {
          const totalLandArea = sum([fraColumn.forestArea, fraColumn.otherWoodedLand, fraColumn.otherLand])
          return <td className={`${odpValueCellClass(fraColumn)} ${totalAreaValidationClass(fraColumn, totalLandArea)}`} key={i}>
            {formatNumber(totalLandArea)}
          </td>
        }, R.values(fra))
      }
    </tr>

  const faoStatRow = fra =>
    <tr key="faoStat">
      <th className="fra-table__header-cell-left">{props.i18n.t('extentOfForest.faoStatLandArea')}</th>
      {
        mapIndexed((faoStatColumn, i) => {
          const faoStatLandArea = R.path([props.countryIso, 'faoStat', faoStatColumn.name], countryConfig)
          return <td className={`fra-table__calculated-cell ${odpValueCellClass(faoStatColumn)}`} key={i}>
            {formatNumber(faoStatLandArea)}
          </td>
        }, R.values(fra))
      }
    </tr>

  const validationErrorMessages = fra =>
    R.map(fraColumn => {
      const totalLandArea = sum([fraColumn.forestArea, fraColumn.otherWoodedLand, fraColumn.otherLand])
      return totalAreaNotEqualToFaoStat(fraColumn, totalLandArea)
        ? props.i18n.t('extentOfForest.faoStatMismatch')
        : null
    },R.values(fra))

  const eofRows = [
    {
      type: 'field',
      field: 'forestArea',
      localizedName: i18n.t('extentOfForest.forestArea')
    },
    {
      type: 'field',
      field: 'otherWoodedLand',
      localizedName: i18n.t('fraClass.otherWoodedLand')
    },
    {
      type: 'field',
      field: 'otherLand',
      localizedName: i18n.t('fraClass.otherLand')
    },
    {
      type: 'field',
      field: 'otherLandPalms',
      className: 'fra-table__subcategory-cell',
      localizedName: i18n.t('extentOfForest.ofWhichPalms')
    },
    {
      type: 'field',
      field: 'otherLandTreeOrchards',
      className: 'fra-table__subcategory-cell',
      localizedName: i18n.t('extentOfForest.ofWhichTreeOrchards')
    },
    {
      type: 'field',
      field: 'otherLandAgroforestry',
      className: 'fra-table__subcategory-cell',
      localizedName: i18n.t('extentOfForest.ofWhichAgroforestry')
    },
    {
      type: 'field',
      field: 'otherLandTreesUrbanSettings',
      className: 'fra-table__subcategory-cell',
      localizedName: i18n.t('extentOfForest.ofWhichTreesUrbanSettings')
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
      <h1 className="title">{i18n.t('extentOfForest.estimationAndForecasting')}</h1>
      <Link className="btn btn-primary align-right" to={`/country/${props.countryIso}/odp`}>
        <svg className="icon icon-sub icon-white">
          <use xlinkHref="img/icons.svg#small-add"/>
        </svg>
        {i18n.t('nationalDataPoint.addNationalDataPoint')}
      </Link>
    </div>
    <ChartWrapper stateName="extentOfForest" trends={[
      {name: 'forestArea', label: i18n.t('fraClass.forest'), color: '#0098a6'},
      {name: 'otherWoodedLand', label: i18n.t('fraClass.otherWoodedLand'), color: '#bf00af'}
    ]}/>
    <div className="fra-view__section-header">
      <h3 className="subhead">{i18n.t('extentOfForest.extentOfForest')}</h3>
      <DefinitionLink document="tad" anchor="1a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      <DefinitionLink document="faq" anchor="1a" title={i18n.t('definition.faqLabel')} lang={i18n.language}
                      className="align-left"/>
      <button disabled={disableGenerateFRAValues()} className="btn btn-primary"
              onClick={() => props.generateFraValues('extentOfForest', props.countryIso)}>
        {i18n.t('extentOfForest.generateFraValues')}
      </button>
    </div>
    <TableWithOdp
               section='extentOfForest'
               rows={eofRows}
               areaUnitLabel={props.i18n.t('extentOfForest.areaUnitLabel')}
               categoryHeader={props.i18n.t('extentOfForest.categoryHeader')}
               {...props}/>
    <CommentableReviewDescription
      section='extentOfForest'
      countryIso={props.match.params.countryIso}
      descriptionName={`extentOfForest_generalComments`}
      commentTarget={['generalComments']}
      descriptionTitle={i18n.t('description.generalCommentsTitle')}
      i18n={i18n}
    />
  </div>
}

class DataFetchingComponent extends React.Component {
  componentWillMount () {
    const countryIso = this.props.match.params.countryIso
    this.fetch(countryIso)
    this.props.fetchLastSectionUpdateTimestamp(countryIso, 'extentOfForest')
  }

  fetch (countryIso) {
    this.props.fetchItem('extentOfForest', countryIso)
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
    'openCommentThread': state.review.openThread,
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
