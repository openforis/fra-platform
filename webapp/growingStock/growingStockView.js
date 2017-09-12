
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import MirrorTable from './mirrorTable'

import { fetch } from './actions'

const GrowingStock = ({i18n, countryIso, fra, ...props}) => {
  const rows = [
    {
      field: 'naturallyRegeneratingForest',
      localizedName: i18n.t('fraForestCharacteristicsClass.naturallyRegeneratingForest')
    }, {
      field: 'plantedForest',
      localizedName: i18n.t('fraForestCharacteristicsClass.plantedForest')
    }, {
      field: 'plantationForest',
      localizedName: i18n.t('fraForestCharacteristicsClass.plantationForest')
    }, {
      field: 'otherPlantedForest',
      localizedName: i18n.t('fraForestCharacteristicsClass.otherPlantedForest')
    }, {
      field: 'totalForest',
      localizedName: i18n.t('fraForestCharacteristicsClass.totalForest')
    }, {
      field: 'otherWoodedLand',
      localizedName: i18n.t('fraClass.otherWoodedLand')
    },
  ]

  return <div className='nde__data-input-component'>
    <div className="nde__data-page-header">
      <h2 className="headline">{i18n.t('growingStock.growingStock')}</h2>
    </div>
    <MirrorTable section="growingStock"
                 fra={fra}
                 header={i18n.t('growingStock.fra2020Categories')}
                 avgTableHeader={i18n.t('growingStock.avgTableHeader')}
                 totalTableHeader={i18n.t('growingStock.totalTableHeader')}
                 rows={rows} {...props}/>
  </div>

}

class GrowingStockView extends Component {

  componentWillMount () {
    this.fetch(this.props.match.params.countryIso)
  }

  componentWillReceiveProps (next) {
    if (!R.equals(this.props.match.params.countryIso, next.match.params.countryIso))
      this.fetch(next.match.params.countryIso)
  }

  fetch (countryIso) {
    this.props.fetch(countryIso)
  }

  render () {
    return R.isEmpty(this.props.growingStock)
      ? null
      : <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
        <GrowingStock fra={this.props.growingStock.fra}
                      countryIso={this.props.match.params.countryIso} {...this.props}/>
      </LoggedInPageTemplate>
  }

}

const mapStateToProps = state => ({i18n: state.user.i18n, growingStock: state.growingStock})

export default connect(mapStateToProps, {fetch})(GrowingStockView)
