import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { fetchItem, save, saveMany, generateFraValues } from '../originalDataPoint/actions'
import { fetchLastSectionUpdateTimestamp } from '../audit/actions'
import { Link } from './../reusableUiComponents/link'
import DefinitionLink from './../reusableUiComponents/definitionLink'
import ChartWrapper from './chart/chartWrapper'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import { TableWithOdp } from '../originalDataPoint/tableWithOdp'
import { CommentableReviewDescription } from '../description/commentableDescription'

const ExtentOfForest = (props) => {

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
    <TableWithOdp section='extentOfForest' rows={eofRows} rowNames={eofRowNames} {...props}
               areaUnitLabel={props.i18n.t('extentOfForest.areaUnitLabel')}
               categoryHeader={props.i18n.t('extentOfForest.categoryHeader')}/>
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
