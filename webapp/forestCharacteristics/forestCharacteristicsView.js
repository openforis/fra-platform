import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Link } from './../link'

import { fetchItem, save, saveMany, generateFraValues } from '../originalDataPoint/actions'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import { DataTable } from '../originalDataPoint/commentableDatatable'
import ChartWrapper from '../nationalDataEntry/chart/chartWrapper'
import CommentableDescriptions from '../description/commentableDescription'

const ForestCharacteristics = props => {
  const disableGenerateFRAValues = () => {
    const odps = R.pipe(
      R.values,
      R.filter(v => v.type === 'odp')
    )(props.fra)
    return props.generatingFraValues || odps.length < 2
  }
  const rows = [
    {
      field: 'naturalForestArea',
      localizedName: props.i18n.t('forestCharacteristics.naturalForestArea')
    },
    {
      field: 'naturalForestPrimaryArea',
      className: 'fra-table__header-cell-sub',
      localizedName: props.i18n.t('forestCharacteristics.naturalForestPrimaryArea')
    },
    {
      field: 'plantationForestArea',
      localizedName: props.i18n.t('forestCharacteristics.plantationForestArea')
    },
    {
      field: 'plantationForestIntroducedArea',
      className: 'fra-table__header-cell-sub',
      localizedName: props.i18n.t('forestCharacteristics.plantationForestIntroducedArea')
    },
    {
      field: 'otherPlantedForestArea',
      localizedName: props.i18n.t('forestCharacteristics.otherPlantedForestArea')
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
      <h2 className="headline">{props.i18n.t('forestCharacteristics.forestCharacteristics')}</h2>
    </div>
    <div className="nde__data-input-header">
      <Link className="btn btn-primary" to={`/country/${props.countryIso}/odp`}>
        <svg className="icon icon-middle icon-white">
          <use xlinkHref="img/icons.svg#small-add"/>
        </svg>
        {props.i18n.t('nationalDataPoint.addNationalDataPoint')}
      </Link>
    </div>
    <ChartWrapper stateName="forestCharacteristics" trends={['naturalForestArea']} />
    <div className="nde__data-table-header">
      <h3 className="subhead">{props.i18n.t('forestCharacteristics.forestCharacteristicsValues')}</h3>
      <button disabled={disableGenerateFRAValues()} className="btn btn-primary"
              onClick={() => props.generateFraValues('foc', props.countryIso)}>
        {props.i18n.t('extentOfForest.generateFraValues')}
      </button>
    </div>
    <DataTable section='foc' rows={rows} rowNames={rowNames} {...props} />
    <CommentableDescriptions
      section='foc'
      name="forestCharacteristics"
      countryIso={props.countryIso}
      i18n={props.i18n}
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
    this.props.fetchItem('foc', countryIso)
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
