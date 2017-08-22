import './style.less'
import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import { fetchItem } from '../originalDataPoint/actions'
import LoggedInPageTemplate from '../loggedInPageTemplate'
import { DataTable } from '../originalDataPoint/commentableDatatable'


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
  return <div>
    <DataTable rows={rows} {...props} />
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
      <ForestCharacteristics {...this.props} />
    </LoggedInPageTemplate>
  }
}

const mapStateToProps = state => {
  console.log('state', state)
  return ({
    ...state.forestCharacteristics,
    'openCommentThread': state.review.openThread,
    i18n: state.user.i18n
  })
}

export default connect(mapStateToProps, {fetchItem})(DataFetchingComponent)
