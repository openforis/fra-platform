
import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoggedInPageTemplate from '../loggedInPageTemplate'
import MirrorTable from './MirrorTable'

const GrowingStock = ({i18n, countryIso, ...props}) => {
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
    <MirrorTable section="growingStock" header={i18n.t('growingStock.fra2020Categories')} rows={rows} {...props}/>
  </div>

}

class GrowingStockView extends Component {

  render () {
    return <LoggedInPageTemplate commentsOpen={this.props.openCommentThread}>
      <GrowingStock {...this.props} countryIso={this.props.match.params.countryIso}/>
    </LoggedInPageTemplate>
  }

}

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps)(GrowingStockView)
