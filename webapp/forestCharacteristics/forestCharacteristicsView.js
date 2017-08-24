import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import { fetchItem, save, saveMany } from '../originalDataPoint/actions'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import { DataTable } from '../originalDataPoint/commentableDatatable'
import ChartWrapper from '../nationalDataEntry/chart/chartWrapper'

const ForestCharacteristics = props => {
  const rows = [
    {
      field: 'naturalForestArea',
      localizedName: props.i18n.t('forestCharacteristics.naturalForestArea')
    },
    {
      field: 'naturalForestPrimaryArea',
      localizedName: props.i18n.t('forestCharacteristics.naturalForestPrimaryArea')
    },
    {
      field: 'plantationForestArea',
      localizedName: props.i18n.t('forestCharacteristics.plantationForestArea')
    },
    {
      field: 'plantationForestIntroducedArea',
      localizedName: props.i18n.t('forestCharacteristics.plantationForestIntroducedArea')
    },
    {
      field: 'otherPlantedForestArea',
      localizedName: props.i18n.t('forestCharacteristics.otherPlantedForestArea')
    }
  ]
  return <div className='nde__data-input-component'>
    <div className="nde__data-page-header">
      <h2 className="headline">{props.i18n.t('forestCharacteristics.forestCharacteristics')}</h2>
    </div>
    <ChartWrapper stateName="forestCharacteristics" trends={['naturalForestArea']}/>
    <DataTable section='foc' rows={rows} {...props} />
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

export default connect(mapStateToProps, {fetchItem, save, saveMany})(DataFetchingComponent)
