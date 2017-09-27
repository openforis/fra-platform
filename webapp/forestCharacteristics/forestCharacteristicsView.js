import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Link } from './../link'

import { fetchItem, save, saveMany, generateFraValues } from '../originalDataPoint/actions'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import { DataTable } from '../originalDataPoint/commentableDatatable'
import ChartWrapper from '../nationalDataEntry/chart/chartWrapper'
import { CommentableReviewDescription } from '../description/commentableDescription'
import DefinitionLink from './../reusableUiComponents/definitionLink'

const ForestCharacteristics = props => {
  const disableGenerateFRAValues = () => {
    const odps = R.pipe(
      R.values,
      R.filter(v => v.type === 'odp')
    )(props.fra)
    return props.generatingFraValues || odps.length < 2
  }
  const i18n = props.i18n
  const rows = [
    {
      field: 'naturalForestArea',
      localizedName: i18n.t('forestCharacteristics.naturalForestArea')
    },
    {
      field: 'naturalForestPrimaryArea',
      className: 'fra-table__header-cell-sub',
      localizedName: i18n.t('forestCharacteristics.naturalForestPrimaryArea')
    },
    {
      field: 'plantationForestArea',
      localizedName: i18n.t('forestCharacteristics.plantationForestArea')
    },
    {
      field: 'plantationForestIntroducedArea',
      className: 'fra-table__header-cell-sub',
      localizedName: i18n.t('forestCharacteristics.plantationForestIntroducedArea')
    },
    {
      field: 'otherPlantedForestArea',
      localizedName: i18n.t('forestCharacteristics.otherPlantedForestArea')
    }
  ]
  const rowNames = {
    0: 'naturalForestArea',
    1: 'naturalForestPrimaryArea',
    2: 'plantationForestArea',
    3: 'plantationForestIntroducedArea',
    4: 'otherPlantedForestArea'
  }
  return <div className='nde__data-input-component foc-view'>
    <div className="nde__data-page-header">
      <h1 className="title">{i18n.t('forestCharacteristics.forestCharacteristics')}</h1>
    </div>
    <div className="nde__data-input-header">
      <Link className="btn btn-primary" to={`/country/${props.countryIso}/odp`}>
        <svg className="icon icon-middle icon-white">
          <use xlinkHref="img/icons.svg#small-add"/>
        </svg>
        {i18n.t('nationalDataPoint.addNationalDataPoint')}
      </Link>
    </div>
    <ChartWrapper stateName="forestCharacteristics" trends={[
      {name:'naturalForestArea', label:props.i18n.t('forestCharacteristics.naturalForestArea'), odpColor:'#0098a6', fraPathStroke:'rgba(0,152,166,.35)', odpPathStroke:'rgba(0,152,166,.5)'}
      ]} />
    <div className="nde__data-table-header">
      <h3 className="subhead">{i18n.t('forestCharacteristics.forestCharacteristics')}</h3>
      <DefinitionLink document="tad" anchor="2a" title={i18n.t('definition.definitionLabel')} lang={i18n.language}/>
      <DefinitionLink document="faq" anchor="2a" title={i18n.t('definition.faqLabel')} lang={i18n.language} className="align-left"/>
      <button disabled={disableGenerateFRAValues()} className="btn btn-primary"
              onClick={() => props.generateFraValues('forestCharacteristics', props.countryIso)}>
        {i18n.t('extentOfForest.generateFraValues')}
      </button>
    </div>
    <DataTable section='forestCharacteristics' rows={rows} rowNames={rowNames} {...props} areaUnitLabel={i18n.t('forestCharacteristics.areaUnitLabel')} categoryHeader={i18n.t('forestCharacteristics.categoryHeader')}/>
    <CommentableReviewDescription
      section='forestCharacteristics'
      countryIso={props.countryIso}
      descriptionName={`forestCharacterstics_generalComments`}
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
    this.props.fetchItem('forestCharacteristics', countryIso)
  }

  render () {
    return <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
      <ForestCharacteristics {...this.props} countryIso={this.props.match.params.countryIso}
      />
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => ({
  ...state.forestCharacteristics,
  'openCommentThread': state.review.openThread,
  i18n: state.user.i18n
})

export default connect(mapStateToProps, {fetchItem, save, saveMany, generateFraValues})(DataFetchingComponent)
