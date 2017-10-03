import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { fetchItem, save, saveMany, generateFraValues } from '../originalDataPoint/actions'
import { Link } from './../link'
import DefinitionLink from './../reusableUiComponents/definitionLink'
import ChartWrapper from './chart/chartWrapper'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import { DataTable } from '../originalDataPoint/commentableDatatable'
import { CommentableReviewDescription } from '../description/commentableDescription'

const NationalDataEntry = (props) => {

  const disableGenerateFRAValues = () => {
    const odps = R.pipe(
      R.values,
      R.filter(v => v.type === 'odp')
    )(props.fra)
    return props.generatingFraValues || odps.length < 2
  }

  const i18n = props.i18n
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
    }
  ]

  const eofRowNames = {
    0: 'forestArea',
    1: 'otherWoodedLand',
    2: 'otherLand',
    3: 'otherLandPalms',
    4: 'otherLandTreeOrchards',
    5: 'otherLandAgroforestry',
    6: 'otherLandTreesUrbanSettings'
  }

  return <div className='nde__data-input-component'>
    <div className="nde__data-page-header">
      <h1 className="title">{i18n.t('extentOfForest.extentOfForest')}</h1>
    </div>

    <div className='nde__comment-transition'>
      <div className="nde__data-input-header">
        <Link className="btn btn-primary" to={`/country/${props.countryIso}/odp`}>
          <svg className="icon icon-sub icon-white">
            <use xlinkHref="img/icons.svg#small-add"/>
          </svg>
          {i18n.t('nationalDataPoint.addNationalDataPoint')}
        </Link>
      </div>
      <ChartWrapper stateName="nationalDataEntry" trends={[
        {name:'forestArea', label:i18n.t('fraClass.forest'), color:'#0098a6'},
        {name:'otherWoodedLand', label:i18n.t('fraClass.otherWoodedLand'), color:'#bf00af'}
        ]}/>
    </div>

    <div className="nde__data-table-header">
      <h3 className="subhead">{i18n.t('extentOfForest.extentOfForest')}</h3>
      <DefinitionLink document="tad" anchor="1a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      <DefinitionLink document="faq" anchor="1a" title={i18n.t('definition.faqLabel')} lang={i18n.language} className="align-left"/>
      <button disabled={disableGenerateFRAValues()} className="btn btn-primary"
              onClick={() => props.generateFraValues('extentOfForest', props.countryIso)}>
        {i18n.t('extentOfForest.generateFraValues')}
      </button>
    </div>
    <DataTable section='extentOfForest' rows={eofRows} rowNames={eofRowNames} {...props} areaUnitLabel={props.i18n.t('extentOfForest.areaUnitLabel')} categoryHeader={props.i18n.t('extentOfForest.categoryHeader')} />
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
    this.fetch(this.props.match.params.countryIso)
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
      <NationalDataEntry {...this.props} countryIso={this.props.match.params.countryIso}/>
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state =>
  ({
    ...state.nationalDataEntry,
    'openCommentThread': state.review.openThread,
    i18n: state.user.i18n
  })

export default connect(mapStateToProps, {save, saveMany, fetchItem, generateFraValues})(DataFetchingComponent)
