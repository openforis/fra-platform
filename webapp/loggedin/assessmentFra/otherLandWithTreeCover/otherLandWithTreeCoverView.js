import React from 'react'
import { connect } from 'react-redux'
import SingleTraditionalTableView from '@webapp/traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

import * as CountryState from '@webapp/country/countryState'

const OtherLandWithTreeCoverView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="otherLandWithTreeCover.otherLandWithTreeCover"
    faqAnchor="1a"
    tadAnchor="1f"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest, props.faoStat, props.match.params.countryIso)}
  />

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  extentOfForest: state.extentOfForest,
  faoStat: CountryState.getConfigFaoStat(state),
})

export default connect(mapStateToProps)(OtherLandWithTreeCoverView)
