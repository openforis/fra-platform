import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { fetchItem, save, saveMany, generateFraValues } from '../originalDataPoint/actions'
import { fetchLastSectionUpdateTimestamp } from '../audit/actions'
import { Link } from './../link'
import DefinitionLink from './../reusableUiComponents/definitionLink'
import ChartWrapper from './chart/chartWrapper'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import { TableWithOdp } from '../originalDataPoint/tableWithOdp'
import { CommentableReviewDescription } from '../description/commentableDescription'
import countryConfig from '../../common/countryConfig'
import { add, formatNumber, eq } from '../../common/bignumberUtils'

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

  const totalAreaRow = fra => {
    return <tr>
      <td className="fra-table__header-cell">
        Total land area
      </td>
      {
        R.map(
          fraColumn => {
            const totalLandArea = add(fraColumn.forestArea, add(fraColumn.otherWoodedLand, fraColumn.otherLand))
            return <td className={`fra-table__aggregate-cell ${totalAreaValidationClass(fraColumn, totalLandArea)}`}>
              {formatNumber(totalLandArea)}
            </td>
          },
          R.values(fra)
        )
      }
    </tr>
  }

  const faoStatRow = fra => <tr>
    <td className="eof-table__faostat-header">{props.i18n.t('extentOfForest.faoStatLandArea')}</td>
    {
      R.addIndex(R.map)((value, i) =>
          <td className="eof-table__faostat-cell" key={i}>
            {R.path([props.countryIso, 'faoStat', value.name], countryConfig)}
          </td>,
        R.values(props.fra))
    }
  </tr>

  const eofRows = [
    {
      field: 'forestArea',
      localizedName: i18n.t('extentOfForest.forestArea')
    },
    {
      field: 'otherWoodedLand',
      localizedName: i18n.t('fraClass.otherWoodedLand')
    },
    {
      field: 'otherLand',
      localizedName: i18n.t('fraClass.otherLand')
    },
    {
      field: 'otherLandPalms',
      className: 'fra-table__header-cell-sub',
      localizedName: i18n.t('extentOfForest.ofWhichPalms')
    },
    {
      field: 'otherLandTreeOrchards',
      className: 'fra-table__header-cell-sub',
      localizedName: i18n.t('extentOfForest.ofWhichTreeOrchards')
    },
    {
      field: 'otherLandAgroforestry',
      className: 'fra-table__header-cell-sub',
      localizedName: i18n.t('extentOfForest.ofWhichAgroforestry')
    },
    {
      field: 'otherLandTreesUrbanSettings',
      className: 'fra-table__header-cell-sub',
      localizedName: i18n.t('extentOfForest.ofWhichTreesUrbanSettings')
    },
    {
      customRenderRow: totalAreaRow
    },
    {
      customRenderRow: faoStatRow
    }
  ]

  return <div className='fra-view__content'>
    <div className="fra-view__page-header">
      <h1 className="title">{i18n.t('extentOfForest.extentOfForest')}</h1>
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

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      this.fetch(next.match.params.countryIso)
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
