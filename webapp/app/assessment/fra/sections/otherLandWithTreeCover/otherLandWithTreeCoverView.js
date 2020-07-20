import React from 'react'
import { connect } from 'react-redux'
import SingleTraditionalTableView from '@webapp/app/assessment/components/traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

import * as AppState from '@webapp/app/appState'
import * as CountryState from '@webapp/app/country/countryState'

const OtherLandWithTreeCoverView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="otherLandWithTreeCover.otherLandWithTreeCover"
    faqAnchor="1a"
    tadAnchor="1f"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest, props.faoStat, props.match.params.countryIso)}
  />

const mapStateToProps = state => ({
  i18n: AppState.getI18n(state),
  extentOfForest: state.extentOfForest,
  faoStat: CountryState.getConfigFaoStat(state),
})

export default connect(mapStateToProps)(OtherLandWithTreeCoverView)
